import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Radio, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EmployeeModal from '../madals/EmployeeModal';

interface RowData {
    id: number;
    name: string;
    surname: string;
    department: string;
    email: string;
    phoneNumber: string;
}

interface EmployeeListTableProps {
    data: RowData[];
}

const EmployeeListTable: React.FC<EmployeeListTableProps> = ({ data }) => {
    const [selectedRow, setSelectedRow] = useState<RowData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [sessionData, setSessionData] = useState<RowData>();
    
    const navigate = useNavigate();

    const handleCloseModal = () => setIsModalOpen(false);

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

    const handleShowSessions = () => {
        if(selectedRow && selectedRow.id) {
            navigate(`/employee-sessions/${selectedRow.id}`)
        }
    };

    return (
        <>
            <div className='employee-list-table-container'>
                <div className='employee-list-top-bar'>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={!selectedRow}
                        onClick={() => handleShowSessions()}
                        sx={{ mr: 2 }}
                    >
                        Show sessions
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={!selectedRow}
                        onClick={() => handleEditClick(selectedRow!)}
                    >
                        Edit
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
            <EmployeeModal open={isModalOpen} handleClose={handleCloseModal} isEditMode={isEditMode} sessionData={sessionData} />
        </>
    );
};

export default EmployeeListTable;
