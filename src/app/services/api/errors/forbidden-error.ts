import { ErrorResponse } from './error-response';

export class ForbiddenError extends ErrorResponse {
    public message: string;
}
