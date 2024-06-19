import { Component, Input } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { Routes } from '@angular/router';

@Component({
	selector: 'app-tabs',
	templateUrl: 'tabs.html',
	styleUrls: ['tabs.scss'],
})
export class TabsComponent {
	@Input() selectedIndex;

	public tabIndex = 1;

	constructor(public navCtrl: NavController) {}

	public async ngOnInit(): Promise<void> {
		this.tabIndex = parseInt(this.selectedIndex);
	}

	public goToDashBoard() {
		this.navCtrl.navigateForward('/dashboard');
	}

	public goToLogin() {
		this.navCtrl.navigateForward('/');
	}

	public goToMore(index) {
		this.navCtrl.navigateForward('/more');
	}

	public goToMyPly(index) {
		this.navCtrl.navigateForward('/my-ply');
	}

	ionViewDidEnter() {
		// this.tabRef.select(0);
	}
}
