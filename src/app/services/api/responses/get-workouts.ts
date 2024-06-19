/* tslint:disable:variable-name curly */
import { Workout } from '../models';

export class GetWorkoutsResponse {
	public workouts: Workout[] = null;

    constructor(data: GetWorkoutsResponse) {
		if (data.workouts) {
			this.workouts = Workout.createMany(data.workouts);
		}
    }

}
