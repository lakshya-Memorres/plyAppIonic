import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';

@Component({
	selector: 'add-exercise',
	templateUrl: 'add-exercise.html',
	styleUrls: ['add-exercise.scss'],
})
export class AddExerciseComponent {
	@Input() subCategories;
	@Input() exercises;
	@Input() workoutID;

	@Output() clearSelectedSubLevelItems = new EventEmitter();
	@Output() getSubLevelCategories = new EventEmitter();
	@Output() addExercises = new EventEmitter();

	constructor(
		private navCtrl: NavController,
		private pickerController: PickerController
	) {}

	public clearSelectedSubLevel() {
		this.clearSelectedSubLevelItems.emit();
	}

	public parentGetCategories(category) {
		this.getSubLevelCategories.emit({
			category: category,
		});
	}

	public parentAddExercises(exercise, setOption) {
		exercise.superset = false;
		this.addExercises.emit({
			exercise: exercise,
			setOption: setOption,
		});
	}

	public async presentSetOptions(exercise) {
		let options: PickerOptions = {
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel',
				},
				// {
				// 	text: 'Set Options',
				// },
				{
					text: 'Ok',
					handler: (value: any) => {
						this.parentAddExercises(exercise, value.options.value);
						picker.dismiss();
					},
				},
			],
			columns: [
				{
					name: 'options',
					options: this.getColumnOptions(exercise.set_options),
				},
			],
		};

		let picker = await this.pickerController.create(options);
		picker.present();
	}

	private getColumnOptions(opitons) {
		let publicOptions = [];
		opitons.forEach((option) => {
			if (option[1] == 'Average Watts') {
				option[1] = 'Av Watts';
			}
			if (option[1] == 'Weight') {
				option[1] = 'Load';
			}
			publicOptions.push({
				text: option[0] + ' / ' + option[1],
				value: option,
			});
		});
		return publicOptions;
	}
}
