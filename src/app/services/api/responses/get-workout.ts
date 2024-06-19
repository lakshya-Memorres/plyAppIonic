/* tslint:disable:variable-name curly */
import { Workout } from '../models';

export class GetWorkoutResponse {
	public workout: Workout = null;

    constructor(data: GetWorkoutResponse) {
        if (data.workout) {
			this.workout = Workout.createOne(data.workout);
		}
    }

}
