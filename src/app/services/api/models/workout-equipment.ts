/* tslint:disable:variable-name curly */
import { AbstractModel } from './abstract-model';

export class WorkoutEquipment extends AbstractModel {
    public label: string = null;
	public key: string = null;

    public fill(data: Partial<WorkoutEquipment>) {
		if (data.label) {
            this.label = data.label;
        }
        if (data.key) {
            this.key = data.key;
        }
    }
}
