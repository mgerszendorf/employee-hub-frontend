import { Modal, Box, Select, MenuItem, Button, Typography, FormControl, InputLabel } from '@mui/material';
import { useContext, useState } from 'react';
import { useActivateUserMutation } from '../../api/users/activateUser.service';
import AuthContext from '../../context/AuthContext';
import { useGetAllSupervisorsQuery } from '../../api/users/getSupervisors.service';

interface AdminActivationModalProps {
    open: boolean;
    handleClose: () => void;
    userId: string | null | undefined;
    refetchUsers: () => Promise<any>;
}

const ROLES = {
    'Supervisor': 'Supervisor',
    'User': 'User'
};

const AdminActivationModal = ({ open, handleClose, userId, refetchUsers }: AdminActivationModalProps) => {
    const { accessToken, handleRefreshToken } = useContext(AuthContext);
    const [role, setRole] = useState('');
    const [supervisorId, setSupervisorId] = useState('');

    const { mutate } = useActivateUserMutation(
        handleRefreshToken,
        accessToken!
    );

    const { data: supervisors } = useGetAllSupervisorsQuery(handleRefreshToken, accessToken!);

    const handleActivation = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (userId) {
            mutate({ userId, role, supervisorId }, {
                onSuccess: () => {
                    handleClose()
                    setRole('')
                    refetchUsers()
                },
                onError: (err) => {
                    console.error('Activation error:', err);
                }
            });
        } else {

        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="session-modal-title"
            aria-describedby="session-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                maxWidth: '90vw',
                maxHeight: '90vh',
                p: 4,
                borderRadius: 1
            }}>
                <Typography id="admin-activation-modal-title" variant="h6" component="h2">
                    {'Add a role and activate'}
                </Typography>

                <form onSubmit={handleActivation}>
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel id="role-select-label">Role</InputLabel>
                        <Select
                            labelId="role-select-label"
                            id="role-select"
                            value={role}
                            label="Role"
                            onChange={(e) => setRole(e.target.value)}
                        >
                            {Object.entries(ROLES).map(([key, value]) => (
                                <MenuItem key={key} value={value}>
                                    {value}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {role === 'User' && supervisors?.$values && (
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel id="supervisor-select-label">Supervisor</InputLabel>
                            <Select
                                labelId="supervisor-select-label"
                                id="supervisor-select"
                                value={supervisorId}
                                label="Supervisor"
                                onChange={(e) => setSupervisorId(e.target.value)}
                            >
                                {supervisors.$values && supervisors.$values.map((supervisor: any) => (
                                    <MenuItem key={supervisor.id} value={supervisor.id}>
                                        {supervisor.firstName} {supervisor.lastName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}

                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ mr: 1 }}
                            type='submit'
                        >
                            Save
                        </Button>
                        <Button variant="outlined" onClick={handleClose}>
                            Cancel
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

export default AdminActivationModal;
