import { AxiosRequestHeaders } from 'axios';

const dateTransformer: any = (data: any, headers: AxiosRequestHeaders) => {
    if (data instanceof Date) {
        var userTimezoneOffset = data.getTimezoneOffset() * 60000;
        return new Date(data.getTime() - userTimezoneOffset).toISOString();
    }

    if (Array.isArray(data)) {
        return data.map((val) => dateTransformer(val, headers));
    }

    if (typeof data === 'object' && data !== null) {
        return Object.fromEntries(Object.entries(data).map(([key, val]) => [key, dateTransformer(val, headers)]));
    }

    return data;
};

export default dateTransformer;
