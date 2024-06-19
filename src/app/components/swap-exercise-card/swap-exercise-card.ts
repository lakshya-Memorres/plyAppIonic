import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
	selector: 'app-swap-exercise-card',
	templateUrl: 'swap-exercise-card.html',
	styleUrls: ['swap-exercise-card.scss'],
})
export class SwapExerciseCardComponent {
	public currentlySelectedSwap = false;

	@Input() suggestion;
	@Input() originalExercise;
	@Input() swappedExercise;
	@Input() currentExercise;
	@Output() swapSelectedExercise = new EventEmitter();

	public textOverwriteEnabled: boolean = false;
	public textOverwriteValue: string = '';
	public cardKeys;

	constructor(private navCtrl: NavController) {}

	public async ngOnInit(): Promise<void> {
		if (typeof this.originalExercise !== 'undefined') {
			this.cardKeys = await this.formatKeysForCards();
			await this.checkTextOverwrite();
		}
	}

	public async checkTextOverwrite() {
		if (this.originalExercise.text_overwrite == true) {
			this.textOverwriteEnabled = true;
			this.textOverwriteValue = this.originalExercise.value_overwrite;
		}
	}

	public async ngOnChanges() {
		if (this.swappedExercise) {
			this.currentlySelectedSwap = this.checkSwappedExercise();
		}
	}

	public checkSwappedExercise() {
		if (this.swappedExercise.name === this.suggestion.exercise.name) {
			return true;
		} else {
			return false;
		}
	}

	public swapExercise() {
		this.swapSelectedExercise.emit(this.suggestion);
	}

	public swapToOriginal() {
		this.swapSelectedExercise.emit(this.originalExercise);
	}

	public async formatKeysForCards() {
		const sets = this.originalExercise.sets;
		let leftProperty = [];
		let count = 1;
		let totalNumberOfSets = sets.length;
		for (let i = 0; i < totalNumberOfSets; i++) {
			let value = sets[i].value;
			if (count == 1) {
				if (sets[i].key == 'Time') {
					value = this.convertSecs(value);
					leftProperty.push(value);
				} else {
					leftProperty.push(value);
				}
				//leftProperty.push(value);
			}
			if (count == 2) {
				count = 0;
			}
			count++;
		}
		return leftProperty;
	}

	public convertSecs(secs) {
		let minutes = Math.floor(secs / 60);
		let remainSecs = secs - minutes * 60;
		return minutes + 'm' + ' ' + remainSecs + 's';
	}

	public goToVideo(type) {
		let exercise;
		if (type === 'originalExercise') {
			exercise = this.originalExercise;
		} else {
			exercise = this.suggestion.exercise;
		}
		this.navCtrl.navigateForward('/video/' + exercise.id, {
			state: {
				exercise: exercise,
				currentPageRoute: '/swap-exercise/' + exercise.id,
			},
		});
	}
}
