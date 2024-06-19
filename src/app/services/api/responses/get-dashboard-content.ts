/* tslint:disable:variable-name curly */
import { FeaturedWorkout } from '../models';
import { WorkoutCategory } from '../models';

export class GetDashboardContentResponse {
	public featured_workouts: FeaturedWorkout[] = null;
	public categories: WorkoutCategory[] = null;

    constructor(data: GetDashboardContentResponse) {
        if (data.featured_workouts) {
			this.featured_workouts = FeaturedWorkout.createMany(data.featured_workouts);
		}
		if (data.categories) {
			this.categories = WorkoutCategory.createMany(data.categories);
		}
    }
}
