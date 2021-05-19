import { Injectable } from "@angular/core";
import { CanActivate, UrlTree } from "@angular/router";
import { NavController } from "@ionic/angular";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class NoAuth implements CanActivate {
    constructor(
        private _authService:AuthService,
        private _navCtrl: NavController
    ) {

    }

    async canActivate(): Promise<boolean | UrlTree> {
        let isAuth = await this._authService.isLogged();
        return isAuth ? this._navCtrl.navigateRoot('/') : true;
    }
}