import { ErrorResponse } from '../../types/account/error.types';
import { UseMutationOptions, useMutation } from 'react-query';
import { createAxiosInstance } from '../axiosInstance';
import { ActivateUserPayload, ActivateUserResponse } from '../../types/users/activateUser.type';

export const useActivateUserMutation = (
    handleRefreshToken: () => Promise<void>,
    accessToken: string,
    options?: UseMutationOptions<
        ActivateUserResponse,
        ErrorResponse,
        ActivateUserPayload
    >,
) => {
    const axiosInstance = createAxiosInstance(handleRefreshToken);

    const handleActivateUser = async (
        userId: string,
        params: ActivateUserPayload,
    ): Promise<ActivateUserResponse> => {
        try {
            const { data } = await axiosInstance.post(
                `/users/activate/${userId}`,
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
        ({ userId, ...params }: any) =>
            handleActivateUser(userId, params),
        options,
    );
};
