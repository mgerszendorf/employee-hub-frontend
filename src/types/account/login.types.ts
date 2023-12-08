export interface LoginResponse {
  tokenType: string;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
};

export interface LoginPayload {
  email: string;
  password: string;
};
