import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonActionsService } from '../../services/common-actions.service';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage-service';

@Component({
	selector: 'app-login-as-page',
	templateUrl: './login-as.html',
	styleUrls: ['./login-as.scss'],
})
export class LoginAsPage {
	public email: string = null;
	public validationErrors = {
		errors: {
			email: [],
		},
		message: '',
	};
	public platfromType: string = null;
	public hasNetworkConntection: boolean;
	public originalEmail: string;

	@ViewChild('emailInput') emailInputElement: ElementRef;

	constructor(private api: ApiService, private storage: StorageService, private navCtrl: NavController, private commonActions: CommonActionsService, public platform: Platform, private alertCtrl: AlertController) {}

	public async ngOnInit(): Promise<void> {
		if (this.platform.is('android')) {
			this.platfromType = 'android';
		}
		if (this.platform.is('ios')) {
			this.platfromType = 'ios';
		}
	}

	public goToForgotDashboard() {
		this.navCtrl.navigateForward('/dashboard');
	}

	public async loginAs() {
		this.clearValidationErrors();
		this.commonActions.showLoading();
		this.commonActions.isOnline().subscribe((isOnline) => (this.hasNetworkConntection = isOnline));
		if (this.hasNetworkConntection === true) {
			try {
				const originalUser =  await this.storage.get('user');
				const response = await this.api
					.loginAs({
						email: this.email,
					})
					.toPromise();
				this.storage.set('originalUser', originalUser);
			    this.storage.set('user', response.user);
				this.storage.set('api:token', response.token);
				this.storage.remove('workout');
				this.storage.remove('workoutUpdated');
				this.api.setToken(await this.storage.get('api:token'));
				this.commonActions.hideLoading();
				this.navCtrl.navigateForward('/dashboard');
			} catch (error) {
				if (error.errors) {
					let errorMessage = '';
					for (const [key, value] of Object.entries(error.errors)) {
						this.validationErrors.errors[key] = value;
						errorMessage += value + '<br/>';
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
		} else {
			this.commonActions.showNoNetworkAlert();
		}
	}

	public cancel() {
		this.navCtrl.pop();
	}

	public clearValidationErrors() {
		this.validationErrors.errors.email = [];
		this.validationErrors.message = '';
	}
}
