import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { NavController } from "@ionic/angular";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class EmployeeGuard implements CanActivate{
    constructor(
        private _authService: AuthService,
        private _navCtrl: NavController
    ) {
    }

    async canActivate(): Promise<boolean> {
        let isEmployee = await this._authService.haveRole('Employee');
        return isEmployee ? true : this._navCtrl.navigateRoot('/');
    }

}