import { httpApi } from '@app/api/http.api';

export interface CertificationResponse {
  success: boolean;
  response: {
    code: number;
    message: string | null;
    response: {
      imp_uid: string;
      merchant_uid: string;
      pg_tid: string;
      pg_provider: string;
      name: string;
      gender: null;
      birth: number;
      birthday: string;
      foreigner: boolean;
      phone: string;
      carrier: null;
      certified: boolean;
      certified_at: number;
      unique_key: string;
      unique_in_site: null;
      origin: string;
      foreigner_v2: boolean;
    };
  };
  error: string | null;
}

export const certification = (impRequest: string): Promise<CertificationResponse> =>
  httpApi.post<CertificationResponse>('certifications/' + impRequest).then(({ data }) => data);
