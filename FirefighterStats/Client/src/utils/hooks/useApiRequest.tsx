import axios from 'axios';
import { useState } from 'react';
import useAuthentication from './useAuthentication';
import AppError from '../AppError';

interface IRequestProps {
    apiUrl: string;
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
}

export const useGet = ({ apiUrl, onSuccess, onError }: IRequestProps) => {
    const [isDataLoading, setIsDataLoading] = useState(false);
    const { authenticationState } = useAuthentication();

    const token = authenticationState === undefined ? null : authenticationState.token;

    const makeRequest = async () => {
        setIsDataLoading(true);

        await request('GET', apiUrl, token, undefined, onSuccess, onError).finally(() => {
            setIsDataLoading(false);
        });
    };

    return { isDataLoading, makeRequest };
};

export const usePost = ({ apiUrl, onSuccess, onError }: IRequestProps) => {
    const [isInProgress, setIsInProgress] = useState(false);
    const { authenticationState } = useAuthentication();

    const token = authenticationState === undefined ? null : authenticationState.token;

    const makeRequest = async (data: any) => {
        setIsInProgress(true);

        await request('POST', apiUrl, token, data, onSuccess, onError).finally(() => {
            setIsInProgress(false);
        });
    };

    return { isInProgress, makeRequest };
};

export const usePut = ({ apiUrl, onSuccess, onError }: IRequestProps) => {
    const [isInProgress, setIsInProgress] = useState(false);
    const { authenticationState } = useAuthentication();

    const token = authenticationState === undefined ? null : authenticationState.token;

    const makeRequest = async (data: any) => {
        setIsInProgress(true);

        await request('PUT', apiUrl, token, data, onSuccess, onError).finally(() => {
            setIsInProgress(false);
        });
    };

    return { isInProgress, makeRequest };
};

export const useDelete = ({ apiUrl, onSuccess, onError }: IRequestProps) => {
    const [isInProgress, setIsInProgress] = useState(false);
    const { authenticationState } = useAuthentication();

    const token = authenticationState === undefined ? null : authenticationState.token;

    const makeRequest = async () => {
        setIsInProgress(true);

        await request('DELETE', apiUrl, token, undefined, onSuccess, onError).finally(() => {
            setIsInProgress(false);
        });
    };

    return { isInProgress, makeRequest };
};

async function request(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    apiUrl: string,
    token: string | null,
    data?: any,
    onSuccess?: (data: any) => void,
    onError?: (error: any) => void
) {
    return await axios(apiUrl, {
        method,
        headers: {
            Authorization: `${token ? `Bearer ${token}` : undefined}`,
        },
        data,
    })
        .then((response) => {
            onSuccess && onSuccess(response.data);
        })
        .catch((error) => {
            console.error('Api request error:');
            console.log(error);

            if (error instanceof AppError && error.details !== undefined) {
                console.log(error.details);
            }

            onError && onError(error);
        });
}
