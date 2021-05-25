import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, PopoverController } from '@ionic/angular';
import { ICategoryRes } from '../shared/interfaces/responses/category-res';
import { ILockerDetailRes } from '../shared/interfaces/responses/locker-detail-res';
import { ILockerRes } from '../shared/interfaces/responses/locker-res';
import { IProductRes } from '../shared/interfaces/responses/product-res';
import { ISortOption } from '../shared/interfaces/sort-option';
import { ConfirmModel } from '../shared/models/confirm.model';
import { ToastModel } from '../shared/models/toast.model';
import { ProductFilterPopover } from '../shared/popovers/product-filter/product-filter.popover';
import { AuthService } from '../shared/services/auth.service';
import { LockerService } from '../shared/services/locker.service';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html'
})
export class HomePage implements OnInit {
  public products: Array<IProductRes>
  public filterCategory: ICategoryRes;
  public filterSort: ISortOption;
  public locker: ILockerRes;
  public search: string;

  constructor(
    private _productService: ProductService,
    private _authService: AuthService,
    private _lockerService: LockerService,
    private _popoverCtrl: PopoverController,
    private _loadingCtrl: LoadingController,
    private _navCtrl: NavController,
  ) {
  }
  ngOnInit(): void {
    this.loadProducts();
    this.loadLocker();
  }

  async loadLocker() {
    if (!await this._authService.isLogged()) return;
    this._lockerService.getLocker().subscribe(
      res => this.locker = res.data
    )
  }

  async loadProducts( ) {
    (await this._loadingCtrl.create()).present();
    this._productService.getProducts().subscribe(
      res => {
        this.products = res.data;
        this._loadingCtrl.dismiss();
      },
      err => {
        ToastModel.showError('ocurrio un error inesperado');
        this._loadingCtrl.dismiss();
      }
    )
  }

  doRefresh(event: any) {
    this.refreshLocker(event);
    this.refreshProduct(event);
  }

  refreshProduct(event: any) {
    this._productService.getProducts().subscribe(
      res => {
        this.products = res.data;
        event?.detail.complete();
      },
      err => event?.detail.complete()
    )
  }

  async refreshLocker(event: any) {
    if (!await this._authService.isLogged()) return;
    this._lockerService.getLocker().subscribe(
      res => {
        this.locker = res.data;
        event?.detail.complete();
      },
      err => event?.detail.complete()
    )
  }

  async clickedPopover(event: any) {
    let popover = await this._popoverCtrl.create({
      component: ProductFilterPopover,
      componentProps: {
        filterCategory: this.filterCategory,
        filterSort: this.filterSort,
      },
      event
    });
    popover.present();
    let res = await popover.onWillDismiss();
    if (res.role == "category") {
      this.filterCategory = res.data as ICategoryRes;
    }
    if (res.role == "sort") {
      this.filterSort = res.data as ISortOption;
    }
  }

  async showConfirmToLoggin() {
    let res = await ConfirmModel.show('para agregar productos iniciar sesión');
    return res ? this._navCtrl.navigateRoot('/auth') : null;
  }

  async clickedRemoveDetailToLocker(product: IProductRes) {
    if (!this.locker)
      return await this.showConfirmToLoggin();

    let quantity = 1;
    this.startAction(product, 'removing');
    this._lockerService.removeDetailsToLocker({ productId: product.productId, quantity }).subscribe(
      res => {
        this.finishAction(product, 'removing');
        product.stock += quantity;
        this.getDetailProduct(product.productId).quantity -= quantity;
        ToastModel.showSuccess(`se removió ${quantity} ${product.productName} de tu casillero`);
      },
      err => this.finishAction(product, 'removing')
    );
  }

  async clickedAddDetailToLocker(product: IProductRes) {
    if (!this.locker)
      return await this.showConfirmToLoggin();

    if (product.stock == 0)
      return ToastModel.showError('lo sentimos! este producto se encuentra agotado');

    if (!this.canAddProduct(product))
      return ToastModel.showError('lo siento alcanzaste el limited permitido');

    var quantity = 1;
    this.startAction(product, 'adding');
    this._lockerService.addDetailsToLocker({ productId: product.productId, quantity }).subscribe(
      res => {
        this.finishAction(product, 'adding');
        product.stock -= quantity;
        let detail = this.getDetailProduct(product.productId);
        if (!detail) {
          this.locker.products.push(this.toDetailProduct(product, quantity));
        } else {
          detail.quantity += quantity;
        }
        ToastModel.showSuccess(`se sumó ${quantity} ${product.productName} a tu casillero`)
      },
      err => this.finishAction(product, 'adding')
    );
  }

  startAction(product: IProductRes, action: string) {
    product[action] = true;
  }

  finishAction(product: IProductRes, action: string) {
    product[action] = false;
  }

  canAddProduct(product: IProductRes) {
    let detail = this.getDetailProduct(product.productId);
    return !detail ? true : detail.quantity + 1 <= 6;
  }

  getQuantityInLocker(product: IProductRes) {
    if (!this.locker) return 0;
    let detail = this.getDetailProduct(product.productId);
    if (!detail) return 0;
    return detail.quantity;
  }

  getDetailProduct(productId: string) {
    return this.locker.products.find(ld => ld.product.productId == productId);
  }

  toDetailProduct(product: IProductRes, quantity: number): ILockerDetailRes {
    return {
      product: {
        description: product.description,
        image: product.images[0],
        productId: product.productId,
        productName: product.productName,
        unitPrice: product.unitPrice
      },
      quantity,
      total: quantity * product.unitPrice
    };
  }
}
