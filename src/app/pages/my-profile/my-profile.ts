import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { User } from '../../services/api/models/user';
import { ApiService } from '../../services/api.service';
import { CommonActionsService } from '../../services/common-actions.service';
import { UpdateProfileRequest } from '../../services/api/requests';
import { Motivations } from '../../services/api/models/motivations';
import { AnalyticsService } from 'src/app/services/analytics-service';
import { StorageService } from 'src/app/services/storage-service';

@Component({
	selector: 'app-my-profile-page',
	templateUrl: './my-profile.html',
	styleUrls: ['./my-profile.scss'],
})
export class MyProfilePage implements OnInit {
	public loading = true;
	private user: User = null;
	public motivations: Motivations[] = [];
	public request: UpdateProfileRequest = {
		name: '',
		email: '',
		gender: 'male',
		height: '',
		motivations: [],
		units: '',
		weight: '',
	};

	constructor(
		private api: ApiService,
		private navCtrl: NavController,
		private commonActions: CommonActionsService,
		private analyticsService: AnalyticsService,
		private storage: StorageService
	) {}

	public async ngOnInit(): Promise<void> {
		this.loading = true;
		await this.listMotivations();
		await this.getProfile();
	}

	public ionViewDidEnter() {
		this.analyticsService.trackScreen('my-profile');
	}

	public goToLogin() {
		this.navCtrl.navigateForward('/');
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

	public isSelected(motivation) {
		let currentID = parseInt(motivation.id);
		for (let i = 0; i < this.request.motivations.length; i++) {
			if (this.request.motivations[i] === currentID) {
				return true;
			}
		}
		return false;
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

	private buildRequestMotivations(motivations) {
		let array = [];
		for (let i = 0; i < motivations.length; i++) {
			array.push(motivations[i].id);
		}
		return array;
	}

	private async getProfile() {
		try {
			const response = await this.api.getProfile().toPromise();
			this.user = response.user;
			this.request.email = this.user.email;
			this.request.name = this.user.name;
			this.request.gender = this.user.settings.gender;
			this.request.height = this.user.settings.height_cm.toString();
			this.request.motivations = this.buildRequestMotivations(
				this.user.settings.user_motivations
			);
			this.request.units = this.user.settings.units;
			this.request.weight = this.user.settings.weight.toString();
		} catch (error) {
			console.log(error);
			this.commonActions.showErrorResponseAlert(error);
		} finally {
			this.loading = false;
		}
	}

	public async updateProfile() {
		this.request.height = this.request.height.toString();
		this.request.weight = this.request.weight.toString();
		this.commonActions.showLoading();
		try {
			await this.api.updateProfile(this.request).toPromise();
		} catch (error) {
			this.commonActions.showErrorResponseAlert(error);
		} finally {
			this.updateLocalUser();
		}
		this.commonActions.hideLoading();
	}

	private async updateLocalUser() {
		try {
			const response = await this.api.getProfile().toPromise();
			this.storage.set('user', response.user);
			this.commonActions.showSimpleAlert(
				'Success',
				'Your profile has been updated.'
			);
		} catch (error) {
			this.commonActions.showErrorResponseAlert(error);
		}
	}
}
