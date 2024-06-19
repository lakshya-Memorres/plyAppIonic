import { Component, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AnalyticsService } from 'src/app/services/analytics-service';

@Component({
	selector: 'app-thanks',
	templateUrl: './thanks.html',
	styleUrls: ['./thanks.scss'],
})
export class ThanksPage {
	userSubscription: string;

	constructor(
		private navCtrl: NavController,
		private analyticsService: AnalyticsService
	) {}

	public ionViewDidEnter() {
		this.analyticsService.trackScreen('thanks');
	}

	public goBack() {
		this.navCtrl.pop();
	}
}
