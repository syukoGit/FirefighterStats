type JwtToken = {
    header: {
        alg: string;
        typ: string;
    };
    payload: {
        sub: string;
        jti: string;
        exp: number;
        iss: string;
        aud: string;
    };
    signature: string;
};

type AuthenticationToken = {
    token: string;
    expires: Date;
    username: string;
};

export function parseJwt(token: string): JwtToken {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const payload = JSON.parse(window.atob(base64));

    return {
        header: {
            alg: payload.alg,
            typ: payload.typ,
        },
        payload: {
            sub: payload.sub,
            jti: payload.jti,
            exp: payload.exp,
            iss: payload.iss,
            aud: payload.aud,
        },
        signature: token.split('.')[2],
    };
}

export default AuthenticationToken;
