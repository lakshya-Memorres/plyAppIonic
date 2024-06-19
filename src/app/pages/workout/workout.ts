import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { CommonActionsService } from '../../services/common-actions.service';
import { ApiService } from '../../services/api.service';
import { ElementRef } from '@angular/core';
import { Workout } from '../../services/api/models/workout';
import { User } from '../../services/api/models';
import { AnalyticsService } from 'src/app/services/analytics-service';
import { Subject, Subscription } from 'rxjs';
import { StorageService } from 'src/app/services/storage-service';
import { SubscriptionModalPage } from 'src/app/modals/subscription-modal/subscription-modal.page';

@Component({
	selector: 'app-workout-page',
	templateUrl: './workout.html',
	styleUrls: ['./workout.scss'],
})
export class WorkoutPage implements OnInit {
	@ViewChild('subscriptionModal') subscriptionModal: ElementRef;

	private storageSubscription: Subscription;
	public user: User = null;
	public keyExists: boolean = false;
	public userSubscription;

	public workout = null;
	public equipmentList = null;
	public combinableWorkouts: Workout[] = [];
	public similarWorkouts: Workout[] = [];
	public loading: boolean;
	public routeOrigin = null;
	public onDestroy: Subject<void> = new Subject<void>();

	constructor(
		private navCtrl: NavController,
		private router: Router,
		private api: ApiService,
		private commonActions: CommonActionsService,
		private analyticsService: AnalyticsService,
		private storage: StorageService,
		private SubscriptionModalController: ModalController
	) {
		if (this.router.getCurrentNavigation().extras.state == undefined) {
			this.navCtrl.navigateForward('/dashboard');
		}
		this.workout = this.router.getCurrentNavigation().extras.state.workout;
		this.routeOrigin = this.router.getCurrentNavigation().extras.state.origin;
		this.storageSubscription = this.storage.watch('user').subscribe(async () => {
			this.checkIfKeyExistsInStorage('originalUser');
			this.userSubscription = await this.commonActions.checkSubscription();
		});
	}

	async ngOnInit(): Promise<void> {
		this.loading = true;
		this.checkIfKeyExistsInStorage('originalUser');
		this.userSubscription = await this.commonActions.checkSubscription();
		await this.getOriginalWorkout();
		this.equipmentList = this.buildEquipmentList();
		await this.getCombinableWorkouts();
		await this.getSimilarWorkouts();
	}

	ngOnDestroy(): void {
		if (this.storageSubscription) {
			this.storageSubscription.unsubscribe();
		}
	}

	public ionViewDidEnter() {
		this.analyticsService.trackScreen('workout');
	}

	public async getOriginalWorkout() {
		try {
			let response = await this.api.getWorkout(this.workout.id).toPromise();
			this.workout = response.workout;
			// this.cache.set('workout', this.originalWorkout);
		} catch (error) {
			this.commonActions.showErrorResponseAlert(error);
		}
	}

	public async getCombinableWorkouts() {
		try {
			const response = await this.api.getCombinableWorkouts(this.workout.id).toPromise();
			this.combinableWorkouts = response.workouts;
		} catch (error) {
			this.commonActions.showErrorResponseAlert(error);
		}
	}

	public async getSimilarWorkouts() {
		try {
			const response = await this.api.getSimilarWorkouts(this.workout.id).toPromise();
			this.similarWorkouts = response.workouts;
		} catch (error) {
			this.commonActions.showErrorResponseAlert(error);
		} finally {
			this.loading = false;
		}
	}

	public buildEquipmentList() {
		let equipment = this.workout.workout_equipment;
		let equipmentList = [];
		let currentValue = null;
		for (let i = 0; i < equipment.length; i++) {
			currentValue = equipment[i].key;
			if (!equipmentList.includes(currentValue)) {
				equipmentList.push(currentValue);
			}
		}
		return equipmentList;
	}

	public goBack() {
		this.navCtrl.navigateForward('/dashboard');
	}

	public goToWorkout(workout) {
		if ((this.userSubscription == null && workout.is_premium == 1) || (this.userSubscription == 0 && workout.is_premium == 1)) {
			this.showSubscriptionModal();
		} else {
			this.navCtrl.navigateForward('/workout/' + workout.id, {
				state: { workout: workout },
			});
		}
	}

	public async goToCurrentWorkout() {
		let response;
		let workout;
		this.commonActions.showLoading();
		try {
			response = await this.api.getWorkout(this.workout.id).toPromise();
			workout = response.workout;
		} catch (error) {
			this.commonActions.showErrorResponseAlert(error);
		} finally {
			this.commonActions.hideLoading();
			this.navCtrl.navigateForward('/current-workout/' + workout.id, {
				state: {
					workout: workout,
					routeOrigin: this.routeOrigin,
				},
			});
		}
	}

	public goToLogin() {
		this.navCtrl.navigateForward('/');
	}

	public async addFavourite() {
		if (this.userSubscription == 0) {
			this.showSubscriptionModal();
		} else {
			let added = await this.commonActions.addFavourite(this.workout.id, false);
			if (added == true) {
				this.workout.is_favourite = true;
			}
		}
	}

	public async removeFavourite() {
		if (this.userSubscription == 0) {
			this.showSubscriptionModal();
		} else {
			let removed = await this.commonActions.removeFavourite(this.workout.id, false);
			if (removed == true) {
				this.workout.is_favourite = false;
			}
		}
	}

	public async goToCustomiseWorkout() {
		await this.getOriginalWorkout();
		if (this.userSubscription == null || this.userSubscription == 0) {
			this.showSubscriptionModal();
		} else {
			this.navCtrl.navigateForward('/customise-workout/' + this.workout.id, {
				state: { workout: this.workout, origin: this.routeOrigin },
			});
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
