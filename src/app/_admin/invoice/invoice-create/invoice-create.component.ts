import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { IPaymentRes } from 'src/app/shared/interfaces/responses/payment-res';
import { IUserRes } from 'src/app/shared/interfaces/responses/user-res';
import { ToastModel } from 'src/app/shared/models/toast.model';
import { AdminInvoiceService } from 'src/app/shared/services/admin/admin-invoice.service';
import { AdminPaymentService } from 'src/app/shared/services/admin/admin-payment';
import { AdminUsersService } from 'src/app/shared/services/admin/admin-users.service';
import { SearchUserComponent } from '../search-user/search-user.component';

@Component({
  selector: 'app-invoice-create',
  templateUrl: './invoice-create.component.html'
})
export class InvoiceCreateComponent implements OnInit {

  public formInvoice: FormGroup;
  public saving: boolean;
  public payments: Array<IPaymentRes>;

  constructor(
    private _adminInvoiceService: AdminInvoiceService,
    private _adminUserService: AdminUsersService,
    private _adminPaymentService: AdminPaymentService,
    private _loadingCtrl: LoadingController,
    private _modalCtrl: ModalController,
    private _navCtrl: NavController
  ) { }

  ngOnInit() {
    this.generateForm();
    this.loadPayments();
  }
  
  async loadPayments() {
    (await this._loadingCtrl.create()).present();
    this._adminPaymentService.getPayments().subscribe(
      res => {
        this._loadingCtrl.dismiss();
        this.payments = res.data;
        this.payments.map(p => {
          switch (p.methodName) {
            case 'cash': p.methodName = 'Efectivo' ;break;
            case 'transfer': p.methodName = 'Tranferencia' ;break;
            case 'credit cart': p.methodName = 'Tarjeta de Credito' ;break;
            case 'debit cart': p.methodName = 'Tarjeta de Debito' ;break;
          }
        })
      },
      err => {
        this._loadingCtrl.dismiss();
        this.goList();
      }
    )
  }

  private generateForm() {
    this.formInvoice = new FormGroup({
      customerId: new FormControl(null, [Validators.required, Validators.minLength(30)]),
      paymentId: new FormControl(null, [Validators.required, Validators.minLength(30)])
    })
  }

  private addCustomer(user: IUserRes) {
    this.formInvoice.patchValue({ customerId: user.userId });
  }

  public addPayment(payment: IPaymentRes) {
    this.formInvoice.patchValue({ paymentId: payment.paymentId });
    this.payments.map(p => {
      p['checked'] = false;
    })
    payment['checked'] = true;
  }


  async clickedSearchUser() {
    let modal = await this._modalCtrl.create({
      component: SearchUserComponent
    });
    modal.present();
    let res = await modal.onWillDismiss();
    let user = res.data as IUserRes;
    if (user) this.addCustomer(user);
  }


  async clickedSave() {
    
    if (this.formInvoice.get('customerId').invalid) {
      this.formInvoice.markAllAsTouched();
      return ToastModel.showError('debe agregar un id de usuario valido');
    }

    if (this.formInvoice.get('paymentId').invalid) {
      return ToastModel.showError('debe seleccionar un metodo de pago');
    }

    ;(await this._loadingCtrl.create()).present();
    this.saving = true;
    this._adminInvoiceService.createInvoice(this.formInvoice.value).subscribe(
      res => {
        this._loadingCtrl.dismiss();
        this.saving = false;
        ToastModel.showSuccess('factura generada correctamente');
        this.goList();
      },
      err => {
        this._loadingCtrl.dismiss();
        this.saving = false;
        if (err.status == 400)return ToastModel.showError('el usuario no tiene articulos que facturar');
        ToastModel.showError('ocurrio un error al generar la factura');
      }
    )
  }

  goList() {
    this._navCtrl.navigateRoot('/auth/admin/invoices');
  }
}
