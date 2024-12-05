import { Request, Response, NextFunction } from 'express';
declare const uniqueReqId: (req: Request, res: Response, next: NextFunction) => void;
export default uniqueReqId;
