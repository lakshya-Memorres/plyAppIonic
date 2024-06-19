import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';


@Component({
	selector: 'app-want-more-cta',
	templateUrl: 'want-more-cta.html',
	styleUrls: ['want-more-cta.scss'],
})

export class WantMoreComponent {
	constructor(
		private navCtrl: NavController,
	) {}

	public goToHelpSupport() {
		this.navCtrl.navigateForward('/help-and-support');
	}

	public goToPlyLife() {
		console.log('link should go here');
	}

}
