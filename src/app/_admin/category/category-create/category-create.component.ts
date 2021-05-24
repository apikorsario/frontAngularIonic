import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { ICategoryReq } from 'src/app/shared/interfaces/requests/category-req';
import { IProductRes } from 'src/app/shared/interfaces/responses/product-res';
import { ToastModel } from 'src/app/shared/models/toast.model';
import { AdminCategoryService } from 'src/app/shared/services/admin/admin-category.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html'
})
export class CategoryCreateComponent implements OnInit {

  public formCategory: FormGroup;
  public products: Array<IProductRes>;
  public creating: boolean;

  constructor(
    private _adminCategoryService: AdminCategoryService,
    private _productService: ProductService,
    private _loadingCtrl: LoadingController,
    private _navCtrl: NavController
  ) { }

  ngOnInit() {
    this.generateForm();
    this.loadProducts();
  }

  generateForm() {
    this.formCategory = new FormGroup({
      categoryName: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50)
      ]),

      productIds: new FormArray([])
    })
  }


  public get categoryName(): string {
    return this.formCategory.get('categoryName').value;
  }

  public get productIds(): FormArray {
    return this.formCategory.get('productIds') as FormArray;
  }

  public get body(): ICategoryReq {
    return this.formCategory.value as ICategoryReq;
  }

  clickedProduct(product: IProductRes) {
    if (product['checked']) {
      this.removeProduct(product);
      product['checked'] = false;
    } else {
      this.addProduct(product);
      product['checked'] = true;
    }
  }

  addProduct(product: IProductRes) {
    this.productIds.push(new FormControl(product.productId));
  }

  removeProduct(product: IProductRes) {
    let index = this.productIds.controls.findIndex(p => p.value == product.productName);
    this.productIds.removeAt(index);
  }


  loadProducts() {
    this._productService.getProducts().subscribe(
      res => {
        this.products = res.data;
      },
      err => {
        console.log(err);
      }
    )
  }

  async clickedCreateCategory() {
    if (this.formCategory.invalid) {
      this.formCategory.markAllAsTouched()
      return ToastModel.showError('el nombre de la categoria es invalido')
    }

    this.creating = true;
    (await this._loadingCtrl.create()).present();
    this._adminCategoryService.createCategory(this.body).subscribe(
      res => {
        this.creating = false;
        ToastModel.showSuccess(`la categoria ${this.categoryName} se creo correctamente`);
        this._loadingCtrl.dismiss();
        this._navCtrl.navigateRoot('/auth/admin/categories/list');
      },
      err => {
        console.log(err);
        this.creating = false;
        this._loadingCtrl.dismiss();
        if (err.status == 400) return ToastModel.showError(`el nombre de la categoria ya existe`);
        ToastModel.showError(`ocurrio un problema inesperado al crear la categoria`);
      }
    )
  }

}
