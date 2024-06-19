/* tslint:disable:variable-name curly */
import { AbstractModel } from './abstract-model';

export class SubscriptionProduct extends AbstractModel {
	public id: string = null;
	public name: string = null;
	public default: boolean = false;

	public fill(data: Partial<SubscriptionProduct>) {
        if (data.id) {
            this.id = data.id;
        }
		if (data.name) {
            this.name = data.name;
        }
		if (data.default) {
            this.default = data.default;
        }
    }
}
