/* tslint:disable:indent */
import { Component, Input, OnInit } from '@angular/core';
import { SubscriptionService } from '../../services/subscription-service';

@Component({
	selector: 'app-subscription',
	templateUrl: 'subscription.html',
	styleUrls: ['subscription.scss'],
})
export class SubscriptionComponent implements OnInit {
	@Input() type: string;
	@Input() message: string;
	@Input() userSubscription: number;
	@Input() keyExists: boolean;

	constructor(private subscriptionService: SubscriptionService) {}

	public async ngOnInit(): Promise<void> {
		await this.subscriptionService.getProducts();
	}

	public async subscribe() {
		if (this.userSubscription == 0 && !this.keyExists || this.userSubscription == null && !this.keyExists) {
			await this.subscriptionService.showSubscriptionOptionsPicker();
		}
	}
}
