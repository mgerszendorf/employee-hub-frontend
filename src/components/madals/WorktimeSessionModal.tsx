import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { WorktimeSessionContext } from '../../context/WorktimeSessionContext';

interface WorktimeSessionModalProps {
    open: boolean;
    handleClose: () => void;
    refetchGetUserSessionByIdData: () => void;
}

const WorktimeSessionModal = ({ open, handleClose, refetchGetUserSessionByIdData }: WorktimeSessionModalProps) => {
    const { handleWorktimeSession } =
        useContext(WorktimeSessionContext);

    const [description, setDescription] = useState('');

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleWorktimeSession(description);
        refetchGetUserSessionByIdData();
        handleClose();
        setDescription('');
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
                    {'Add a description to your session'}
                </Typography>

                <form onSubmit={onSubmit}>
                    <TextField
                        label="Description"
                        name="description_worktime_session"
                        multiline
                        rows={1}
                        fullWidth
                        sx={{ mt: 2 }}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

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

export default WorktimeSessionModal;
