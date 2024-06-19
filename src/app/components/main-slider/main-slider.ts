import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Platform } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { CommonActionsService } from 'src/app/services/common-actions.service';

@Component({
	selector: 'app-main-slider',
	templateUrl: 'main-slider.html',
	styleUrls: ['main-slider.scss'],
})
export class MainSliderComponent implements OnInit {
	@Input() featuredWorkouts;
	@Input() title;

	options = 'fullscreen=true,presentationstyle=fullscreen';

	public featuredImage: string = null;

	constructor(
		private api: ApiService,
		private navCtrl: NavController,
		private iab: InAppBrowser,
		public platform: Platform,
		private commonActions: CommonActionsService
	) {}

	public async goToWorkout(featuredWorkout) {
		let type = featuredWorkout.type;
		if (type == 'workout') {
			let id = parseInt(featuredWorkout.target);
			let workout;
			this.commonActions.showLoading();
			try {
				let response = await this.api.getWorkout(id).toPromise();
				workout = response.workout;
			} catch (error) {
				this.commonActions.showErrorResponseAlert(error);
			} finally {
				this.commonActions.hideLoading();
			}
			this.navCtrl.navigateForward('/workout/' + workout.id, {
				state: { workout: workout },
			});
		} else {
			if (this.platform.is('desktop') || this.platform.is('mobileweb') || this.platform.is('android')) {
				window.open(featuredWorkout.target, '_blank');
			} else {
				this.iab.create(
					featuredWorkout.target,
					'_system',
					this.options
				);
			}
		}
	}

	public async ngOnInit(): Promise<void> {
		if (
			this.featuredWorkouts.image == null ||
			this.featuredWorkouts.image == 1
		) {
			this.featuredImage =
				'/assets/images/killing-that-kettlebell-workout.jpg';
		} else {
			this.featuredImage = this.featuredWorkouts.image;
		}
	}
}
