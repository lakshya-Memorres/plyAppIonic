import { WorkoutHistory } from '../models';

export class GetHistoryResponse {
	public history: WorkoutHistory[] = null;

	constructor(data: GetHistoryResponse) {
        if (data.history) {
			this.history = data.history;
		}
    }

}
