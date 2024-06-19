import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { Motivations } from '../../services/api/models/motivations';
import { CommonActionsService } from '../../services/common-actions.service';
import { UpdateProfileRequest } from '../../services/api/requests';
import { StorageService } from 'src/app/services/storage-service';
import { AnalyticsService } from 'src/app/services/analytics-service';

@Component({
	selector: 'app-setup-your-profile-page',
	templateUrl: './setup-your-profile.html',
	styleUrls: ['./setup-your-profile.scss'],
})
export class SetUpYourProfilePage implements OnInit {
	private currentUser;
	public units: string = 'imperial';
	public motivations: Motivations[] = [];

	public request: UpdateProfileRequest = {
		name: '',
		email: '',
		gender: '',
		height: '',
		motivations: [],
		units: '',
		weight: '',
	};

	public validationErrors = {
		errors: {
			gender: [],
			units: [],
			height: [],
			weight: [],
			motivations: [],
		},
		message: '',
	};

	constructor(
		private api: ApiService,
		private navCtrl: NavController,
		private commonActions: CommonActionsService,
		private storage: StorageService,
		private analyticsService: AnalyticsService,
		private alertCtrl: AlertController,
	) {}

	public async ngOnInit(): Promise<void> {
		await this.listMotivations();
		await this.storage.get('user').then((data) => {
			this.currentUser = data;
		});
	}

	public ionViewDidEnter() {
		this.analyticsService.trackScreen('setup-your-profile');
	}

	public goToLogin() {
		this.navCtrl.navigateForward('/');
	}

	public goToDashboard() {
		this.navCtrl.navigateForward('/dashboard');
	}

	public checkMotivations(event) {
		let selectedValue = parseInt(event.target.defaultValue);
		if (this.request.motivations.includes(selectedValue)) {
			let index = this.request.motivations.indexOf(selectedValue);
			this.request.motivations.splice(index, 1);
		} else {
			this.request.motivations.push(selectedValue);
		}
	}

	public objectContains(array, object) {
		for (var i = array.length - 1; i > -1; i--) {
			if (array[i].id === object.id) {
				array.splice(i, 1);
				return true;
			}
		}
		return false;
	}

	public checkPlaceholder(event) {
		if (event.classList.contains('placeholder')) {
			event.classList.remove('placeholder');
		}
	}

	public async listMotivations() {
		const response = await this.api.getMotivations().toPromise();
		this.motivations = response.motivations;
	}

	public async updateProfile() {
		this.clearValidationErrors();
		this.commonActions.showLoading();
		this.request.email = this.currentUser.email;
		this.request.name = this.currentUser.name;
		this.request.height = this.request.height.toString();
		this.request.weight = this.request.weight.toString();
		try {
			await this.api.updateProfile(this.request).toPromise();
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
			if (this.validationErrors.errors.gender.length === 0 && this.validationErrors.errors.units.length === 0 && this.validationErrors.errors.height.length === 0 && this.validationErrors.errors.weight.length === 0 && this.validationErrors.errors.motivations.length === 0) {
				this.navCtrl.navigateForward('/dashboard');
			}
		}
	}

	public clearValidationErrors() {
		this.validationErrors.errors.gender = [];
		this.validationErrors.errors.units = [];
		this.validationErrors.errors.height = [];
		this.validationErrors.errors.weight = [];
		this.validationErrors.errors.motivations = [];
		this.validationErrors.message = '';
	}
}
