import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Plugins } from "@capacitor/core";
import { NavController } from "@ionic/angular";
const { Network } = Plugins;

@Injectable({
    providedIn: 'root'
})
export class NetworkInterceptor implements HttpInterceptor {

    constructor(private _navCtrl: NavController) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        Network.getStatus().then(r => {
            if (!r?.connected) {
                this._navCtrl.navigateRoot('/error/network');
            }
        })
        return next.handle(req);
    }
}