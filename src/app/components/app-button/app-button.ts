import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
    selector: 'app-button',
    templateUrl: 'app-button.html',
    styleUrls: ['app-button.scss'],
})
export class AppButtonComponent {

	constructor(
        private navCtrl: NavController,
	) {}

}
