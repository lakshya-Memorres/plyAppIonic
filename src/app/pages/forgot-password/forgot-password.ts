import { Component } from '@angular/core';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { CommonActionsService } from '../../services/common-actions.service';
import { ApiService } from '../../services/api.service';
import { AnalyticsService } from 'src/app/services/analytics-service';
import { ForgotPasswordModal } from '../../modals/forgot-password-modal/forgot-password-modal';

@Component({
	selector: 'app-forgot-password-page',
	templateUrl: './forgot-password.html',
	styleUrls: ['./forgot-password.scss'],
})
export class ForgotPasswordPage {
	public email: string = null;

	constructor(
		private api: ApiService,
		private navCtrl: NavController,
		private commonActions: CommonActionsService,
		private loadingCtrl: LoadingController,
		private analyticsService: AnalyticsService,
		public modalCtrl: ModalController
	) {}

	public goToLogin() {
		this.navCtrl.navigateForward('/');
	}

	public ionViewDidEnter() {
		this.analyticsService.trackScreen('forgot-password');
	}

	public goToSetUpProfile() {
		this.navCtrl.navigateForward('/setup-your-profile');
	}

	public async forgotPassword() {
		try {
			const response = await this.api
				.forgotPassword({
					email: this.email,
				})
				.toPromise();
			if(response.message){
				const forgotPasswordModal = await this.modalCtrl.create({
					component: ForgotPasswordModal,
					cssClass: 'logout-modal',
					componentProps: {
						message: response.message,
					},
				});
				forgotPasswordModal.present();
			}
		} catch (error) {
			this.commonActions.showErrorResponseAlert(error);
		} finally {
			await this.commonActions.hideLoading();
		}
	}


}
