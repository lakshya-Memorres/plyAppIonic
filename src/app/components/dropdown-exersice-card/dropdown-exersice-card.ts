import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { ExcerciseSet } from '../../services/api/models/exercise-set';
import { CommonActionsService } from '../../services/common-actions.service';
import { PickerOptions } from '@ionic/core';
import { PickerController } from '@ionic/angular';
import { SaveProgressModal } from '../../modals/save-progess-modal/save-progess-modal';

@Component({
	selector: 'app-dropdown-exersice-card',
	templateUrl: 'dropdown-exersice-card.html',
	styleUrls: ['dropdown-exersice-card.scss'],
})
export class DropdownExersiceCardComponent {
	@Input() exercise;
	@Input() index: string;
	@Input() supersetIndex: string;
	@Input() unit: string;
	@Input() progress: number;
	@Input() roundNumber: number;
	@Input() workoutID: number;
	@Input() historyCard: boolean;
	@Input() workoutUnsaved: boolean;

	@Output() saveSelectedExerciseProgress = new EventEmitter();
	@Output() openSelectedSavedExercise = new EventEmitter();
	@Output() updated = new EventEmitter();

	public progressStates = ['not-completed', 'completed'];
	public progressState = '';
	public expanded: boolean = false;
	public exercisSets = [];
	public cardKeys;
	public exerciseRef;
	public pickerMinOptions = [];
	public pickerSecOptions = [];

	public columns = [];
	public numColumns: number = 2; // number of columns to display on picker over lay

	public textOverwriteEnabled: boolean = false;
	public textOverwriteValue: string = '';

	constructor(private navCtrl: NavController, private commonActions: CommonActionsService, private pickerCtrl: PickerController, public modalCtrl: ModalController) {}

	public async ngOnInit(): Promise<void> {
		this.progressState = this.progressStates[0];
		this.cardKeys = await this.formatKeysForCards();
		await this.checkTextOverwrite();
		this.exercisSets = this.deconstructSetList();
		await this.buildMinsOptions();
		await this.buildSecsOptions();
		this.exerciseRef = this.exercise.name + this.index + this.roundNumber + 1;
	}

	public async checkTextOverwrite() {
		if (this.exercise.text_overwrite == true) {
			this.textOverwriteEnabled = true;
			this.textOverwriteValue = this.exercise.value_overwrite;
		}
	}

	public async buildSecsOptions() {
		const pickerSecOptions = [];
		let totalNumber = 60;
		for (let i = 0; i < totalNumber; i++) {
			let value = i.toString();
			// let object = { text: value.concat(' secs'), value: value };
			pickerSecOptions.push(value.concat(' s'));
		}
		this.columns.push(pickerSecOptions);
	}

	public async buildMinsOptions() {
		const pickerMinOptions = [];
		let totalNumber = 100;
		for (let i = 0; i < totalNumber; i++) {
			let value = i.toString();
			// let object = { text: value.concat(' mins'), value: value };
			pickerMinOptions.push(value.concat(' m'));
		}
		this.columns.push(pickerMinOptions);
	}

	public convertSecs(secs) {
		let minutes = Math.floor(secs / 60);
		let remainSecs = secs - minutes * 60;
		return minutes + 'm' + ' ' + remainSecs + 's';
	}

	public async showBasicPicker($event, exerciseSet) {
		let element = $event.srcElement;
		let elementSibling = $event.srcElement.nextElementSibling;
		let options: PickerOptions = {
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel',
				},
				{
					text: 'Ok',
					handler: (value: any) => {
						let mins = value.col0.value;
						let secs = value.col1.value;
						let totalSecs = mins * 60 + parseInt(secs);
						element.value = totalSecs;
						elementSibling.innerText = value.col0.text + ' ' + value.col1.text;
						elementSibling.classList.add('notPlaceholder');
						this.updateSet($event, exerciseSet, 'Time');
					},
				},
			],
			columns: this.getColumns(),
		};
		let picker = await this.pickerCtrl.create(options);
		picker.present();
	}

	public getColumns() {
		let columns = [];
		for (let i = 0; i < this.numColumns; i++) {
			columns.push({
				name: `col${i}`,
				options: this.getColumnOptions(i),
			});
		}
		return columns;
	}
	public getColumnOptions(columIndex: number) {
		let options = [];
		let numOptions = this.columns[columIndex].length;
		for (let i = 0; i < numOptions; i++) {
			options.push({
				text: this.columns[columIndex][i % numOptions],
				value: i,
			});
		}
		return options;
	}

	public tapCard() {
		this.toggleDropDown();
	}

	public toggleDropDown() {
		if (this.expanded == false) {
			let exercise = this.exerciseRef;
			let root = this;
			this.expanded = true;
			root.progressState = root.progressStates[0];
			this.openSelectedSavedExercise.emit({
				exercise: exercise,
			});
			exercise = null;
		} else {
			this.expanded = false;
		}
	}

	public async goToVideo() {
		let id = this.exercise.exercise_id;

		if (this.historyCard == true) {
			id = this.exercise.id;
		}

		if (this.workoutUnsaved === true) {
			const saveProgressModal = await this.modalCtrl.create({
				component: SaveProgressModal,
			});

			saveProgressModal.onDidDismiss().then((response) => {
				if (response['data'].ContinueToVideo === 'true') {
					this.navCtrl.navigateForward('/video/' + id, {
						state: {
							currentPageRoute: '/current-workout/' + this.workoutID,
							exercise: this.exercise,
						},
					});
				}
			});

			return await saveProgressModal.present();
		} else {
			this.navCtrl.navigateForward('/video/' + id, {
				state: {
					currentPageRoute: '/current-workout/' + this.workoutID,
					exercise: this.exercise,
				},
			});
		}
	}

	public updateSet($event, exercisSet, key) {
		let value = $event.target.value;
		let index = exercisSet.order - 1;
		this.markAsUpdated();
		if (exercisSet.left.name === key) {
			exercisSet.left.value = parseInt(value);
			this.updateCardKey(index, value, key);
		}
		if (exercisSet.right.name === key) {
			exercisSet.right.value = parseInt(value);
		}
	}

	public async formatKeysForCards() {
		const sets = this.exercise.sets;
		let leftProperty = [];
		let count = 0;
		let totalNumberOfSets = sets.length;
		for (let i = 0; i < totalNumberOfSets; i++) {
			count++;
			let value = sets[i].value;
			if (count == 1) {
				if (sets[i].key == 'Time') {
					value = this.convertSecs(value);
					leftProperty.push(value);
				} else {
					leftProperty.push(value);
				}
			} else {
				count = 0;
			}
		}
		return leftProperty;
	}

	public updateCardKey(index, cardValue, key) {
		let value = cardValue;
		if (this.exercise.text_overwrite === true) {
			value = this.exercise.value_overwrite;
			this.cardKeys.splice(index, 1, value);
		} else if (key === 'Time') {
			//let timeValue = cardValue + 's';
			let timeValue = this.convertSecs(cardValue);
			this.cardKeys.splice(index, 1, timeValue);
		} else {
			this.cardKeys.splice(index, 1, value);
		}
	}

	private deconstructSetList() {
		//Variables
		const sets = this.exercise.sets;
		const setList = [];
		let leftProperty = {
			name: '',
			value: 0,
		};
		let rightProperty = {
			name: '',
			value: 0,
		};
		let count = 1;
		let currentOrder = 0;
		let set = null;
		for (let i = 0; i < sets.length; i++) {
			currentOrder = sets[i].order;
			if (count == 1) {
				leftProperty.name = sets[i].key;
				leftProperty.value = sets[i].value;
			}

			if (count == 2) {
				rightProperty.name = sets[i].key;
				rightProperty.value = sets[i].value;
				set = this.deconstructSet(sets[i].order, leftProperty, rightProperty);
				setList.push(set);
				set = null;
				leftProperty = {
					name: '',
					value: 0,
				};
				rightProperty = {
					name: '',
					value: 0,
				};
				count = 0;
			}
			count++;
		}
		return setList;
	}

	private deconstructSet(order, leftProperty, rightProperty) {
		let set = {
			order: order,
			left: leftProperty,
			right: rightProperty,
		};
		return set;
	}

	public renderUnit(unitName) {
		if (unitName == 'Time') {
			return 'm';
		} else if (unitName == 'Weight') {
			if (this.unit == 'metric') {
				return 'kg';
			} else {
				return 'lbs';
			}
		} else if (unitName == 'Distance') {
			return 'm';
		}
	}

	public addSetToExerciseSets() {
		let lastIndex = this.exercisSets.length;
		let lastSet = this.exercisSets[lastIndex - 1];

		let newSet = {
			left: {
				name: lastSet.left.name,
				value: lastSet.left.value,
			},
			order: lastIndex + 1,
			right: {
				name: lastSet.right.name,
				value: lastSet.right.value,
			},
		};

		this.exercisSets.push(newSet);
	}

	public saveSelectedExercise() {
		this.expanded = false;
		let root = this;
		setTimeout(function () {
			root.progressState = root.progressStates[1];
		}, 400);
		let currentSets = this.reconstructSets();
		this.exercise.sets = currentSets;
		this.exercise.round = this.roundNumber + 1;
		let exercise = this.exerciseRef;
		this.saveSelectedExerciseProgress.emit({
			exercise: exercise,
			// // category: {
			// 	// 	id: this.exercise.category.id,
			// 	// 	image_url: this.exercise.category.image_url,
			// 	// 	name: this.exercise.category.name,
			// 	// },
			// 	exercise_id: this.exercise.id,
			// 	image_url: this.exercise.image_url,
			// 	name: this.exercise.name,
			// 	order: this.exercise.order,
			// 	round: this.exercise.round,
			// 	sets: ExcerciseSet.createMany(this.exercise.sets),
			// 	// sub_category: {
			// 	// 	id: this.exercise.sub_category.id,
			// 	// 	image_url: this.exercise.sub_category.image_url,
			// 	// 	name: this.exercise.sub_category.name,
			// 	// },
			// 	superset: this.exercise.superset,
			// 	superset_identifiter: this.exercise.superset_identifiter,
			// 	type: this.exercise.type,
			// 	video_url: this.exercise.video_url,
			// },
			// exerciseIndex: this.index,
			// supersetIndex: this.supersetIndex,
		});
		exercise = null;
	}

	public markAsUpdated() {
		this.updated.emit({
			updated: true,
			exerciseRef: this.exerciseRef,
		});
	}

	private reconstructSets() {
		const sets = this.exercisSets;
		const setList = [];
		for (let i = 0; i < sets.length; i++) {
			let setLeft = this.reconstructSet(sets[i].order, sets[i].left.name, sets[i].left.value);
			let setRight = this.reconstructSet(sets[i].order, sets[i].right.name, sets[i].right.value);
			setList.push(setLeft, setRight);
		}
		return setList;
	}

	private reconstructSet(order, key, value) {
		const set = new ExcerciseSet();
		set.order = order;
		set.key = key;
		set.value = value;
		return set;
	}
}
