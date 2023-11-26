import { Modal, Box, TextField, Button, Typography } from '@mui/material';

interface EmployeeSessionData {
    id: number | null;
    startSession: string;
    endSession: string;
    description: string;
}

interface EmployeeSessionModalProps {
    open: boolean;
    handleClose: () => void;
    sessionData?: EmployeeSessionData;
    isEditMode: boolean;
}

const EmployeeSessionModal = ({ open, handleClose, sessionData, isEditMode }: EmployeeSessionModalProps) => {

    const defaultValues: EmployeeSessionData = isEditMode && sessionData ? sessionData : { id: null, startSession: '', endSession: '', description: '' };

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
                    defaultValue={defaultValues.startSession}
                />
                <TextField
                    label="End session"
                    type="datetime-local"
                    fullWidth
                    sx={{ mt: 2 }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    defaultValue={defaultValues.endSession}
                />
                <TextField
                    label="Description"
                    multiline
                    rows={4}
                    fullWidth
                    sx={{ mt: 2 }}
                    defaultValue={defaultValues.description}
                />

                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ mr: 1 }}
                        onClick={handleClose}
                    >
                        Save
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
