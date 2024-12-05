import { Request, Response } from 'express';
declare const API_CACHE_HAEDER: string;
declare const onlyStatus200: (req: Request, res: Response) => boolean;
declare const onlyWithUniqueBody: (req: Request) => any;
export { onlyStatus200, onlyWithUniqueBody, API_CACHE_HAEDER };
