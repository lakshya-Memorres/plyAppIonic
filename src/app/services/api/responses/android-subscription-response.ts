export class AndroidSubscriptionResponse {
	public success: boolean;

	constructor(data: AndroidSubscriptionResponse) {
		if (data.success) {
			this.success = data.success;
		}
	}
}
