import { HttpErrorResponse } from '@angular/common/http';

export class ErrorResponse {
    public message: string;

    constructor(error: HttpErrorResponse) {
        const body = error.error;
        for (const key in body) {
            this[key] = body[key];
        }
    }
}
