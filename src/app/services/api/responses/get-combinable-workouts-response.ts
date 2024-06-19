/* tslint:disable:variable-name curly */
import { Workout } from '../models';

export class GetCombinableWorkoutResponse {
	public workouts: Workout[] = null;

    constructor(data: GetCombinableWorkoutResponse) {
		if (data.workouts) {
			this.workouts = Workout.createMany(data.workouts);
		}
    }
}
