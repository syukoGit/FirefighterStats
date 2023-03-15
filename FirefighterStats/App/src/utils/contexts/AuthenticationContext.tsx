import { createContext, useState } from 'react';
import AuthenticationToken from '../Authentication/AuthenticationToken';

interface IAuthenticationContext {
    token?: AuthenticationToken;
    setToken: React.Dispatch<React.SetStateAction<AuthenticationToken | undefined>>;
}

interface IAuthenticationProps {
    children: React.ReactNode;
}

export const AuthenticationContext = createContext<IAuthenticationContext>({
    token: undefined,
    setToken: () => {},
});

export const AuthenticationProvider = ({ children }: IAuthenticationProps) => {
    const [token, setToken] = useState<AuthenticationToken | undefined>(undefined);

    return <AuthenticationContext.Provider value={{ token, setToken }}>{children}</AuthenticationContext.Provider>;
};
