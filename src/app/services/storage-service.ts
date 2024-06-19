import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    private debugEnabled = false;
    private watchers: { [key: string]: Subject<any> } = {};

    constructor(
        private nativeStorage: NativeStorage
    ) {
    }

    /**
     * Removes all stored values
     */
    public clear(): Promise<any> {
        return this.nativeStorage.clear().then(result => {
            this.debug('Cleared all data');
            return result;
        });
    }

    /**
     * Log debug message (if debug is enabled)
     */
    public debug(...messages: string[]) {
        if (!this.debugEnabled) {
            return;
        }
        console.log('[Storage]', ...messages);
    }

    /**
     * Disable debug mode
     */
    public disableDebug() {
        this.debugEnabled = false;
    }

    /**
     * Enable debug mode
     */
    public enableDebug() {
        this.debugEnabled = true;
    }

    /**
     * Trigger the watcher for a single stored item
     */
    private fireWatcher(key: string, value: any) {
        this.watch(key).next(value);
    }

    /**
     * Retrieves a single stored item
     */
    public get(key: string): Promise<any> {

        return this.nativeStorage.getItem(key);
    }

    /**
     * Checks whether or not a value exists
     */
    public has(key: string): Promise<boolean> {
        return this.nativeStorage.keys().then((keys: string[]) => {
            return keys.indexOf(key) > -1;
        });
    }

    /**
     * Removes a single stored item
     */
    public remove(key: string): Promise<any> {
        return this.nativeStorage.remove(key).then(result => {
            this.fireWatcher(key, undefined);
            return result;
        });
    }

    /**
     * Stores a value
     */
    public set(key: string, value: any): Promise<any> {
		this.debug(key, value);
        return this.nativeStorage.setItem(key, value).then(result => {
			this.fireWatcher(key, result);
            return result;
        });
    }

    /**
     * Watch a stored item for changes
     */
    public watch(key: string) {
        if (this.watchers[key] === undefined) {
            this.watchers[key] = new Subject<any>();
        }
        return this.watchers[key];
    }

}
