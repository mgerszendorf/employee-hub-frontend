import { ChangeEvent, useContext, useState } from 'react';
import { TextField, Button, Paper, Box, Typography } from '@mui/material';
import AuthContext from '../../../context/AuthContext';

const RegisterStep2 = () => {
    const { handleUpdateUser } =
        useContext(AuthContext);

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const isButtonDisabled = !name && !surname && !phoneNumber;

    const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newPhoneNumber = e.target.value;

        if (/^\d*$/.test(newPhoneNumber)) {
            setPhoneNumber(newPhoneNumber);
        }
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isButtonDisabled) return;
        handleUpdateUser(e)
    };

    return (
        <Box display="flex" alignItems="center" justifyContent="center" width="100%">
            <Paper elevation={3} className='register-form-container'>
                <Typography variant="h4" component="h2" gutterBottom>
                    Register
                </Typography>
                <form
                    className="register-second-step-form"
                    role="register-second-step-form"
                    onSubmit={onSubmit}>
                    <Box marginBottom={2}>
                        <TextField
                            fullWidth
                            label="First name"
                            name='first_name_register_second_step'
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Box>
                    <Box marginBottom={2}>
                        <TextField
                            fullWidth
                            label="Last name"
                            name='last_name_register_second_step'
                            variant="outlined"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                        />
                    </Box>
                    <Box marginBottom={2}>
                        <TextField
                            fullWidth
                            label="Phone number"
                            name='phone_number_register_second_step'
                            inputMode='numeric'
                            variant="outlined"
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                        />
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        type='submit'
                        fullWidth
                        disabled={isButtonDisabled}
                    >
                        Register
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default RegisterStep2;
