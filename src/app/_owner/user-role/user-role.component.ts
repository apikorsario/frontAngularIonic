import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { IUserRes } from '../../shared/interfaces/responses/user-res';
import { ToastModel } from '../../shared/models/toast.model';
import { AdminRoleUserService } from '../../shared/services/admin/admin-role-user.service';
import { AdminUsersService } from '../../shared/services/admin/admin-users.service';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html'
})
export class UserRoleComponent implements OnInit {

  @Input() user: IUserRes;
  public formForgotPassword: FormGroup;

  constructor(
    private _modalCtrl: ModalController,
    private _adminRoleUserServ: AdminRoleUserService,
    private _adminUsersServ: AdminUsersService
  ) { }

  ngOnInit() {
    this.generateForm();
  }

  closeModal() {
    this._modalCtrl.dismiss()
  }

  generateForm() {
    this.formForgotPassword = new FormGroup({
      newPassword: new FormControl(null, [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(6),
      ])
    })
  }

  forgotPassword() {
    if (this.formForgotPassword.invalid) {
      this.formForgotPassword.markAllAsTouched();
      return ToastModel.showError('contraceña invalida');
    }

    this.user["updating"] = true;
    this._adminUsersServ
      .forgotPasswordUser(this.user.userId, this.formForgotPassword.value).subscribe(
        res => {
          this.user["updating"] = false;
          ToastModel.showSuccess(`contraceña cambiada!`);
        },
        err => {
          this.user["updating"] = false;
          ToastModel.showError(`ocurrio un error inesperado`);
        },
      )
  }

  addRole(role: string) {
    if (!role.includes('Employee') && !role.includes('Owner'))
      return ToastModel.showError('rol invalido');

    this.startAction(role, 'adding');
    this._adminRoleUserServ.addRoleToUser({ role, userId: this.user.userId }).subscribe(
      res => {
        ToastModel.showSuccess(`${this.user.firstName} ahora es ${this.getSpanishRole(role)}`)
        this.finishAction(role, 'adding');
      },
      err => {
        ToastModel.showError(`${this.user.firstName} ya es ${this.getSpanishRole(role)}`)
        this.finishAction(role, 'adding');
      },
    )
  }

  removeRole(role: string) {

    if (!role.includes('Employee') && !role.includes('Owner'))
      return ToastModel.showError('rol invalido');

    this.startAction(role, 'deleting');
    this._adminRoleUserServ.removeRoleToUser({ role, userId: this.user.userId }).subscribe(
      res => {
        ToastModel.showSuccess(`${this.user.firstName} ya no es ${this.getSpanishRole(role)}`)
        this.finishAction(role, 'deleting');
      },
      err => {
        ToastModel.showError(`${this.user.firstName} no es ${this.getSpanishRole(role)}`)
        this.finishAction(role, 'deleting');
      },
    )
  }

  getSpanishRole(role: string) {
    switch (role) {
      case 'Employee': return 'Empleado'; break;
      case 'Owner': return 'Propietario'; break;
    }
  }

  startAction(role: string, action: string) {
    this.user[action + role] = true;
  }

  finishAction(role: string, action: string) {
    this.user[action + role] = false;
  }

}
