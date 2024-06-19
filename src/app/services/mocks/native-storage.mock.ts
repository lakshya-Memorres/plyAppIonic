import { NativeStorage } from '@ionic-native/native-storage/ngx';

enum NativeStorageError {
    UNUSED,
    NATIVE_WRITE_FAILED,
    ITEM_NOT_FOUND,
    NULL_REFERENCE,
    UNDEFINED_TYPE,
    JSON_ERROR,
    WRONG_PARAMETER,
}

export class NativeStorageMock extends NativeStorage {

    getItem(reference: string): Promise<any> {
        return new Promise((success, error) => {
            let item = {};
            item = localStorage.getItem(reference);
            if (item === null) {
                error(NativeStorageError.ITEM_NOT_FOUND);
                return;
            }
            try {
                const obj = JSON.parse(item as string);
                success(obj);
            } catch (err) {
                error(NativeStorageError.JSON_ERROR);
            }
        });
    }

    setItem(reference: string, value: any): Promise<any> {
        return new Promise((success, error) => {
            try {
                const varAsString = JSON.stringify(value);
                if (reference === null) {
                    error(NativeStorageError.NULL_REFERENCE);
                    return;
                }
                localStorage.setItem(reference, varAsString);
                success(value);
            } catch (err) {
                error(NativeStorageError.JSON_ERROR);
            }
        });
    }

    keys(): Promise<any> {
        return new Promise<any>((success, error) => {
            const keys = [];
            for (let i = 0; i < localStorage.length; i++) {
                keys.push(localStorage.key(i));
            }
            success(keys);
        });
    }

    remove(reference: string): Promise<any> {
        return new Promise<any>((success, error) => {
            try {
                localStorage.removeItem(reference);
                success();
            } catch (e) {
                error(e);
            }
        });
    }

    clear(): Promise<any> {
        return new Promise<any>((success, error) => {
            try {
                localStorage.clear();
                success();
            } catch (e) {
                error(e);
            }
        });
    }

}
