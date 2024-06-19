import { Component, Input, OnInit } from '@angular/core';
import { SubscriptionService } from '../../services/subscription-service';

@Component({
	selector: 'app-subscription-small',
	templateUrl: 'subscription-small.html',
	styleUrls: ['subscription-small.scss'],
})
export class SubscriptionSmallComponent implements OnInit {
	@Input() userSubscription: number;
	@Input() keyExists: boolean;

	constructor(private subscriptionService: SubscriptionService) {}

	public async ngOnInit(): Promise<void> {}

	public async subscribe() {
		if (this.userSubscription == 0 || this.userSubscription == null) {
			await this.subscriptionService.showSubscriptionOptionsPicker();
		}
	}
}
