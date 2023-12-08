import { Button } from "@mui/material"
import { useEffect, useState } from "react";
import UsersListTable from "../components/tabels/UsersListTable";
import { useFetchAllUsers } from "../api/users/getUsers.service";
import { Loader } from "../components/Loader";

const AdminHomePage = () => {
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
    const { data: users, isLoading: usersIsLoading, refetch: refetchUsers } = useFetchAllUsers();

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
        active: item.active
    })) ?? [];

    return (
        <div className="admin-home-page-container">
            <div className="admin-home-page-top-bar">
                <div>
                    <p>Admin</p>
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
            <div className="users-list">
                {users ?
                    <UsersListTable data={transformedData} refetchUsers={refetchUsers} />
                    : null
                }
            </div>
            {usersIsLoading && <Loader />}
        </div>
    )
}

export default AdminHomePage