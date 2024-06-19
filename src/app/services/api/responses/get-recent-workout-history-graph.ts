import { WorkoutGaph } from '../models';

export class GetRecentWorkoutsGraphResponse {
	public workouts: WorkoutGaph[] = null;

	constructor(data: GetRecentWorkoutsGraphResponse) {
		if (data.workouts) {
			this.workouts = data.workouts;
		}
	}
}
