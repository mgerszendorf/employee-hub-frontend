import { ChangeEvent, useState } from 'react';
import { TextField, Button, Paper, Box, Typography } from '@mui/material';
import { emailRegex, passwordRegex } from '../../../utils/validationPatterns';

const RegisterStep1 = () => {
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

    return (
        <Box display="flex" alignItems="center" justifyContent="center" width="100%">
            <Paper elevation={3} className='register-form-container'>
                <Typography variant="h4" component="h2" gutterBottom>
                    Register
                </Typography>
                <form>
                    <Box marginBottom={2}>
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
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
                            variant="outlined"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            error={!passwordsMatch && confirmPassword.length > 0}
                        />
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={isButtonDisabled}
                    >
                        Next step
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default RegisterStep1;
