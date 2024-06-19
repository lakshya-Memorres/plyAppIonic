import { ErrorResponse } from './error-response';

export class UnauthorizedError extends ErrorResponse {
    public message: string;
}
