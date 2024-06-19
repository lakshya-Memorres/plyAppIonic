/* tslint:disable:variable-name curly */
import { AbstractModel } from './abstract-model';
import { WorkoutSet } from './workout-set';

export class UserExerciseResult extends AbstractModel {
    public set: WorkoutSet[] = null;

    public fill(data: Partial<UserExerciseResult>) {
        if (data.set) {
            this.set = WorkoutSet.createMany(data.set);
        }
    }
}
