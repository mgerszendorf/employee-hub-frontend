import { AuthContext } from '../../context/AuthContext';
import { ErrorResponse } from 'react-router-dom';
import { createAxiosInstance } from '../axiosInstance';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import { UserSessionResponse } from '../../types/worktime/user-session.type';

export const useGetUserSessionByIdQuery = (
  userId: string,
  accessToken: string,
) => {
  const { handleRefreshToken } = useContext(AuthContext);
  const axiosInstance = createAxiosInstance(handleRefreshToken);

  const getUserSessionById = async (
    userId: string,
  ): Promise<UserSessionResponse> => {
    try {
      const { data } = await axiosInstance.get(
        `/worktime-session/user-sessions/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      return data;
    } catch (error: unknown) {
      return { $values: null };
    }
  };

  return useQuery<UserSessionResponse, ErrorResponse>(
    ['getUserSessionById', userId],
    () => getUserSessionById(userId),
  );
};

