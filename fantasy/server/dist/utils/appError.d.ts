export default class AppError extends Error {
    readonly name: string;
    readonly httpCode: number;
    readonly isOperational: boolean;
    constructor(httpCode: number, description: string, isOperational?: boolean);
}
