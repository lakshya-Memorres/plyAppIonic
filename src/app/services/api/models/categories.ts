/* tslint:disable:variable-name curly */
import { AbstractModel } from './abstract-model';
import { Workout } from './workout'

export class Categories extends AbstractModel {
	public name: string = null;
	public image_uri: string = null;
	public id: number = null;
	public workouts: Workout[] = null;

    public fill(data: Partial<Categories>) {
		if (data.id) {
            this.id = data.id;
        }
		if (data.name) {
            this.name = data.name;
        }
		if (data.image_uri) {
            this.image_uri = data.image_uri;
        }
		if (data.workouts) {
            this.workouts = Workout.createMany(data.workouts);
        }
    }
}
