import { useContext, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Radio, Button } from '@mui/material';
import EmployeeSessionModal from '../madals/EmployeeSessionModal';
import { useDeleteWorktimeSessionMutation } from '../../api/worktime/deleteWorktimeSession.service';
import AuthContext from '../../context/AuthContext';
import { ToastNotificationContext } from '../../context/ToastNotificationContext';

interface RowData {
    id: string | null;
    start: string;
    end: string;
    description: string;
}

interface EmployeeSessionsTableProps {
    data: RowData[];
    refetchGetUserSessionByIdData: () => Promise<any>;
}

const EmployeeSessionsTable = ({ data, refetchGetUserSessionByIdData }: EmployeeSessionsTableProps) => {
    const [selectedRow, setSelectedRow] = useState<RowData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [sessionData, setSessionData] = useState<RowData>();

    const { accessToken, handleRefreshToken } = useContext(AuthContext);
    const { showToastNotification } = useContext(ToastNotificationContext);
    const { mutate: deleteSession } = useDeleteWorktimeSessionMutation(handleRefreshToken, accessToken!);

    const handleCloseModal = () => setIsModalOpen(false);

    const handleAddClick = () => {
        setIsEditMode(false);
        setSessionData({ id: null, start: '', end: '', description: '' });
        setIsModalOpen(true);
    };

    const handleEditClick = (selectedRow: RowData) => {
        setIsEditMode(true);
        setSessionData(selectedRow);
        setIsModalOpen(true);
    };

    const handleRowClick = (row: RowData) => {
        if (selectedRow && selectedRow.id === row.id) {
            setSelectedRow(null);
        } else {
            setSelectedRow(row);
        }
    };

    const handleDelete = (selectedRow: RowData) => {
        const sessionId = selectedRow.id
        if (sessionId) {
            deleteSession(sessionId, {
                onSuccess: () => {
                    refetchGetUserSessionByIdData();
                },
                onError: () => {
                    showToastNotification('Something went wrong', 'error');
                },
            });
        }
    };

    return (
        <>
            <div className='employee-sessions-table-container'>
                <div className='employee-sessions-table-top-bar'>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ mr: 2 }}
                        onClick={() => handleAddClick()}
                    >
                        Add
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={!selectedRow}
                        sx={{ mr: 2 }}
                        onClick={() => handleEditClick(selectedRow!)}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={!selectedRow}
                        onClick={() => handleDelete(selectedRow!)}
                    >
                        Delete
                    </Button>
                </div>
                <TableContainer component={Paper} id='table'>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>Start session</TableCell>
                                <TableCell>End session</TableCell>
                                <TableCell>Description</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                                <TableRow
                                    key={row.id}
                                    hover
                                    selected={selectedRow?.id === row.id}
                                    onClick={() => handleRowClick(row)}
                                >
                                    <TableCell padding="checkbox">
                                        <Radio
                                            checked={selectedRow?.id === row.id}
                                            onChange={() => handleRowClick(row)}
                                        />
                                    </TableCell>
                                    <TableCell>{row.start}</TableCell>
                                    <TableCell>{row.end}</TableCell>
                                    <TableCell>{row.description}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <EmployeeSessionModal open={isModalOpen} handleClose={handleCloseModal} isEditMode={isEditMode} sessionData={sessionData} refetchGetUserSessionByIdData={refetchGetUserSessionByIdData} />
        </>
    );
};

export default EmployeeSessionsTable;
