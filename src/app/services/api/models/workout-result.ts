/* tslint:disable:variable-name curly */
import { AbstractModel } from './abstract-model';
import { Workout } from './workout';

export class WorkoutResult extends AbstractModel {
	public personalBests: [] = null;
	public workoutDuration: string = null;
	public workoutFinished: string = null;
	public workout: Workout = null;

    public fill(data: Partial<WorkoutResult>) {
		if (data.workoutDuration) {
            this.workoutDuration = data.workoutDuration;
        }
		if (data.workoutFinished) {
            this.workoutFinished = data.workoutFinished;
        }
		if (data.workout) {
			this.workout = Workout.createOne(data.workout);
		}
    }
}
