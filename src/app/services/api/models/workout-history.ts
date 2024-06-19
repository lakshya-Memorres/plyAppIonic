/* tslint:disable:variable-name curly */
import { AbstractModel } from './abstract-model';
import { Workout } from './workout';

export class WorkoutHistory extends AbstractModel {
	public date: string = null;
	public workouts: Workout[] = null;

    public fill(data: Partial<WorkoutHistory>) {
		if (data.date) {
            this.date = data.date;
        }
		if(data.workouts) {
			this.workouts = Workout.createMany(data.workouts);
        }
    }
}
