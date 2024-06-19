import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
	selector: 'app-logout-modal',
	templateUrl: './logout-modal.html',
	styleUrls: ['./logout-modal.scss'],
})
export class LogoutModal implements OnInit {
	constructor(
		public modalCtrl: ModalController,
		private navCtrl: NavController
	) {}

	ngOnInit() {}

	async dismiss() {
		this.modalCtrl.dismiss({ Logout: 'false' });
	}

	async logout(): Promise<any> {
		this.modalCtrl.dismiss({ Logout: 'true' });
	}
}
