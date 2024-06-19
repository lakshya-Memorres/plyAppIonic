import { Component, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AnalyticsService } from 'src/app/services/analytics-service';

@Component({
	selector: 'app-payment-thanks',
	templateUrl: './payment-thanks.html',
	styleUrls: ['./payment-thanks.scss'],
})
export class PaymentThanks {
	userSubscription: string;

	constructor(
		private navCtrl: NavController,
		private analyticsService: AnalyticsService
	) {}

	public ionViewDidEnter() {
		this.analyticsService.trackScreen('payment-thanks');
	}

	public goToLogin() {
		this.navCtrl.navigateForward('/');
	}

	public cancelSubscription() {
		this.navCtrl.navigateForward('/cancel-subscription');
	}
}
