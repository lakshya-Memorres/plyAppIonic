import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { SubscriptionService } from '../../services/subscription-service';
import { Subject, Subscription } from 'rxjs';
import { StorageService } from 'src/app/services/storage-service';
import { User } from 'src/app/services/api/models';
import { CommonActionsService } from 'src/app/services/common-actions.service';

@Component({
	selector: 'app-subscription-modal',
	templateUrl: 'subscription-modal.page.html',
	styleUrls: ['subscription-modal.page.scss'],
})
export class SubscriptionModalPage implements OnInit {
	@ViewChild('modal') modal: ElementRef;

	private storageSubscription: Subscription;
	public user: User = null;
	public keyExists: boolean = false;
	public userSubscription;
	public price;
	public onDestroy: Subject<void> = new Subject<void>();

	constructor(
		private SubscriptionModalController: ModalController,
		private navCtrl: NavController,
		private subscriptionService: SubscriptionService,
		private storage: StorageService,
		private commonActions: CommonActionsService
	) {
		this.storageSubscription = this.storage.watch('user').subscribe(async () => {
			this.checkIfKeyExistsInStorage('originalUser');
			this.userSubscription = await this.commonActions.checkSubscription();
		});
	}

	async ngOnInit(): Promise<void> {
		this.checkIfKeyExistsInStorage('originalUser');
		this.userSubscription = await this.commonActions.checkSubscription();
		await this.subscriptionService.getProducts();
	}

	ngOnDestroy(): void {
		this.onDestroy.next();
		if (this.storageSubscription) {
			this.storageSubscription.unsubscribe();
		}
	}

	public async subscribe() {
		if (this.userSubscription == 0 || this.userSubscription == null) {
			this.dismiss();
			await this.subscriptionService.showSubscriptionOptionsPicker();
		}
	}

	dismiss() {
		this.SubscriptionModalController.dismiss();
	}

	goToSubcription() {
		this.navCtrl.navigateForward('/dashboard');
	}

	private async checkIfKeyExistsInStorage(key: string) {
		this.keyExists = await this.commonActions.checkIfKeyExistsInStorage(key);
	}
}
