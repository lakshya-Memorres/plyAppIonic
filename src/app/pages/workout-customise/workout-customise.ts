import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CommonActionsService } from '../../services/common-actions.service';
import { ApiService } from 'src/app/services/api.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AnalyticsService } from 'src/app/services/analytics-service';
import { StorageService } from 'src/app/services/storage-service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/services/api/models';

@Component({
	selector: 'app-workout-customise-page',
	templateUrl: './workout-customise.html',
	styleUrls: ['./workout-customise.scss'],
})
export class WorkoutCustomisePage {
	private storageSubscription: Subscription;
	public user: User = null;
	public keyExists: boolean = false;
	public userSubscription;

	public workout = null;
	public originalWorkout;
	public loading: boolean = true;
	public workoutUpdated: boolean = false;
	public routeOrigin: string;
	public exercisesAdded = null;
	public cachedWorkout;

	constructor(
		private navCtrl: NavController,
		private router: Router,
		private commonActions: CommonActionsService,
		private api: ApiService,
		private storage: StorageService,
		private analyticsService: AnalyticsService
	) {
		if (this.router.getCurrentNavigation().extras.state == undefined) {
			this.navCtrl.navigateForward('/dashboard');
		}
		this.workout = this.router.getCurrentNavigation().extras.state.workout;
		this.routeOrigin = this.router.getCurrentNavigation().extras.state.origin;
		this.exercisesAdded = this.router.getCurrentNavigation().extras.state.exercisesAdded;

		this.storageSubscription = this.storage.watch('user').subscribe(async () => {
			this.checkIfKeyExistsInStorage('originalUser');
			this.userSubscription = await this.commonActions.checkSubscription();
		});
	}

	async ngOnInit(): Promise<void> {
		this.checkIfKeyExistsInStorage('originalUser');
		this.userSubscription = await this.commonActions.checkSubscription();
		await this.getOriginalWorkout();
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
		this.cachedWorkout = await this.storage.get('workoutUpdated');
		await this.compareOrginalWorkoutToCurrentWorkout();
		this.analyticsService.trackScreen('workout-customise');
	}

	public compareOrginalWorkoutToCurrentWorkout() {
		if (this.originalWorkout != null && this.workout !== null) {
			let originalWorkout = this.originalWorkout;
			let currentWorkout = this.workout;

			this.workoutUpdated = this.compareArrays(originalWorkout.exercises, currentWorkout.exercises);
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

	public async getCacheWorkout() {
		return this.storage.get('workout');
	}

	public removeCacheWorkout() {
		this.storage.remove('workoutUpdated');
	}

	public goBack() {
		this.removeCacheWorkout();
	}

	public goToCurrentWorkout() {
		this.navCtrl.navigateForward('/current-workout/' + this.workout.id, {
			state: {
				workout: this.workout,
				workoutUpdated: this.workoutUpdated,
				routeOrigin: this.routeOrigin,
			},
		});
	}

	public goToAddExercise() {
		this.navCtrl.navigateForward('/add-exercise/' + this.workout.id, {
			state: { workout: this.workout },
		});
	}

	public deleteExercise(event) {
		let exercise = event.exercise;
		let exerciseIndex = event.exerciseIndex;
		let supersetIndex = event.supersetIndex;
		if (supersetIndex != null || supersetIndex != undefined) {
			let exercises = this.workout.exercises[exerciseIndex].exercises;
			this.removeObjectContains(exercises, exercise);
		} else {
			let exercises = this.workout.exercises;
			this.removeObjectContains(exercises, exercise);
		}
		this.compareOrginalWorkoutToCurrentWorkout();
	}

	public removeObjectContains(array, object) {
		for (var i = array.length - 1; i > -1; i--) {
			if (array[i].name === object.name) {
				array.splice(i, 1);
				return true;
			}
		}
		return false;
	}

	public async getOriginalWorkout() {
		try {
			let response = await this.api.getWorkout(this.workout.id).toPromise();
			this.originalWorkout = response.workout;
			// this.cache.set('workout', this.originalWorkout);
		} catch (error) {
			this.commonActions.showErrorResponseAlert(error);
		} finally {
			this.loading = false;
		}
	}

	public async drop(event: CdkDragDrop<string[]>) {
		moveItemInArray(this.workout.exercises, event.previousIndex, event.currentIndex);
		moveItemInArray(this.originalWorkout.exercises, event.previousIndex, event.currentIndex);
		moveItemInArray(this.cachedWorkout.exercises, event.previousIndex, event.currentIndex);
		await this.storage.set('workoutUpdated', this.cachedWorkout);
		this.compareOrginalWorkoutToCurrentWorkout();
	}

	public dropSuperset(event: CdkDragDrop<string[]>, index) {
		moveItemInArray(this.workout.exercises[index].exercises, event.previousIndex, event.currentIndex);
	}

	public async addFavourite() {
		let added = await this.commonActions.addFavourite(this.workout.id, false);
		if (added == true) {
			this.workout.is_favourite = true;
		}
	}

	public async removeFavourite() {
		let removed = await this.commonActions.removeFavourite(this.workout.id, false);
		if (removed == true) {
			this.workout.is_favourite = false;
		}
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

	private async checkIfKeyExistsInStorage(key: string) {
		this.keyExists = await this.commonActions.checkIfKeyExistsInStorage(key);
	}
}
