import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { SubscriptionModalPage } from 'src/app/modals/subscription-modal/subscription-modal.page';
import { StorageService } from 'src/app/services/storage-service';

@Component({
	selector: 'app-sliding-exercise-card',
	templateUrl: 'sliding-exercise-card.html',
	styleUrls: ['sliding-exercise-card.scss'],
})
export class SlidingExerciseCardComponent {
	@Input() exercise;
	@Input() workout;
	@Input() index;
	@Input() supersetIndex;
	@Input() originalWorkout;
	@Input() userSubscription: number;
	@Input() keyExists: boolean;
	@Output() deleteSelectedExercise = new EventEmitter();

	public originalExercise;
	public cardKeys;
	public onDestroy: Subject<void> = new Subject<void>();
	public cachedWorkout;

	public textOverwriteEnabled: boolean = false;
	public textOverwriteValue: string = '';

	constructor(
		private navCtrl: NavController,
		private storage: StorageService,
		private SubscriptionModalController: ModalController
	) {}

	async ngOnInit(): Promise<void> {
		this.cardKeys = await this.formatKeysForCards();
		await this.checkTextOverwrite();
		this.cachedWorkout = await this.storage.get('workoutUpdated');
		if (this.cachedWorkout !== null) {
			this.originalWorkout.exercises = this.cachedWorkout.exercises;
		}
	}

	public async checkTextOverwrite() {
		if (this.exercise.text_overwrite == true) {
			this.textOverwriteEnabled = true;
			this.textOverwriteValue = this.exercise.value_overwrite;
		}
	}

	public compareArrays(array1, array2) {
		// Check if workouts are the same length
		if (array1.length !== array2.length) {
			return true;
		}
		// Check if all items exist and are in the same order
		for (let i = 0; i < array1.length; i++) {
			if (array1[i] !== array2[i]) return true;
		}
		return false;
	}

	public goToVideo() {
		this.navCtrl.navigateForward('/video/' + this.exercise.id, {
			state: {
				exercise: this.exercise,
				currentPageRoute: '/customise-workout/' + this.workout.id,
			},
		});
	}

	public async formatKeysForCards() {
		const sets = this.exercise.sets;
		let leftProperty = [];
		let count = 0;
		let totalNumberOfSets = sets.length;
		for (let i = 0; i < totalNumberOfSets; i++) {
			count++;
			let value = sets[i].value;
			let textOverwite = this.exercise.text_overwrite;
			if (count == 1) {
				if (textOverwite == true) {
					leftProperty.push(this.exercise.value_overwrite);
				} else if (sets[i].key == 'Time') {
					value = this.convertSecs(value);
					leftProperty.push(value);
				} else {
					leftProperty.push(value);
				}
			} else {
				count = 0;
			}
		}
		return leftProperty;
	}

	public convertSecs(secs) {
		let minutes = Math.floor(secs / 60);
		let remainSecs = secs - minutes * 60;
		return minutes + 'm' + ' ' + remainSecs + 's';
	}

	public async goToWorkoutSwap() {
		await this.checkOriginalWorkout();
		if (this.userSubscription == null || this.userSubscription == 0) {
			this.showSubscriptionModal();
		} else {
			this.navCtrl.navigateForward('/swap-exercise/' + this.exercise.id, {
				state: {
					workout: this.workout,
					exercise: this.exercise,
					index: this.index,
					supersetIndex: this.supersetIndex,
					originalExercise: this.originalExercise,
				},
			});
		}
	}

	public async checkOriginalWorkout() {
		let originalExercises = this.originalWorkout.exercises;
		this.originalExercise = originalExercises[this.index];

		if (typeof this.originalExercise == 'undefined') {
			this.originalExercise = this.exercise;
		}

		if (this.originalExercise.superset) {
			if (this.originalExercise.superset == true) {
				this.originalExercise = originalExercises[this.index].exercises[this.supersetIndex];
			}
		}
	}

	public checkOriginalExerciseID(exercise) {
		let id;
		if (exercise.superset == true) {
			id = exercise.exercises[this.supersetIndex].id;
		} else {
			id = exercise.id;
		}
		return id;
	}

	public deleteExercise(event) {
		let root = this;
		let exercise = this.exercise;
		let exerciseIndex = this.index;
		let supersetIndex = this.supersetIndex;
		setTimeout(function () {
			root.deleteSelectedExercise.emit({
				exercise: exercise,
				exerciseIndex: exerciseIndex,
				supersetIndex: supersetIndex,
			});
		}, 600);
	}

	public ngOnDestroy(): void {
		this.onDestroy.next();
	}

	public async showSubscriptionModal() {
		const subscriptionModal = await this.SubscriptionModalController.create({
			component: SubscriptionModalPage,
			cssClass: 'subscriptionModal',
		});
		return await subscriptionModal.present();
	}
}
