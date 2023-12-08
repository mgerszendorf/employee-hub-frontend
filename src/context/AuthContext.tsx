import { createContext, useState, ReactNode, useEffect, useContext } from "react";
import { useRefreshTokenMutation } from "../api/account/updateToken.service";
import { ErrorResponse } from "../types/account/error.types";
import { useLoginMutation } from "../api/account/login.service";
import { useRegisterMutation } from "../api/account/register.service";
import { RegisterPayload } from "../types/account/register.types";
import { AuthContextHandler } from "../types/contexts/auth-context.types";
import { ToastNotificationContext } from "./ToastNotificationContext";
import { LoginPayload } from "../types/account/login.types";
import { useNavigate } from 'react-router-dom';
import { useUpdateUserMutation } from "../api/account/updateUser.service";
import { UpdateUserPayload } from "../types/account/update-user.types";
import { User } from "../types/account/user.types";

const roleToDefaultRoute = {
    'Admin': '/admin',
    'Supervisor': '/super-visor',
    'User': '/user'
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextHandler>(
    {} as AuthContextHandler,
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const { showToastNotification } = useContext(ToastNotificationContext);
    const [accessToken, setAccessToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');
    const [user, setUser] = useState<User | undefined>(undefined);

    const navigate = useNavigate();

    useEffect(() => {
        const access_token = localStorage.getItem('access_token') ?? '';
        const refresh_token = localStorage.getItem('refresh_token') ?? '';

        setAccessToken(access_token);
        setRefreshToken(refresh_token);
    }, [
        localStorage.getItem('access_token'),
        localStorage.getItem('refresh_token'),
        localStorage.getItem('user'),
    ]);

    useEffect(() => {
        const defaultRoute = roleToDefaultRoute[user?.roles.$values[0] as keyof typeof roleToDefaultRoute];
        navigate(defaultRoute)
        if (user?.roles.$values.length as number === 0 && user?.firstName) {
            showToastNotification('Your account does not have a role yet. Report to the administrator.', 'error')
        }
    }, [user])

    //Update Token
    const { mutate: refreshTokenMutate } = useRefreshTokenMutation({
        onSuccess: (data) => {
            const accessToken = data.accessToken;
            const refreshToken = data.refreshToken;

            if (accessToken && refreshToken) {
                localStorage.setItem('access_token', accessToken);
                localStorage.setItem('refresh_token', refreshToken);
            }
        },
        onError: (error: ErrorResponse) => {
            showToastNotification(
                error.response?.data.errors[0] ?? error.message,
                'error',
            );
        },
    });

    const handleRefreshToken = async () => {
        await refreshTokenMutate({
            refreshToken: refreshToken,
        });
    };

    //Login
    const { mutate: loginMutate } = useLoginMutation(handleRefreshToken, setUser, {
        onSuccess: (data) => {
            const accessToken = data.accessToken;
            const refreshToken = data.refreshToken;

            if (accessToken && refreshToken) {
                localStorage.setItem('access_token', accessToken);
                localStorage.setItem('refresh_token', refreshToken);
                showToastNotification(`You've been logged in`, 'success');
            }
        },
        onError: (error: ErrorResponse) => {
            showToastNotification(
                error.response?.data.errors[0] ?? error.message,
                'error',
            );
        },
    });

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const loginData: LoginPayload = {
            email: formData.get('email_signin')?.toString() ?? '',
            password: formData.get('password_signin')?.toString() ?? '',

        };

        await loginMutate(loginData);
    };

    //Register
    const { mutate: registerMutate } = useRegisterMutation(handleRefreshToken, {
        onSuccess: () => {
            showToastNotification('account has been created!', 'success');
            navigate('register-second-step');
        },
        onError: (error: ErrorResponse) => {
            showToastNotification(
                error.response?.data.errors[0] ?? error.message,
                'error',
            );
        },
    });

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const registerData: RegisterPayload = {
            email: formData.get('email_register')?.toString() ?? '',
            password: formData.get('password_register')?.toString() ?? '',
        };

        await registerMutate(registerData, {
            onSuccess: async () => {
                showToastNotification('Account has been created!', 'success');
                await loginMutate(registerData);
            },
            onError: (error: ErrorResponse) => {
                showToastNotification(
                    error.response?.data.errors[0] ?? error.message,
                    'error',
                );
            },
        });
    };

    // Update User
    const { mutate: updateUserMutate } = useUpdateUserMutation(
        handleRefreshToken,
        accessToken,
        {
            onSuccess: () => {
                showToastNotification('User updated successfully', 'success');
                navigate('/login')
            },
            onError: (error: ErrorResponse) => {
                showToastNotification(
                    error.response?.data.errors[0] ?? error.message,
                    'error',
                );
            },
        });

    const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const updateUserData: UpdateUserPayload = {
            firstName: formData.get('first_name_register_second_step')?.toString() ?? '',
            lastName: formData.get('last_name_register_second_step')?.toString() ?? '',
            phoneNumber: formData.get('phone_number_register_second_step')?.toString() ?? '',
        };

        await updateUserMutate(updateUserData);
    };

    const contextData = {
        handleLogin,
        handleRegister,
        handleRefreshToken,
        handleUpdateUser,
        refreshToken,
        accessToken,
        user,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
