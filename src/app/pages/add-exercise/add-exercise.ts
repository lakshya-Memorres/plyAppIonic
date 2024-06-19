import { Component, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { Workout } from '../../services/api/models/workout';
import { Excercise } from '../../services/api/models/exercise';
import { Router } from '@angular/router';
import { CommonActionsService } from '../../services/common-actions.service';
import { AnalyticsService } from 'src/app/services/analytics-service';
import { StorageService } from 'src/app/services/storage-service';

@Component({
	selector: 'app-add-exercise-page',
	templateUrl: './add-exercise.html',
	styleUrls: ['./add-exercise.scss'],
})
export class AddExercisePage {
	@ViewChild('type') type;

	public workout: Workout = null;
	public loading: boolean = true;
	public hideTopLevelCategories: boolean = false;
	public hideSubLevelCategories: boolean = false;
	public topLevelCategories = [];
	public subLevelCategoriesAndExercises = [];
	public currentIndex = 0;

	constructor(
		private navCtrl: NavController,
		private router: Router,
		private api: ApiService,
		private commonActions: CommonActionsService,
		private storage: StorageService,
		private analyticsService: AnalyticsService
	) {
		if (this.router.getCurrentNavigation().extras.state == undefined) {
			this.navCtrl.navigateForward('/dashboard');
		}
		this.workout = this.router.getCurrentNavigation().extras.state.workout;
	}

	public async ngOnInit(): Promise<void> {
		await this.getExercisesCategories();
	}

	public ionViewDidEnter() {
		this.analyticsService.trackScreen('add-exercise');
	}

	public goBack() {
		this.navCtrl.navigateForward('/workout/' + this.workout.id, {
			state: { workout: this.workout },
		});
	}

	public async getExercisesCategories() {
		try {
			const response = await this.api.getExerciseCategories().toPromise();
			this.topLevelCategories = response.categories;
			this.loading = false;
		} catch (error) {
			this.commonActions.showErrorResponseAlert(error);
		}
	}

	public async getExerciseCategoriesByID(categoryID) {
		this.loading = true;
		try {
			const response = await this.api
				.getExerciseCategoriesByID(categoryID)
				.toPromise();
			this.subLevelCategoriesAndExercises.push(response);
			this.hideTopLevelCategories = true;
			this.loading = false;
		} catch (error) {
			this.commonActions.showErrorResponseAlert(error);
		}
	}

	public getSubLevelCategories($event) {
		this.currentIndex++;
		this.getExerciseCategoriesByID($event.category.id);
	}

	public clearSelectedSubLevelItems(i) {
		this.hideSubLevelCategories = true;
		let root = this;
		this.loading = true;
		setTimeout(function () {
			root.subLevelCategoriesAndExercises.splice(i, 1);
			if (root.subLevelCategoriesAndExercises.length < 1) {
				root.hideTopLevelCategories = false;
				root.hideSubLevelCategories = true;
				root.currentIndex = 0;
			} else {
				root.currentIndex--;
			}
			root.loading = false;
		}, 1000);
	}

	public async addExercises($event) {
		let setOption = $event.setOption;
		let exercise = $event.exercise;
		let leftProperty = setOption[0];
		let rightProperty = setOption[1];
		let sets = [];
		let deafaultNumberOfSets = 1;

		for (let i = 0; i < deafaultNumberOfSets; i++) {
			let order = i + 1;
			let setItemLeft = this.buildSet(order, leftProperty, null);
			let setItemRight = this.buildSet(order, rightProperty, null);
			sets.push(setItemLeft);
			sets.push(setItemRight);
		}

		exercise.sets = sets;

		exercise.text_overwrite = false;
		exercise.value_overwrite = false;

		this.workout.exercises.push(exercise);

		await this.storage.set('workoutUpdated', this.workout);

		this.navCtrl.navigateForward('/customise-workout/' + this.workout.id, {
			state: { workout: this.workout },
		});
	}

	//Build Sets for payload
	private buildSet(order, key, value) {
		let defaultValue;

		if (key === 'Distance') {
			defaultValue = 0;
		}

		if (key === 'Load') {
			defaultValue = 0;
		}

		if (key === 'N/A' || key === 'Cals' || key === 'Av Watts') {
			defaultValue = 0;
		}

		if (key === 'Reps') {
			defaultValue = 0;
		}
		if (key === 'Weight') {
			defaultValue = 0;
		}

		if (key === 'Time') {
			defaultValue = 0;
		}

		const set = {
			order: order,
			key: key,
			value: null,
		};

		return set;
	}
}
