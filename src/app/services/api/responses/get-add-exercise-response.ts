import { AddExerciseCategories } from '../models/addExerciseCategories';

export class GetAddExerciseResponse {
	public categories: AddExerciseCategories[] = null;

    constructor(data: GetAddExerciseResponse) {
		if (data.categories) {
			this.categories = data.categories
        }
    }
}
