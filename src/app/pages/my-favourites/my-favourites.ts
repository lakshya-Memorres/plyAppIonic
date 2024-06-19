import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CommonActionsService } from '../../services/common-actions.service';
import { ApiService } from '../../services/api.service';
import { AnalyticsService } from 'src/app/services/analytics-service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/services/api/models';
import { StorageService } from 'src/app/services/storage-service';

@Component({
	selector: 'app-favourites-page',
	templateUrl: './my-favourites.html',
	styleUrls: ['./my-favourites.scss'],
})
export class MyFavouritesPage {

	private storageSubscription: Subscription;
	public user: User = null;
	public keyExists: boolean = false;
	public userSubscription;

	public loading = true;
	public favourites;
	public emptyResults = false;
	public categroies = [];
	public filteredFavourites;

	constructor(
		private api: ApiService,
		private navCtrl: NavController,
		private commonActions: CommonActionsService,
		private analyticsService: AnalyticsService,
		private storage: StorageService,
	) {
		this.storageSubscription = this.storage.watch('user').subscribe(async () => {
			this.checkIfKeyExistsInStorage('originalUser');
			this.userSubscription = await this.commonActions.checkSubscription();
		});
	}

	public goToLogin() {
		this.navCtrl.navigateForward('/');
	}

	public async ionViewWillEnter() {
		this.loading = true;
		this.checkIfKeyExistsInStorage('originalUser');
		this.userSubscription = await this.commonActions.checkSubscription();
		await this.getFavourites();
		this.analyticsService.trackScreen('my-favourites');
	}

	public async getFavourites() {
		try {
			const response = await this.api.getFavourites().toPromise();
			this.favourites = response.categories;
			this.categroies = await this.buildCategories();
			this.filteredFavourites = await this.filterFavourites();
		} catch (error) {
			this.commonActions.hideLoading();
			this.commonActions.showErrorResponseAlert(error);
		} finally {
			if (this.filteredFavourites.length < 1) {
				this.emptyResults = true;
			}
			this.loading = false;
		}
	}

	private async buildCategories() {
		let categoryItems = [];
		this.favourites.map((favourite) => {
			let currentCategory = favourite.name;
			if (!categoryItems.includes(currentCategory)) {
				categoryItems.push(currentCategory);
			}
		});
		// categoryItems.push('All');
		return categoryItems;
	}

	private async filterFavourites() {
		let categoryItems = [];
		this.categroies.map((category) => {
			let currentCategoryItemsFiltered = []; // get current category based on loop
			let currentCategory = category;
			// get current category items
			let currentCategoryItems = this.favourites.filter((favourite) => favourite.name == category);

			// get the workout data for current category items
			currentCategoryItems.map((item) => {
				currentCategoryItemsFiltered.push(item.workouts[0]);
			});

			// format items for frontend loop
			let item = this.buildFavourite(currentCategory, currentCategoryItemsFiltered);
			categoryItems.push(item);
		});
		return categoryItems;
	}

	private buildFavourite(category, currentCategoryItemsFiltered) {
		const item = {
			category: category,
			workouts: currentCategoryItemsFiltered,
		};

		return item;
	}

	public goToWorkout(workout) {
		this.navCtrl.navigateForward('/workout/' + workout.id, {
			state: { workout: workout, origin: 'my-favourites' },
		});
	}

	public goToCustomiseWorkout(workout) {
		this.navCtrl.navigateForward('/customise-workout/' + workout.id, {
			state: { workout: workout },
		});
	}

	public goToPreviouslyCompletedWorkout(workout) {
		let completedWorkout = {
			workout: workout,
		};
		this.navCtrl.navigateForward('/previously-completed-workout/' + workout.id, {
			state: { workout: completedWorkout },
		});
	}

	private async checkIfKeyExistsInStorage(key: string) {
		this.keyExists = await this.commonActions.checkIfKeyExistsInStorage(key);
	}
}
