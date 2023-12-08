import { useQuery } from 'react-query';
import { createAxiosInstance } from '../axiosInstance';
import { ErrorResponse } from '../../types/account/error.types';
import { GetSupervisors } from '../../types/users/getSupervisors.type';

export const useGetAllSupervisorsQuery = (
    handleRefreshToken: () => Promise<void>,
    accessToken: string
) => {
    const axiosInstance = createAxiosInstance(handleRefreshToken);

    const fetchSupervisors = async (): Promise<GetSupervisors> => {
        try {
            const { data } = await axiosInstance.get(`/users/supervisors`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
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

    return useQuery('supervisors', fetchSupervisors);
};
