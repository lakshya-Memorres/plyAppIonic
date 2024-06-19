import { Component, Input } from '@angular/core';


@Component({
	selector: 'app-workout-card',
	templateUrl: 'workout-card.html',
	styleUrls: ['workout-card.scss'],
})
export class WorkoutCardComponent {
	@Input() userSubscription: number;
	@Input() keyExists: boolean;
	@Input() workout;

	constructor() {}
}
