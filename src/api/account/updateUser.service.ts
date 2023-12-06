import { ErrorResponse } from '../../types/account/error.types';
import { UseMutationOptions, useMutation } from 'react-query';
import { createAxiosInstance } from '../axiosInstance';
import { UpdateTokenResponse } from '../../types/account/update-token.types';
import { UpdateUserPayload } from '../../types/account/update-user.types';

export const useUpdateUserMutation = (
    handleRefreshToken: () => Promise<void>,
    accessToken: string,
    options?: UseMutationOptions<
        UpdateTokenResponse,
        ErrorResponse,
        UpdateUserPayload
    >,
) => {
    const axiosInstance = createAxiosInstance(handleRefreshToken);

    const updateUser = async (
        accessToken: string,
        params: UpdateUserPayload,
    ): Promise<UpdateTokenResponse> => {
        try {
            const { data } = await axiosInstance.put(
                '/users/update',
                params,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
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

    return useMutation(
        (params: UpdateUserPayload) =>
            updateUser(accessToken, params),
        options,
    );
};
