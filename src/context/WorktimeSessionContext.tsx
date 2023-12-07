import { ReactNode, createContext, useContext, useState } from 'react';
import { WorktimeSessionContextHandler } from '../types/contexts/worktime-session.types';
import { ToastNotificationContext } from './ToastNotificationContext';
import { useWorktimeSessionMutation } from '../api/worktime/worktimeSession.service';
import { ErrorResponse } from '../types/account/error.types';
import AuthContext from './AuthContext';

interface WorktimeSessionProviderProps {
    children: ReactNode;
}
export const WorktimeSessionContext =
    createContext<WorktimeSessionContextHandler>(
        {} as WorktimeSessionContextHandler,
    );

export const WorktimeSessionProvider = ({
    children,
}: WorktimeSessionProviderProps) => {
    const { showToastNotification } = useContext(ToastNotificationContext);
    const { accessToken, handleRefreshToken } = useContext(AuthContext);

    const [isStartSessionActive, setIsStartSessionActive] = useState(false);
    const [isFinishSessionActive, setIsFinishSessionActive] = useState(true);

    //Activate worktime session
    const { mutate: worktimeSessionMutate } = useWorktimeSessionMutation(handleRefreshToken, accessToken!, {
        onSuccess: (data) => {
            if (data.state === "Session started") {
                setIsStartSessionActive(true)
                setIsFinishSessionActive(false)
            } else {
                setIsFinishSessionActive(true)
                setIsStartSessionActive(false)
            }
        },
        onError: (error: ErrorResponse) => {
            showToastNotification(
                error.response?.data.errors[0] ?? error.message,
                'error',
            );
        },
    });

    const handleWorktimeSession = async (description: string) => {
        await worktimeSessionMutate({ description });
    };

    const contextData = {
        handleWorktimeSession,
        setIsStartSessionActive,
        setIsFinishSessionActive,
        isStartSessionActive,
        isFinishSessionActive
    };

    return (
        <WorktimeSessionContext.Provider value={contextData}>
            {children}
        </WorktimeSessionContext.Provider>
    );
};
