import './style.scss';
import { useState } from 'react';
import TextInput from '../../../components/inputs/TextInput';
import Accordion from '../../../components/Accordion';
import DateTimeInput from '../../../components/inputs/DateTimeInput';
import SelectInput from '../../../components/inputs/SelectInput';
import EFirefighterRank, { getDisplayName } from '../../../types/EFirefighterRank';
import { Link, useNavigate } from 'react-router-dom';
import useNotifications from '../../../utils/hooks/useNotifications';
import { NotificationError, NotificationSuccess } from '../../../utils/Notification';
import useAuthentication from '../../../utils/hooks/useAuthentication';
import { isAuthenticationResponse, isRegisterDataError } from '../../../utils/Authentication/AuthenticationTypes';
import { register } from '../../../utils/Authentication';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [careerStartDate, setCareerStartDate] = useState<Date | null>();
    const [fireStation, setFireStation] = useState<string | undefined>();
    const [rank, setRank] = useState<EFirefighterRank | undefined>();
    const [registrationNumber, setRegistrationNumber] = useState<string | undefined>();
    const [requestInProgress, setRequestInProgress] = useState(false);

    const [firstNameErrors, setFirstNameErrors] = useState<string[] | undefined>();
    const [lastNameErrors, setLastNameErrors] = useState<string[] | undefined>();
    const [usernameErrors, setUsernameErrors] = useState<string[] | undefined>();
    const [passwordErrors, setPasswordErrors] = useState<string[] | undefined>();
    const [confirmPasswordErrors, setConfirmPasswordErrors] = useState<string[] | undefined>();
    const [careerStartDateErrors, setCareerStartDateErrors] = useState<string[] | undefined>();
    const [fireStationErrors, setFireStationErrors] = useState<string[] | undefined>();
    const [rankErrors, setRankErrors] = useState<string[] | undefined>();
    const [registrationNumberErrors, setRegistrationNumberErrors] = useState<string[] | undefined>();

    const { addNotification } = useNotifications();
    const { setAuthToken } = useAuthentication();
    const navigate = useNavigate();

    const registerBtnDisabledClass = requestInProgress ? 'default-button--disabled' : '';

    const onRegisterButton = async () => {
        setRequestInProgress(true);

        const result = await register(firstName, lastName, username, password, confirmPassword, careerStartDate, fireStation, registrationNumber);
        if (isAuthenticationResponse(result)) {
            setAuthToken(result.token);
            addNotification(NotificationSuccess('Your account has been successfully created'));
            navigate('/');
        } else if (typeof result === 'string') {
            addNotification(NotificationError(result));
        } else if (isRegisterDataError(result)) {
            setFirstNameErrors(result.errors.FirstName);
            setLastNameErrors(result.errors.LastName);
            setUsernameErrors(result.errors.UserName);
            setPasswordErrors(result.errors.Password);
            setConfirmPasswordErrors(result.errors.ConfirmPassword);
            setCareerStartDateErrors(result.errors.CareerStartDate);
            setFireStationErrors(result.errors.FireStation);
            setRankErrors(result.errors.Rank);
            setRegistrationNumberErrors(result.errors.RegistrationNumber);
        } else {
            for (const error of result) {
                addNotification(NotificationError(error.description));
            }
        }

        setRequestInProgress(false);
    };

    return (
        <div className='page-content'>
            <div className='register'>
                <h1>Register</h1>

                <form className='register__form'>
                    <TextInput
                        id='register-form-first-name'
                        value={firstName}
                        label='First Name'
                        type='text'
                        required
                        errorMessages={firstNameErrors}
                        onChange={(e) => {
                            setFirstNameErrors(undefined);
                            setFirstName(e.target.value);
                        }}
                    />
                    <TextInput
                        id='register-form-last-name'
                        value={lastName}
                        label='Last Name'
                        type='text'
                        required
                        errorMessages={lastNameErrors}
                        onChange={(e) => {
                            setLastNameErrors(undefined);
                            setLastName(e.target.value);
                        }}
                    />
                    <TextInput
                        id='register-form-username'
                        value={username}
                        label='Username'
                        type='text'
                        required
                        errorMessages={usernameErrors}
                        onChange={(e) => {
                            setUsernameErrors(undefined);
                            setUsername(e.target.value);
                        }}
                    />
                    <TextInput
                        id='register-form-password'
                        value={password}
                        label='Password'
                        type='password'
                        required
                        errorMessages={passwordErrors}
                        onChange={(e) => {
                            setPasswordErrors(undefined);
                            setPassword(e.target.value);
                        }}
                    />
                    <TextInput
                        id='register-form-confirm-password'
                        value={confirmPassword}
                        label='Confirm Password'
                        type='password'
                        required
                        errorMessages={confirmPasswordErrors}
                        onChange={(e) => {
                            setConfirmPasswordErrors(undefined);
                            setConfirmPassword(e.target.value);
                        }}
                    />
                    <Accordion title='Optional informations' className='register__form__optional-infos'>
                        <div className='register__form__optional-infos__content'>
                            <DateTimeInput
                                id='register-form-career-start-date'
                                value={careerStartDate}
                                label='Career start date'
                                errorMessages={careerStartDateErrors}
                                onChange={(e) => {
                                    setCareerStartDateErrors(undefined);
                                    setCareerStartDate(new Date(e.target.value));
                                }}
                                type='date'
                            />
                            <TextInput
                                id='register-form-fire-station'
                                value={fireStation}
                                label='Fire station'
                                type='text'
                                errorMessages={fireStationErrors}
                                onChange={(e) => {
                                    setFireStationErrors(undefined);
                                    setFireStation(e.target.value);
                                }}
                            />
                            <SelectInput
                                id='register-form-rank'
                                value={rank}
                                label='Rank'
                                options={Object.keys(EFirefighterRank).map((rank) => ({
                                    value: rank,
                                    displayName: getDisplayName(rank as keyof typeof EFirefighterRank),
                                }))}
                                errorMessages={rankErrors}
                                nullable
                                onChange={(e) => {
                                    setRankErrors(undefined);
                                    setRank(e.target.value as EFirefighterRank);
                                }}
                            />
                            <TextInput
                                id='register-form-registration-number'
                                value={registrationNumber}
                                label='Registration number'
                                type='text'
                                errorMessages={registrationNumberErrors}
                                onChange={(e) => {
                                    setRegistrationNumberErrors(undefined);
                                    setRegistrationNumber(e.target.value);
                                }}
                            />
                        </div>
                    </Accordion>

                    <div className='register__form__buttons'>
                        <button className={`default-button ${registerBtnDisabledClass}`} type='button' onClick={onRegisterButton}>
                            Register
                        </button>
                        <div className='register__form__buttons__separator vertical-separator' />
                        <div className='register__form__buttons__login-link'>
                            <p>Already have an account ?</p>
                            <Link to='/login'>Sign in</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
