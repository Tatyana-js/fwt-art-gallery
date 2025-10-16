export type theme = 'dark' | 'light';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  data: AuthTokens;
}

export interface AuthFormData {
  email: string;
  password: string;
}
export type RootState = {
  auth: {
    isAuth: boolean;
  };
};
