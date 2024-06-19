/* tslint:disable:variable-name curly */
import { AbstractModel } from './abstract-model';
import { ExcerciseSubCategory } from './exercise-sub-category';
import { ExcerciseCategory } from './exercise-category';
import { ExcerciseSet } from './exercise-set';
import { Type } from './type';
import { UserExerciseResult } from './user-exercise-result';

export class Excercise extends AbstractModel {
	public category: ExcerciseCategory = null;
	public id: number;
	public image_url: string = null;
	public name: string = null;
	public order: number = null;
	public sets: ExcerciseSet[] = null;
	public sub_category: ExcerciseSubCategory = null;
	public type: string = null;

	// public image_uri: string = null;
	// public video_uri: string = null;
	// public result: UserExerciseResult[] = null;
	// public superSet: object = null;
	// public personal_best: boolean = null;

    public fill(data: Partial<Excercise>) {
        if (data.category) {
            this.category = ExcerciseCategory.createOne(data.category);
        }
		if (data.id) {
            this.id = data.id;
        }
		if (data.image_url) {
            this.image_url = data.image_url;
        }
		if (data.name) {
            this.name = data.name;
        }
		if (data.order) {
            this.order = data.order;
        }
		if (data.sets) {
			this.sets = ExcerciseSet.createMany(data.sets);
        }
		if (data.sub_category) {
            this.sub_category = ExcerciseSubCategory.createOne(data.sub_category);
        }
		if (data.type) {
            this.type = data.type;
        }
		// if (data.video_uri) {
        //     this.video_uri = data.video_uri;
        // }
		// if (data.type) {
        //     this.type = data.type;
        // }
		// if (data.result) {
        //     this.result = UserExerciseResult.createMany(data.result);
        // }
		// if (data.personal_best) {
        //     this.personal_best = data.personal_best;
        // }
    }
}
