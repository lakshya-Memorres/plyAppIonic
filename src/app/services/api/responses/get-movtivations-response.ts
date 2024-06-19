/* tslint:disable:variable-name curly */
import { Motivations } from '../models/motivations';

export class GetMotivationsResponse {
	public motivations: Motivations[] = null;

    constructor(data: GetMotivationsResponse) {
        if (data.motivations) {
			this.motivations = Motivations.createMany(data.motivations);
		}

    }
}
