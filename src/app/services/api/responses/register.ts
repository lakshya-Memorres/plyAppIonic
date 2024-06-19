import { User } from '../models';

export class RegisterResponse {
    public user: User = null;
	public token: string = null;

    constructor(data: RegisterResponse) {
		if (data.token) {
            this.token = data.token;
		}
		if (data.user) {
            this.user = User.createOne(data.user);
        }
    }
}
