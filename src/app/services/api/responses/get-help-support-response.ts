/* tslint:disable:variable-name curly */
import { HelpSupport } from '../models';

export class GetHelpSupportResponse {
	public question_answers: HelpSupport[] = null;

    constructor(data: GetHelpSupportResponse) {
        if (data.question_answers) {
			this.question_answers = HelpSupport.createMany(data.question_answers);
		}
    }
}
