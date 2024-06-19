import { Component, HostListener, ViewChild } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { PlyrComponent } from 'ngx-plyr';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { AnalyticsService } from 'src/app/services/analytics-service';

@Component({
	selector: 'app-video',
	templateUrl: './video.html',
	styleUrls: ['./video.scss'],
})
export class ViewVideoPage {
	@ViewChild('playButton') playButton: ElementRef;
	@ViewChild('videoPlayer') videoPlayer: ElementRef;
	@ViewChild(PlyrComponent) plyr: PlyrComponent;

	public exercise = null;
	public userSubscription: string;
	public previousPageRoute: string;
	public player: Plyr;

	public videoSources: Plyr.Source[];
	activeScreenOrt: string;
	isFullScreen: boolean;
	handlingChange: boolean;

	constructor(
		private navCtrl: NavController,
		private router: Router,
		public platform: Platform,
		private screenOrientation: ScreenOrientation,
		private analyticsService: AnalyticsService
	) {
		this.exercise = this.router.getCurrentNavigation().extras.state.exercise;
		this.activeScreenOrt = this.screenOrientation.type;
	}

	public ionViewDidEnter() {
		this.analyticsService.trackScreen('video');
		let root = this;
		root.screenOrientation.unlock();
		root.isFullScreen = false;
		screen.orientation.onchange = function(){
			root.player.pause;
			if (
				screen.orientation.type == 'landscape-primary' || screen.orientation.type == "landscape-secondary"
			) {
				root.isFullScreen = true;
			} else {
				root.isFullScreen = false;
			}
			root.player.play;
		};
	}

	ionViewWillLeave() {
		this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
	}

	public async ngAfterViewInit(): Promise<void> {
		this.videoSources = [
			{
				src: this.exercise.video_url,
				provider: 'vimeo',
			},
		];

	}

	public goToLogin() {
		this.navCtrl.navigateForward('/');
	}

	played(event: Plyr.PlyrEvent) {}

	play(): void {
		this.player.play(); // or this.plyr.player.play()
	}

	stop(): void {
		this.player.stop(); // or this.plyr.player.play()
	}
}
