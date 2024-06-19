import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Device } from '@ionic-native/device/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { StorageService } from './services/storage-service';
import { NativeStorageMock } from './services/mocks/native-storage.mock';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { ComponentsModule } from './components/components.module';
import { Facebook } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FullscreenService } from './services/full-screen-service';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { InAppPurchase } from '@ionic-native/in-app-purchase/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { SignInWithApple, AppleSignInResponse, AppleSignInErrorResponse, ASAuthorizationAppleIDRequest } from '@awesome-cordova-plugins/sign-in-with-apple/ngx';


export function createNativeStorage() {
	const instanceClass =
		typeof (window as any).cordova !== 'undefined'
			? NativeStorage
			: NativeStorageMock;
	return new instanceClass();
}

@NgModule({
	declarations: [AppComponent],
	entryComponents: [],
	imports: [
		AppRoutingModule,
		BrowserModule,
		ComponentsModule,
		IonicModule.forRoot(),
		HttpClientModule,
		PagesModule,
		BrowserAnimationsModule,
		DragDropModule,
	],
	providers: [
		StatusBar,
		SplashScreen,
		Device,
		StorageService,
		SocialSharing,
		Keyboard,
		{ provide: NativeStorage, useFactory: createNativeStorage },
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
		Facebook,
		GooglePlus,
		InAppBrowser,
		FullscreenService,
		FirebaseX,
		InAppPurchase,
		ScreenOrientation,
		SignInWithApple
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
