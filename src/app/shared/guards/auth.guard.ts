import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _authService: AuthService,
    private _navCtrl: NavController
  ) {
  }

  async canActivate(): Promise<boolean | UrlTree> {
    if (await this._authService.isValidToken()) return true;
    
    this._navCtrl.navigateRoot('/');
    return false;
  }

}
