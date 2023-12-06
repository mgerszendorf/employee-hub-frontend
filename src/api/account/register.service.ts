import { ErrorResponse } from '../../types/account/error.types';
import {
  RegisterPayload,
  RegisterResponse,
} from '../../types/account/register.types';
import { UseMutationOptions, useMutation } from 'react-query';
import { createAxiosInstance } from '../axiosInstance';

export const useRegisterMutation = (
  handleRefreshToken: () => Promise<void>,
  options?: UseMutationOptions<
    RegisterResponse,
    ErrorResponse,
    RegisterPayload
  >,
) => {
  const axiosInstance = createAxiosInstance(handleRefreshToken);

  const register = async (
    params: RegisterPayload,
  ): Promise<RegisterResponse> => {
    try {
      const status = await axiosInstance.post('/register', params);
      return status;
    } catch (error: unknown) {
      const errorData = (error as ErrorResponse)?.response?.data;
      if (errorData?.errors) {
        const errorMessage = errorData.errors[0];
        throw new Error(errorMessage);
      } else {
        throw new Error('Unknown error occurred');
      }
    }
  };

  return useMutation(register, options);
};
