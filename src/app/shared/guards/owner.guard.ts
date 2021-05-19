import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { NavController } from "@ionic/angular";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class OwnerGuard implements CanActivate{
    constructor(
        private _authService: AuthService,
        private _navCtrl: NavController
    ) {
    }

    async canActivate(): Promise<boolean> {
        let isOwner = await this._authService.haveRole('Owner');
        return isOwner ? true : this._navCtrl.navigateRoot('/');
    }

}