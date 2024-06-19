/* tslint:disable:variable-name curly */
import { AbstractModel } from './abstract-model';

export class ExcerciseType extends AbstractModel {
    public name: string = null;

    public fill(data: Partial<ExcerciseType>) {
        if (data.name) {
            this.name = data.name;
        }
    }
}
