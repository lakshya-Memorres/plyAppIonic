import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
	selector: 'app-save-progess-modal-modal',
	templateUrl: './save-progess-modal.html',
	styleUrls: ['./save-progess-modal.scss'],
})
export class SaveProgressModal implements OnInit {
	constructor(
		public modalCtrl: ModalController
	) {}

	ngOnInit() {}

	dismiss() {
		this.modalCtrl.dismiss({ SubmitData: 'false' });
	}

	continueToVideo() {
		this.modalCtrl.dismiss({ ContinueToVideo: 'true' });
	}
}
