import axios from 'axios';
import { useState } from 'react';
import useAuthentication from './useAuthentication';

interface IRequestProps {
    apiUrl: string;
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
}

export const useGet = ({ apiUrl, onSuccess, onError }: IRequestProps) => {
    const [isDataLoading, setIsDataLoading] = useState(true);
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

async function request(
    method: 'GET' | 'POST',
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
            onError && onError(error);
        });
}
