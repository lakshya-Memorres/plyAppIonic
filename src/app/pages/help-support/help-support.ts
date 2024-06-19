import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { CommonActionsService } from '../../services/common-actions.service';
import { HelpSupport } from '../../services/api/models/help-support';
import { AnalyticsService } from 'src/app/services/analytics-service';

@Component({
	selector: 'app-help-support',
	templateUrl: './help-support.html',
	styleUrls: ['./help-support.scss'],
})
export class HelpSupportPage implements OnInit {
	public question_answers = [];
	public loading: boolean = true;
	public activeQuestions: Array<string> = [];

	constructor(private api: ApiService, private navCtrl: NavController, private commonActions: CommonActionsService, private analyticsService: AnalyticsService) {}

	public ionViewDidEnter() {
		this.analyticsService.trackScreen('help-support');
	}

	public goBack() {
		this.navCtrl.navigateForward('/more');
	}

	public goToLogin() {
		this.navCtrl.navigateForward('/');
	}

	public cancelSubscription() {
		this.navCtrl.navigateForward('/cancel-subscription');
	}

	public toggleActiveQuestion(activeQuestion, $event) {
		if (this.activeQuestions.includes(activeQuestion)) {
			let index = this.activeQuestions.indexOf(activeQuestion);
			this.activeQuestions.splice(index, 1);
		} else {
			this.activeQuestions.push(activeQuestion);
		}
	}

	public async getHelpSupportContent() {
		try {
			const response = await this.api.getHelpSupport().toPromise();
			this.question_answers = response.data.body;
		} catch (error) {
			this.commonActions.showErrorResponseAlert(error);
			// this.goToLogin();
		} finally {
			this.loading = false;
		}
	}

	public async ngOnInit() {
		this.getHelpSupportContent();
	}
}
