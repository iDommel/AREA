import { Request } from 'express';
import { decode } from 'jsonwebtoken';

export const getUserIdFromCookie = (req: Request): string => {
    const res = req.header('Cookie');

    // extract the cookie using a regex
    if (!res) {
        throw new Error('No cookie found');
    }
    const rawCookie = res.match(/token=([^;]*)/);
    if (!rawCookie || !rawCookie[1]) {
        throw new Error('No cookie found');
    }

    // decode the cookie
    const decodedCookie = decode(rawCookie[1]);
    // retrieve user id from cookie
    if (!decodedCookie || !decodedCookie.sub) {
        throw new Error('No cookie found');
    }
    if (typeof decodedCookie.sub !== 'string') {
        throw new Error('No cookie found');
    }
    return decodedCookie.sub;
};
