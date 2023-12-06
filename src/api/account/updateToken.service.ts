import AuthContext from '../../context/AuthContext';
import { ErrorResponse } from '../../types/account/error.types';
import {
  UpdateTokenPayload,
  UpdateTokenResponse,
} from '../../types/account/update-token.types';
import { UseMutationOptions, useMutation } from 'react-query';
import { createAxiosInstance } from '../axiosInstance';
import { useContext } from 'react';

export const useRefreshTokenMutation = (
  options?: UseMutationOptions<
    UpdateTokenResponse,
    ErrorResponse,
    UpdateTokenPayload
  >,
) => {
  const { handleRefreshToken } = useContext(AuthContext);
  const axiosInstance = createAxiosInstance(handleRefreshToken);

  const updateToken = async (
    params: UpdateTokenPayload,
  ): Promise<UpdateTokenResponse> => {
    try {
      const { data } = await axiosInstance.post(
        '/refresh',
        params,
      );
      return data;
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

  return useMutation(updateToken, options);
};
