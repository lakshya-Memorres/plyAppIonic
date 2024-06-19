import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../../services/subscription-service';
import { ModalController, NavController } from '@ionic/angular';
import { Subject, Subscription } from 'rxjs';
import { DeleteAccountModal } from '../../modals/delete-account-modal/delete-account-modal';
import { User } from 'src/app/services/api/models';
import { StorageService } from 'src/app/services/storage-service';
import { CommonActionsService } from 'src/app/services/common-actions.service';

@Component({
	selector: 'app-link-list',
	templateUrl: 'link-list.html',
	styleUrls: ['link-list.scss'],
})
export class LinkListComponent implements OnInit {
	private storageSubscription: Subscription;
	public userSubscription = null;
	public onDestroy: Subject<void> = new Subject<void>();
	public user: User = null;
	public keyExists: boolean = false;

	constructor(
		private navCtrl: NavController,
		private subscriptionService: SubscriptionService,
		private modalCtrl: ModalController,
		private storage: StorageService,
		private commonActions: CommonActionsService
	) {
		this.storageSubscription = this.storage.watch('user').subscribe((user) => {
			this.user = user;
			this.checkIfKeyExistsInStorage('originalUser');
			this.userSubscription = this.commonActions.checkSubscription();
		});
	}

	async ngOnInit(): Promise<void> {
		this.user = await this.storage.get('user');
		this.checkIfKeyExistsInStorage('originalUser');
		await this.subscriptionService.getProducts();
	}

	ngOnDestroy(): void {
		if (this.storageSubscription) {
			this.storageSubscription.unsubscribe();
		}
	}

	public goToHelpSupport() {
		this.navCtrl.navigateForward('/help-and-support');
	}

	public logout() {
		this.commonActions.confirmLogOutWorkout();
	}

	public async goToSubscription() {
		if (this.userSubscription == 0 || this.userSubscription == null) {
			await this.subscriptionService.showSubscriptionOptionsPicker();
		} else {
			this.navCtrl.navigateForward('/subscription-management');
		}
	}

	public goToTerms() {
		this.navCtrl.navigateForward('/terms-conditions');
	}

	public goToPrivacyPolicy() {
		this.navCtrl.navigateForward('/privacy-policy');
	}

	public goToWhyPly() {
		this.navCtrl.navigateForward('/why-ply');
	}

	public async deleteAccount() {
		const deleteAccountModal = await this.modalCtrl.create({
			component: DeleteAccountModal,
			cssClass: 'delete-account-modal',
		});
		return await deleteAccountModal.present();
	}

	public async loginAs() {
		this.navCtrl.navigateForward('/login-as');
	}

	private async checkIfKeyExistsInStorage(key: string) {
		this.keyExists = await this.commonActions.checkIfKeyExistsInStorage(key);
	}
}
