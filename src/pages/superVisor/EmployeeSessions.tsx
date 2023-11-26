import EmployeeSessionsTable from "../../components/tabels/EmployeeSessionsTable";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from "@mui/material";

const EmployeeSessions = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const sampleData = [
        { id: 1, startSession: '2023-11-26T10:00', endSession: '2023-11-27T10:00', description: 'Description 1' },
        { id: 2, startSession: '2023-11-26T10:00', endSession: '2023-11-27T10:00', description: 'Description 2' },
        { id: 3, startSession: '2023-11-26T10:00', endSession: '2023-11-27T10:00', description: 'Description 3' },
        { id: 4, startSession: '2023-11-26T10:00', endSession: '2023-11-27T10:00', description: 'Description 4' },
        { id: 5, startSession: '2023-11-26T10:00', endSession: '2023-11-27T10:00', description: 'Description 5' },
        { id: 6, startSession: '2023-11-26T10:00', endSession: '2023-11-27T10:00', description: 'Description 6' },
        { id: 7, startSession: '2023-11-26T10:00', endSession: '2023-11-27T10:00', description: 'Description 7' },
        { id: 8, startSession: '2023-11-26T10:00', endSession: '2023-11-27T10:00', description: 'Description 8' },
        { id: 9, startSession: '2023-11-26T10:00', endSession: '2023-11-27T10:00', description: 'Description 9' },
        { id: 10, startSession: '2023-11-26T10:00', endSession: '2023-11-27T10:00', description: 'Description 10' },
    ];

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
                <EmployeeSessionsTable data={sampleData} />
            </div>
        </div>
    )
}

export default EmployeeSessions