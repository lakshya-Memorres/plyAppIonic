export class UpdateProfileResponse {
    public message: string = null;

    constructor(data: UpdateProfileResponse) {
        if (data.message) {
            this.message = data.message;
        }
    }
}

