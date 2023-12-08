import { useContext } from 'react';
import { useQuery } from 'react-query';
import { ErrorResponse } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { createAxiosInstance } from '../axiosInstance';
import { GetSupervisors } from '../../types/users/getSupervisors.type';

export const useFetchAllUsers = () => {
    const { handleRefreshToken, accessToken } = useContext(AuthContext);
    const axiosInstance = createAxiosInstance(handleRefreshToken);

    const fetchAllUsers = async (): Promise<GetSupervisors> => {
        try {
            const { data } = await axiosInstance.get('/users/all', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return data;
        } catch (error: unknown) {
            throw error;
        }
    };

    return useQuery<GetSupervisors, ErrorResponse>(
        'allUsers',
        fetchAllUsers
    );
};
