import { Component, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AnalyticsService } from 'src/app/services/analytics-service';
import { version, versionNumber } from '../../../../package.json';

@Component({
	selector: 'app-more',
	templateUrl: './more.html',
	styleUrls: ['./more.scss'],
})
export class MorePage {
	userSubscription: string;
	version: any;
	versionNumber: any;

	constructor(private navCtrl: NavController, private analyticsService: AnalyticsService) {}

	public ionViewDidEnter() {
		this.version = version;
		this.versionNumber = versionNumber;
		this.analyticsService.trackScreen('more');
	}

	public goToLogin() {
		this.navCtrl.navigateForward('/');
	}

	public cancelSubscription() {
		this.navCtrl.navigateForward('/cancel-subscription');
	}
}
