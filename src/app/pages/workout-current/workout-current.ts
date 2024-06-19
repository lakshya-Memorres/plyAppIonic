import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { WorkoutCompleted } from '../../services/api/models/workout-completed';
import { ApiService } from '../../services/api.service';
import { CommonActionsService } from '../../services/common-actions.service';
import { ModalController } from '@ionic/angular';
import { SubmitWorkoutModal } from '../../modals/submit-workout-modal/submit-workout-modal';
import { AnalyticsService } from 'src/app/services/analytics-service';
import { StorageService } from 'src/app/services/storage-service';
import { Subject, Subscription } from 'rxjs';
import { User } from 'src/app/services/api/models';
import { SubscriptionModalPage } from 'src/app/modals/subscription-modal/subscription-modal.page';

@Component({
	selector: 'app-workout-current-page',
	templateUrl: './workout-current.html',
	styleUrls: ['./workout-current.scss'],
})
export class WorkoutCurrentPage {
	private storageSubscription: Subscription;
	public user: User = null;
	public keyExists: boolean = false;
	public userSubscription;

	public unit;
	public workout = null; // Current Workout Object
	public workoutCompleted; // payload for api request
	public completedExercises = [];
	public currentRound: number = 1;
	public currentRoundIndex: number = 0;
	public isKeyboardHide = true;
	public workoutUpdated: boolean = false;
	public originalExercises = null;
	public queueFavourite = {
		id: null,
		action: null,
	};
	public routeOrigin: string;
	public workoutsaved: boolean = false;
	public onDestroy: Subject<void> = new Subject<void>();
	public workoutUnsaved: boolean = false;

	constructor(
		private navCtrl: NavController,
		private router: Router,
		private commonActions: CommonActionsService,
		private api: ApiService,
		private modalCtrl: ModalController,
		private analyticsService: AnalyticsService,
		private storage: StorageService,
	) {
		if (this.router.getCurrentNavigation().extras.state == undefined) {
			this.navCtrl.navigateForward('/dashboard');
		}
		this.workout = this.router.getCurrentNavigation().extras.state.workout;
		this.routeOrigin = this.router.getCurrentNavigation().extras.state.routeOrigin;
		this.storageSubscription = this.storage.watch('user').subscribe(async (user) => {
			this.user = user;
			this.checkIfKeyExistsInStorage('originalUser');
			this.unit = this.user.settings.units;
			this.userSubscription = await this.commonActions.checkSubscription();
		});
	}

	async ngOnInit(): Promise<void> {
		this.checkIfKeyExistsInStorage('originalUser');
		this.userSubscription = await this.commonActions.checkSubscription();
		if (this.routeOrigin == 'my-favourites' && this.workout.type == 'Circuit') {
			await this.formatWorkoutsBasedonRounds();
		}
	}

	ngOnDestroy(): void {
		if (this.storageSubscription) {
			this.storageSubscription.unsubscribe();
		}
	}

	public async ionViewWillEnter() {
		if (this.workoutUpdated !== true) {
			this.originalExercises = this.workout.exercises;
			await this.formatExercisesBasedOnRounds();
		}
		this.user = await this.storage.get('user');
		this.unit = this.user.settings.units;
	}

	public ionViewDidEnter() {
		this.analyticsService.trackScreen('workout-current');
	}

	public goToLogin() {
		this.navCtrl.navigateForward('/');
	}

	public goToAddExercise() {
		this.navCtrl.navigateForward('/add-exercise/' + this.workout.id, {
			state: { workout: this.workout },
		});
	}

	public goToFavourites() {
		this.navCtrl.navigateForward('/my-favourites');
	}

	// Save Exercises based on Sets saved
	public async saveSelectedExerciseProgress(selectedExercise) {
		this.workoutUpdated = true;
		this.workoutUnsaved = false;
		let exerciseToSave = selectedExercise.exercise;
		let isCompleted = await this.checkExerciseToSave(exerciseToSave);
		if (isCompleted == false) {
			this.completedExercises.push(exerciseToSave);
		}
	}

	public checkExerciseToSave(exerciseToSave) {
		let i = 0;

		if (this.completedExercises.length == 0) {
			this.completedExercises.push(exerciseToSave);
		} else {
			while (i < this.completedExercises.length) {
				let currentExercise = this.completedExercises[i];
				if (currentExercise == exerciseToSave) {
					return true;
				}
				i++;
			}
			return false;
		}
	}

	public openSelectedSavedExercise(selectedExercise) {
		let exerciseToOpen = selectedExercise.exercise;
		let isCompleted = this.completedExercises.includes(exerciseToOpen);
		if (isCompleted == true) {
			var index = this.completedExercises.indexOf(exerciseToOpen);
			if (index >= 0) this.completedExercises.splice(index, 1);
		}
	}

	// Finish Workout
	public async finishWorkout(timer) {
		this.workoutCompleted = new WorkoutCompleted();
		this.workoutCompleted.workout_id = this.workout.id;
		this.workoutCompleted.workout_started = timer.workoutStarted;
		this.workoutCompleted.workout_finished = timer.workoutFinished;
		this.workoutCompleted.workoutDuration = timer.totalWorkoutTime;
		this.workoutCompleted.rounds = this.workout.rounds;
		this.workoutCompleted.exercises = await this.buildExercisesForPayLoad();

		if (this.completedExercises.length !== this.workoutCompleted.exercises.length) {
			const submitWorkoutModal = await this.modalCtrl.create({
				component: SubmitWorkoutModal,
			});

			submitWorkoutModal.onDidDismiss().then((response) => {
				if (response['data'].SubmitWorkout === 'true') {
					this.submitWorkout();
				}
			});
			return await submitWorkoutModal.present();
		} else {
			this.submitWorkout();
		}
	}

	private async submitWorkout() {
		try {
			await this.commonActions.showLoading();
			const response = await this.api.workoutFinished(this.workoutCompleted, this.workout.id).toPromise();
			await this.commonActions.hideLoading();
			this.storage.remove('workoutUpdated');
			this.navCtrl.navigateForward('/completed-workout/' + this.workout.id, {
				state: {
					workoutCompleted: response,
					workoutDuration: this.workoutCompleted.workoutDuration,
					queuedFavourite: this.queueFavourite,
				},
			});
		} catch (error) {
			this.commonActions.showErrorResponseAlert(error);
		}
	}

	//Format rounds for loop
	public roundsCounter(i: number) {
		if (i == 0) i = 1;
		return new Array(i);
	}

	//Moves Exercises into an number of arrays based on the rounds
	public async formatExercisesBasedOnRounds() {
		let newExercises = [];
		let rounds = this.workout.rounds;
		if (rounds == 0) rounds = 1;
		if (this.workout.type !== 'Circuit') rounds = 1;
		for (let index = 0; index < rounds; index++) {
			let roundExercises = [];
			for (let i = 0; i < this.workout.exercises.length; i++) {
				let currentExerciseObject = this.workout.exercises[i];
				let isSuperset = currentExerciseObject.superset;
				if (isSuperset == false) {
					let newExercise = await this.createExerciseObject(currentExerciseObject, index);
					roundExercises.push(newExercise);
				} else {
					let newSuperSet = await this.createSuperSetObject(currentExerciseObject, index);
					roundExercises.push(newSuperSet);
				}
			}

			newExercises.push(roundExercises);
		}
		this.workout.exercisesFormatted = newExercises;
	}

	public goToNextRound() {
		this.currentRound++;
		this.currentRoundIndex++;
	}

	public goToPrevRound() {
		this.currentRound--;
		this.currentRoundIndex--;
	}

	public queAddFavourite() {
		if (this.userSubscription == 0) {
			this.showSubscriptionModal();
		} else {
			this.queueFavourite.id = this.workout.id;
			this.queueFavourite.action = 'add';
			this.workout.is_favourite = true;
			let title = 'Added to Favourites';
			let message = 'This workout has been added to your favourites';
			this.commonActions.showSimpleAlert(title, message);
		}
	}

	public queRemoveFavourite() {
		if (this.userSubscription == 0) {
			this.showSubscriptionModal();
		} else {
			this.queueFavourite.id = this.workout.id;
			this.queueFavourite.action = 'remove';
			this.workout.is_favourite = false;
			let title = 'Removed from Favourites';
			let message = 'This workout has been removed from your favourites.';
			this.commonActions.showSimpleAlert(title, message);
		}
	}

	public async buildExercisesForPayLoad() {
		let completedExercises = [];
		for (let i = 0; i < this.workout.exercisesFormatted.length; i++) {
			let currentRound = this.workout.exercisesFormatted[i];
			for (let i = 0; i < currentRound.length; i++) {
				let exercise = currentRound[i];
				let isSuperset = exercise.superset;
				if (isSuperset == false) {
					completedExercises.push(exercise);
				} else {
					for (let i = 0; i < exercise.exercises.length; i++) {
						let supersetExercise = exercise.exercises[i];
						completedExercises.push(supersetExercise);
					}
				}
			}
		}

		return completedExercises;
	}

	public async createExerciseObject(exercise, index) {
		let newExercise = {
			// if(exersice.category != null){
			// 	category: {
			// 	id: exercise.category.id,
			// 	image_url: exercise.category.image_url,
			// 	name: exercise.category.name,
			// },
			// }
			exercise_id: exercise.id,
			image_url: exercise.image_url,
			name: exercise.name,
			order: exercise.order,
			round: index + 1,
			sets: exercise.sets,
			// sub_category: {
			// 	id: exercise.sub_category.id,
			// 	image_url: exercise.sub_category.image_url,
			// 	name: exercise.sub_category.name,
			// },
			superset: exercise.superset,
			superset_identifiter: exercise.superset_identifiter,
			text_overwrite: exercise.text_overwrite,
			type: exercise.type,
			value_overwrite: exercise.value_overwrite,
			video_url: exercise.video_url,
		};

		return newExercise;
	}

	public async createSuperSetObject(superset, index) {
		let exercises = [];
		for (let i = 0; i < superset.exercises.length; i++) {
			let exercise = superset.exercises[i];
			let newSuperSetExercise = await this.createExerciseObject(exercise, index);
			exercises.push(newSuperSetExercise);
		}
		let newSuperSet = {
			exercises: exercises,
			round: index + 1,
			superset: superset.superset,
			superset_identifier: superset.superset_identifier,
		};
		return newSuperSet;
	}

	public formatWorkoutsBasedonRounds() {
		let newExercises = [];
		let currentRound = [];
		for (let round = 0; round <= this.workout.rounds; round++) {
			for (let i = 0; i < this.workout.exercises.length; i++) {
				if (this.workout.exercises[i].round == null) {
					this.workout.exercises[i].round = round + 1;
				}
				if (this.workout.exercises[i].round == round + 1) {
					currentRound.push(this.workout.exercises[i]);
				} else if (this.workout.exercises[i].superset == true) {
					if (this.workout.exercises[i].exercises[0].round == round + 1) {
						currentRound.push(this.workout.exercises[i]);
					}
				}
			}
			if (currentRound.length > 0) {
				newExercises.push(currentRound);
				currentRound = [];
			}
		}
		this.workout.exercisesFormatted = newExercises[0];
		this.workout.exercises = newExercises[0];
	}

	public updated($event) {
		if (this.completedExercises.includes($event.exerciseRef)) {
			this.workoutUnsaved = false;
		} else {
			this.workoutUnsaved = true;
		}
	}

	private async checkIfKeyExistsInStorage(key: string) {
		this.keyExists = await this.commonActions.checkIfKeyExistsInStorage(key);
	}

	public async showSubscriptionModal() {
		const subscriptionModal = await this.modalCtrl.create({
			component: SubscriptionModalPage,
			cssClass: 'subscriptionModal',
		});
		return await subscriptionModal.present();
	}
}
