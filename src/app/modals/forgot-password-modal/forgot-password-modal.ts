import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
	selector: 'app-forgot-password-modal',
	templateUrl: './forgot-password-modal.html',
	styleUrls: ['./forgot-password-modal.scss'],
})
export class ForgotPasswordModal implements OnInit {
	@Input() message;

	constructor(
		public modalCtrl: ModalController,
		private navCtrl: NavController
	) {}

	ngOnInit() {}

	dismiss() {
		this.modalCtrl.dismiss();
	}

	async goToLogin(): Promise<any> {
		this.modalCtrl.dismiss();
		this.navCtrl.navigateForward('/');
	}
}
