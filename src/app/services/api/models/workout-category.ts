/* tslint:disable:variable-name curly */
import { AbstractModel } from './abstract-model';
import { Workout } from './workout';

export class WorkoutCategory extends AbstractModel {
	public description: string = null;
	public name: string = null;
	public id: number = null;
	public workouts: Workout[] = null;

    public fill(data: Partial<WorkoutCategory>) {
		if (data.description) {
            this.description = data.description;
        }
		if (data.id) {
            this.id = data.id;
        }
		if (data.name) {
            this.name = data.name;
        }
		if (data.workouts) {
			this.workouts = Workout.createMany(data.workouts);
		}
    }
}
