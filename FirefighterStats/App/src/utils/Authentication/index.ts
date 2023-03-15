import axios from 'axios';
import {
    AuthenticationResponse,
    isAuthenticationResponse,
    isLoginDataError,
    isLoginError,
    isRegisterDataError,
    isRegisterError,
    LoginDataError,
    LoginError,
    RegisterDataError,
    RegisterError,
} from './AuthenticationTypes';

export async function register(
    firstName: string,
    lastName: string,
    userName: string,
    password: string,
    confirmPassword: string,
    careerStartDate?: Date | null,
    fireStation?: string,
    registrationNumber?: string
): Promise<AuthenticationResponse | RegisterDataError | RegisterError | string> {
    const InternalErrorMessage = 'An error occurred while trying to register. Please try again later.';

    return axios
        .post('https://localhost:7224/api/Account/register', {
            firstName,
            lastName,
            userName,
            password,
            confirmPassword,
            careerStartDate,
            fireStation,
            registrationNumber,
        })
        .then((response) => {
            const data = response.data;
            if (isAuthenticationResponse(data)) {
                return data;
            } else {
                return InternalErrorMessage;
            }
        })
        .catch((error) => {
            const data = error?.response?.data;
            if (isRegisterDataError(data) || isRegisterError(data)) {
                return data;
            } else {
                console.error(error);
                return InternalErrorMessage;
            }
        });
}

export async function login(username: string, password: string): Promise<AuthenticationResponse | LoginDataError | LoginError> {
    const InternalErrorMessage = 'An error occurred while trying to log in. Please try again later.';

    return axios
        .post('https://localhost:7224/api/Account/login', {
            Username: username,
            Password: password,
        })
        .then((response) => {
            const data = response.data;
            if (isAuthenticationResponse(data)) {
                return data;
            } else {
                return InternalErrorMessage;
            }
        })
        .catch((error) => {
            console.log(error);

            const data = error?.response?.data;
            if (isLoginDataError(data) || isLoginError(data)) {
                return data;
            } else {
                return InternalErrorMessage;
            }
        });
}
