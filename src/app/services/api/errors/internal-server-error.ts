import { ErrorResponse } from './error-response';

export class InternalServerError extends ErrorResponse {
    public message: string;
}
