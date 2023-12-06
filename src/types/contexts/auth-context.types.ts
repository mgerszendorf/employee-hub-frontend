import { User } from '../account/user.types';

export interface AuthContextHandler {
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleRegister: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleRefreshToken: () => Promise<void>;
  handleUpdateUser: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  user?: User;
  accessToken?: string;
  refreshToken?: string;
}
