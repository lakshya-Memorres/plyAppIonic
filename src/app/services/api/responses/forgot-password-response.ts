export class ForgotPasswordResponse {
    public message: string = null;

    constructor(data: ForgotPasswordResponse) {
        if (data.message) {
            this.message = data.message;
        }
    }
}

