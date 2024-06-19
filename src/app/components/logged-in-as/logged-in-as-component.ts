import { Component, Input } from '@angular/core';
import { User } from 'src/app/services/api/models';
import { StorageService } from 'src/app/services/storage-service';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { CommonActionsService } from 'src/app/services/common-actions.service';

@Component({
	selector: 'app-logged-in-as-component',
	templateUrl: 'logged-in-as-component.html',
	styleUrls: ['logged-in-as-component.scss'],
})
export class LoggedInAsComponent {
	@Input() user: User;
	public isOpen: boolean = false;

	constructor(private api: ApiService, private navCtrl: NavController, private storage: StorageService, private commonActions: CommonActionsService) {}

	public toggleLoggedInAs() {
		this.isOpen = !this.isOpen;
	}

	public async logoutAltUser() {
		this.commonActions.showLoading();
		try {
			const originalUser = await this.storage.get('originalUser');
			const response = await this.api
				.loginAs({
					email: originalUser.email,
				})
				.toPromise();
		 	this.storage.set('user', response.user);
			this.storage.set('api:token', response.token);
			this.storage.remove('originalUser');
			this.storage.remove('workout');
			this.storage.remove('workoutUpdated');
			this.api.setToken(await this.storage.get('api:token'));
			this.commonActions.hideLoading();
			this.navCtrl.navigateForward('/dashboard');
		} catch (error) {
			console.log(error);
		}
	}
}
