import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Radio, Button } from '@mui/material';

interface RowData {
    id: number;
    startSession: string;
    endSession: string;
    description: string;
}

interface RecentUserSessionsTableProps {
    data: RowData[];
}

const RecentUserSessionsTable: React.FC<RecentUserSessionsTableProps> = ({ data }) => {
    const [selectedRow, setSelectedRow] = useState<number | null>(null);

    const handleRowClick = (rowId: number) => {
        if (selectedRow === rowId) {
            setSelectedRow(null);
        } else {
            setSelectedRow(rowId);
        }
    };

    return (
        <div className='recent-user-session-table-container'>
            <div className='top-bar'>
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
                                selected={selectedRow === row.id}
                                onClick={() => handleRowClick(row.id)}
                            >
                                <TableCell padding="checkbox">
                                    <Radio
                                        checked={selectedRow === row.id}
                                        onChange={() => handleRowClick(row.id)}
                                    />
                                </TableCell>
                                <TableCell>{row.startSession}</TableCell>
                                <TableCell>{row.endSession}</TableCell>
                                <TableCell>{row.description}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default RecentUserSessionsTable;
