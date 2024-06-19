import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { User } from '../../services/api/models';
import { CommonActionsService } from '../../services/common-actions.service';
import { AnalyticsService } from 'src/app/services/analytics-service';
import { Subject, Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage-service';

@Component({
	selector: 'app-workout-previously-completed-page',
	templateUrl: './workout-previously-completed.html',
	styleUrls: ['./workout-previously-completed.scss'],
})
export class WorkoutPreviouslyCompletedPage implements OnInit {
	private storageSubscription: Subscription;
	public user: User = null;
	public keyExists: boolean = false;
	public userSubscription;

	public unit = 'metric';
	public completedWorkout = null;
	public completedWorkoutID = null;
	public workout = null;
	public workoutDuration = null;
	public currentRound: number = 1;
	public currentRoundIndex: number = 0;
	public onDestroy: Subject<void> = new Subject<void>();

	constructor(
		private navCtrl: NavController,
		private router: Router,
		private commonActions: CommonActionsService,
		private analyticsService: AnalyticsService,
		private api: ApiService,
		private storage: StorageService
	) {
		if (this.router.getCurrentNavigation().extras.state.workout == undefined) {
			this.completedWorkoutID = this.router.getCurrentNavigation().extras.state.workoutID;
			this.getCompletedWorkout();
		} else {
			this.completedWorkout = this.router.getCurrentNavigation().extras.state.workout;
		}

		this.storageSubscription = this.storage.watch('user').subscribe(async () => {
			this.checkIfKeyExistsInStorage('originalUser');
			this.userSubscription = await this.commonActions.checkSubscription();
		});
	}

	async ngOnInit(): Promise<void> {
		this.workout = this.completedWorkout.workout;
		await this.formatWorkoutsBasedonRounds();
		this.checkIfKeyExistsInStorage('originalUser');
		this.userSubscription = await this.commonActions.checkSubscription();
		this.user = await this.storage.get('user');
		this.unit = this.user.settings.units;
		this.workoutDuration = this.getWorkoutDuration(this.completedWorkout.workout_started, this.completedWorkout.workout_finished);
	}

	ngOnDestroy(): void {
		this.onDestroy.next();
		if (this.storageSubscription) {
			this.storageSubscription.unsubscribe();
		}
	}

	public async ionViewDidEnter() {
		this.analyticsService.trackScreen('workout-previsouly-completed');
	}

	public goBack() {
		this.navCtrl.navigateForward('/history');
	}

	public async getCompletedWorkout() {
		let id = this.completedWorkoutID;
		this.commonActions.showLoading();
		try {
			let response = await this.api.getWorkout(id).toPromise();
			this.workout = response.workout;
		} catch (error) {
			this.commonActions.showErrorResponseAlert(error);
		} finally {
			this.commonActions.hideLoading();
		}
	}

	public formatDate(date) {
		let formattedDate = this.commonActions.formatDate(date);
		return formattedDate;
	}

	public getWorkoutDuration(d1, d2) {
		let duration = this.commonActions.calculateWorkoutDuration(d1, d2);
		return duration;
	}

	public repeatWorkout() {
		let exercisesRounds = this.workout.exercisesFormatted.length;
		if (exercisesRounds > 1) {
			let roundOneExercies = this.workout.exercisesFormatted[0];
			this.workout.exercises = roundOneExercies;
		}
		this.navCtrl.navigateForward('/customise-workout/' + this.workout.id, {
			state: { workout: this.workout, origin: 'history' },
		});
	}

	// //Calculates rounds based on exercise rounds
	// public async calculateRounds() {
	// 	let rounds = this.workout.rounds;
	// 	if (rounds == 0) rounds = 1;
	// 	let n = this.workout.exercise_count / rounds;
	// 	let counter = 0;
	// 	for (let i = 0; i < this.workout.exercises.length; i++) {
	// 		if (i % n === 0) {
	// 			counter++;
	// 		}
	// 		this.workout.exercises[i].round = counter;
	// 	}
	// }

	public formatWorkoutsBasedonRounds() {
		let newExercises = [];
		let currentRound = [];
		for (let round = 0; round <= this.workout.rounds; round++) {
			for (let i = 0; i < this.workout.exercises.length; i++) {
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
		this.workout.exercisesFormatted = newExercises;
		this.workout.rounds = this.workout.exercisesFormatted.length;
	}

	//Format rounds for loop
	public roundsCounter(i: number) {
		if (i == 0) i = 1;
		return new Array(i);
	}

	public goToNextRound() {
		this.currentRound++;
		this.currentRoundIndex++;
	}

	public goToPrevRound() {
		this.currentRound--;
		this.currentRoundIndex--;
	}

	private async checkIfKeyExistsInStorage(key: string) {
		this.keyExists = await this.commonActions.checkIfKeyExistsInStorage(key);
	}
}
