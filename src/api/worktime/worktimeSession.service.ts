import { ErrorResponse } from '../../types/account/error.types';
import { UseMutationOptions, useMutation } from 'react-query';
import { createAxiosInstance } from '../axiosInstance';
import { WorktimeSessionPayload, WorktimeSessionResponse } from '../../types/worktime/activation-worktime-session.types';

export const useWorktimeSessionMutation = (
    handleRefreshToken: () => Promise<void>,
    accessToken: string,
    options?: UseMutationOptions<
        WorktimeSessionResponse,
        ErrorResponse,
        WorktimeSessionPayload
    >,
) => {
    const axiosInstance = createAxiosInstance(handleRefreshToken);

    const handleWorktimeSession = async (
        accessToken: string,
        params: WorktimeSessionPayload,
    ): Promise<WorktimeSessionResponse> => {
        try {
            const { data } = await axiosInstance.post(
                '/worktime-session',
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
        (params: WorktimeSessionPayload) =>
            handleWorktimeSession(accessToken, params),
        options,
    );
};
