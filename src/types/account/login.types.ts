export type LoginResponse = {
  tokenType: string;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};
