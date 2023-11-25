import { Box, Typography } from '@mui/material';

const VerificationPending = () => {
    return (
        <Box sx={{ padding: 3, textAlign: 'center' }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Verification Pending
            </Typography>
            <Typography variant="body1">
                Your account is currently undergoing verification. Please wait for the process to complete. You will be notified once verification is finished.
            </Typography>
        </Box>
    );
};

export default VerificationPending;
