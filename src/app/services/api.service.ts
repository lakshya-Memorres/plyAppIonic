import {
	HttpClient,
	HttpErrorResponse,
	HttpEvent,
	HttpEventType,
	HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Environment, ENVIRONMENTS } from '../app-constants';
import {
	ErrorResponse,
	ForbiddenError,
	InternalServerError,
	NotFoundError,
	UnauthorizedError,
	UnprocessableEntityError,
} from './api/errors';
import { RequestOptions } from './api/interfaces';
import {
	LoginRequest,
	GoogleLoginRequest,
	FacebookRequest,
	CreateSessionRequest,
	RegisterRequest,
	UpdateProfileRequest,
	WorkoutsRequest,
	FavouriteRequest,
	ForgotPasswordRequest,
	HistoryRequest,
	IosSubscriptionRequest,
	AndroidSubscriptionRequest,
	LoginAsRequest,
} from './api/requests';
import {
	LoginResponse,
	CreateSessionResponse,
	GetMotivationsResponse,
	GetCurrentSessionResponse,
	RegisterResponse,
	UpdateProfileResponse,
	GetHelpSupportResponse,
	GetDashboardContentResponse,
	GetWorkoutCategoriesResponse,
	GetProfileResponse,
	GetWorkoutResponse,
	GetWorkoutsResponse,
	GetCombinableWorkoutResponse,
	GetSimilarWorkoutResponse,
	AddFavouriteResponse,
	RemovedFavouriteResponse,
	GetAddExerciseResponse,
	ForgotPasswordResponse,
	GetHistoryResponse,
	AndroidSubscriptionResponse,
	IosSubscriptionResponse,
	SubscriptionProductResponse,
	GetRecentWorkoutsGraphResponse,
} from './api/responses';

@Injectable({
	providedIn: 'root',
})
export class ApiService {
	private token: string = null;

	constructor(private http: HttpClient) {}

	// tslint:disable-next-line:variable-name
	private _environment: Environment;

	public get environment(): Environment {
		return this._environment || ENVIRONMENTS.LOCAL;
	}

	public set environment(environment: Environment) {
		this._environment = environment;
	}

	public get endpoint(): string {
		return this.environment.url;
	}

	// Get Requests

	// public getDashboardContent(): Observable<GetDashboardContentResponse> {
	// 	return this.get('/dashboard').pipe(map(response => new GetDashboardContentResponse(response)));
	// }

	public getDashboardContent() {
		return this.get('/dashboard').pipe(map((response) => response));
	}

	public getWorkoutCategories() {
		return this.get('/workouts/categories').pipe(map((response) => response));
	}

	public getWorkoutCategory(id) {
		return this.get('/workouts/categories/' + id).pipe(map((response) => response));
	}

	public getCustomWorkouts() {
		return this.post('/workouts/custom').pipe(map((response) => response));
	}

	public getWorkout(id) {
		return this.get('/workouts/' + id).pipe(map((response) => response));
	}

	public getCombinableWorkouts(id) {
		return this.get('/workouts/' + id + '/combinable').pipe(map((response) => response));
	}

	public getSimilarWorkouts(id) {
		return this.get('/workouts/' + id + '/similar').pipe(map((response) => response));
	}

	public getAddExercises(): Observable<GetAddExerciseResponse> {
		return this.get('/workout/add-exercise').pipe(map((response) => new GetAddExerciseResponse(response)));
	}

	// public getProfile(): Observable<GetProfileResponse> {
	// 	return this.get('/user/profile').pipe(map(response => new GetProfileResponse(response)));
	// }

	public getProfile() {
		return this.get('/user/profile').pipe(map((response) => response));
	}

	public getMotivations(): Observable<GetMotivationsResponse> {
		return this.get('/config/motivations').pipe(map((response) => new GetMotivationsResponse(response)));
	}

	public getFavourites() {
		return this.get('/workout/favourites').pipe(map((response) => response));
	}

	public getUserPersonalBest() {
		return this.get('/user/personal-best').pipe(map((response) => response));
	}

	public getWorkoutHistoryRecent() {
		return this.get('/user/recent-workout-history').pipe(map((response) => response));
	}

	public workoutHistoryByCategory(id) {
		return this.get('/user/workout-history-by-category').pipe(map((response) => response));
	}

	public getHistoryWorkout(id) {
		return this.get('/user/history/' + id).pipe(map((response) => response));
	}

	public getExerciseCategories() {
		return this.get('/exercises/categories').pipe(map((response) => response));
	}

	public getExerciseCategoriesByID(id) {
		return this.get('/exercises/categories/' + id).pipe(map((response) => response));
	}

	// Subscription ProductIDs

	public getSubscriptionProducts(): Observable<SubscriptionProductResponse> {
		return this.get('/subscription/products').pipe(map((response) => new SubscriptionProductResponse(response)));
	}

	public getTermsConditions() {
		return this.get('/more/terms-conditions').pipe(map((response) => response));
	}

	public getPrivacyPolicy() {
		return this.get('/more/privacy-policy').pipe(map((response) => response));
	}

	public getWhyPly() {
		return this.get('/more/why-ply').pipe(map((response) => response));
	}

	public getHelpSupport() {
		return this.get('/more/help').pipe(map((response) => response));
	}

	public getGraphData(): Observable<GetRecentWorkoutsGraphResponse> {
		return this.get('/user/recent-workout-history/graph').pipe(map((response) => new GetRecentWorkoutsGraphResponse(response)));
	}

	// Post Requests

	public login(request: LoginRequest) {
		return this.post('/login', request).pipe(map((response) => response));
	}

	public loginAs(request: LoginAsRequest) {
		return this.post('/loginAs', request).pipe(map((response) => response));
	}

	public facebookLogin(request) {
		return this.post('/login/facebook', request).pipe(map((response) => response));
	}

	public googleLogin(request) {
		return this.post('/login/google', request).pipe(map((response) => response));
	}

	public register(request: RegisterRequest) {
		return this.post('/register', request).pipe(map((response) => new RegisterResponse(response)));
	}

	public updateProfile(request: UpdateProfileRequest) {
		return this.post('/user/profile', request).pipe(map((response) => new UpdateProfileResponse(response)));
	}

	public workouts(request: WorkoutsRequest) {
		return this.post('/workouts', request).pipe(map((response) => new GetWorkoutsResponse(response)));
	}

	public addFavourite(request: FavouriteRequest) {
		return this.post('/workout/favourite/add', request).pipe(map((response) => new AddFavouriteResponse(response)));
	}

	public forgotPassword(request: ForgotPasswordRequest) {
		return this.post('/forgot-password', request).pipe(map((response) => new ForgotPasswordResponse(response)));
	}

	public workoutFinished(request, id) {
		return this.post('/workout/' + id + '/finished', request).pipe(map((response) => response));
	}

	public history(request) {
		return this.post('/user/history', request).pipe(map((response) => response));
	}

	public getExercises(id, request) {
		return this.post('/exercises/' + id + '/exercise-swaps', request).pipe(map((response) => response));
	}

	// Delete Requests
	public removeFavourite(request: FavouriteRequest) {
		return this.post('/workout/favourite/remove', request).pipe(map((response) => new RemovedFavouriteResponse(response)));
	}

	//Post Subscription

	public postSubscriptionAndroid(request: AndroidSubscriptionRequest) {
		return this.post('/subscription/activate/android', request).pipe(map((response) => new AndroidSubscriptionResponse(response)));
	}

	public postSubscriptioniOS(request: IosSubscriptionRequest) {
		return this.post('/subscription/activate/ios', request).pipe(map((response) => new IosSubscriptionResponse(response)));
	}

	public deleteAccount() {
		return this.post('/user/delete').pipe(map((response) => response));
	}

	// Helper Methods
	public get(uri: string): Observable<any> {
		const options = this.getDefaultRequestOptions();
		const url: string = this.endpoint + uri;
		return this.http.get(url, options).pipe(catchError((err) => this.handleError(err)));
	}

	public getDefaultRequestOptions(additionalHeaders?: { [name: string]: any }): RequestOptions {
		return {
			headers: this.getDefaultHeaders(additionalHeaders),
		};
	}

	public getDefaultHeaders(additional?: { [name: string]: any }): HttpHeaders {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
		});

		if (this.token) {
			headers = headers.set('Authorization', 'Bearer ' + this.token);
		}

		if (additional) {
			for (const name in additional) {
				const value = additional[name];
				headers = headers.set(name, value);
			}
		}

		return headers;
	}

	public getEnvironment(): Environment {
		return this.environment;
	}

	public getEnvironmentId(search?: Environment): string {
		if (!search) {
			search = this.environment;
		}
		for (const id in ENVIRONMENTS) {
			const environment = ENVIRONMENTS[id];
			if (environment === search) {
				return id;
			}
		}
		return null;
	}

	public getToken(): string {
		return this.token;
	}

	public handleError(err: HttpErrorResponse) {
		if (err instanceof HttpErrorResponse) {
			if (err.status === 401) {
				return throwError(new UnauthorizedError(err));
			}
			if (err.status === 403) {
				return throwError(new ForbiddenError(err));
			}
			if (err.status === 404) {
				return throwError(new NotFoundError(err));
			}
			if (err.status === 422) {
				return throwError(new UnprocessableEntityError(err));
			}
			if (err.status === 500) {
				return throwError(new InternalServerError(err));
			}
			return throwError(new ErrorResponse(err));
		}
		return throwError(err);
	}

	public post(uri: string, body?: any): Observable<any> {
		return this.postJson(uri, body);
	}

	public postJson(uri: string, body?: any): Observable<any> {
		const options = this.getDefaultRequestOptions();
		const json: string = JSON.stringify(body);
		const url: string = this.endpoint + uri;
		return this.http.post(url, json, options).pipe(catchError((err) => this.handleError(err)));
	}

	public setEnvironment(environment: Environment) {
		this.environment = environment;
	}

	public setEnvironmentById(environmentId: string) {
		this.setEnvironment(ENVIRONMENTS[environmentId]);
	}

	public setEnvironmentByHost(host: string) {
		for (const id in ENVIRONMENTS) {
			const environment = ENVIRONMENTS[id];
			const url = new URL(environment.url);
			if (url.host === host) {
				this.setEnvironment(environment);
				return;
			}
		}
		this.setEnvironment(ENVIRONMENTS.PRODUCTION);
	}

	public setToken(token: string) {
		this.token = token;
	}
}
