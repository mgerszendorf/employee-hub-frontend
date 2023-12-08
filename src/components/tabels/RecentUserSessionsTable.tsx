import React, { useContext, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Radio, Button } from '@mui/material';
import { formatDate } from '../../utils/formatDate';
import { useDeleteWorktimeSessionMutation } from '../../api/worktime/deleteWorktimeSession.service';
import AuthContext from '../../context/AuthContext';
import { ToastNotificationContext } from '../../context/ToastNotificationContext';

interface RowData {
    id: string;
    start: string;
    end: string;
    description: string;
}

interface RecentUserSessionsTableProps {
    data: RowData[];
    onRefresh: () => void;
}

const RecentUserSessionsTable: React.FC<RecentUserSessionsTableProps> = ({ data, onRefresh }) => {
    const { accessToken, handleRefreshToken } = useContext(AuthContext);
    const { showToastNotification } = useContext(ToastNotificationContext);
    const { mutate: deleteSession } = useDeleteWorktimeSessionMutation(handleRefreshToken, accessToken!);
    const [selectedRow, setSelectedRow] = useState<string | null>(null);

    const handleRowClick = (rowId: string) => {
        if (selectedRow === rowId) {
            setSelectedRow(null);
        } else {
            setSelectedRow(rowId);
        }
    };

    const handleDelete = (sessionId: string) => {
        if (sessionId) {
            deleteSession(sessionId, {
                onSuccess: () => {
                    onRefresh();
                },
                onError: () => {
                    showToastNotification('Something went wrong', 'error');
                },
            });
        }
    };

    return (
        <div className='recent-user-session-table-container'>
            <div className='top-bar'>
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
                                selected={selectedRow === row.id}
                                onClick={() => handleRowClick(row.id)}
                            >
                                <TableCell padding="checkbox">
                                    <Radio
                                        checked={selectedRow === row.id}
                                        onChange={() => handleRowClick(row.id)}
                                    />
                                </TableCell>
                                <TableCell>{row.start ? formatDate(row.start) : ''}</TableCell>
                                <TableCell>{row.end ? formatDate(row.end) : ''}</TableCell>
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
