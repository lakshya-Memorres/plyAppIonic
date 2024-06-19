import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { CommonActionsService } from '../../services/common-actions.service';
import { AnalyticsService } from 'src/app/services/analytics-service';
import { Subject, Subscription } from 'rxjs';
import { User } from 'src/app/services/api/models';
import { StorageService } from 'src/app/services/storage-service';
import { SubscriptionModalPage } from 'src/app/modals/subscription-modal/subscription-modal.page';

@Component({
	selector: 'app-my-ply',
	templateUrl: './my-ply.html',
	styleUrls: ['./my-ply.scss'],
})
export class MyPlyPage implements OnInit {
	private storageSubscription: Subscription;
	public user: User = null;
	public keyExists: boolean = false;
	public userSubscription;
	public onDestroy: Subject<void> = new Subject<void>();

	constructor(
		private navCtrl: NavController,
		private commonActions: CommonActionsService,
		private analyticsService: AnalyticsService,
		private storage: StorageService,
		private SubscriptionModalController: ModalController
	) {
		this.storageSubscription = this.storage.watch('user').subscribe(async () => {
			this.checkIfKeyExistsInStorage('originalUser');
			this.userSubscription = await this.commonActions.checkSubscription();
		});
	}

	async ngOnInit(): Promise<void> {
		this.checkIfKeyExistsInStorage('originalUser');
		this.userSubscription = await this.commonActions.checkSubscription();
	}

	ngOnDestroy(): void {
		this.onDestroy.next();
		if (this.storageSubscription) {
			this.storageSubscription.unsubscribe();
		}
	}

	public ionViewDidEnter() {
		this.analyticsService.trackScreen('my-ply');
	}

	public goToLogin() {
		this.navCtrl.navigateForward('/');
	}

	public myProfile() {
		this.navCtrl.navigateForward('/my-profile');
	}

	public myProgress() {
		if (this.userSubscription == null || this.userSubscription == 0) {
			this.showSubscriptionModal();
		} else {
			this.navCtrl.navigateForward('/my-progress');
		}
	}

	public myFavourites() {
		if (this.userSubscription == null || this.userSubscription == 0) {
			this.showSubscriptionModal();
		} else {
			this.navCtrl.navigateForward('/my-favourites');
		}
	}

	public myHistory() {
		if (this.userSubscription == null || this.userSubscription == 0) {
			this.showSubscriptionModal();
		} else {
			this.navCtrl.navigateForward('/history');
		}
	}

	private async checkIfKeyExistsInStorage(key: string) {
		this.keyExists = await this.commonActions.checkIfKeyExistsInStorage(key);
	}

	public async showSubscriptionModal() {
		const subscriptionModal = await this.SubscriptionModalController.create({
			component: SubscriptionModalPage,
			cssClass: 'subscriptionModal',
		});
		return await subscriptionModal.present();
	}
}
