import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ToastModel } from '../../models/toast.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit {

  public formChangePassword: FormGroup;
  public spinner: boolean;

  constructor(
    private _userService: UserService,
    private _modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.generateForm();
  }
  
  generateForm() {
    this.formChangePassword = new FormGroup({
      currentPassword: new FormControl(null, [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(6),
      ]),

      newPassword: new FormControl(null, [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(6),
      ]),
    })
  }

  clickedChangePassword() {
    if (this.formChangePassword.invalid) {
      this.formChangePassword.markAllAsTouched();
      return ToastModel.showError('tiene errores en los campos señalados');
    }

    this.spinner = true;
    this._userService.changePassword(this.formChangePassword.value).subscribe(
      () => {
        ToastModel.showSuccess('contraceña cambiada');
        this.closeModal()
      },
      () => {
        ToastModel.showError('contraceña invalida')
        this.spinner = false;
      }
    )
  }

  closeModal() {
    this._modalCtrl.dismiss();
  }

}
