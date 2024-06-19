import { ModelProps } from '../types';

export abstract class AbstractModel {

    public static createOne<T extends AbstractModel>(this: new (...args: any[]) => T, data?: Partial<T>): T {
        const instance = new this();
        if (data) {
            instance.fill(data);
        }
        return instance;
    }

    public static createMany<T extends AbstractModel>(this: new (...args: any[]) => T, data: Partial<T>[] = []): T[] {
        const instances: T[] = [];
        for (const item of data) {
            const context = this.prototype.constructor;
            const instance: T = context.createOne(item);
            instances.push(instance);
        }

        return instances;
    }

    public fill<T>(data: Partial<T>) {
        // nothing
    }

    public clone<T extends AbstractModel>(this: T): T {
        const cloneClass = this.constructor as any;
        const clone: T = new cloneClass();
        clone.fill(this);
        return clone;
    }

    public equals(model: ModelProps<AbstractModel>): boolean {
        return false;
    }

}
