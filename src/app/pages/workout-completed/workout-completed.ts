import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { WorkoutResult } from '../../services/api/models/workout-result';
import { CommonActionsService } from 'src/app/services/common-actions.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ApiService } from '../../services/api.service';
import { AnalyticsService } from 'src/app/services/analytics-service';

@Component({
	selector: 'app-workout-completed-page',
	templateUrl: './workout-completed.html',
	styleUrls: ['./workout-completed.scss'],
})
export class WorkoutCompletedPage {
	@ViewChild('page') pageElement: ElementRef;

	public workoutCompleted;
	public workoutDuration: WorkoutResult;
	public personalBests = [];
	public previousPersonalBestsRaw;
	public queuedFavourite;
	public unit = null;
	public loading: boolean = true;
	public pbImage = '';

	constructor(
		private api: ApiService,
		private navCtrl: NavController,
		private router: Router,
		private commonActions: CommonActionsService,
		private socialSharing: SocialSharing,
		private analyticsService: AnalyticsService,
	) {
		if (this.router.getCurrentNavigation().extras.state == undefined) {
			this.navCtrl.navigateForward('/dashboard');
		}
		this.workoutCompleted =
			this.router.getCurrentNavigation().extras.state.workoutCompleted;
		this.workoutDuration =
			this.router.getCurrentNavigation().extras.state.workoutDuration;
		this.queuedFavourite =
			this.router.getCurrentNavigation().extras.state.queuedFavourite;
	}

	public async ngOnInit(): Promise<void> {
		this.personalBests = await this.buildPersonalBests(
			this.workoutCompleted.new_personal_bests
		);

		this.unit = await this.commonActions.checkUnits();

		if (this.queuedFavourite != null) {
			if (this.queuedFavourite.action === 'add') {
				this.commonActions.addFavourite(
					this.workoutCompleted.workout.id,
					true
				);
			} else if (this.queuedFavourite.action === 'remove') {
				this.commonActions.removeFavourite(
					this.workoutCompleted.workout.id,
					true
				);
			}
		}

		await this.getPreviousPersonalBests();
	}

	public ionViewDidEnter() {
		this.analyticsService.trackScreen('workout-completed');
	}

	public formatDate(date) {
		let today = new Date();
		let formattedDate = '';
		if (date == today) {
			formattedDate = 'Today';
		} else {
			formattedDate = this.commonActions.formatDate(date);
		}
		return formattedDate;
	}

	// public sharePersonalBest(message, subject, url) {
	// 	this.socialSharing.share(message, subject, null, url);
	// }

	public async shareCelebration() {
		let message = 'The journey continues with ply.life.';

		let sharedImage =
			this.workoutCompleted.workout.celebration_image.file_path;

		let options = {
			message: message,
			subject: 'The journey continues with ply.life',
			image: sharedImage,
			chooserTitle: 'Ply',
			iPadCoordinates: '0,0,0,0',
		};

		let share = await this.socialSharing.share(
			null,
			options.subject,
			options.image,
			null
		);
		this.pageElement.nativeElement.focus();
		this.pageElement.nativeElement.blur();
	}

	public async sharePersonalBest(item, type, category) {
		let message = this.commonActions.formatPBs(
			type,
			item,
			this.unit,
			category
		);

		let options = {
			message: message,
			subject: 'I’ve set a new PB with ply.life',
			image: this.pbImage,
			chooserTitle: 'I’ve set a new PB with ply.life',
			appPackageName: 'com.apple.social.facebook',
			iPadCoordinates: '0,0,0,0',
		};

		let share = await this.socialSharing.share(
			null,
			options.subject,
			options.image,
			null
		);
		this.pageElement.nativeElement.focus();
		this.pageElement.nativeElement.blur();
	}

	public async getPreviousPersonalBests() {
		try {
			const response = await this.api.getUserPersonalBest().toPromise();
			this.previousPersonalBestsRaw = response[0];
		} catch (error) {
			this.commonActions.hideLoading();
			this.commonActions.showErrorResponseAlert(error);
		} finally {
			this.loading = false;
		}
	}

	public async buildPersonalBests(response) {
		let items = [];
		for (const [category, exercises] of Object.entries(response)) {
			let item = this.buildResult(category, exercises);
			this.pbImage = item.exercises.celebration_image.file_path;
			delete item.exercises.celebration_image;
			items.push(item);
		}
		return items;
	}

	private buildResult(category, exercises) {
		const item = {
			category: category,
			exercises: exercises,
		};
		return item;
	}

	public buildPersonalBestCategories() {
		let categoryList = [];
		let currentValue = null;
		for (const [key] of Object.entries(this.previousPersonalBestsRaw)) {
			currentValue = key;
			if (!categoryList.includes(currentValue)) {
				categoryList.push(currentValue);
			}
		}
		return categoryList;
	}
}
