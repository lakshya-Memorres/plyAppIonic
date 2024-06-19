/* tslint:disable:variable-name curly */
import { AbstractModel } from './abstract-model';

export class WorkoutSet extends AbstractModel {
    public reps: number = null;
	public load: number = null;
	public distance: number = null;
	public time: number = null;
	public incline: string = null;
	public speed: string = null;
	public target: string = null;

    public fill(data: Partial<WorkoutSet>) {
        if (data.reps) {
            this.reps = data.reps;
        }
		if (data.load) {
            this.load = data.load;
        }
		if (data.distance) {
            this.distance = data.distance;
        }
		if (data.time) {
            this.time = data.time;
        }
		if (data.incline) {
            this.incline = data.incline;
        }
		if (data.speed) {
            this.speed = data.speed;
        }
		if (data.target) {
            this.target = data.target;
        }
    }
}
