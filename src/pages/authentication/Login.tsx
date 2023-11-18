import { TextField, Button, Paper, Box, Typography } from '@mui/material';

const Login = () => {
    return (
        <Box display="flex" alignItems="center" justifyContent="center" width="100%">
            <Paper elevation={3} className='login-form-container'>
                <Typography variant="h4" component="h2" gutterBottom>
                    Login
                </Typography>
                <form>
                    <Box marginBottom={2}>
                        <TextField fullWidth label="Username" variant="outlined" />
                    </Box>
                    <Box marginBottom={2}>
                        <TextField fullWidth label="Password" type="password" variant="outlined" />
                    </Box>
                    <Button variant="contained" color="primary" fullWidth>
                        Log In
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default Login;
