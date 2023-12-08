import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import { useUpdateWorktimeSessionMutation } from '../../api/worktime/updateWorktimeSession.service';
import { useAddWorktimeSessionMutation } from '../../api/worktime/addWorktimeSession.service';
import { useParams } from 'react-router-dom';

interface EmployeeSessionData {
    id: string | null;
    start: string;
    end: string;
    description: string;
}

interface EmployeeSessionModalProps {
    open: boolean;
    handleClose: () => void;
    sessionData?: EmployeeSessionData;
    isEditMode: boolean;
    refetchGetUserSessionByIdData: () => Promise<any>;
}

const EmployeeSessionModal = ({ open, handleClose, sessionData, isEditMode, refetchGetUserSessionByIdData }: EmployeeSessionModalProps) => {
    const { accessToken, handleRefreshToken, user } = useContext(AuthContext);
    const { id } = useParams();

    // State initialization
    const [formData, setFormData] = useState<any>({
        start: sessionData?.start || '',
        end: sessionData?.end || '',
        description: sessionData?.description || ''
    });

    useEffect(() => {
        if (isEditMode && sessionData) {
            setFormData(sessionData);
        }
    }, [sessionData, isEditMode]);

    const { mutate: addWorktimeSession } = useAddWorktimeSessionMutation(handleRefreshToken, accessToken!);
    const { mutate: updateWorktimeSession } = useUpdateWorktimeSessionMutation(handleRefreshToken, accessToken!);

    const handleChange = (field: keyof EmployeeSessionData, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSave = () => {
        const sessionId = formData.id

        const sessionPayload = {
            ...formData,
            employeeId: user?.employeeAccount.id
        };

        if (isEditMode && formData.id) {
            updateWorktimeSession({
                sessionId,
                ...sessionPayload
            }, {
                onSuccess: () => {
                    handleClose()
                    refetchGetUserSessionByIdData()
                },
                onError: (error) => console.error('Update error:', error)
            });
        } else {
            addWorktimeSession({
                userId: id,
                ...sessionPayload
            }, {
                onSuccess: () => {
                    handleClose()
                    refetchGetUserSessionByIdData()
                },
                onError: (error: any) => console.error('Add error:', error)
            });
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
                <Typography id="session-modal-title" variant="h6" component="h2">
                    {isEditMode ? 'Edit Session' : 'Add Session'}
                </Typography>

                <TextField
                    label="Start session"
                    type="datetime-local"
                    fullWidth
                    sx={{ mt: 2 }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={formData.start}
                    onChange={(e) => handleChange('start', e.target.value)}
                />
                <TextField
                    label="End session"
                    type="datetime-local"
                    fullWidth
                    sx={{ mt: 2 }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={formData.end}
                    onChange={(e) => handleChange('end', e.target.value)}
                />
                <TextField
                    label="Description"
                    multiline
                    rows={4}
                    fullWidth
                    sx={{ mt: 2 }}
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                />

                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ mr: 1 }}
                        onClick={handleSave}
                    >
                        {isEditMode ? 'Update' : 'Add'}
                    </Button>

                    <Button variant="outlined" onClick={handleClose}>
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default EmployeeSessionModal;
