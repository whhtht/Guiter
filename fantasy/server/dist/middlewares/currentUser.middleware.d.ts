import { Request, Response, NextFunction } from 'express';
declare const currentUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export default currentUser;
