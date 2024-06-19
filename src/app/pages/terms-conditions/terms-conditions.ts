import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AnalyticsService } from 'src/app/services/analytics-service';
import { ApiService } from 'src/app/services/api.service';
import { CommonActionsService } from '../../services/common-actions.service';

@Component({
	selector: 'app-terms-conditions',
	templateUrl: './terms-conditions.html',
	styleUrls: ['./terms-conditions.scss'],
})
export class TermsConditionsPage {
	public termsConditions;
	public title;

	constructor(
		private navCtrl: NavController,
		private commonActions: CommonActionsService,
		private analyticsService: AnalyticsService,
		private api: ApiService
	) {}

	public async ngOnInit(): Promise<void> {
		this.commonActions.showLoading();
		await this.getTermsConditions();
		this.commonActions.hideLoading();
	}

	public ionViewDidEnter() {
		this.analyticsService.trackScreen('terms-conditions');
	}

	public async getTermsConditions() {
		try {
			const response = await this.api.getTermsConditions().toPromise();
			this.termsConditions = response.data.body;
			this.title = response.data.title;
		} catch (error) {
			this.commonActions.showErrorResponseAlert(error);
		}
	}

	public goBack() {
		this.navCtrl.navigateForward('/more');
	}

	public goToLogin() {
		this.navCtrl.navigateForward('/');
	}

	public cancelSubscription() {
		this.navCtrl.navigateForward('/cancel-subscription');
	}
}
