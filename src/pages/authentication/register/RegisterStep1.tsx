import { ChangeEvent, useContext, useState } from 'react';
import { TextField, Button, Paper, Box, Typography, Link } from '@mui/material';
import { emailRegex, passwordRegex } from '../../../utils/validationPatterns';
import { Link as RouterLink } from 'react-router-dom';
import AuthContext from '../../../context/AuthContext';

const RegisterStep1 = () => {
    const { handleRegister } =
        useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordIsValid, setPasswordIsValid] = useState(true);

    const isEmailValid = emailRegex.test(email);
    const passwordsMatch = password === confirmPassword;

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setPasswordIsValid(passwordRegex.test(newPassword));
    };

    const isButtonDisabled = !email || !isEmailValid || !password || !passwordsMatch || !passwordIsValid;

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isButtonDisabled) return;
        handleRegister(e)
    };

    return (
        <Box display="flex" alignItems="center" justifyContent="center" width="100%">
            <Paper elevation={3} className='register-form-container'>
                <Typography variant="h4" component="h2" gutterBottom>
                    Register
                </Typography>
                <form
                    className="register-form"
                    role="register-form"
                    onSubmit={onSubmit}>
                    <Box marginBottom={2}>
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            name='email_register'
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
                            onChange={handlePasswordChange}
                            error={!passwordIsValid && password.length > 0}
                        />
                        {!passwordIsValid && password.length > 0 && (
                            <Typography color="error">Password must contain at least 8 characters, including a number, an uppercase and a lowercase letter.</Typography>
                        )}
                    </Box>
                    <Box marginBottom={2}>
                        <TextField
                            fullWidth
                            label="Confirm Password"
                            type="password"
                            name='password_register'
                            variant="outlined"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            error={!passwordsMatch && confirmPassword.length > 0}
                        />
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        type='submit'
                        fullWidth
                        disabled={isButtonDisabled}
                    >
                        Next step
                    </Button>
                </form>
                <Typography variant="body1" marginTop={2}>
                    Already have an account?{' '}
                    <Link component={RouterLink} to="/login" color="secondary">
                        Log in
                    </Link>
                </Typography>
            </Paper>
        </Box>
    );
};

export default RegisterStep1;
