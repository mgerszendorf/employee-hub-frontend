import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import RecentUserSessionsTable from "../components/tabels/RecentUserSessionsTable";

const UserHomePage = () => {
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());

    const sampleData = [
        { id: 1, startSession: '25/11/2023, 21:31:56', endSession: '25/11/2023, 21:31:56', description: 'Description 1' },
        { id: 2, startSession: '25/11/2023, 21:31:56', endSession: '25/11/2023, 21:31:56', description: 'Description 2' },
        { id: 3, startSession: '25/11/2023, 21:31:56', endSession: '25/11/2023, 21:31:56', description: 'Description 3' },
        { id: 4, startSession: '25/11/2023, 21:31:56', endSession: '25/11/2023, 21:31:56', description: 'Description 4' },
        { id: 5, startSession: '25/11/2023, 21:31:56', endSession: '25/11/2023, 21:31:56', description: 'Description 5' },
        { id: 6, startSession: '25/11/2023, 21:31:56', endSession: '25/11/2023, 21:31:56', description: 'Description 6' },
        { id: 7, startSession: '25/11/2023, 21:31:56', endSession: '25/11/2023, 21:31:56', description: 'Description 7' },
        { id: 8, startSession: '25/11/2023, 21:31:56', endSession: '25/11/2023, 21:31:56', description: 'Description 8' },
        { id: 9, startSession: '25/11/2023, 21:31:56', endSession: '25/11/2023, 21:31:56', description: 'Description 9' },
        { id: 10, startSession: '25/11/2023, 21:31:56', endSession: '25/11/2023, 21:31:56', description: 'Description 10' },
      ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleString());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="user-home-page-container">
            <div className="top-bar">
                <div>
                    <p>Marek Gerszendorf</p>
                    <Button
                        variant="contained"
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
                >
                    Start
                </Button>
                <Button 
                    variant="contained"
                    color="error"
                >
                    Stop
                </Button>
            </div>
            <div className="recent-user-sessions">
                <RecentUserSessionsTable data={sampleData} />
            </div>
        </div>
    );
}

export default UserHomePage;
