import { Component, Input } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
	selector: 'app-back-button',
	templateUrl: 'back-button.html',
	styleUrls: ['back-button.scss'],
})
export class BackButtonComponent {
	@Input() torgButton = 'false';

	constructor(private navCtrl: NavController) {}

	public goBack() {
		this.navCtrl.pop();
	}
}
