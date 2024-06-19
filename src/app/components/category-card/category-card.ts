import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
	selector: 'app-category-card',
	templateUrl: 'category-card.html',
	styleUrls: ['category-card.scss'],
})
export class CategoryCardComponent {
	@Input() category;
	@Output() ParentGetExerciseCategoriesByID = new EventEmitter();

	constructor(private navCtrl: NavController) {}

	public getExerciseCategoriesByID() {
		this.ParentGetExerciseCategoriesByID.emit({ category: this.category });
	}

	public goTovideo() {
		this.navCtrl.navigateForward('/video/' + this.category.id);
	}
}
