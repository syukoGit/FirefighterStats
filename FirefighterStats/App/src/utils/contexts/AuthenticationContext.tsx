import { createContext, useState } from 'react';
import AuthenticationToken from '../Authentication/AuthenticationToken';

interface IAuthenticationContext {
    authenticationState?: AuthenticationToken;
    setAuthenticationState: React.Dispatch<React.SetStateAction<AuthenticationToken | undefined>>;
}

interface IAuthenticationProps {
    children: React.ReactNode;
}

export const AuthenticationContext = createContext<IAuthenticationContext>({
    authenticationState: undefined,
    setAuthenticationState: () => {},
});

export const AuthenticationProvider = ({ children }: IAuthenticationProps) => {
    const [authenticationState, setAuthenticationState] = useState<AuthenticationToken | undefined>(undefined);

    return (
        <AuthenticationContext.Provider value={{ authenticationState: authenticationState, setAuthenticationState: setAuthenticationState }}>
            {children}
        </AuthenticationContext.Provider>
    );
};
