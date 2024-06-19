import { Component, ViewChild, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonActionsService } from '../../services/common-actions.service';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { RegisterRequest } from '../../services/api/requests';
import { StorageService } from 'src/app/services/storage-service';
import { AnalyticsService } from 'src/app/services/analytics-service';

@Component({
	selector: 'app-register-page',
	templateUrl: './register.html',
	styleUrls: ['./register.scss'],
})
export class RegisterPage {
	public confirmPassword = '';
	public request: RegisterRequest = {
		email: '',
		name: '',
		password: '',
	};

	public validationErrors = {
		errors: {
			email: [],
			name: [],
			password: [],
			confirmPassword: [],
		},
		message: '',
	};

	constructor(
		private api: ApiService,
		private navCtrl: NavController,
		private commonActions: CommonActionsService,
		private loadingCtrl: LoadingController,
		private storage: StorageService,
		private analyticsService: AnalyticsService,
		private alertCtrl: AlertController
	) {}

	public ionViewDidEnter() {
		this.analyticsService.trackScreen('register');
	}

	public goToSetupProfile() {
		this.navCtrl.navigateForward('/setup-your-profile');
	}

	public goToLogin() {
		this.navCtrl.navigateForward('/');
	}

	public async register() {
		this.clearValidationErrors();
		if (this.request.password !== this.confirmPassword) {
			let message = 'The passwords you have entered do not match.';
			this.commonActions.showSimpleErrorAlert(message);
			this.validationErrors.errors.confirmPassword.push(message);
			return;
		}
		await this.commonActions.showLoading();
		try {
			const response = await this.api.register(this.request).toPromise();
			await this.storage.set('user', response.user);
			await this.storage.set('api:token', response.token);
			this.navCtrl.navigateForward('/setup-your-profile');
		} catch (error) {
			if (error.errors) {
				let errorMessage = '';
				for (const [key, value] of Object.entries(error.errors)) {
					this.validationErrors.errors[key] = value;
					errorMessage += value + '<br/>';
					if (key === 'password') {
						this.validationErrors.errors.confirmPassword[0] = value[0];
					}
				}
				this.validationErrors.message = error.message;
				const alert = await this.alertCtrl.create({
					header: "Sorry, something's not right...",
					message: errorMessage,
					buttons: [
						{
							text: 'OK',
						},
					],
				});
				return alert.present();
			} else if (error.errors == undefined) {
				const alert = await this.alertCtrl.create({
					header: "Sorry, something's not right...",
					message: error.message,
					buttons: [
						{
							text: 'OK',
						},
					],
				});
				return alert.present();
			}
		} finally {
			await this.commonActions.hideLoading();
		}
	}

	public clearValidationErrors() {
		this.validationErrors.errors.name = [];
		this.validationErrors.errors.email = [];
		this.validationErrors.errors.password = [];
		this.validationErrors.errors.confirmPassword = [];
		this.validationErrors.message = '';
	}
}
