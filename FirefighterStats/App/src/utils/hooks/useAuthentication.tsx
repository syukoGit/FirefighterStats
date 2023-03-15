import { useContext } from 'react';
import AuthenticationToken, { parseJwt } from '../Authentication/AuthenticationToken';
import { AuthenticationContext } from '../contexts/AuthenticationContext';
import { NotificationSuccess } from '../Notification';
import useNotifications from './useNotifications';

const useAuthentication = () => {
    const { token, setToken } = useContext(AuthenticationContext);

    const { addNotification } = useNotifications();

    const setAuthToken = (jwtToken: string) => {
        const token = parseJwt(jwtToken);

        const authToken: AuthenticationToken = {
            token: jwtToken,
            username: token.payload.sub,
            expires: new Date(Date.now() + 60000),
        };

        const timeoutMs = authToken.expires.getTime() - new Date().getTime();

        setTimeout(() => {
            logout();
        }, timeoutMs);

        setToken(authToken);
    };

    const isAuthenticated = () => token !== undefined;

    const logout = () => {
        setToken(undefined);
        addNotification(NotificationSuccess('You have been logged out.'));
    };

    return { token, setAuthToken, isAuthenticated, logout };
};

export default useAuthentication;
