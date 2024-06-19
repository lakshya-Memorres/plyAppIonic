/* tslint:disable:variable-name curly */
import { AbstractModel } from './abstract-model';
import { UserSettings } from './user-settings';
import { Subscription } from './subscription';

export class User extends AbstractModel {
    public name: string = null;
    public email: string = null;
	public settings: UserSettings = null;

    public fill(data: Partial<User>) {
        if (data.name) {
            this.name = data.name;
        }
        if (data.email) {
            this.email = data.email;
        }
		if (data.settings) {
			this.settings = UserSettings.createOne(data.settings);
		}
    }

    public equals(userDetails: User): boolean {
        if (this.name !== userDetails.name) { return false; }
        if (this.email !== userDetails.email) { return false; }
        return true;
    }
}
