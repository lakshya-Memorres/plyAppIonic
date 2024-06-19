import { Component, ViewChild, OnInit, HostListener, ElementRef } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { CommonActionsService } from '../../services/common-actions.service';
import { IonContent } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
import { AnalyticsService } from 'src/app/services/analytics-service';

@Component({
	selector: 'app-history-page',
	templateUrl: './history.html',
	styleUrls: ['./history.scss'],
})
export class HistoryPage implements OnInit {
	@ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
	@ViewChild(IonContent, { static: false }) content: IonContent;
	// @ViewChild('content', { static: false, read: ElementRef }) content: ElementRef;

	public categoryLoading: boolean = true;
	public loading: boolean;
	public workoutCategories = [];
	public history = [];
	public selectedCategory;
	public emptyResults = false;
	public endOfScroll = false;

	public historyRequest = {
		page: 1,
		per_page: 15,
		parent_category_id: null,
	};

	constructor(
		private api: ApiService,
		private navCtrl: NavController,
		private commonActions: CommonActionsService,
		private platform: Platform,
		private analyticsService: AnalyticsService,
		private elRef: ElementRef
	) {}

	public async ngOnInit() {
		this.loading = true;
		await this.getWorkoutCategories();
	}

	public ionViewDidEnter() {
		this.analyticsService.trackScreen('history');
	}

	public goToLogin() {
		this.navCtrl.navigateForward('/');
	}

	public goBack() {
		this.navCtrl.navigateForward('/my-ply');
	}

	public async goToPreviouslyCompletedWorkout(completedWorkout) {
		try {
			this.commonActions.showLoading();
			const workout = await this.api.getHistoryWorkout(completedWorkout.id).toPromise();
			this.navCtrl.navigateForward('/previously-completed-workout/' + completedWorkout.id, {
				state: { workout: workout.workout },
			});
			this.commonActions.hideLoading();
		} catch (error) {
			this.commonActions.showErrorResponseAlert(error);
		}
	}

	public async getWorkoutCategories() {
		try {
			const response = await this.api.getWorkoutCategories().toPromise();
			this.workoutCategories = this.buildTopLevelCategories(response.categories);
		} catch (error) {
			this.commonActions.showErrorResponseAlert(error);
		}
	}

	public buildTopLevelCategories(allCategories) {
		let categoryList = [];
		let currentValue = null;
		for (let i = 0; i < allCategories.length; i++) {
			if (allCategories[i].parent_id == null) {
				currentValue = this.buildCategory(allCategories[i].name, allCategories[i].id);
				categoryList.push(currentValue);
			}
		}

		// Adds all to category list
		categoryList.push({ name: 'All', id: null });

		//Get last item of category list
		let lastIndex = categoryList.length - 1;

		// Set selected category to last item in the list
		this.selectedCategory = categoryList[lastIndex];

		this.selectedCategory.historyRequest = {
			page: 1,
			per_page: 15,
			parent_category_id: null,
		};

		// display List instead of loading
		this.categoryLoading = false;

		// get items by category
		this.getHistoryByCategory();

		return categoryList;
	}

	private buildCategory(categoryName, category_id) {
		const item = {
			name: categoryName,
			id: category_id,
			historyRequest: {
				page: 1,
				per_page: 15,
				parent_category_id: null,
			},
		};
		return item;
	}

	public showActivity(category) {
		this.emptyResults = false;
		this.selectedCategory = category;
		this.selectedCategory.historyRequest.parent_category_id = this.selectedCategory.id;
		this.getHistoryByCategory();
	}

	public async getHistoryByCategory() {
		let itemAlreadyQuiered = this.checkHistory();

		if (itemAlreadyQuiered == false) {
			this.loading = true;
			await this.getHistoryApiCall();
			this.loading = false;
		}
	}

	public checkHistory() {
		if (this.history.length == 0) {
			return false;
		} else {
			for (let i = 0; i < this.history.length; i++) {
				let categoryGroup = this.history[i];
				if (this.selectedCategory.name == categoryGroup.category.name) {
					return true;
				}
			}
			return false;
		}
	}

	public async getHistoryApiCall() {
		try {
			const response = await this.api.history(this.selectedCategory.historyRequest).toPromise();
			if (response.workouts.length < 1) {
				this.emptyResults = true;
			} else {
				let historyItem = this.buildHistoryResponse(this.selectedCategory, response.workouts);
				this.history.push(historyItem);
			}
		} catch (error) {
			this.commonActions.showErrorResponseAlert(error);
		}
	}

	public async getMoreHistory(event) {
		this.selectedCategory.historyRequest.page += 1;
		try {
			const response = await this.api.history(this.selectedCategory.historyRequest).toPromise();
			let historyItem = this.buildHistoryResponse(this.selectedCategory, response.workouts);
			this.mergeHistoryItems(historyItem);

			setTimeout(async () => {
				const elements = this.elRef.nativeElement.querySelectorAll('.date-title');
				if (elements.length > 0) {
					// Select the last element
					const lastElement = elements[elements.length - 1];
					// Scroll to the last element
					lastElement.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
				}
				event.target.complete();
			}, 300);
			if (response.workouts.length == 0) {
				event.target.disabled = true;
			}
		} catch (error) {
			this.commonActions.showErrorResponseAlert(error);
		}
	}

	public mergeHistoryItems(historyItem) {
		let incomingWorkouts = {
			category: historyItem.category.name,
			olderThan8Weeks: historyItem.olderThan8Weeks,
			within8Weeks: historyItem.within8Weeks,
		};

		this.history.forEach((category, i) => {
			if (category.name === incomingWorkouts.category.name) {
				let mergedOlderThan8Weeks = [...this.history[i].olderThan8Weeks, ...incomingWorkouts.olderThan8Weeks];
				let mergedWithin8Weeks = [...this.history[i].within8Weeks, ...incomingWorkouts.within8Weeks];
				this.history[i].olderThan8Weeks = this.groupWorkoutsBasedOnDate(mergedOlderThan8Weeks);
				this.history[i].within8Weeks = this.groupWorkoutsBasedOnDate(mergedWithin8Weeks);
			}
		});
	}

	private groupWorkoutsBasedOnDate(workouts) {
		const result = {};

		workouts.forEach((item) => {
			if (result[item.date]) {
				// If the date already exists in result, merge the values
				result[item.date].values = [...result[item.date].values, ...item.values];
			} else {
				// If the date does not exist, create a new entry
				result[item.date] = { ...item };
			}
		});

		// Convert the result object back into an array
		const mergedArray = Object.values(result);

		return mergedArray;
	}

	private calculateDate8WeeksAgo() {
		const today = new Date();
		return new Date(today.getFullYear(), today.getMonth(), today.getDate() - 56);
	}

	private buildHistoryResponse(selectedCategory, values) {
		let eightWeeksAgo = this.calculateDate8WeeksAgo();

		const currentCategory = {
			category: selectedCategory,
			olderThan8Weeks: [],
			within8Weeks: [],
		};

		for (const [key, value] of Object.entries(values)) {
			let workouts: any = value;
			let dayDate = new Date(key);

			const currentDay = {
				date: key,
				values: [],
			};

			for (let i = 0; i < workouts.length; i++) {
				currentDay.values.push(workouts[i]);
			}

			if (dayDate < eightWeeksAgo) {
				currentCategory.olderThan8Weeks.push(currentDay);
			} else {
				currentCategory.within8Weeks.push(currentDay);
			}
		}

		return currentCategory;
	}

	public sortCategoryWorkouts() {}

	public formatDate(date) {
		let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

		let dateToFormat;

		if (this.platform.is('ios')) {
			dateToFormat = new Date(date.replace(/\s/, 'T'));
		} else {
			dateToFormat = new Date(date);
		}

		// Get Function Parameter & Format Date for Frontend
		let year = dateToFormat.getFullYear();
		let month = months[dateToFormat.getMonth()];
		let dt = dateToFormat.getDate();
		let formatDate = dt + ' ' + month + ' ' + year;

		if (dt < 10) {
			dt = 0 + dt;
		}

		// Get Function Parameter Date Formatted For Comparison
		let currentDatetoFormat = new Date(dateToFormat).toISOString().slice(0, 10);

		// Get Todays Date Formatted
		let today = new Date();
		let todayWithoutTime = today.toISOString().slice(0, 10);

		// Get Yesterdays Date Formatted
		let yesterday = new Date(today);
		yesterday.setDate(today.getDate() - 1);
		let yesterdayWithoutTime = yesterday.toISOString().slice(0, 10);

		if (currentDatetoFormat === todayWithoutTime) {
			formatDate = 'Today';
		}

		if (currentDatetoFormat === yesterdayWithoutTime) {
			formatDate = 'Yesterday';
		}

		return formatDate;
	}
}
