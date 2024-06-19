/* tslint:disable:variable-name curly */
import { AbstractModel } from './abstract-model';

export class Motivations extends AbstractModel {
	public id: number = null;
	public label: string = null;
	public description: string = null;

    public fill(data: Partial<Motivations>) {
        if (data.id) {
            this.id = data.id;
        }
		if (data.label) {
            this.label = data.label;
        }
		if (data.description) {
            this.description = data.description;
        }
    }
}
