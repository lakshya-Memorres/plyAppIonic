/* tslint:disable:variable-name curly */
import { AbstractModel } from './abstract-model';
import { Motivations } from './motivations';
import { Subscription } from './subscription';

export class UserSettings extends AbstractModel {
	public gender: 'male' | 'female' | 'other' = null;
	public height_cm: number = null;
	public units: 'imperial' | 'metric' = null;
	public user_motivations: Motivations[] = null;
	public weight: number = null;
	public workoutStayAwake: boolean = null;
	public subscription: Subscription = null

    public fill(data: Partial<UserSettings>) {
		if (data.units) {
			this.units = data.units;
		}
		if (data.gender) {
			this.gender = data.gender;
		}
		if (data.height_cm) {
			this.height_cm = data.height_cm;
		}
		if (data.subscription) {
			this.subscription = Subscription.createOne(data.subscription);
		}
		if (data.weight) {
			this.weight = data.weight;
		}
		if (data.workoutStayAwake) {
			this.workoutStayAwake = data.workoutStayAwake;
		}
		if (data.user_motivations) {
			this.user_motivations = Motivations.createMany(data.user_motivations);
        }
    }

	public get weight_lbs(): number {
		return this.weight_lbs != null ? this.weight * 2.2046226218 : null;
	}

	public get height_ft(): FeetInches {
		return this.height_cm != null ? FeetInches.fromCm(this.height_cm) : null;
	}

}

export class FeetInches {
    public feet: number;
    public inches: number;
    public static fromCm(cm: number): FeetInches {
        const instance = new FeetInches();
        const inches = cm / 2.54;
        instance.feet = Math.floor(inches / 12);
        instance.inches = inches % 12;
		return instance;
    }
}
