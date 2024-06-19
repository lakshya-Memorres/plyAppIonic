/* tslint:disable:variable-name curly */
import { AbstractModel } from './abstract-model';

export class ExcerciseSubCategory extends AbstractModel {
	public id: number = null;
	public name: string = null;

    public fill(data: Partial<ExcerciseSubCategory>) {
        if (data.id) {
            this.id = data.id;
        }
		if (data.name) {
            this.name = data.name;
        }
    }
}
