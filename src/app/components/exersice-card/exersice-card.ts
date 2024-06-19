import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ExcerciseSet } from '../../services/api/models/exercise-set';
import { CommonActionsService } from '../../services/common-actions.service';
import { Excercise } from '../../services/api/models/exercise';

@Component({
	selector: 'app-exersice-card',
	templateUrl: 'exersice-card.html',
	styleUrls: ['exersice-card.scss'],
})
export class ExerciseCardComponent {
	@Input() exercise: Excercise;
	@Input() workoutID;

	@Output() addExercise = new EventEmitter();
	@Output() presentSetOptions = new EventEmitter();

	constructor(
		private navCtrl: NavController,
		private commonActions: CommonActionsService
	) {}

	public goToVideo() {
		this.navCtrl.navigateForward('/video/' + this.exercise.id, {
			state: {
				exercise: this.exercise,
				currentPageRoute: '/add-exercise/' + this.workoutID,
			},
		});
	}

	public addSelectedExercise() {
		this.presentSetOptions.emit(this.exercise);
	}
}
