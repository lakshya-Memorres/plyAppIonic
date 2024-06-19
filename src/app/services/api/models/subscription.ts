/* tslint:disable:variable-name curly */
import { AbstractModel } from './abstract-model';

export class Subscription extends AbstractModel {
    public subscription_id: number = null;
	public subscription_type: number = null;

    public fill(data: Partial<Subscription>) {
        if (data.subscription_id) {
            this.subscription_id = data.subscription_id;
        }
		if (data.subscription_type) {
            this.subscription_type = data.subscription_type;
        }
    }
}
