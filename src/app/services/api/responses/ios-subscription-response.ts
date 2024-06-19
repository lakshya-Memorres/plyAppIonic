export class IosSubscriptionResponse {
	public sandbox: boolean;
	public status?: number;
	public success: boolean;

	constructor(data: IosSubscriptionResponse) {
		if (data.sandbox) {
			this.sandbox = data.sandbox;
		}
		if (data.status) {
			this.status = data.status;
		}
		if (data.success) {
			this.success = data.success;
		}
	}
}
