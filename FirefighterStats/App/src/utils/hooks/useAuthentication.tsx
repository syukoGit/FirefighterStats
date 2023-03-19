import { useContext } from 'react';
import AuthenticationToken, { parseJwt } from '../Authentication/AuthenticationToken';
import { AuthenticationContext } from '../contexts/AuthenticationContext';
import { NotificationSuccess } from '../Notification';
import useNotifications from './useNotifications';

const useAuthentication = () => {
    const { authenticationState, setAuthenticationState } = useContext(AuthenticationContext);

    const { addNotification } = useNotifications();

    const setAuthToken = (jwtToken: string) => {
        const token = parseJwt(jwtToken);

        const authToken: AuthenticationToken = {
            token: jwtToken,
            username: token.payload.sub,
            expires: new Date(token.payload.exp * 1000),
        };

        const timeoutMs = authToken.expires.getTime() - new Date().getTime();

        setTimeout(() => {
            logout();
        }, timeoutMs);

        setAuthenticationState(authToken);
    };

    const isAuthenticated = () => authenticationState !== undefined;

    const logout = () => {
        setAuthenticationState(undefined);
        addNotification(NotificationSuccess('You have been logged out.'));
    };

    return { authenticationState, setAuthToken, isAuthenticated, logout };
};

export default useAuthentication;
