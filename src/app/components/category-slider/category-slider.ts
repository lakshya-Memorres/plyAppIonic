import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { SubscriptionModalPage } from 'src/app/modals/subscription-modal/subscription-modal.page';

@Component({
	selector: 'app-category-slider',
	templateUrl: 'category-slider.html',
	styleUrls: ['category-slider.scss'],
})
export class CategorySliderComponent implements OnInit {
	@Input() workoutCategory;
	@Input() userSubscription: number;
	@Input() keyExists: boolean;

	public workouts = null;
	public favourites: boolean = false;
	public category_id: number;
	public loading: boolean;
	public onDestroy: Subject<void> = new Subject<void>();

	constructor(
		private navCtrl: NavController,
		private SubscriptionModalController: ModalController
	) {}

	public async ngOnInit(): Promise<void> {
		this.workouts = await this.workoutCategory.workouts;
	}

	public goToCategory() {
		let catSlug = this.workoutCategory.name.toLowerCase();
		this.navCtrl.navigateForward('/workout-category/' + catSlug, {
			state: { category: this.workoutCategory },
		});
	}

	public goToWorkout(workout) {
		if (this.userSubscription == 0 && workout.is_premium == 1) {
			this.showSubscriptionModal();
		} else {
			this.navCtrl.navigateForward('/workout/' + workout.id, {
				state: { workout: workout },
			});
		}
	}

	public ngOnDestroy(): void {
		this.onDestroy.next();
	}

	public async showSubscriptionModal() {
		const subscriptionModal = await this.SubscriptionModalController.create({
			component: SubscriptionModalPage,
			cssClass: 'subscriptionModal',
		});
		return await subscriptionModal.present();
	}
}
