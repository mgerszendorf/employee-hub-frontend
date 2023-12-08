import EmployeeSessionsTable from "../../components/tabels/EmployeeSessionsTable";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from "@mui/material";
import { useGetUserSessionByIdQuery } from "../../api/worktime/getUserSessionById.service";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Loader } from "../../components/Loader";

const EmployeeSessions = () => {
    const { accessToken } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        data: getUserSessionByIdData,
        isLoading: sessionsIsLoading,
        refetch: refetchGetUserSessionByIdData,
    } = useGetUserSessionByIdQuery(id!, accessToken!);

    const transformedData = getUserSessionByIdData?.$values?.map(item => ({
        description: item.description,
        id: item.id,
        start: item.start,
        end: item.end
    })) ?? [];

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="employee-sessions-container">
            <div className="employee-sessions-top-bar">
                <Button
                    color="primary"
                    onClick={handleBack}
                    sx={{ mr: 2 }}
                >
                    <ArrowBackIcon />
                </Button>
                <p>Employee sessions {id}</p>
            </div>
            <div className="employee-sessions-list">
                <EmployeeSessionsTable data={transformedData} refetchGetUserSessionByIdData={refetchGetUserSessionByIdData} />
            </div>
            {sessionsIsLoading && <Loader />}
        </div>
    )
}

export default EmployeeSessions