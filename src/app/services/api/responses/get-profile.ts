/* tslint:disable:variable-name curly */
import { User } from '../models';

export class GetProfileResponse {
	public user: User = null;

    constructor(data: GetProfileResponse) {
        if (data.user) {
			this.user = User.createOne(data.user);
		}
    }

}
