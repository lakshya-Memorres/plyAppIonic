import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSlides, NavController } from '@ionic/angular';
import { AnalyticsService } from 'src/app/services/analytics-service';

@Component({
	selector: 'app-on-boarding-page',
	templateUrl: './on-boarding.html',
	styleUrls: ['./on-boarding.scss'],
})
export class OnBoardingPage implements OnInit {
	@ViewChild('slides', { static: true }) slider: IonSlides;
	@ViewChild('container') container;
	@ViewChild('plyLogo') plyLogo;

	public sliderEnd = false;
	public currentSlide;

	public slideOpts = {
		noSwiping: true,
		initialSlide: 0,
		speed: 400,
	};

	constructor(
		private navCtrl: NavController,
		private analyticsService: AnalyticsService
	) {}

	public ionViewDidEnter() {
		this.analyticsService.trackScreen('on-boarding');
	}

	async slideChanged() {
		// checkClassList(slide3, 'swiper-slide-active', 'onBoardingSlideThree', this.container);
		this.sliderEnd = await this.slider.isEnd();
	}

	public goToRegister() {
		this.navCtrl.navigateForward('/register');
	}

	public goToDashboard() {
		this.navCtrl.navigateForward('/dashboard');
	}

	public async ngOnInit() {}
}
