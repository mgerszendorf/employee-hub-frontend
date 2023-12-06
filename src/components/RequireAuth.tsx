import React, { useContext } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

interface RequireAuthProps {
    allowedRoles: string[];
}

const RequireAuth = ({ allowedRoles }: RequireAuthProps) => {
    const { user } = useContext(AuthContext);
    const location = useLocation();

    const hasRole = user?.roles?.$values?.some(role => allowedRoles.includes(role)) ?? false;

    return (
        hasRole
            ? <Outlet />
            : user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;
