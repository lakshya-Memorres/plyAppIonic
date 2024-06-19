/* tslint:disable:variable-name curly */
import { AbstractModel } from './abstract-model';

export class WorkoutCompleted extends AbstractModel {
	public workout_id: number = null;
	public rounds: number = null;
	public workoutDuration: number = null;
	public workout_started: Date = null;
	public workout_finished: Date = null;
	public exercises = [];

	public fill(data: Partial<WorkoutCompleted>) {
		if (data.workout_id) {
			this.workout_id = data.workout_id;
		}
		if (data.rounds) {
			this.rounds = data.rounds;
		}
		if (data.workout_started) {
			this.workout_started = data.workout_started;
		}
		if (data.workout_finished) {
			this.workout_finished = data.workout_finished;
		}
		if (data.workoutDuration) {
			this.workoutDuration = data.workoutDuration;
		}
		if (data.exercises) {
			this.exercises = data.exercises;
		}
	}
}
