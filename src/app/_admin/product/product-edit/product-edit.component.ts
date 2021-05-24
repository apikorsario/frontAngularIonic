import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { IProductRes } from 'src/app/shared/interfaces/responses/product-res';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html'
})
export class ProductEditComponent implements OnInit {

  public product: IProductRes;
  public edit: boolean;
  @Output() $clickSave: EventEmitter<void>;

  constructor(
    private _productService: ProductService,
    private _activatedRoute: ActivatedRoute,
    private _loadingCtrl: LoadingController,
    private _navCtrl: NavController
  ) {
    this.$clickSave = new EventEmitter<void>();
  }

  ngOnInit() {
    this.loadProduct();
  }

  async loadProduct() {
    (await this._loadingCtrl.create()).present();
    let productId = this._activatedRoute.snapshot.paramMap.get('id');
    this._productService.getProductById(productId).subscribe(
      res => {
        this.product = res.data;
        this._loadingCtrl.dismiss();
      },
      err => {
        this._loadingCtrl.dismiss();
        console.log(err);
        this._navCtrl.navigateRoot('/auth/admin/products');
      }
    )
  }

  clickedSave() {
    this.$clickSave.emit();
  }
}
