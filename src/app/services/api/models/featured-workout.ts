/* tslint:disable:variable-name curly */
import { AbstractModel } from './abstract-model';
import { Excercise } from './exercise';
import { ExcerciseInformation } from './exercise-information';
import { WorkoutCategory } from './workout-category';
import { WorkoutEquipment } from './workout-equipment';

export class FeaturedWorkout extends AbstractModel {
	public description: string = null;
	public duration: number = null;
	public id: number = null;
	public image_uri: string = null;
	public name: string = null;
	public status: number = null;
	public target: string = null;
	public type: string = null;

    public fill(data: Partial<FeaturedWorkout>) {
		if (data.description) {
            this.description = data.description;
        }
		if (data.duration) {
            this.duration = data.duration;
        }
		if (data.id) {
			this.id = data.id;
        }
		if (data.image_uri) {
            this.image_uri = data.image_uri;
        }
		if (data.name) {
			this.name = data.name;
        }
		if (data.status){
			this.status = data.status;
		}
		if (data.target) {
            this.target = data.target;
        }
		if (data.name) {
            this.name = data.name;
        }
		if (data.type) {
            this.type = data.type;
        }
    }
}
