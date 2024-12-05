import { Request, Response, NextFunction } from 'express';
declare const errorHandling: (error: Error, req: Request, res: Response, next: NextFunction) => void;
export default errorHandling;
