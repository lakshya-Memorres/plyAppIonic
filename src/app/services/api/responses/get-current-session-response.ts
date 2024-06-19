/* tslint:disable:variable-name curly */
import { User } from '../models';

export class GetCurrentSessionResponse {
    public user: User = null;

    constructor(data: GetCurrentSessionResponse) {
        if (data.user) {
            this.user = User.createOne(data.user);
        }
    }
}
