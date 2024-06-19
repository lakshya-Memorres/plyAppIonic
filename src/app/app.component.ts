import { Component } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { ApiService } from './services/api.service';
import { StorageService } from './services/storage-service';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Subject, Subscription } from 'rxjs';
import { User } from './services/api/models';
import { CommonActionsService } from './services/common-actions.service';
import Build from '../environments/build.json';
import { ENVIRONMENTS } from './app-constants';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
})
export class AppComponent {
	private storageSubscription: Subscription;
	public userSubscription: boolean;
	public onDestroy: Subject<void> = new Subject<void>();
	public user: User;
	public keyExists: boolean = false;

	constructor(
		private api: ApiService,
		private platform: Platform,
		private navCtrl: NavController,
		private storage: StorageService,
		private keyboard: Keyboard,
		private screenOrientation: ScreenOrientation,
		private commonActions: CommonActionsService,
	) {
		this.initializeApp();
		this.storageSubscription = this.storage.watch('user').subscribe((user) => {
			this.user = user;
			this.checkIfKeyExistsInStorage('originalUser');
		});
	}

	initializeApp() {
		this.platform.ready().then(async () => {
			this.setAPIRoot();
			await this.prepareApiSession();
			this.keyboard.hideFormAccessoryBar(false);
			this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
		});
	}

	ngOnDestroy(): void {
		if (this.storageSubscription) {
			this.storageSubscription.unsubscribe();
		}
	}

	public async prepareApiSession() {
		if (await this.storage.has('api:token')) {
			this.api.setToken(await this.storage.get('api:token'));
			try {
				let session = await this.api.getProfile().toPromise();
				this.user = session.user;
				this.storage.set('user', session.user);
				console.log(this.user);
			} catch (error) {
				console.log(error);
			} finally {
				this.checkIfKeyExistsInStorage('originalUser');
			}
		}
		this.storage.remove('workoutUpdated');
		this.checkAppStorage();
	}

	public async checkAppStorage() {
		if (await this.storage.has('plyHasRanBefore')) {
			this.redirectUserBasedonToken();
		} else {
			this.storage.set('plyHasRanBefore', 'true');
			this.navCtrl.navigateForward('/on-boarding');
		}
	}

	public async redirectUserBasedonToken() {
		if (await this.storage.has('user')) {
			this.navCtrl.navigateForward('/dashboard');
		} else {
			this.navCtrl.navigateForward('/');
		}
	}

	private async checkIfKeyExistsInStorage(key: string) {
		this.keyExists = await this.commonActions.checkIfKeyExistsInStorage(key);
	}

	private setAPIRoot() {
		if (Build.BRANCH === null) {
			this.api.setEnvironment(ENVIRONMENTS.LOCAL);
		} else if (Build.BRANCH === 'production') {
			this.api.setEnvironment(ENVIRONMENTS.PRODUCTION);
		} else if (Build.BRANCH === 'staging') {
			this.api.setEnvironment(ENVIRONMENTS.STAGING);
		} else if (Build.BRANCH === 'develop') {
			this.api.setEnvironment(ENVIRONMENTS.STAGING);
		} else if (Build.BRANCH === 'local') {
			this.api.setEnvironment(ENVIRONMENTS.LOCAL);
		}
	}
}
