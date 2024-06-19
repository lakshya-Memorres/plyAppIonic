import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { CommonActionsService } from '../../services/common-actions.service';
import { ApiService } from '../../services/api.service';
import { Workout } from '../../services/api/models/workout';
import { AnalyticsService } from 'src/app/services/analytics-service';
import { Subject, Subscription } from 'rxjs';
import { User } from 'src/app/services/api/models';
import { StorageService } from 'src/app/services/storage-service';
import { SubscriptionModalPage } from 'src/app/modals/subscription-modal/subscription-modal.page';

@Component({
	selector: 'app-workout-custom-page',
	templateUrl: './workout-custom.html',
	styleUrls: ['./workout-custom.scss'],
})
export class WorkoutCustom implements OnInit {
	private storageSubscription: Subscription;
	public user: User = null;
	public keyExists: boolean = false;
	public userSubscription;

	public category_id;
	public categroies = [];
	public favourites: boolean = false;
	public loading: boolean;
	public categoryLoading: boolean = false;
	public selectedCategory: string = 'All';
	public workoutCategory = null;
	public workoutCategoryDescription: string = null;
	public workoutCategoryName: string = null;
	public workouts: Workout[] = [];
	public onDestroy: Subject<void> = new Subject<void>();
	public description: string = 'Your personally crated workouts.';

	constructor(private navCtrl: NavController, private router: Router, private api: ApiService, private commonActions: CommonActionsService, private analyticsService: AnalyticsService, private storage: StorageService, private SubscriptionModalController: ModalController) {
		this.storageSubscription = this.storage.watch('user').subscribe(async () => {
			this.checkIfKeyExistsInStorage('originalUser');
			this.userSubscription = await this.commonActions.checkSubscription();
		});
	}

	async ngOnInit(): Promise<void> {
		this.loading = true;
		this.checkIfKeyExistsInStorage('originalUser');
		this.userSubscription = await this.commonActions.checkSubscription();
		await this.getWorkouts();
		this.loading = false;
	}

	ngOnDestroy(): void {
		if (this.storageSubscription) {
			this.storageSubscription.unsubscribe();
		}
	}

	public ionViewDidEnter() {
		this.analyticsService.trackScreen('workout-category');
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

	public async getWorkouts() {
		try {
			const response = await this.api.getCustomWorkouts().toPromise();
			this.workouts = response.workouts;
			this.categroies = await this.buildCategories();
		} catch (error) {
			this.commonActions.showErrorResponseAlert(error);
		} finally {
			this.loading = false;
		}
	}

	private async buildCategories() {
		let categoryItems = [];
		let categoryFormatted = [];

		// Group Avaible Categories
		this.workouts.map((workout) => {
			let currentCategory = workout.workout_category['name'];
			let currentIndex = workout.workout_category['order'];
			let item = {
				name: currentCategory,
				index: currentIndex,
			};
			categoryItems.push(item);
		});

		// Sort Categories based on index
		categoryItems.sort(function (a, b) {
			return parseFloat(a.index) - parseFloat(b.index);
		});

		// Remove Duplicated Categories
		for (let i = 0; i < categoryItems.length; i++) {
			let currentCategory = categoryItems[i].name;
			if (!categoryFormatted.includes(currentCategory)) {
				categoryFormatted.push(currentCategory);
			}
		}

		categoryFormatted.push('All');

		return categoryFormatted;
	}

	public showActivity(category) {
		let root = this;
		this.selectedCategory = category;
		this.categoryLoading = true;
		setTimeout(function () {
			root.categoryLoading = false;
		}, 500);
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
