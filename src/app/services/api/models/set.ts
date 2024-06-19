/* tslint:disable:variable-name curly */
import { AbstractModel } from './abstract-model';

export class Set extends AbstractModel {
    public order: number = null;
	public reps: number = null;
	public weight: number = null;

    public fill(data: Partial<Set>) {
        if (data.order) {
            this.order = data.order;
        }
		if (data.reps) {
            this.reps = data.reps;
        }
		if (data.weight) {
            this.weight = data.weight;
        }
    }
}
