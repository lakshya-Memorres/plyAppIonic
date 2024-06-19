import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AnalyticsService } from 'src/app/services/analytics-service';
import { ApiService } from 'src/app/services/api.service';
import { CommonActionsService } from '../../services/common-actions.service';

@Component({
	selector: 'app-privacy-policy',
	templateUrl: './privacy-policy.html',
	styleUrls: ['./privacy-policy.scss'],
})
export class PrivacyPolicyPage {
	public privacyPolicy;
	public title;

	constructor(
		private navCtrl: NavController,
		private commonActions: CommonActionsService,
		private analyticsService: AnalyticsService,
		private api: ApiService
	) {}

	public async ngOnInit(): Promise<void> {
		this.commonActions.showLoading();
		await this.getPrivacyPolicy();
		this.commonActions.hideLoading();
	}

	public ionViewDidEnter() {
		this.analyticsService.trackScreen('privacy-policy');
	}

	public async getPrivacyPolicy() {
		try {
			const response = await this.api.getPrivacyPolicy().toPromise();
			this.privacyPolicy = response.data.body;
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
