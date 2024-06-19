/* tslint:disable:variable-name curly */
import { AbstractModel } from './abstract-model';

export class ExcerciseSet extends AbstractModel {
    public id: number = null;
	public key: string = null;
	public order: number = null;
	public value: number = null;

    public fill(data: Partial<ExcerciseSet>) {
		if (data.id) {
            this.id = data.id;
        }
		if (data.key) {
            this.key = data.key;
        }
		if (data.order) {
            this.order = data.order;
        }
		if (data.value) {
            this.value = data.value;
        }
    }
}
