import { Component, OnInit } from '@angular/core';
import { GravatarService } from '@infinitycube/gravatar';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { IMenuPage } from './shared/interfaces/menu-page';
import { IUserRes } from './shared/interfaces/responses/user-res';
import { ToastModel } from './shared/models/toast.model';
import { AuthService } from './shared/services/auth.service';
import { StorageService } from './shared/services/storage.service';
import { UserService } from './shared/services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appSignPages: Array<IMenuPage>;
  public appPublicPages: Array<IMenuPage>;
  public appCustomerPages: Array<IMenuPage>;
  public appEmployeePages: Array<IMenuPage>;
  public user: IUserRes;
  public avatar: string;
  public darkTheme: boolean;

  constructor(
    private _authService: AuthService,
    private _userService: UserService,
    private _navCtrl: NavController,
    private _gravatarService: GravatarService,
    private _storageService: StorageService
  ) {
    this.loadLogged();
    this.clickedChangeTheme(true);
  }

  async clickedChangeTheme(loadStorage: boolean) {
    let key = 'themeStyle';
    this.darkTheme = loadStorage ? await this._storageService.get({ key }) : !this.darkTheme;
    document.body.setAttribute(key, this.darkTheme ? 'dark' : 'light');
    if (event) this._storageService.set({ key, value: this.darkTheme });
  }

  ngOnInit(): void {
    this.loadUser();
    this.fillPublicPages();
    this.fillSignPages();
    this.fillCustomerPages();
    this.fillEmployeePages();
  }

  async loadUser() {
    if (!await this.isLogged()) {
      this.user = null;
      this.avatar = null;
      return
    };
    this._userService.getProfile().subscribe(
      res => {
        this.user = res.data;
        this.avatar = this._gravatarService.url(this.user.email, 200, 'wavatar');
      },
      err => console.log(err)
    )
  }

  loadLogged() {
    this._authService.$isLogged.subscribe(
      res => this.ngOnInit(),
      err => this.ngOnInit()
    )
  }

  fillPublicPages() {
    this.appPublicPages = [
      { title: 'Inicio', url: '/home', icon: 'home' }
    ];
  }

  async fillSignPages() {
    this.appSignPages = [];
    if (!await this._authService.isLogged()) {
      this.appSignPages = [
        { title: 'Iniciar Sesión', url: '/sign-in', icon: 'log-in' },
        { title: 'Registrarme', url: '/sign-up', icon: 'create' }
      ];
    }
  }

  async fillCustomerPages() {
    this.appCustomerPages = [];
    if (await this._authService.haveRole('Customer')) {
      this.appCustomerPages = [
        { title: 'Mi Codigo Qr', url: '/auth/qr-code', icon: 'qr-code' },
        { title: 'Casillero', url: '/auth/locker', icon: 'file-tray-full' },
        { title: 'Facturas', url: '/auth/invoices', icon: 'create' },
      ];
    }
  }

  async fillEmployeePages() {
    this.appEmployeePages = [];
    if (await this._authService.haveRole('Employee')) {
      this.appEmployeePages = [
        { title: 'Ruta Empleado', url: '/auth/admin', icon: 'key' }
      ];
    }
  }

  isLogged() {
    return this._authService.isLogged();
  }

  async logOut() {
    await this._authService.logOut();
    this.ngOnInit();
    ToastModel.showSuccess('hasta luego!');
    this._navCtrl.navigateRoot('/');
  }
}
