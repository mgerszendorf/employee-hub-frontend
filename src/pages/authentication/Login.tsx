import { useContext, useState } from 'react';
import { TextField, Button, Paper, Box, Typography, Link } from '@mui/material';
import { emailRegex } from '../../utils/validationPatterns';
import AuthContext from '../../context/AuthContext';
import { Link as RouterLink } from 'react-router-dom';

const Login = () => {
    const { handleLogin } =
        useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const isEmailValid = emailRegex.test(email);
    const isButtonDisabled = !email || !password || !isEmailValid;

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isButtonDisabled) return;
        handleLogin(e);
    };

    return (
        <Box display="flex" alignItems="center" justifyContent="center" width="100%">
            <Paper elevation={3} className='login-form-container'>
                <Typography variant="h4" component="h2" gutterBottom>
                    Login
                </Typography>
                <form
                    className="sign-in-form"
                    role="sign-in-form"
                    onSubmit={onSubmit}
                >
                    <Box marginBottom={2}>
                        <TextField
                            fullWidth
                            label="Email"
                            type='email'
                            name="email_signin"
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
                            name="password_signin"
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
                        type='submit'
                    >
                        Log In
                    </Button>
                </form>
                <Typography variant="body1" marginTop={2}>
                    You dont have an account yet?{' '}
                    <Link component={RouterLink} to="/register" color="secondary">
                        Register
                    </Link>
                </Typography>
            </Paper>
        </Box>
    );
};

export default Login;
