import { ErrorResponse } from '../../types/account/error.types';
import { LoginPayload, LoginResponse } from '../../types/account/login.types';
import { UseMutationOptions, useMutation } from 'react-query';
import { createAxiosInstance } from '../axiosInstance';

export const useLoginMutation = (
    handleRefreshToken: () => Promise<void>,
    setUser: any,
    options?: UseMutationOptions<LoginResponse, ErrorResponse, LoginPayload>,
) => {
    const axiosInstance = createAxiosInstance(handleRefreshToken);

    const fetchDataAfterLogin = async (token: string) => {
        try {
            const response = await axiosInstance.get('/users/data', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(response.data);
            return response.data;
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

    const login = async (params: LoginPayload): Promise<LoginResponse> => {
        try {
            const { data } = await axiosInstance.post('/login', params);
            await fetchDataAfterLogin(data.accessToken);
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

    return useMutation(login, options);
};
