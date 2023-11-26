import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Radio, Button } from '@mui/material';
import UserModal from '../madals/UserModal';

interface RowData {
    id: number | null;
    name: string;
    surname: string;
    department: string;
    email: string;
    phoneNumber: string;
}

interface UsersListTableProps {
    data: RowData[];
}

const UsersListTable = ({ data }: UsersListTableProps) => {
    const [selectedRow, setSelectedRow] = useState<RowData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [sessionData, setSessionData] = useState<RowData>();

    const handleCloseModal = () => setIsModalOpen(false);

    const handleAddClick = () => {
        setIsEditMode(false);
        setSessionData({ id: null, name: '', surname: '', department: '', email: '', phoneNumber: '' });
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

    return (
        <>
            <div className='users-list-table-container'>
                <div className='users-list-top-bar'>
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
                        onClick={() => console.log(selectedRow)}
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
                        onClick={() => console.log(selectedRow)}
                    >
                        Delete
                    </Button>
                </div>
                <TableContainer component={Paper} id='table'>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Surname</TableCell>
                                <TableCell>Department</TableCell>
                                <TableCell>E-mail</TableCell>
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
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.surname}</TableCell>
                                    <TableCell>{row.department}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{row.phoneNumber}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <UserModal open={isModalOpen} handleClose={handleCloseModal} isEditMode={isEditMode} sessionData={sessionData} />
        </>
    );
};

export default UsersListTable;
