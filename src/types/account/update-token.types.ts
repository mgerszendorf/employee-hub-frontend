export interface UpdateTokenResponse {
  tokenType: string;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
};

export interface UpdateTokenPayload {
  refreshToken: string;
};
