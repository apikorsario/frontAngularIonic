import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";

import { Plugins } from "@capacitor/core";
import { NavController } from "@ionic/angular";
const { Network } = Plugins;

@Injectable({
    providedIn: 'root'
})
export class NetworkGuard implements CanActivate {

    constructor(private _navCtrl: NavController) {}

    async canActivate() {
        let connected = (await Network.getStatus()).connected;

        if (connected) return true;

        this._navCtrl.navigateRoot('/error/network');
        return false;
    }
}