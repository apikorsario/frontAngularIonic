import { Injectable } from "@angular/core";
import { Plugins } from "@capacitor/core";

const { Storage } = Plugins;

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    public set(options: { key: string, value: any }) {
        Storage.set(options);
    }

    public async get(options: { key: string }): Promise<any> {
        let data = (await Storage.get(options)).value;
        return data ? JSON.parse(data) : null;
    }

}