/* tslint:disable:variable-name curly */
import { Type as TypeInterface } from '../interfaces/type';
import { AbstractModel } from './abstract-model';

export class Type extends AbstractModel implements TypeInterface {
    public key: string = null;
    public value?: string = null;

    public fill(data: Partial<TypeInterface>) {
        if (data.key) {
            this.key = data.key;
        }
        if (data.value) {
            this.value = data.value;
        }
    }

    public equals(type: TypeInterface): boolean {
        if (this.key !== type.key) { return false; }
        if (this.value !== type.value) { return false; }
        return true;
    }
}
