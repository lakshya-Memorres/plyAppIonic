import { Component, Input } from '@angular/core';
import { CancelWorkoutModalPage } from '../../modals/cancel-workout-modal/modal.page';
import { ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage-service';

@Component({
	selector: 'app-workout-header',
	templateUrl: 'workout-header.html',
	styleUrls: ['workout-header.scss'],
})
export class WorkoutHeaderComponent {
	@Input() workout;
	@Input() workoutUpdated;
	@Input() routeOrigin;

	constructor(
		public modalCtrl: ModalController,
		private storage: StorageService
	) {}

	public async ngOnInit(): Promise<void> {}

	async confirmCancelWorkout() {
		const cancelWorkoutModal = await this.modalCtrl.create({
			component: CancelWorkoutModalPage,
			componentProps: {
				workout: this.workout,
				routeOrigin: this.routeOrigin,
			},
		});
		this.storage.remove('workout');
		return await cancelWorkoutModal.present();
	}
}
