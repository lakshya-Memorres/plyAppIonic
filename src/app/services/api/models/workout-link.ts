/* tslint:disable:variable-name curly */
import { AbstractModel } from './abstract-model';
import { Workout } from './workout';

export class WorkoutLink extends AbstractModel {
    public url: string = null;
	public workout: Workout = null;

    public fill(data: Partial<WorkoutLink>) {
        if (data.url) {
            this.url = data.url;
        }
		if (data.workout) {
            this.workout = Workout.createOne(data.workout);
        }
    }
}
