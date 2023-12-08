import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { useUpdateUserByIdMutation } from '../../api/account/updateUserById.service';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import { ToastNotificationContext } from '../../context/ToastNotificationContext';

interface UserData {
    id: string | null;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
}

interface UserModalProps {
    open: boolean;
    handleClose: () => void;
    sessionData?: UserData;
    isEditMode: boolean;
    refetchUsers: () => Promise<any>;
}

const UserModal = ({ open, handleClose, sessionData, isEditMode, refetchUsers }: UserModalProps) => {
    const { accessToken, handleRefreshToken } = useContext(AuthContext);
    const { showToastNotification } = useContext(ToastNotificationContext);

    // State initialization
    const [formData, setFormData] = useState<UserData>({
        id: sessionData?.id || null,
        firstName: sessionData?.firstName || '',
        lastName: sessionData?.lastName || '',
        email: sessionData?.email || '',
        phoneNumber: sessionData?.phoneNumber || '',
    });

    useEffect(() => {
        if (isEditMode && sessionData) {
            setFormData(sessionData);
        }
    }, [sessionData, isEditMode]);

    const { mutate: updateUser } = useUpdateUserByIdMutation(handleRefreshToken, accessToken!);

    const handleChange = (field: keyof UserData, value: string | number | null) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleUpdate = (sessionData: UserData) => {
        const userId = sessionData.id;

        const updatedData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            phoneNumber: formData.phoneNumber,
        };

        updateUser({
            userId,
            ...updatedData,
        }, {
            onSuccess: () => {
                handleClose()
                refetchUsers()
            },
            onError: () => {
                showToastNotification('Something went wrong', 'error')
            },
        });
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
                    {isEditMode ? 'Edit User' : 'Add User'}
                </Typography>

                <TextField
                    label="First Name"
                    multiline
                    rows={1}
                    fullWidth
                    sx={{ mt: 2 }}
                    value={formData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                />
                <TextField
                    label="Last Name"
                    multiline
                    rows={1}
                    fullWidth
                    sx={{ mt: 2 }}
                    value={formData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                />
                <TextField
                    label="Email"
                    multiline
                    rows={1}
                    fullWidth
                    sx={{ mt: 2 }}
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                />
                <TextField
                    label="Phone Number"
                    multiline
                    rows={1}
                    fullWidth
                    sx={{ mt: 2 }}
                    value={formData.phoneNumber}
                    onChange={(e) => handleChange('phoneNumber', e.target.value)}
                />

                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ mr: 1 }}
                        onClick={() => handleUpdate(sessionData!)}
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

export default UserModal;
