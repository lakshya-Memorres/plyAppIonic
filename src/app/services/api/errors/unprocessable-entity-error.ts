import { ErrorResponse } from './error-response';

export class UnprocessableEntityError extends ErrorResponse {
    public message: string;
    public errors: any[];
}
