import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { AnalyticsService } from 'src/app/services/analytics-service';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { StorageService } from 'src/app/services/storage-service';

@Component({
	selector: 'app-subscription-management',
	templateUrl: './subscription-management.html',
	styleUrls: ['./subscription-management.scss'],
})
export class SubscriptionManagementPage implements OnInit {
	public loading = true;
	public subscription = null;
	public subscriptionProduct = null;
	public manageLink = null;
	public user = null;
	public expiresAt = null;

	constructor(
		private api: ApiService,
		private navCtrl: NavController,
		private platform: Platform,
		private analyticsService: AnalyticsService,
		private iab: InAppBrowser,
		private storage: StorageService
	) {}

	public ionViewDidEnter() {
		this.analyticsService.trackScreen('subscription-management');
	}

	public goBack() {
		this.navCtrl.navigateForward('/more');
	}

	public goToManageLink() {
		let options: InAppBrowserOptions = {
			location: 'no', //Or 'no'
			hidden: 'no', //Or  'yes'
			hideurlbar: 'yes', //Or 'no'
		};

		if (this.platform.is('desktop') || this.platform.is('mobileweb')) {
			window.open(this.manageLink, '_blank');
		} else {
			this.iab.create(this.manageLink, '_blank', options);
		}
	}

	public async ngOnInit() {
		const products = await this.api.getSubscriptionProducts().toPromise();
		const platformProducts = this.platform.is('ios')
			? products.ios
			: products.android;

		this.user = await this.storage.get('user');
		this.subscription = await this.user.settings.subscription;

		if(this.subscription.type == 'ios' && this.platform.is('ios')){
			this.manageLink = 'https://apps.apple.com/account/subscriptions';
		} else if(this.subscription.type == 'ios') {
			this.manageLink = "https://support.apple.com/en-gb/guide/ipad/ipadee10c6e7/ipados"
		} else {
			this.manageLink = "https://support.google.com/googleplay/answer/7018481?hl=en-GB&co=GENIE.Platform%3DDesktop"
		}

		this.subscriptionProduct = platformProducts.filter((product) => {
			return product.id === this.subscription.subscription_id;
		});

		this.loading = false;
	}
}
