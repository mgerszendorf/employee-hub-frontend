import { ErrorResponse } from '../../types/account/error.types';
import { UseMutationOptions, useMutation } from 'react-query';
import { createAxiosInstance } from '../axiosInstance';
import { AddWorktimeSessionPayload, AddWorktimeSessionResponse } from '../../types/users/addWorktimeSession.type';

export const useAddWorktimeSessionMutation = (
    handleRefreshToken: () => Promise<void>,
    accessToken: string,
    options?: UseMutationOptions<
        AddWorktimeSessionResponse,
        ErrorResponse,
        AddWorktimeSessionPayload
    >,
) => {
    const axiosInstance = createAxiosInstance(handleRefreshToken);

    const addWorktimeSession = async (
        userId: string,
        accessToken: string,
        params: {
            description: string;
            start: string;
            end: string;
        },
    ): Promise<AddWorktimeSessionResponse> => {
        try {
            const { data } = await axiosInstance.post(
                `/worktime-session/add/${userId}`,
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
            addWorktimeSession(userId, accessToken, params),
        options,
    );
};
