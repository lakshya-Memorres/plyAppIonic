import {
	Component,
	OnInit,
	Output,
	EventEmitter,
} from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { Excercise } from '../../services/api/models/exercise';
import { Router } from '@angular/router';
import { User } from '../../services/api/models';
import { CommonActionsService } from '../../services/common-actions.service';
import { AnalyticsService } from 'src/app/services/analytics-service';
import { Subject, Subscription } from 'rxjs';
import { StorageService } from 'src/app/services/storage-service';
import { SubscriptionModalPage } from 'src/app/modals/subscription-modal/subscription-modal.page';

@Component({
	selector: 'app-swap-exercise-page',
	templateUrl: './swap-exercise.html',
	styleUrls: ['./swap-exercise.scss'],
})
export class SwapExercisePage implements OnInit {
	@Output() confirmedSwappedExercise = new EventEmitter();

	private storageSubscription: Subscription;
	public user: User = null;
	public keyExists: boolean = false;
	public userSubscription;

	public exercisesHasBeenSwapped: boolean = false;
	public loading: boolean = true;
	public originalExercise = null;
	public currentExercise: Excercise = null;
	public suggestedProgressive = null;
	public suggestedRegressive = null;
	public swappedExercise = null;
	public workout = null;
	public workoutToSwapIndex = null;
	public workoutSuperSetIndex = null;
	public onDestroy: Subject<void> = new Subject<void>();

	public leftProperty;
	public rightProperty;

	constructor(
		private api: ApiService,
		private commonActions: CommonActionsService,
		private navCtrl: NavController,
		private router: Router,
		private analyticsService: AnalyticsService,
		private storage: StorageService,
		private SubscriptionModalController: ModalController
	) {
		if (this.router.getCurrentNavigation().extras.state == undefined) {
			this.navCtrl.navigateForward('/dashboard');
		}
		this.currentExercise = this.router.getCurrentNavigation().extras.state.exercise;
		this.originalExercise = this.router.getCurrentNavigation().extras.state.originalExercise;
		this.workout = this.router.getCurrentNavigation().extras.state.workout;
		this.workoutToSwapIndex = this.router.getCurrentNavigation().extras.state.index;
		this.workoutSuperSetIndex = this.router.getCurrentNavigation().extras.state.supersetIndex;

		this.storageSubscription = this.storage.watch('user').subscribe(async () => {
			this.checkIfKeyExistsInStorage('originalUser');
			this.userSubscription = await this.commonActions.checkSubscription();
		});
	}

	async ngOnInit(): Promise<void> {
		this.loading = true;
		this.checkIfKeyExistsInStorage('originalUser');
		this.userSubscription = await this.commonActions.checkSubscription();
		if (this.userSubscription == null || this.userSubscription == 0) {
			this.showSubscriptionModal();
		}
		this.leftProperty = this.originalExercise.sets[0].key;
		this.rightProperty = this.originalExercise.sets[1].key;
		await this.getAddExercises();
	}

	ngOnDestroy(): void {
		this.onDestroy.next();
		if (this.storageSubscription) {
			this.storageSubscription.unsubscribe();
		}
	}

	public ionViewDidEnter() {
		this.analyticsService.trackScreen('swap-exercise');
	}

	public goBack() {
		this.navCtrl.navigateForward('/customise-workout/' + this.workout.id, {
			state: { workout: this.workout },
		});
	}

	public async getAddExercises() {
		let response;
		let request = {
			compatible_with: {
				left_attribute: this.leftProperty,
				right_attribute: this.rightProperty,
			},
		};
		try {
			response = await this.api.getExercises(this.originalExercise.id, request).toPromise();
		} catch (error) {
			// this.commonActions.showErrorResponseAlert(error);
		} finally {
			if (response.exercise_swaps.progressive) {
				this.suggestedProgressive = response.exercise_swaps.progressive;
				this.checkCurrentExercise(response.exercise_swaps.progressive);
			}
			if (response.exercise_swaps.regressive) {
				this.suggestedRegressive = response.exercise_swaps.regressive;
				this.checkCurrentExercise(response.exercise_swaps.regressive);
			}
			this.loading = false;
		}
	}

	public checkCurrentExercise(array) {
		for (let i = 0; i < array.length; i++) {
			let currentName = this.currentExercise.name;
			let suggested = array[i];
			if (currentName === suggested.exercise.name) {
				this.swappedExercise = this.currentExercise;
			}
		}
	}

	public confirmSwap() {
		this.swappedExercise.sets = this.originalExercise.sets;
		let workoutCurrentExercises = this.workout.exercises;
		if (this.workoutSuperSetIndex !== undefined) {
			workoutCurrentExercises[this.workoutToSwapIndex].exercises[this.workoutSuperSetIndex] = this.swappedExercise;
			this.workoutSuperSetIndex = null;
		} else {
			workoutCurrentExercises[this.workoutToSwapIndex] = this.swappedExercise;
		}
		this.navCtrl.navigateForward('/customise-workout/' + this.workout.id, {
			state: { workout: this.workout },
		});
	}

	// public swapExerciseCard(swapExercise) {
	// 	this.swappedExercise = swapExercise.exercise;
	// 	if (this.swappedExercise.name == this.selectedExercise.name) {
	// 		this.exercisesHasBeenSwapped = false;
	// 	} else {
	// 		this.exercisesHasBeenSwapped = true;
	// 		this.selectedExercise = swapExercise.exercise;
	// 	}
	// }

	public setToOriginalExercise() {
		this.setToSwappedExercise(this.originalExercise);
	}

	public setToSwappedExercise(exercise) {
		let root = this;
		this.swappedExercise = exercise;
		setTimeout(function () {
			root.confirmSwap();
		}, 300);
	}

	public swapExercise(swapExercise) {
		if (this.swappedExercise == null) {
			this.setToSwappedExercise(swapExercise.exercise);
			return true;
		}

		if (this.swappedExercise.name === swapExercise.exercise.name) {
			this.setToSwappedExercise(this.originalExercise);
			return true;
		}

		if (this.swappedExercise.name !== swapExercise.exercise.name) {
			this.setToSwappedExercise(swapExercise.exercise);
			return true;
		}
	}

	private async checkIfKeyExistsInStorage(key: string) {
		this.keyExists = await this.commonActions.checkIfKeyExistsInStorage(key);
	}

	public async showSubscriptionModal() {
		const subscriptionModal = await this.SubscriptionModalController.create({
			component: SubscriptionModalPage,
			cssClass: 'subscriptionModal',
		});
		return await subscriptionModal.present();
	}
}
