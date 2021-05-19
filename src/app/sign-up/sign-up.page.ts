import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { IResponse } from '../shared/interfaces/responses/response-res';
import { ToastModel } from '../shared/models/toast.model';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html'
})
export class SignUpPage implements OnInit {
  public formSignUp: FormGroup;

  constructor(
    private _authService: AuthService,
    private _loadingCtrl: LoadingController,
    private _navCtrl: NavController
  ) {
  }

  ngOnInit() {
    this.generateForm();
  }

  generateForm() {
    this.formSignUp = new FormGroup({
      firstname: new FormControl(null, [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(3),
      ]),

      lastname: new FormControl(null, [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(3),
      ]),

      email: new FormControl(null, [
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


  public get email(): string {
    return this.formSignUp.get('email').value;
  }


  async clickedSignUp() {
    if (this.formSignUp.invalid) {
      this.formSignUp.markAllAsTouched();
      return ToastModel.showError('tiene campos invalidos');
    }

    (await this._loadingCtrl.create()).present();
    this._authService.SignUp(this.formSignUp.value).subscribe(
      res => {
        ToastModel.showSuccess('Registro con Exito');
        this._loadingCtrl.dismiss();
        this._navCtrl.navigateRoot('/sign-in', { queryParams: { email: this.email } })
      },
      err => {
        console.log(err);
        this._loadingCtrl.dismiss();
        let res = err?.error as IResponse<null> || null;
        if (res?.errors.includes('user already exists')) 
          return ToastModel.showError('el usuario ya existe')
        ToastModel.showError('ocurrio un error inesperado');
      }
    )
  }
}
