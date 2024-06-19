/* tslint:disable:variable-name curly */
import { AbstractModel } from './abstract-model';

export class ExcerciseInformation extends AbstractModel {
    public label: string = null;
	public value: string = null;
	public order: number = null;

    public fill(data: Partial<ExcerciseInformation>) {
        if (data.label) {
            this.label = data.label;
        }
		if (data.value) {
            this.value = data.value;
        }
		if (data.order) {
            this.order = data.order;
        }
    }
}
