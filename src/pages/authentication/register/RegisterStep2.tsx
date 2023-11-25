import { ChangeEvent, useState } from 'react';
import { TextField, Button, Paper, Box, Typography } from '@mui/material';

const RegisterStep2 = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const isButtonDisabled = name && surname && phoneNumber;

    const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newPhoneNumber = e.target.value;
        
        if (/^\d*$/.test(newPhoneNumber)) {
            setPhoneNumber(newPhoneNumber);
        }
    };

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
                            label="Name"
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Box>
                    <Box marginBottom={2}>
                        <TextField
                            fullWidth
                            label="Surname"
                            variant="outlined"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                        />
                    </Box>
                    <Box marginBottom={2}>
                        <TextField
                            fullWidth
                            label="Phone number"
                            inputMode='numeric'
                            variant="outlined"
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                        />
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={!isButtonDisabled}
                    >
                        Register
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default RegisterStep2;
