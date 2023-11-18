import { TextField, Button, Paper, Box, Typography } from '@mui/material';

const Register = () => {
    return (
        <Box display="flex" alignItems="center" justifyContent="center" width="100%">
            <Paper elevation={3} className='register-form-container'>
                <Typography variant="h4" component="h2" gutterBottom>
                    Register
                </Typography>
                <form>
                    <Box marginBottom={2}>
                        <TextField fullWidth label="Username" variant="outlined" />
                    </Box>
                    <Box marginBottom={2}>
                        <TextField fullWidth label="Email" type="email" variant="outlined" />
                    </Box>
                    <Box marginBottom={2}>
                        <TextField fullWidth label="Password" type="password" variant="outlined" />
                    </Box>
                    <Box marginBottom={2}>
                        <TextField fullWidth label="Confirm Password" type="password" variant="outlined" />
                    </Box>
                    <Button variant="contained" color="primary" fullWidth>
                        Register
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default Register;
