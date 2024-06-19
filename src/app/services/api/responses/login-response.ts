/* tslint:disable:variable-name curly */
import { User } from '../models';

export class LoginResponse {
    public user: User = null;
	public token: string = null;
    constructor(data: LoginResponse) {
        if (data.token) {
            this.token = data.token;
        }
		if (data.user) {
            this.user = User.createOne(data.user);
        }
    }
}
