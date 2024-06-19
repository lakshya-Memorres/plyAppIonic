/* tslint:disable:variable-name curly */
import { AbstractModel } from './abstract-model';

export class WorkoutGaph extends AbstractModel {
	public id: number = null;
	public name: string = null;
	public category: object = null;
	public duration_in_secs: number = null;
	public started_at: string = null;

	public fill(data: Partial<WorkoutGaph>) {
		if (data.id) {
			this.id = data.id;
		}
		if (data.name) {
			this.name = data.name;
		}
		if (data.category) {
			this.category = data.category;
		}
		if (data.duration_in_secs) {
			this.duration_in_secs = data.duration_in_secs;
		}
		if (data.started_at) {
			this.started_at = data.started_at;
		}
	}
}
