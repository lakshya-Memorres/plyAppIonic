export interface FacebookRequest {
	accessToken: string,
	data_access_expiration_time: number,
	userID: string,
	expiresIn: number,
	graphDomain: string,
	signedRequest: string,
}
