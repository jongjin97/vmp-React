import { httpApi } from '@app/api/http.api';
import { UserModel } from '@app/domain/UserModel';
import axios, { AxiosResponseHeaders } from 'axios';
import { RequestPayResponse } from 'iamport-typings';

export interface AuthData {
  email: string;
  password: string;
}

export interface SignUpRequest {
  name: string | undefined;
  email: string;
  birth: string | undefined;
  phone: string | undefined;
  password: string;
  passwordConfirm: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface SecurityCodePayload {
  code: string;
}

export interface NewPasswordData {
  newPassword: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  authorization: string;
  response: UserModel;
}

export const login = (loginPayload: LoginRequest): Promise<AxiosResponseHeaders | LoginResponse> =>
  httpApi.post<LoginResponse>('users/login', { ...loginPayload }).then(({ data, headers }) => {
    console.log(data, headers);
    return { ...data, authorization: headers.authorization };
  });

export const refresh = () =>
  httpApi.post<undefined>('token').then(({ data, headers }) => {
    console.log(data, headers);
    return { authorization: headers.authorization };
  });

export const signUp = (signUpData: SignUpRequest): Promise<undefined> =>
  httpApi.post<undefined>('users/signup', { ...signUpData }).then(({ data }) => data);

export const resetPassword = (resetPasswordPayload: ResetPasswordRequest): Promise<undefined> =>
  httpApi.post<undefined>('forgotPassword', { ...resetPasswordPayload }).then(({ data }) => data);

export const verifySecurityCode = (securityCodePayload: SecurityCodePayload): Promise<undefined> =>
  httpApi.post<undefined>('verifySecurityCode', { ...securityCodePayload }).then(({ data }) => data);

export const setNewPassword = (newPasswordData: NewPasswordData): Promise<undefined> =>
  httpApi.post<undefined>('setNewPassword', { ...newPasswordData }).then(({ data }) => data);

export const updatePoint = (payment: RequestPayResponse): Promise<undefined> =>
  httpApi.post<undefined>('uesrs/point', { ...payment }).then(({ data }) => data);

export const refreshTest = () => httpApi.post<undefined>('payment/test').then(({ data }) => data);
