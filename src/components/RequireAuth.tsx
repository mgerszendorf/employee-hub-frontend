import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

interface RequireAuthProps {
    allowedRoles: string[];
}

const RequireAuth = ({ allowedRoles }: RequireAuthProps) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.roles?.find((role: string) => allowedRoles.includes(role))
            ? <Outlet />
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;
