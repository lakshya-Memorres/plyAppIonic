import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CommonActionsService } from '../../services/common-actions.service';
import { ApiService } from '../../services/api.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AnalyticsService } from 'src/app/services/analytics-service';

@Component({
	selector: 'app-my-progress-page',
	templateUrl: './my-progress.html',
	styleUrls: ['./my-progress.scss'],
})
export class MyProgressPage implements OnInit {
	@ViewChild('page') pageElement: ElementRef;

	public personalBestsRaw;
	public personalBestsFormatted;
	public personalBestsCategories;
	public selectOption: string = null;
	public loading: boolean = true;
	public emptyResults = false;
	public unit = null;

	constructor(
		private api: ApiService,
		private navCtrl: NavController,
		private commonActions: CommonActionsService,
		private socialSharing: SocialSharing,
		private analyticsService: AnalyticsService
	) {}

	public async ngOnInit(): Promise<void> {
		this.unit = await this.commonActions.checkUnits();
		await this.getPersonalBests();
	}

	public ionViewDidEnter() {
		this.analyticsService.trackScreen('my-progress');
	}

	public goToLogin() {
		this.navCtrl.navigateForward('/');
	}

	public showActivity(category) {
		this.selectOption = category;
	}

	public async sharePersonalBest(item, type, category) {
		let message = this.commonActions.formatPBs(
			type,
			item.value,
			this.unit,
			category
		);

		let options = {
			message: message,
			subject: "I've set a new PB",
			image: 'https://scaffold.digital/wp-content/themes/scaffold/assets/img/ply-share.png',
			chooserTitle: "I've set a new PB",
			appPackageName: 'com.apple.social.facebook',
			iPadCoordinates: '0,0,0,0',
		};

		this.socialSharing.share(
			null,
			options.subject,
			options.image,
			null
		);

		this.pageElement.nativeElement.focus();
		this.pageElement.nativeElement.blur();
	}

	public formatDate(date) {
		let formattedDate = this.commonActions.formatDate(date);
		return formattedDate;
	}

	public async getPersonalBests() {
		try {
			const response = await this.api.getUserPersonalBest().toPromise();
			this.personalBestsRaw = response[0];
			if (this.personalBestsRaw.length < 1) {
				this.emptyResults = true;
			} else {
				this.personalBestsCategories =
					this.buildPersonalBestCategories();
				this.personalBestsFormatted = this.buildPersonalBests(
					response[0]
				);
			}
		} catch (error) {
			this.commonActions.hideLoading();
			// this.commonActions.showErrorResponseAlert(error);
		} finally {
			this.loading = false;
		}
	}

	public buildPersonalBests(response) {
		let items = [];
		for (const [category, exercises] of Object.entries(response)) {
			let exerciseItems: any = exercises;
			//let sortedByNewestExercises = exerciseItems.reverse();
			let item = this.buildResult(category, exerciseItems);
			delete item.exercises.celebration_image;
			items.push(item);
		}
		items.reverse();
		return items;
	}

	public buildPersonalBestCategories() {
		let categoryList = [];
		let currentValue = null;
		for (const [key] of Object.entries(this.personalBestsRaw)) {
			currentValue = key;
			if (!categoryList.includes(currentValue)) {
				categoryList.push(currentValue);
			}
		}
		let lastIndex = categoryList.length - 1;
		this.selectOption = categoryList[lastIndex];
		return categoryList;
	}

	//Build Sets for payload
	private buildResult(category, exercises) {
		const item = {
			category: category,
			exercises: exercises,
		};
		return item;
	}
}
