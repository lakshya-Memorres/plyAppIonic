/* tslint:disable:variable-name curly */
import { WorkoutCategory } from '../models';

export class GetWorkoutCategoriesResponse {
	public workoutCategories: WorkoutCategory[] = null;

    constructor(data: GetWorkoutCategoriesResponse) {
        if (data.workoutCategories) {
			this.workoutCategories = WorkoutCategory.createMany(data.workoutCategories);
		}
    }

}
