import { useMutation, UseMutationOptions } from 'react-query';
import { createAxiosInstance } from '../axiosInstance';
import { ErrorResponse } from '../../types/account/error.types';

export const useDeleteWorktimeSessionMutation = (
    handleRefreshToken: () => Promise<void>,
    accessToken: string,
    options?: UseMutationOptions<void, ErrorResponse, string> // The generic types are for Result, Error, and Argument respectively
) => {
    const axiosInstance = createAxiosInstance(handleRefreshToken);

    const deleteWorktimeSession = async (sessionId: string): Promise<void> => {
        try {
            await axiosInstance.delete(`/worktime-session/${sessionId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
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

    return useMutation<void, ErrorResponse, string>(
        deleteWorktimeSession,
        options,
    );
};
