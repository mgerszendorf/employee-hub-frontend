import { Button } from "@mui/material"
import { useEffect, useState } from "react";
import UsersListTable from "../components/tabels/UsersListTable";

const AdminHomePage = () => {
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());

    const sampleData = [
        { id: 1, name: 'Jan', surname: 'Nowak', department: 'Department 1', email: 'jan.nowak@gmail.com', phoneNumber: '748349234' },
        { id: 2, name: 'Jan', surname: 'Nowak', department: 'Department 1', email: 'jan.nowak@gmail.com', phoneNumber: '748349234' },
        { id: 3, name: 'Jan', surname: 'Nowak', department: 'Department 1', email: 'jan.nowak@gmail.com', phoneNumber: '748349234' },
        { id: 4, name: 'Jan', surname: 'Nowak', department: 'Department 1', email: 'jan.nowak@gmail.com', phoneNumber: '748349234' },
        { id: 5, name: 'Jan', surname: 'Nowak', department: 'Department 1', email: 'jan.nowak@gmail.com', phoneNumber: '748349234' },
        { id: 6, name: 'Jan', surname: 'Nowak', department: 'Department 1', email: 'jan.nowak@gmail.com', phoneNumber: '748349234' },
        { id: 7, name: 'Jan', surname: 'Nowak', department: 'Department 1', email: 'jan.nowak@gmail.com', phoneNumber: '748349234' },
        { id: 8, name: 'Jan', surname: 'Nowak', department: 'Department 1', email: 'jan.nowak@gmail.com', phoneNumber: '748349234' },
        { id: 9, name: 'Jan', surname: 'Nowak', department: 'Department 1', email: 'jan.nowak@gmail.com', phoneNumber: '748349234' },
        { id: 10, name: 'Jan', surname: 'Nowak', department: 'Department 1', email: 'jan.nowak@gmail.com', phoneNumber: '748349234' },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleString());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="admin-home-page-container">
            <div className="admin-home-page-top-bar">
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
            <div className="users-list">
                <UsersListTable data={sampleData} />
            </div>
        </div>
    )
}

export default AdminHomePage