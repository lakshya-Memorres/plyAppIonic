import { SubscriptionProduct } from '../models/subscriptionProduct';

export class SubscriptionProductResponse {
	android: Array<SubscriptionProduct>;
	ios: Array<SubscriptionProduct>;

	constructor(data: SubscriptionProductResponse) {
		if (data.android) {
			this.android = SubscriptionProduct.createMany(data.android);
		}
		if (data.ios) {
			this.ios = SubscriptionProduct.createMany(data.ios);
		}
	}
}
