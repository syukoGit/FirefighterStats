import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuthentication from '../../utils/hooks/useAuthentication';

const Auth = () => {
    const { isAuthenticated } = useAuthentication();
    const location = useLocation();

    return isAuthenticated() ? <Outlet /> : <Navigate to='/login' state={{ from: location }} replace />;
};

export default Auth;
