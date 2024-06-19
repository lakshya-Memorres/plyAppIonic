/* tslint:disable:variable-name curly */
import { AbstractModel } from './abstract-model';

export class HelpSupport extends AbstractModel {
    public question: string = null;
    public answer: string = null;

    public fill(data: Partial<HelpSupport>) {
        if (data.question) {
            this.question = data.question;
        }
        if (data.answer) {
            this.answer = data.answer;
        }
    }
}
