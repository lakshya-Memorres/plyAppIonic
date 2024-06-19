import { Component} from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
    selector: 'app-workout-card-options',
    templateUrl: 'workout-card-options.html',
    styleUrls: ['workout-card-options.scss'],
})
export class WorkoutCardOptionsComponent {

	constructor(
		private navCtrl: NavController
	) {}

	goToWorkout(){
		this.navCtrl.navigateForward('/previously-completed-workout');
	}

	goToVideo(){
		this.navCtrl.navigateForward('/video');
	}

}
