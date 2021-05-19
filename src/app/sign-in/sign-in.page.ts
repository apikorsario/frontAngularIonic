import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { ToastModel } from '../shared/models/toast.model';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html'
})
export class SignInPage implements OnInit {
  public formSignIn: FormGroup;
  public email: string;

  constructor(
    private _authService: AuthService,
    private _navCtrl: NavController,
    private _loadingCtrl: LoadingController,
    private _activateRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.email = this._activateRoute.snapshot.paramMap.get('email') || null;
    this.generateForm();
  }

  generateForm() {
    this.formSignIn = new FormGroup({
      email: new FormControl(this.email, [
        Validators.required,
        Validators.email,
        Validators.maxLength(50),
        Validators.minLength(5),
      ]),

      password: new FormControl(null, [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(5),
      ]),
    })
  }

  async clickedSignIn() {
    
    if (this.formSignIn.invalid) {
      this.formSignIn.markAllAsTouched();
      return ToastModel.showError('tiene campos invalidos');
    }
    
    (await this._loadingCtrl.create()).present();
    this._authService.SignIn(this.formSignIn.value).subscribe(
      res => {
        this._authService.logIn(res.data);
        ToastModel.showSuccess(`Bienvenid@`);
        this._loadingCtrl.dismiss();
        this._navCtrl.navigateRoot('/');
      },
      err => {
        ToastModel.showError('usuario invalido');
        this._loadingCtrl.dismiss();
      }
    )
  }
}
