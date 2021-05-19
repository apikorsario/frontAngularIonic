import { Component, OnDestroy, OnInit } from '@angular/core';
import { GravatarService } from '@infinitycube/gravatar';
import { LoadingController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { IMenuPage } from './shared/interfaces/menu-page';
import { IUserRes } from './shared/interfaces/responses/user-res';
import { ToastModel } from './shared/models/toast.model';
import { AuthService } from './shared/services/auth.service';
import { UserService } from './shared/services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public appPublicPages: Array<IMenuPage>;
  public appAuthPages: Array<IMenuPage>;
  public isAuth: boolean;
  public subscription: Subscription;
  public user: IUserRes;
  public avatar: string;

  constructor(
    private _authService: AuthService,
    private _userService: UserService,
    private _loadingCtrl: LoadingController,
    private _navCtrl: NavController,
    private _gravatarService: GravatarService
  ) {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadPublicPages();
    this.loadAuthPages();
    this.loadLogged();
    this.loadUser();
  }

  loadUser() {
    if (!this.isAuth) return;
    this._userService.getProfile().subscribe(
      res => {
        this.user = res.data;
        this.avatar = this._gravatarService.url(this.user.email, 200, 'wavatar');
      },
      err => console.log(err)
    )
  }

  loadLogged() {
    this.subscription = this._authService.$isLogged.subscribe(
      res => this.loadAuthPages(),
      err => console.log(err)
    )
  }

  loadPublicPages() {
    this.appPublicPages = [
      { title: 'Ingresar', url: '/auth', icon: 'log-in', visible: true },
      { title: 'Productos', url: '/products', icon: 'grid', visible: true }
    ];
  }

  async loadAuthPages() {
    if (await this._authService.isValidToken()) {
      this.appAuthPages = [
        { title: 'Mi Codigo Qr', url: '/auth/qr-code', icon: 'qr-code', visible: true },
        { title: 'Casillero', url: '/auth/locker', icon: 'file-tray-full', visible: true },
        { title: 'Facturas', url: '/auth/invoices', icon: 'create', visible: true },
      ];
      this.appPublicPages.find(p => p.url == '/auth').visible = false;
      this.isAuth = true;
      this.loadUser();
    } else {
      this.isAuth = false;
      this.appAuthPages = [];
      this.appPublicPages.find(p => p.url == '/auth').visible = true;
    }
  }

  async logOut() {
    (await this._loadingCtrl.create()).present();
    await this._authService.logOut();
    this.isAuth = false;
    this.loadAuthPages();
    setTimeout(() => {
      this._loadingCtrl.dismiss();
      ToastModel.showSuccess('hasta luego!');
      this._navCtrl.navigateRoot('/');
    }, 500);
  }
}
