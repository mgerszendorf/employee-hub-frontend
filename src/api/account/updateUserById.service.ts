import { ErrorResponse } from '../../types/account/error.types';
import { UseMutationOptions, useMutation } from 'react-query';
import { createAxiosInstance } from '../axiosInstance';
import { UpdateUserByIdPayload, UpdateUserByIdResponse } from '../../types/users/updateUserById.type';

export const useUpdateUserByIdMutation = (
    handleRefreshToken: () => Promise<void>,
    accessToken: string,
    options?: UseMutationOptions<
        UpdateUserByIdResponse,
        ErrorResponse,
        any
    >,
) => {
    const axiosInstance = createAxiosInstance(handleRefreshToken);

    const updateUser = async (
        userId: string,
        accessToken: string,
        params: UpdateUserByIdPayload,
    ): Promise<UpdateUserByIdResponse> => {
        try {
            const { data } = await axiosInstance.put(
                `/users/update/${userId}`,
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
            updateUser(userId, accessToken, params),
        options,
    );
};
