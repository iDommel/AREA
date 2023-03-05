import { NextFunction, Request, Response } from 'express';
import fs from 'fs';

const getApk = (req: Request, res: Response, next: NextFunction) => {
    const apkPath: string | undefined = fs.readdirSync('/usr/src/app/apk/').find((file) => file.endsWith('.apk'));
    const finalPath = `/usr/src/app/apk/${apkPath}`;
    if (!apkPath) {
        return res.status(404).json({
            message: 'No .apk file found in /usr/src/app/apk'
        });
    } else {
        return res.status(200).download(finalPath, 'area.apk');
    }
};

const test = (req: Request, res: Response, next: NextFunction) => {
    console.log('test() called');
    res.status(200).json({
        message: 'test() called'
    });
};

export default { getApk, test };
