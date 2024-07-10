import { Request, Response } from 'express';
declare const healthcheck: (req: Request, res: Response) => void;
export default healthcheck;
