/* tslint:disable:variable-name curly */
import { AbstractModel } from './abstract-model';
import { Excercise } from './exercise';
import { ExcerciseInformation } from './exercise-information';
import { WorkoutCategory } from './workout-category';
import { WorkoutEquipment } from './workout-equipment';

export class Workout extends AbstractModel {
	public id: number = null;
	public classification: string = null;
	public duration_in_mins: number = 0;
	public rounds: number = 0;
	public exercises: Excercise[] = null;
	public images: [] = null;
	public information: ExcerciseInformation[] = null;
	public intensity: number = null;
	public is_favourite: boolean = false;
	public is_premium: number = 0;
	public name: string = null;
	public type: string = null;
	public top_level_category: [] = null;
	public workout_category: [] = null;
	public workout_equipment: WorkoutEquipment[] = null;

	public fill(data: Partial<Workout>) {
		if (data.id) {
			this.id = data.id;
		}
		if (data.classification) {
			this.classification = data.classification;
		}
		if (data.duration_in_mins) {
			this.duration_in_mins = data.duration_in_mins;
		}
		if (data.rounds) {
			this.rounds = data.rounds;
		}
		if (data.exercises) {
			this.exercises = Excercise.createMany(data.exercises);
		}
		if (data.images) {
			this.images = data.images;
		}
		if (data.information) {
			this.information = ExcerciseInformation.createMany(
				data.information
			);
		}
		if (data.intensity) {
			this.intensity = data.intensity;
		}
		if (data.is_favourite) {
			this.is_favourite = data.is_favourite;
		}
		if (data.is_premium) {
			this.is_premium = data.is_premium;
		}
		if (data.name) {
			this.name = data.name;
		}
		if (data.type) {
			this.type = data.type;
		}
		if (data.top_level_category) {
			this.top_level_category = data.top_level_category;
		}
		if (data.workout_category) {
			this.workout_category = data.workout_category;
		}
		if (data.workout_equipment) {
			this.workout_equipment = WorkoutEquipment.createMany(
				data.workout_equipment
			);
		}
	}
}
