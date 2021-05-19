import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { ToastModel } from 'src/app/shared/models/toast.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {
  @Input() email: string;
  public formSignIn: FormGroup;

  @Output() $goSignUp : EventEmitter<any>;

  constructor(
    private _authService: AuthService,
    private _navCtrl: NavController,
    private _loadingCtrl: LoadingController
  ) {
    this.$goSignUp = new EventEmitter();
  }

  ngOnInit() {
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
        this._authService.logged(res.data);
        ToastModel.showSuccess(`Bienvenido`);
        this._loadingCtrl.dismiss();
        this._navCtrl.navigateRoot('/');
      },
      err => {
        ToastModel.showError('usuario invalido');
        this._loadingCtrl.dismiss();
      }
    )
  }

  clickedSignUp(){
    this.$goSignUp.emit();
  }

}
