/* tslint:disable:variable-name curly */
import { AbstractModel } from './abstract-model';

export class AuthResponse extends AbstractModel {
    public accessToken: string = null;
	public userID: string = null;
	public expiresIn: string = null;
	public signedRequest: string = null;
	public graphDomain: string = null;
	public data_access_expiration_time: string = null

    public fill(data: Partial<AuthResponse>) {
		if (data.accessToken) {
            this.accessToken = data.accessToken;
        }
		if (data.expiresIn) {
            this.expiresIn = data.expiresIn;
        }
		if (data.signedRequest) {
            this.signedRequest = data.signedRequest;
        }
		if (data.userID) {
            this.userID = data.userID;
        }
		if (data.graphDomain) {
            this.graphDomain = data.graphDomain;
        }
    }
}
