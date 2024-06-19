/* tslint:disable:variable-name curly */
import { AbstractModel } from './abstract-model';

export class ExcerciseCategory extends AbstractModel {
    public id: string = null;
	public name: string = null;

    public fill(data: Partial<ExcerciseCategory>) {
		if (data.id) {
            this.id = data.id;
        }
		if (data.name) {
            this.name = data.name;
        }
    }
}
