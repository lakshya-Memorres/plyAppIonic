import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
	selector: 'app-submit-workout-modal',
	templateUrl: './submit-workout-modal.html',
	styleUrls: ['./submit-workout-modal.scss'],
})
export class SubmitWorkoutModal implements OnInit {
	constructor(
		public modalCtrl: ModalController,
		private navCtrl: NavController
	) {}

	ngOnInit() {}

	dismiss() {
		this.modalCtrl.dismiss({ SubmitData: 'false' });
	}

	submitWorkout() {
		this.modalCtrl.dismiss({ SubmitWorkout: 'true' });
	}
}
