import { useContext, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Radio, Button } from '@mui/material';
import UserModal from '../madals/UserModal';
import AuthContext from '../../context/AuthContext';
import AdminActivationModal from '../madals/AdminActivationModal';
import { useDeleteUserMutation } from '../../api/users/deleteUser.service';

interface RowData {
    id: string | null;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    active: boolean;
}

interface UsersListTableProps {
    data: RowData[];
    refetchUsers: () => Promise<any>;
}

const UsersListTable = ({ data, refetchUsers }: UsersListTableProps) => {
    const { accessToken, handleRefreshToken } = useContext(AuthContext);

    const [selectedRow, setSelectedRow] = useState<RowData | null>(null);
    const [isActivationModalOpen, setIsActivationModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [sessionData, setSessionData] = useState<RowData>();

    const { mutate: deleteUser } = useDeleteUserMutation(handleRefreshToken, accessToken!);

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsActivationModalOpen(false)
    }

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

    const handleActivation = () => {
        setIsActivationModalOpen(true)
    }

    const handleDelete = (selectedRow: RowData) => {
        const userId = selectedRow.id
        if (userId) {
            deleteUser(userId, {
                onSuccess: () => {
                    refetchUsers()
                },
                onError: (error) => {
                    console.error('Error deleting session:', error);
                },
            });
        }
    };

    return (
        <>
            <div className='users-list-table-container'>
                <div className='users-list-top-bar'>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={!selectedRow}
                        onClick={() => handleActivation()}
                        sx={{ mr: 2 }}
                    >
                        Activate
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={!selectedRow}
                        onClick={() => handleEditClick(selectedRow!)}
                        sx={{ mr: 2 }}
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
                                <TableCell>Active</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Surname</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone number</TableCell>
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
                                    {row.active ?
                                        <TableCell style={{ color: 'green' }}>{row.active.toString()}</TableCell> :
                                        <TableCell style={{ color: 'red' }}>{row.active.toString()}</TableCell>
                                    }
                                    <TableCell>{row.firstName}</TableCell>
                                    <TableCell>{row.lastName}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{row.phoneNumber}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <UserModal open={isModalOpen} handleClose={handleCloseModal} isEditMode={isEditMode} sessionData={sessionData} refetchUsers={refetchUsers} />
            <AdminActivationModal open={isActivationModalOpen} handleClose={handleCloseModal} userId={selectedRow?.id} refetchUsers={refetchUsers} />
        </>
    );
};

export default UsersListTable;
