import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { IUserRes } from 'src/app/shared/interfaces/responses/user-res';
import { ToastModel } from 'src/app/shared/models/toast.model';
import { AdminUsersService } from 'src/app/shared/services/admin/admin-users.service';

@Component({
  selector: 'app-user-options',
  templateUrl: './user-options.component.html'
})
export class UserOptionsComponent implements OnInit {

  @Input() user: IUserRes;
  public saving: boolean;
  public formForgotPassword: FormGroup;

  constructor(
    private _adminUserService: AdminUsersService,
    private _modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.generateForm();
  }
  
  generateForm() {
    this.formForgotPassword = new FormGroup({
      newPassword : new FormControl(null, [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(6),
      ])
    })
  }

  clickedForgotPassword() {
    if (this.formForgotPassword.invalid) {
      this.formForgotPassword.markAllAsTouched();
      return ToastModel.showError('la contraceña es invalida');
    }
    this.saving = true;
    this._adminUserService.forgotPasswordUser(this.user.userId, this.formForgotPassword.value).subscribe(
      res => {
        this.saving = false;
        ToastModel.showSuccess('la contraceña se restablecio correctamente');
        this.formForgotPassword.reset();
      },
      err => {
        this.saving = false;
        ToastModel.showError('ocurrio un error al restablecer la contraceña');
      }
    )
  }

  closeModal(role?:string) {
    this._modalCtrl.dismiss(null, role);
  }
}
