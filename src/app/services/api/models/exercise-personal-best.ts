/* tslint:disable:variable-name curly */
import { AbstractModel } from './abstract-model';
import { Excercise } from './exercise';

export class ExcercisePersonalBest extends AbstractModel {
    public exercise: Excercise = null;
	public personal_best: string = null;

    public fill(data: Partial<ExcercisePersonalBest>) {
		if (data.exercise) {
            this.exercise = Excercise.createOne(data.exercise);
        }
		if (data.personal_best) {
            this.personal_best = data.personal_best;
        }
    }
}
