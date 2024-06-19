/* tslint:disable:variable-name curly */
import { AbstractModel } from './abstract-model';
import { Excercise } from './exercise';

export class AddExerciseCategories extends AbstractModel {
	public description: string = null;
	public id: number = null;
	public name: string = null;
	public exercises: Excercise[] = null;

    public fill(data: Partial<AddExerciseCategories>) {
		if (data.description) {
			this.description = data.description
        }
		if (data.exercises) {
			this.exercises = Excercise.createMany(data.exercises);
        }
		if (data.id) {
			this.id = data.id;
        }
		if(data.name) {
			this.name = data.name;
        }
    }
}
