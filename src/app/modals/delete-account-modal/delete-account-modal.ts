import { Component, Input, NgModule, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { CommonActionsService } from 'src/app/services/common-actions.service';
import { User } from 'src/app/services/api/models';

@NgModule({
	imports: [CommonModule],
	declarations: [],
	providers: [],
	exports: [],
})
@Component({
	selector: 'delete-account-modal',
	templateUrl: 'delete-account-modal.html',
	styleUrls: ['delete-account-modal.scss'],
})
export class DeleteAccountModal implements OnInit {
	public user: User;
	public title: string = 'Account Deletion';
	public description: string;
	public userSubscription = null;
	public onDestroy: Subject<void> = new Subject<void>();

	constructor(public DeleteAccountModalController: ModalController, private navCtrl: NavController, private api: ApiService, public modalCtrl: ModalController, private commonActions: CommonActionsService) {}

	public async ngOnInit(): Promise<void> {
		this.getProfile();
		this.userSubscription = await this.commonActions.checkSubscription();
		if (this.userSubscription == 0 || this.userSubscription == null) {
			this.description = 'Are you sure you want to delete your account?';
		} else {
			this.description = 'Please cancel your description before deleting your account.';
		}
	}

	private async getProfile() {
		try {
			const response = await this.api.getProfile().toPromise();
			this.user = response.user;
		} catch (error) {
			this.commonActions.showErrorResponseAlert(error);
		}
	}

	public dismiss() {
		this.DeleteAccountModalController.dismiss();
	}

	public goToSubcriptionManagement() {
		this.modalCtrl.dismiss();
		this.navCtrl.navigateForward('/subscription-management');
	}

	public async confirmAccountDelete() {
		this.modalCtrl.dismiss();
		try {
			const response = await this.api.deleteAccount().toPromise();
			this.commonActions.showSimpleAlert('Account Deleted', response.message);
		} catch (error) {
			this.commonActions.showErrorResponseAlert(error);
		} finally {
			this.commonActions.handleLogOut();
		}
	}
}
