import { Button } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import EmployeeListTable from "../../components/tabels/EmployeeListTable";
import AuthContext from "../../context/AuthContext";
import { useFetchAllUsers } from "../../api/users/getUsers.service";

const SuperVisorHomePage = () => {
    const { user } = useContext(AuthContext);
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
    const { data: users } = useFetchAllUsers();

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleString());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleLogOut = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        location.reload()
    }

    const transformedData = users?.$values?.map(item => ({
        id: item.id,
        firstName: item.firstName,
        lastName: item.lastName,
        email: item.email,
        phoneNumber: item.phoneNumber,
    })) ?? [];

    return (
        <div className="super-visor-home-page-container">
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
            <div className="employee-list">
                <EmployeeListTable data={transformedData} />
            </div>
        </div>
    )
}

export default SuperVisorHomePage