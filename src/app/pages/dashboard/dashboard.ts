import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { CommonActionsService } from '../../services/common-actions.service';
import { FeaturedWorkout } from '../../services/api/models/featured-workout';
import { WorkoutCategory } from '../../services/api/models/workout-category';
import { AnalyticsService } from '../../services/analytics-service';
import { StorageService } from 'src/app/services/storage-service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/services/api/models';
import { SubscriptionModalPage } from 'src/app/modals/subscription-modal/subscription-modal.page';

@Component({
	selector: 'app-dashboard-page',
	templateUrl: './dashboard.html',
	styleUrls: ['./dashboard.scss'],
})
export class DashboardPage implements OnInit {
	private storageSubscription: Subscription;
	public user: User = null;
	public keyExists: boolean = false;
	public userSubscription;
	public customWorkouts = [];
	public featuredWorkouts: FeaturedWorkout[] = [];
	public workoutCategories: WorkoutCategory[] = [];
	public loading: boolean = true;

	constructor(private api: ApiService, private navCtrl: NavController, private commonActions: CommonActionsService, private analyticsService: AnalyticsService, private storage: StorageService, private modalController: ModalController) {
		this.storageSubscription = this.storage.watch('user').subscribe(async () => {
			this.loading = true;
			this.checkIfKeyExistsInStorage('originalUser');
			this.userSubscription = await this.commonActions.checkSubscription();
			await this.getCustomWorkouts();
			this.loading = false;
		});
	}

	async ngOnInit(): Promise<void> {
		this.commonActions.showLoading();
		this.checkIfKeyExistsInStorage('originalUser');
		this.userSubscription = await this.commonActions.checkSubscription();
		await this.getDashboardContent();
		await this.getCustomWorkouts();
		this.analyticsService.trackScreen('home');
		this.commonActions.hideLoading();
		this.loading = false;
	}

	ngOnDestroy(): void {
		if (this.storageSubscription) {
			this.storageSubscription.unsubscribe();
		}
	}

	public goToLogin() {
		this.navCtrl.navigateForward('/');
	}

	public async getDashboardContent() {
		try {
			const response = await this.api.getDashboardContent().toPromise();
			this.featuredWorkouts = response.featured_workouts;
			this.workoutCategories = response.categories;
		} catch (error) {
			this.commonActions.showErrorResponseAlert(error);
		}
	}

	public async getCustomWorkouts() {
		try {
			const response = await this.api
				.getCustomWorkouts()
				.toPromise();
			this.customWorkouts = response.workouts;
		} catch (error) {
			this.commonActions.showErrorResponseAlert(error);
		}
	}

	private async checkIfKeyExistsInStorage(key: string) {
		this.keyExists = await this.commonActions.checkIfKeyExistsInStorage(key);
	}

	public goToWorkout(workout) {
		if (this.userSubscription == 0 && workout.is_premium == 1) {
			this.showSubscriptionModal();
		} else {
			this.navCtrl.navigateForward('/workout/' + workout.id, {
				state: { workout: workout },
			});
		}
	}

	public goToCustomWorkouts() {
		this.navCtrl.navigateForward('/custom-workouts');
	}

	public async showSubscriptionModal() {
		const subscriptionModal = await this.modalController.create({
			component: SubscriptionModalPage,
			cssClass: 'subscriptionModal',
		});
		return await subscriptionModal.present();
	}
}
