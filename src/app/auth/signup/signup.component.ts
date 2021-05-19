import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { ToastModel } from 'src/app/shared/models/toast.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
  public formSignUp: FormGroup;
  @Output() $goSignIn: EventEmitter<any>;

  constructor(
    private _authService: AuthService,
    private _loadingCtrl: LoadingController
  ) {
    this.$goSignIn = new EventEmitter();
  }
  
  ngOnInit() {
    this.generateForm();
  }
  
  generateForm(){
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

  async clickedSignUp(){
    if (this.formSignUp.invalid) {
      this.formSignUp.markAllAsTouched();
      return ToastModel.showError('tiene campos invalidos');
    }

    (await this._loadingCtrl.create()).present();
    this._authService.SignUp(this.formSignUp.value).subscribe(
      res => {
        ToastModel.showSuccess('Registro con Exito');
        this.$goSignIn.emit(this.formSignUp.get('email').value);
      },
      err => console.log(err),
      () => this._loadingCtrl.dismiss()
    )
  }

  clickedSignIn(){
    this.$goSignIn.emit();
  }

}
