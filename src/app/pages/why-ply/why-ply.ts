import { Component, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AnalyticsService } from 'src/app/services/analytics-service';
import { ApiService } from 'src/app/services/api.service';
import { CommonActionsService } from 'src/app/services/common-actions.service';

@Component({
	selector: 'app-why-ply',
	templateUrl: './why-ply.html',
	styleUrls: ['./why-ply.scss'],
})
export class WhyPlyPage {
	public whyPly;
	public title;

	constructor(
		private navCtrl: NavController,
		private analyticsService: AnalyticsService,
		private api: ApiService,
		private commonActions: CommonActionsService
	) {}

	public async ngOnInit(): Promise<void> {
		this.commonActions.showLoading();
		await this.getWhyPly();
		this.commonActions.hideLoading();
	}

	public ionViewDidEnter() {
		this.analyticsService.trackScreen('why-ply');
	}

	public async getWhyPly() {
		try {
			const response = await this.api.getWhyPly().toPromise();
			this.whyPly = response.data.body;
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
}
