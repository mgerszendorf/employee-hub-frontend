import { Modal, Box, TextField, Button, Typography } from '@mui/material';

interface EmployeeData {
    id: number | null;
    name: string;
    surname: string;
    department: string;
    email: string;
    phoneNumber: string;
}

interface EmployeeModalProps {
    open: boolean;
    handleClose: () => void;
    sessionData?: EmployeeData;
    isEditMode: boolean;
}

const EmployeeModal = ({ open, handleClose, sessionData, isEditMode }: EmployeeModalProps) => {

    const defaultValues: EmployeeData = isEditMode && sessionData ? sessionData : { id: null, name: '', surname: '', department: '', email: '', phoneNumber: '' };

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
                    label="Name"
                    multiline
                    rows={1}
                    fullWidth
                    sx={{ mt: 2 }}
                    defaultValue={defaultValues.name}
                />

                <TextField
                    label="Surname"
                    multiline
                    rows={1}
                    fullWidth
                    sx={{ mt: 2 }}
                    defaultValue={defaultValues.surname}
                />

                <TextField
                    label="Department"
                    multiline
                    rows={1}
                    fullWidth
                    sx={{ mt: 2 }}
                    defaultValue={defaultValues.department}
                />

                <TextField
                    label="E-mail"
                    multiline
                    rows={1}
                    fullWidth
                    sx={{ mt: 2 }}
                    defaultValue={defaultValues.email}
                />

                <TextField
                    label="Phone number"
                    multiline
                    rows={1}
                    fullWidth
                    sx={{ mt: 2 }}
                    defaultValue={defaultValues.phoneNumber}
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

export default EmployeeModal;
