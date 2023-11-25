import { useState } from 'react';
import { TextField, Button, Paper, Box, Typography } from '@mui/material';
import { emailRegex } from '../../utils/validationPatterns';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const isEmailValid = emailRegex.test(email);

    const isButtonDisabled = !email || !password || !isEmailValid;

    return (
        <Box display="flex" alignItems="center" justifyContent="center" width="100%">
            <Paper elevation={3} className='login-form-container'>
                <Typography variant="h4" component="h2" gutterBottom>
                    Login
                </Typography>
                <form>
                    <Box marginBottom={2}>
                        <TextField
                            fullWidth
                            label="Email"
                            type='email'
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={!isEmailValid && email.length > 0}
                        />
                    </Box>
                    <Box marginBottom={2}>
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={isButtonDisabled}
                    >
                        Log In
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default Login;
