import { ErrorResponse } from './error-response';

export class NotFoundError extends ErrorResponse {
    public message: string;
}
