import axios from 'axios';
import { AxiosError } from 'axios';
import { ApiError } from '@app/api/ApiError';
import { persistToken, readToken } from '@app/services/localStorage.service';
import { doRefresh } from '@app/store/slices/authSlice';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { refresh } from '@app/api/auth.api';

export const httpApi = axios.create({
  baseURL: 'http://localhost:8080/api',
  // baseURL: process.env.REACT_APP_BASE_URL,
});

httpApi.interceptors.request.use((config) => {
  config.headers = { ...config.headers, Authorization: `${readToken()}` };

  return config;
});

httpApi.interceptors.response.use(undefined, (error: AxiosError) => {
  if (error.response?.data.status === 403) {
    refresh()
      .then((res) => {
        const config = error.config;
        persistToken(res.authorization);
        config.headers = { ...config.headers, Authorization: res.authorization };
        return axios.request(config);
      })
      .catch((error) => {
        window.location.replace('/auth/login');
      });
  }

  throw new ApiError<ApiErrorData>(
    error.response?.data.error.message || error.message,
    error.response?.data || error.response?.data,
  );
});

export interface ApiErrorData {
  message: string;
}
