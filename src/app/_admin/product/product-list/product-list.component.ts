import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { IProductRes } from 'src/app/shared/interfaces/responses/product-res';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {

  public products: Array<IProductRes>;

  constructor(
    private _productService: ProductService,
    private _loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.loadProducts();
  }
  
  async loadProducts() {
    (await this._loadingCtrl.create()).present();

    this._productService.getProducts().subscribe(
      res => {
        this.products = res.data;
        this._loadingCtrl.dismiss();
      },
      err => {
        console.log(err);
        this._loadingCtrl.dismiss();
      }
    )
  }
  
  doRefresh(event: CustomEvent) {
    this._productService.getProducts().subscribe(
      res => {
        this.products = res.data;
        event.detail.complete();
      },
      err => {
        console.log(err)
        event.detail.complete();
      }
    )
  }
}
