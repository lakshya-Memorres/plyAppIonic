/* tslint:disable:variable-name curly */
import { AbstractModel } from './abstract-model';

export class DeviceInfo extends AbstractModel {
    public cordova_version: string = null;
    public is_virtual: boolean = null;
    public manufacturer: string = null;
    public model: string = null;
    public os_version: string = null;
    public platform: string = null;
    public serial: string = null;
    public uuid: string = null;

    public fill(data: Partial<DeviceInfo>) {
        if (data.cordova_version) {
            this.cordova_version = data.cordova_version;
        }
        if (data.is_virtual) {
            this.is_virtual = data.is_virtual;
        }
        if (data.manufacturer) {
            this.manufacturer = data.manufacturer;
        }
        if (data.model) {
            this.model = data.model;
        }
        if (data.os_version) {
            this.os_version = data.os_version;
        }
        if (data.platform) {
            this.platform = data.platform;
        }
        if (data.serial) {
            this.serial = data.serial;
        }
        if (data.uuid) {
            this.uuid = data.uuid;
        }
    }
}
