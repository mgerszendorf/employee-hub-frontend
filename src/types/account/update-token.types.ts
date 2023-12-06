export type UpdateTokenResponse = {
  tokenType: string;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
};

export type UpdateTokenPayload = {
  refreshToken: string;
};
