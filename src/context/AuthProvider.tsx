import { createContext, useState, ReactNode } from "react";

interface AuthContextType {
    auth: {
        user?: string;
        roles?: string[];
    };
    setAuth: React.Dispatch<React.SetStateAction<{
        user?: string;
        roles?: string[];
    }>>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [auth, setAuth] = useState<{ user?: string; roles?: string[]; }>({});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
