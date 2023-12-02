export type AuthenticationResponse = {
    token: string;
    expiration: string;
};

export const isAuthenticationResponse = (data: any): data is AuthenticationResponse => {
    return typeof data === 'object' && typeof data.token === 'string' && typeof data.expiration === 'string';
};

export type LoginDataError = {
    errors: {
        UserName?: string[];
        Password?: string[];
    };
};

export const isLoginDataError = (data: any): data is LoginDataError => {
    return typeof data === 'object' && typeof data.errors === 'object' && (data.errors.UserName || data.errors.Password);
};

export type LoginError = string;

export const isLoginError = (errors: any): errors is LoginError => {
    return typeof errors === 'string';
};

export type RegisterDataError = {
    errors: {
        FirstName?: string[];
        LastName?: string[];
        UserName?: string[];
        Password?: string[];
        ConfirmPassword?: string[];
        CareerStartDate?: string[];
        FireStation?: string[];
        Rank?: string[];
        RegistrationNumber?: string[];
    };
};

export const isRegisterDataError = (data: any): data is RegisterDataError => {
    return (
        typeof data === 'object' &&
        typeof data.errors === 'object' &&
        (data.errors.FirstName ||
            data.errors.LastName ||
            data.errors.UserName ||
            data.errors.Password ||
            data.errors.ConfirmPassword ||
            data.errors.CareerStartDate ||
            data.errors.FireStation ||
            data.errors.Rank ||
            data.errors.RegistrationNumber)
    );
};

export type RegisterError = {
    'code': string;
    'description': string;
}[];

export const isRegisterError = (errors: any): errors is RegisterError => {
    return Array.isArray(errors) && errors.every((error) => typeof error.code === 'string' && typeof error.description === 'string');
};
