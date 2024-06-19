/* tslint:disable:variable-name curly */
import { Workout } from '../models';

export class GetSimilarWorkoutResponse {
	public workouts: Workout[] = null;
    constructor(data: GetSimilarWorkoutResponse) {
		if (data.workouts) {
			this.workouts = Workout.createMany(data.workouts);
		}
    }
}
