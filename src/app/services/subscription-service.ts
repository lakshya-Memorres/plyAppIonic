/* tslint:disable:indent no-trailing-whitespace */
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { Injectable } from '@angular/core';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { InAppPurchase } from '@ionic-native/in-app-purchase/ngx';
import { ApiService } from './api.service';
import { CommonActionsService } from './common-actions.service';
import { Observable, Subject } from 'rxjs';
import {
	AndroidSubscriptionResponse,
	IosSubscriptionResponse,
} from './api/responses';
import { PickerOptions } from '@ionic/core';
import { PickerController } from '@ionic/angular';
import { Bugfender } from 'cordova-plugin-bugfender/www/bugfender';
import { SubscriptionModalPage } from '../modals/subscription-modal/subscription-modal.page';

type SubscriptionResponse = IosSubscriptionResponse &
	AndroidSubscriptionResponse;

@Injectable({
	providedIn: 'root',
})
export class SubscriptionService {
	public columns = [];
	public numColumns: number = 1; // number of columns to display on picker over lay
	public defaultID = null;
	public defaultProduct;
	public defaultPrice;

	private onSubscribeSubject: Subject<SubscriptionResponse> = new Subject<SubscriptionResponse>();

	constructor(
		private inAppPurchase: InAppPurchase,
		private platform: Platform,
		private api: ApiService,
		private commonActions: CommonActionsService,
		private navCtrl: NavController,
		private pickerCtrl: PickerController,
		private SubscriptionModalController: ModalController,
	) {}

	public get onSubscribe(): Observable<SubscriptionResponse> {
		return this.onSubscribeSubject.asObservable();
	}

	public async getProducts() {
		const products = await this.api.getSubscriptionProducts().toPromise();

		const platformProducts = this.platform.is('ios') ? products.ios : products.android;

		let productIDs = await this.formatProducts(platformProducts);
		this.columns = await this.inAppPurchase.getProducts(productIDs);

		this.defaultID = await this.setDefaultID(platformProducts);
		this.defaultProduct = await this.checkProductsForDefault();
		this.defaultPrice = this.defaultProduct.price;
	}

	public async showSubscriptionOptionsPicker() {
		let options: PickerOptions = {
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel',
				},
				{
					text: 'Ok',
					handler: (product: any) => {
						this.commonActions.showLoading();
						this.subscribe(product.col.value);
					},
				},
			],
			columns: this.getColumns(),
		};
		let picker = await this.pickerCtrl.create(options);
		picker.present();
	}

	public async subscribe(product) {
		try {
			const response = await this.inAppPurchase.subscribe(product);
			if (this.platform.is('android')) return this.addAndroidSubscription(response);
			if (this.platform.is('ios')) return this.addIosSubscription(response);
		} catch (error) {
			console.log(error); // log the error message
			await this.commonActions.hideLoading();
		}
	}

	public async addIosSubscription(response) {
		let apiResponse;
		try {
			apiResponse = await this.api.postSubscriptioniOS({ receipt: response.receipt }).toPromise();
			this.onSubscribeSubject.next(apiResponse);
			await this.commonActions.hideLoading();
			if (apiResponse.success === true) {
				this.navCtrl.navigateForward('/payment-thanks');
			}
		} catch (error) {
			await this.commonActions.hideLoading();
			this.commonActions.showErrorResponseAlert(error);
		}
	}

	public async addAndroidSubscription(response) {
		let apiResponse;
		let receipt = JSON.parse(response.receipt);
		let purchaseToken = receipt.purchaseToken;
		let subscriptionId = receipt.productId;
		try {
			apiResponse = await this.api
				.postSubscriptionAndroid({
					purchase_token: purchaseToken,
					subscription_id: subscriptionId,
				})
				.toPromise();
			this.onSubscribeSubject.next(apiResponse);
			await this.commonActions.hideLoading();
			if (apiResponse.success === true) {
				this.navCtrl.navigateForward('/payment-thanks');
			}
		} catch (error) {
			await this.commonActions.hideLoading();
			this.commonActions.showErrorResponseAlert(error);
		}
	}

	private getColumns() {
		let columns = [];
		for (let i = 0; i < this.numColumns; i++) {
			columns.push({
				name: `col`,
				options: this.getColumnOptions(i),
			});
		}
		return columns;
	}

	private getColumnOptions(columIndex: number) {
		let options = [];
		let numOptions = this.columns.length;
		for (let i = 0; i < numOptions; i++) {
			options.push({
				text: this.columns[i].title + ' ' + this.columns[i].price,
				value: this.columns[i].productId,
			});
		}
		return options;
	}

	private formatProducts(platformProducts) {
		let productIDs = [];
		for (let i = 0; i < platformProducts.length; i++) {
			let productID = platformProducts[i].id;
			productIDs.push(productID);
		}
		return productIDs;
	}

	private setDefaultID(platformProducts) {
		let id;
		for (let i = 0; i < platformProducts.length; i++) {
			if (platformProducts[i].default == true) {
				id = platformProducts[i].id;
			}
		}
		return id;
	}

	private checkProductsForDefault() {
		let product;
		for (let i = 0; i < this.columns.length; i++) {
			if (this.columns[i].productId === this.defaultID) {
				product = this.columns[i];
			}
		}
		return product;
	}
}
