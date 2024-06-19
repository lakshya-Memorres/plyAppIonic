import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { NavController } from '@ionic/angular';
import { min } from 'rxjs/operators';
import { CommonActionsService } from '../../services/common-actions.service';

@Component({
	selector: 'app-timer',
	templateUrl: 'timer.html',
	styleUrls: ['timer.scss'],
})
export class TimerComponent {
	@ViewChild('countdown') countdown;

	@Output() workoutFinished = new EventEmitter();

	// Timer Intervals
	public intervels = [
		{
			value: 30,
		},
		{
			value: 60,
		},
		{
			value: 90,
		},
		{
			value: 120,
		},
		{
			value: 180,
		},
	];

	// Component Values
	public timerRunning = false;
	public workoutStarted = false;
	public isPaused = false;
	public hours = 0;
	public hoursLabel = '00';
	public minutes = 0;
	public minutesLabel = '00';
	public seconds = 0;
	public workoutSeconds = 0;
	public secondsLabel = '00';
	public workoutTimerInterval;

	public restTimerLabel = '00:00';
	public restTimerMinutes;
	public restTimerSeconds;
	public restTimerInterval;
	public restTimerDuration;
	public restTimerRunning = false;
	public restTimerPaused = false;

	public selectedInterval;
	public workout_started_date_time: Date;
	public workout_finished_date_time: Date;
	public totalWorkoutTime;

	constructor(
		private navCtrl: NavController,
		private commonActions: CommonActionsService
	) {}

	public toggleTimers(state) {
		if (state === 'pause') {
			this.pauseRestTimer();
			this.stopTimer();
		} else if (state === 'play') {
			this.startTimer();
			this.unPasueRestTimer();
		}
	}

	public startTimer() {
		if (this.timerRunning == false) {
			this.timerRunning = true;
			this.workoutStarted = true;
			this.workout_started_date_time = new Date();
			this.workoutTimerInterval = setInterval(() => {
				this.workoutTimer();
			}, 1000);
		}
	}

	public stopTimer() {
		this.timerRunning = false;
		clearInterval(this.workoutTimerInterval);
	}

	public workoutTimer() {
		this.seconds = this.workoutSeconds;

		++this.seconds;
		++this.workoutSeconds;

		if (this.seconds == 60) {
			this.seconds = 0;
			this.workoutSeconds = 0;
			this.minutes += 1;

			if (this.minutes == 60) {
				this.minutes = 0;
				this.hours += 1;
			}
		}
		if (this.seconds < 10) {
			this.secondsLabel = '0' + this.seconds;
		} else {
			this.secondsLabel = this.seconds.toString();
		}
		if (this.minutes < 10) {
			this.minutesLabel = '0' + this.minutes;
		} else {
			this.minutesLabel = this.minutes.toString();
		}
		if (this.hours < 10) {
			this.hoursLabel = '0' + this.hours;
		} else {
			this.hoursLabel = this.hours.toString();
		}
	}

	public restTimer(i) {
		if (this.restTimerRunning == false) {
			this.restTimerRunning = true;
			this.startTimer();
			let duration = this.intervels[i].value;
			this.restTimerDuration = duration;
			this.selectedInterval = i;
			let minutes = Math.floor(this.restTimerDuration / 60);
			let seconds = Math.floor(this.restTimerDuration % 60);
			this.restTimerSecsMins(seconds, minutes);
			this.restTimerInterval = setInterval(() => {
				if (this.restTimerPaused == false) {
					this.countdownTimer();
				}
			}, 1000);
		}
	}

	public restTimerSecsMins(seconds, minutes) {
		if (minutes < 10) {
			this.restTimerLabel = '0' + minutes.toString();
		} else {
			this.restTimerLabel = minutes.toString();
		}

		this.restTimerLabel += ':';

		if (seconds < 10) {
			this.restTimerLabel += '0' + seconds.toString();
		} else {
			this.restTimerLabel += seconds.toString();
		}
	}

	public unPasueRestTimer() {
		this.restTimerPaused = false;
	}

	public pauseRestTimer() {
		this.restTimerPaused = true;
	}

	public countdownTimer() {
		let minutes = Math.floor(this.restTimerDuration / 60);
		let seconds = Math.floor(this.restTimerDuration % 60);

		this.restTimerSecsMins(seconds, minutes);

		if (this.restTimerDuration <= 0) {
			this.restTimerDuration = 0;
			this.selectedInterval = -1;
			clearInterval(this.restTimerInterval);
			this.restTimerRunning = false;
		}

		this.restTimerDuration--;
	}

	public finishWorkOut() {
		this.stopTimer();
		this.workout_finished_date_time = new Date();
		this.totalWorkoutTime = {
			hours: this.hoursLabel,
			minutes: this.minutesLabel,
			secs: this.secondsLabel,
		};
		this.workoutFinished.emit({
			totalWorkoutTime: this.totalWorkoutTime,
			workoutStarted: this.workout_started_date_time,
			workoutFinished: this.workout_finished_date_time,
		});
	}

	public convertSecondsToMilliseconds(value) {
		const millisconds = value * 1000;
		return millisconds;
	}
}
