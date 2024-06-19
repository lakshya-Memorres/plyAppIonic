import { Injectable } from '@angular/core';
import {
	AlertController,
	LoadingController,
	NavController,
} from '@ionic/angular';
import {
	ErrorResponse,
	InternalServerError,
	UnprocessableEntityError,
} from './api/errors';
import { ModalController } from '@ionic/angular';
import { ApiService } from './api.service';
import { FavouriteRequest } from '../services/api/requests';
import { Observable, Observer, fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { StorageService } from './storage-service';
import { LogoutModal } from '../modals/logout-modal/logout-modal';

@Injectable({
	providedIn: 'root',
})
export class CommonActionsService {
	private loadingElement: HTMLIonLoadingElement;
	public favouriteRequest: FavouriteRequest = {
		workout_id: null,
	};

	constructor(
		private alertCtrl: AlertController,
		private loadingCtrl: LoadingController,
		private api: ApiService,
		private storage: StorageService,
		private navCtrl: NavController,
		private modalCtrl: ModalController
	) {}

	public isOnline() {
		return merge<boolean>(
			fromEvent(window, 'offline').pipe(map(() => false)),
			fromEvent(window, 'online').pipe(map(() => true)),
			new Observable((sub: Observer<boolean>) => {
				sub.next(navigator.onLine);
				sub.complete();
			})
		);
	}

	public showErrorResponseAlert(error: ErrorResponse) {
		if (error instanceof UnprocessableEntityError) {
			return this.showUnprocessableEntityErrorAlert(error);
		}
		if (error instanceof InternalServerError) {
			return this.showInternalServerErrorAlert(error);
		}
		return this.showUnknownErrorAlert(error);
	}

	public showInternalServerErrorAlert(error: InternalServerError) {
		return this.showSimpleErrorAlert('Our servers have experienced an unexpected error. Please try again later.');
	}

	public async showLoading() {
		this.loadingElement = await this.loadingCtrl.create({
			cssClass: 'alert-loader',
			message: 'Please wait...',
		});
		return this.loadingElement.present();
	}

	public async hideLoading() {
		await this.loadingElement.dismiss();
	}

	public async showSimpleAlert(title: string, message: string) {
		const alert = await this.alertCtrl.create({
			header: title,
			message,
			buttons: [
				{
					text: 'OK',
				},
			],
		});
		return alert.present();
	}

	public async showSimpleAlertNavCtrlPop(title: string, message: string, navCtrl: NavController) {
		const alert = await this.alertCtrl.create({
			header: title,
			message,
			buttons: [
				{
					text: 'OK',
					handler: () => {
						navCtrl.pop();
					},
				},
			],
		});
		return alert.present();
	}

	public async showSimpleErrorAlert(message: string) {
		return this.showSimpleAlert("Sorry, something's not right...", message);
	}

	public showUnknownErrorAlert(error: ErrorResponse) {
		return this.showSimpleErrorAlert('An unknown error occurred. Please try again.');
	}

	public showNoNetworkAlert() {
		return this.showSimpleAlert('No Network Connection', 'Please connect to a network and try again.');
	}

	public showUnprocessableEntityErrorAlert(error: UnprocessableEntityError) {
		const errors = [];
		for (const field in error.errors) {
			for (const message of error.errors[field]) {
				errors.push(`<div>${message}</div>`);
			}
		}
		return this.showSimpleErrorAlert(errors.join(''));
	}

	public weight_lbs(value): number {
		return Math.round(value * 2.2046226218);
	}

	public weight_kg(value): number {
		return Math.round(value * 0.45359237);
	}

	public formatDate(date) {
		let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		// let dateToFormat = new Date(date.replace(/\s/, 'T'));
		let dateToFormat = new Date(date);
		let year = dateToFormat.getFullYear();
		let month = months[dateToFormat.getMonth()];
		let dt = dateToFormat.getDate();
		let formatDate = dt + ' ' + month + ' ' + year;
		if (dt < 10) {
			dt = 0 + dt;
		}
		return formatDate;
	}

	public formatTime(date) {
		let dateToFormat = new Date(date);
		let hour = dateToFormat.getHours();
		let minute = dateToFormat.getMinutes();
		let second = dateToFormat.getSeconds();
		let minuteFormatted = minute < 10 ? '0' + minute : minute;
		let secondFormatted = second < 10 ? '0' + second : second;
		return hour + ':' + minuteFormatted + ':' + secondFormatted;
	}

	public numDaysBetween(d1, d2) {
		let diff = Math.abs(d1.getTime() - d2.getTime());
		return diff / (1000 * 60 * 60 * 24);
	}

	public secondsToHms(d) {
		if (d == 0) return 0;

		d = Number(d);
		var h = Math.floor(d / 3600);
		var m = Math.floor((d % 3600) / 60);
		var s = Math.floor((d % 3600) % 60);

		var hDisplay = h > 0 ? h + (h == 1 ? ' hr, ' : " hr's, ") : '';
		var mDisplay = m + (m == 1 ? "'" : "'");
		var sDisplay = s < 10 ? '0' + s + '"' : s + '"';

		if (s == 0) {
			sDisplay = '00"';
		}

		return hDisplay + mDisplay + sDisplay;
	}

	public calculateWorkoutDuration(d1, d2) {
		let milliseconds = new Date(d2).getTime() - new Date(d1).getTime();
		let total = 0;
		let hours = 0;
		let minutes = 0;
		let secs = total;
		while (milliseconds >= 1000) {
			milliseconds = milliseconds - 1000;
			total = total + 1;
		}
		while (total >= 60) {
			total = total - 60;
			minutes = minutes + 1;
			if (minutes >= 60) {
				hours = hours + 1;
			}
			if (minutes == 60) {
				minutes = 0;
			}
		}
		let difference = {
			hours: hours,
			minutes: minutes,
			secs: secs,
		};
		return difference;
	}

	public convertSecsToMins(totalSeconds) {
		const minutes = Math.floor(totalSeconds / 60);
		return minutes;
	}

	public calculateWorkoutDurationMins(value) {
		let milliseconds = value;
		let total = 0;
		let minutes = 0;
		let secs = total;
		while (milliseconds >= 1000) {
			milliseconds = milliseconds - 1000;
			total = total + 1;
		}
		while (total >= 60) {
			total = total - 60;
			minutes = minutes + 1;
		}
		return minutes;
	}

	public async addFavourite(id, silent) {
		this.favouriteRequest.workout_id = id;
		let status;
		try {
			const response = await this.api.addFavourite(this.favouriteRequest).toPromise();
			if (response.added == true) {
				if (silent != true) {
					let title = 'Added to Favourites';
					let message = 'This workout has been added to your favourites.';
					this.showSimpleAlert(title, message);
				}
				status = true;
			}
		} catch (error) {
			status = false;
			if (silent != true) {
				this.showErrorResponseAlert(error);
			}
		} finally {
			await this.hideLoading();
			return status;
		}
	}

	public async removeFavourite(id, silient) {
		this.favouriteRequest.workout_id = id;
		let status;
		try {
			const response = await this.api.removeFavourite(this.favouriteRequest).toPromise();
			if (response.removed == true) {
				if (silient != true) {
					let title = 'Removed from Favourites';
					let message = 'This workout has been removed from your favourites.';
					this.showSimpleAlert(title, message);
				}
				status = true;
			}
		} catch (error) {
			status = false;
			if (silient != true) {
				this.showErrorResponseAlert(error);
			}
		} finally {
			await this.hideLoading();
			return status;
		}
	}

	public formatPBs(type, item, unit, category) {
		//types: list, share, shareWorkoutCompleted
		let message = '';

		let leftAttribute = item.left_attribute;
		let leftValue = getValue(item.left_attribute_value);
		let leftUnit = '';

		let rightAttribute = item.right_attribute;
		let rightValue = getValue(item.value);
		let rightUnit = '';

		function getValue(value) {
			//return (value ? value : 0);
			return value;
		}

		if (leftAttribute == 'Time') {
			leftValue = this.secondsToHms(item.left_attribute_value);
		}
		if (leftAttribute == 'Load') {
			if ((unit = 'metric')) {
				leftUnit = 'kg';
			} else {
				leftUnit = 'lbs';
			}
		} else if (leftAttribute == 'Distance') {
			leftUnit = 'm';
		}

		if (rightAttribute == 'Time') {
			rightValue = this.secondsToHms(item.value);
		}
		if (rightAttribute == 'Load') {
			if ((unit = 'metric')) {
				rightUnit = 'kg';
			} else {
				rightUnit = 'lbs';
			}
		} else if (rightAttribute == 'Distance') {
			rightUnit = 'm';
		}

		if (type == 'shareWorkoutCompleted') {
			message = 'I’ve set a new PB with ply.life. ' + item.name + '. ';
		} else {
			message = item.name + '. ';
		}

		if (category == 'Sweat') {
			message += leftAttribute + ' ' + leftValue + leftUnit;
		}

		if (rightValue != '') {
			if (category == 'Sweat') {
				message += ' ';
			}
			message += rightAttribute + ' ' + rightValue + rightUnit;
		}

		if (type == 'shareWorkoutCompleted') {
			message += '.';
		}

		return message;
	}

	public async checkSubscription() {
		const user = await this.storage.get('user');
		let subscription = user.settings.subscription;
		if (subscription !== null) {
			if (subscription) {
				if (subscription.status === 'active') {
					return 1;
				} else {
					return 0;
				}
			}
		} else {
			return 0;
		}
	}

	public async checkUnits() {
		let user = await this.storage.get('user');
		return user.settings.units;
	}

	public async confirmLogOutWorkout() {
		const cancelWorkoutModal = await this.modalCtrl.create({
			component: LogoutModal,
			cssClass: 'logout-modal',
		});

		cancelWorkoutModal.onDidDismiss().then((data) => {
			if (data['data'].Logout === 'true') {
				this.handleLogOut();
			}
		});

		return await cancelWorkoutModal.present();
	}

	public async checkIfKeyExistsInStorage(key: string): Promise<boolean> {
		try {
			const exists = await this.storage.has(key);
			return exists;
		} catch (error) {
			console.error('Error checking key existence:', error);
			throw error; // or return a default value
		}
	}

	public async handleLogOut() {
		this.storage.remove('api:token');
		this.storage.remove('user');
		this.storage.remove('originalUser');
		this.storage.remove('workout');
		this.storage.remove('workoutUpdated');
		this.navCtrl.navigateRoot('/');
	}
}
