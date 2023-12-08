import { ErrorResponse } from '../../types/account/error.types';
import { UseMutationOptions, useMutation } from 'react-query';
import { createAxiosInstance } from '../axiosInstance';
import { UpdateWorktimeSessionPayload, UpdateWorktimeSessionResponse } from '../../types/users/updateWorktimeSession.type';

export const useUpdateWorktimeSessionMutation = (
    handleRefreshToken: () => Promise<void>,
    accessToken: string,
    options?: UseMutationOptions<
        UpdateWorktimeSessionResponse,
        ErrorResponse,
        UpdateWorktimeSessionPayload
    >,
) => {
    const axiosInstance = createAxiosInstance(handleRefreshToken);

    const updateWorktimeSession = async (
        sessionId: string,
        accessToken: string,
        params: UpdateWorktimeSessionPayload,
    ): Promise<UpdateWorktimeSessionResponse> => {
        try {
            const { data } = await axiosInstance.put(
                `/worktime-session/update`,
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
        ({ sessionId, ...params }: any) =>
            updateWorktimeSession(sessionId, accessToken, params),
        options,
    );
};
