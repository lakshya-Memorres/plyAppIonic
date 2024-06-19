import { AbstractModel } from './models/abstract-model';

export type ModelProps<T> = Pick<T, Exclude<keyof T, keyof AbstractModel>>;
export type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
export type RequireOnly<T, K extends keyof T> = Partial<T> & Required<Pick<T, K>>;
