/* tslint:disable:variable-name curly */

export class CreateSessionResponse {
    public token: string = null;

    constructor(data: CreateSessionResponse) {
        if (data.token) {
            this.token = data.token;
        }
    }
}
