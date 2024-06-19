import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonActionsService } from '../../services/common-actions.service';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage-service';
import { AnalyticsService } from '../../services/analytics-service';

@Component({
	selector: 'app-login-page',
	templateUrl: './login.html',
	styleUrls: ['./login.scss'],
})
export class LoginPage {
	public email: string = null;
	public password: string = null;
	public validationErrors = {
		errors: {
			email: [],
			password: []
		},
		message: ''
	};
	public platfromType: string = null;
	public hasNetworkConntection: boolean;

	@ViewChild('emailInput') emailInputElement: ElementRef;

	constructor(
		private api: ApiService,
		private storage: StorageService,
		private navCtrl: NavController,
		private commonActions: CommonActionsService,
		public platform: Platform,
		private analyticsService: AnalyticsService,
		private alertCtrl: AlertController,
	){}

	public async ngOnInit(): Promise<void> {
		if (this.platform.is('android')) {
			this.platfromType = 'android';
		}
		if (this.platform.is('ios')) {
			this.platfromType = 'ios';
		}
	}

	public ionViewDidEnter() {
		this.analyticsService.trackScreen('login');
	}

	public goToRegister() {
		this.navCtrl.navigateForward('/register');
	}

	public goToForgotPassword() {
		this.navCtrl.navigateForward('/forgot-password');
	}

	public goToForgotDashboard() {
		this.navCtrl.navigateForward('/dashboard');
	}

	public async login() {
		this.clearValidationErrors();
		this.commonActions.showLoading();
		this.commonActions.isOnline().subscribe((isOnline) => (this.hasNetworkConntection = isOnline));
		if(this.hasNetworkConntection === true){
			try {
				const response = await this.api
					.login({
						email: this.email,
						password: this.password,
					})
					.toPromise();
				this.storage.set('user', response.user);
			 	this.storage.set('api:token', response.token);
				this.api.setToken(await this.storage.get('api:token'));
				this.commonActions.hideLoading();
				this.redirectUserOnResponse(response.user);
			} catch (error) {
				if (error.errors) {
					let errorMessage = '';
					for (const [key, value] of Object.entries(error.errors)) {
						this.validationErrors.errors[key] = value;
						errorMessage += value + "<br/>";
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
		}else{
			this.commonActions.showNoNetworkAlert();
		}

	}

	public clearValidationErrors() {
		this.validationErrors.errors.email = [];
		this.validationErrors.errors.password = [];
		this.validationErrors.message = '';
	}


	public redirectUserOnResponse(response) {
		if (response.settings.gender === null) {
			this.navCtrl.navigateForward('/setup-your-profile');
		} else {
			this.navCtrl.navigateForward('/dashboard');
		}
	}

}
