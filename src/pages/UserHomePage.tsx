import { useState, useEffect, useContext } from "react";
import { Button } from "@mui/material";
import RecentUserSessionsTable from "../components/tabels/RecentUserSessionsTable";
import { WorktimeSessionContext } from "../context/WorktimeSessionContext";
import WorktimeSessionModal from "../components/madals/WorktimeSessionModal";
import { useGetUserSessionByIdQuery } from "../api/worktime/getUserSessionById.service";
import AuthContext from "../context/AuthContext";

const UserHomePage = () => {
    const { handleWorktimeSession, isStartSessionActive, isFinishSessionActive, setIsStartSessionActive, setIsFinishSessionActive } = useContext(WorktimeSessionContext);
    const { accessToken, user } = useContext(AuthContext);
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        data: getUserSessionByIdData,
        refetch: refetchGetUserSessionByIdData,
    } = useGetUserSessionByIdQuery(user?.id!, accessToken!);

    useEffect(() => {
        if (getUserSessionByIdData && Array.isArray(getUserSessionByIdData.$values)) {
            if (getUserSessionByIdData.$values[0].end) {
                setIsStartSessionActive(false)
                setIsFinishSessionActive(true)
            } else {
                setIsStartSessionActive(true)
                setIsFinishSessionActive(false)
            }
        }
    }, [getUserSessionByIdData, refetchGetUserSessionByIdData])

    const transformedData = getUserSessionByIdData?.$values?.map(item => ({
        description: item.description,
        id: item.id,
        startSession: item.start,
        endSession: item.end
    })) ?? [];



    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleString());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleCloseModal = () => setIsModalOpen(false);

    const startSession = async () => {
        await handleWorktimeSession('');
        refetchGetUserSessionByIdData()
    };

    const finishSession = () => {
        setIsModalOpen(true)
    };

    const handleLogOut = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        location.reload()
    }

    return (
        <>
            <div className="user-home-page-container">
                <div className="top-bar">
                    <div>
                        {(user?.firstName && user?.lastName) ?
                            <p>{user?.firstName + ' ' + user?.lastName}</p>
                            :
                            <p>Hello!</p>}
                        <Button
                            variant="contained"
                            onClick={handleLogOut}
                        >
                            Log Out
                        </Button>
                    </div>
                    <div>
                        <p>{currentTime}</p>
                    </div>
                </div>
                <div className="timing-container">
                    <Button
                        variant="contained"
                        color="success"
                        disabled={isStartSessionActive}
                        onClick={startSession}
                    >
                        Start
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        disabled={isFinishSessionActive}
                        onClick={finishSession}
                    >
                        Stop
                    </Button>
                </div>
                <div className="recent-user-sessions">
                    {getUserSessionByIdData ?
                        <RecentUserSessionsTable data={transformedData} />
                        : null
                    }
                </div>
            </div>
            <WorktimeSessionModal open={isModalOpen} handleClose={handleCloseModal} refetchGetUserSessionByIdData={refetchGetUserSessionByIdData} />
        </>
    );
}

export default UserHomePage;
