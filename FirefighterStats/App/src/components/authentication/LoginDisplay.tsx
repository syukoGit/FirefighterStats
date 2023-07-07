import './LoginDisplay.scss';
import { PersonFill } from 'react-bootstrap-icons';
import useAuthentication from '../../utils/hooks/useAuthentication';
import { useNavigate } from 'react-router-dom';

const LoginDisplay = () => {
    const { authenticationState, logout } = useAuthentication();
    const navigate = useNavigate();

    return (
        <div className='login-display'>
            <PersonFill className='login-display__user-icon' />
            {authenticationState !== undefined ? (
                <div className='login-display__menu'>
                    <p className='login-display__menu__authentication-state'>Signed in as {authenticationState.username}</p>
                    <div className='horizontal-separator login-display__menu__separator'></div>
                    <button onClick={() => navigate('/profile')} type='button'>
                        Your profile
                    </button>
                    <div className='horizontal-separator login-display__menu__separator'></div>
                    <button onClick={logout} type='button'>
                        Logout
                    </button>
                </div>
            ) : (
                <div className='login-display__menu'>
                    <p className='login-display__menu__authentication-state'>Not connected</p>
                    <div className='horizontal-separator login-display__menu__separator'></div>
                    <button onClick={() => navigate('/login')} type='button'>
                        Login
                    </button>
                    <button onClick={() => navigate('/register')} type='button'>
                        Register
                    </button>
                </div>
            )}
        </div>
    );
};

export default LoginDisplay;
