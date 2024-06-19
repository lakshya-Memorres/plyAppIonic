import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage-service';

@Component({
	selector: 'app-cancel-workout-modal',
	templateUrl: './modal.page.html',
	styleUrls: ['./modal.page.scss'],
})
export class CancelWorkoutModalPage {
	@Input() workout;
	@Input() routeOrigin;

	constructor(
		public modalCtrl: ModalController,
		private navCtrl: NavController,
		private storage: StorageService
	) {}

	dismiss() {
		this.modalCtrl.dismiss();
	}

	cancelWorkout() {
		this.modalCtrl.dismiss();
		this.storage.remove('workoutUpdated');
		this.goToWorkout();
	}

	public goToWorkout() {
		if (this.routeOrigin === 'history') {
			this.navCtrl.pop();
		} else {
			this.navCtrl.navigateForward('/workout/' + this.workout.id, {
				animated: true,
				animationDirection: 'forward',
				state: { workout: this.workout },
			});
		}
	}
}
