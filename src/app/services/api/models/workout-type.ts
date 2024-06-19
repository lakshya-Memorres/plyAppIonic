/* tslint:disable:variable-name curly */
import { AbstractModel } from './abstract-model';

export class WorkoutType extends AbstractModel {
    public name: string = null;

    public fill(data: Partial<WorkoutType>) {
        if (data.name) {
            this.name = data.name;
        }
    }
}
