import './Login.scss';
import TextInput from '../../components/inputs/TextInput';
import { useState } from 'react';
import useNotifications from '../../utils/hooks/useNotifications';
import { NotificationError, NotificationSuccess } from '../../utils/Notification';
import useAuthentication from '../../utils/hooks/useAuthentication';
import { login } from '../../utils/Authentication';
import { isAuthenticationResponse, isLoginError } from '../../utils/Authentication/AuthenticationTypes';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [requestInProgress, setRequestInProgress] = useState(false);
    const [usernameErrors, setUsernameErrors] = useState<string[] | undefined>();
    const [passwordErrors, setPasswordErrors] = useState<string[] | undefined>();

    const { addNotification } = useNotifications();
    const { setAuthToken } = useAuthentication();
    const navigate = useNavigate();

    const loginBtnDisabledClass = requestInProgress ? 'default-button--disabled' : '';

    const onLoginButton = async () => {
        setRequestInProgress(true);

        const result = await login(username, password);
        if (isAuthenticationResponse(result)) {
            setAuthToken(result.token);
            addNotification(NotificationSuccess('Successful login'));
            navigate('/');
        } else if (isLoginError(result)) {
            addNotification(NotificationError(result));
        } else {
            setUsernameErrors(result.errors.UserName);
            setPasswordErrors(result.errors.Password);
        }

        setRequestInProgress(false);
    };

    return (
        <div className='page-content'>
            <div className='login'>
                <h1>Login</h1>

                <form className='login__form'>
                    <TextInput
                        id='login-form-username'
                        value={username}
                        type='text'
                        label='Username'
                        required
                        errorMessages={usernameErrors}
                        onChange={(e) => {
                            setUsernameErrors(undefined);
                            setUsername(e.target.value);
                        }}
                    />
                    <TextInput
                        id='login-form-password'
                        value={password}
                        type='password'
                        label='Password'
                        required
                        errorMessages={passwordErrors}
                        onChange={(e) => {
                            setPasswordErrors(undefined);
                            setPassword(e.target.value);
                        }}
                    />
                    <div className='login__form__buttons'>
                        <button className={`default-button ${loginBtnDisabledClass}`} type='button' onClick={onLoginButton}>
                            Log in
                        </button>
                        <div className='login__form__buttons__separator vertical-separator' />
                        <div className='login__form__buttons__register-link'>
                            <p>New on FirefighterStats ?</p>
                            <a href='/register'>Create an account</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
