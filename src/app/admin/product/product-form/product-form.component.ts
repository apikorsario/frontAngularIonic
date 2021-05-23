import { Component, EventEmitter, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { IProductReq } from 'src/app/shared/interfaces/requests/product-req';
import { ICategoryRes } from 'src/app/shared/interfaces/responses/category-res';
import { IImageRes } from 'src/app/shared/interfaces/responses/image-res';
import { IProductRes } from 'src/app/shared/interfaces/responses/product-res';
import { IResponse } from 'src/app/shared/interfaces/responses/response-res';
import { ToastModel } from 'src/app/shared/models/toast.model';
import { AdminProductService } from 'src/app/shared/services/admin/admin-product.service';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnInit, OnDestroy {

  @Input() product: IProductRes;
  @Input() $clickSave: EventEmitter<void>;

  public categories: Array<ICategoryRes>;

  public formProduct: FormGroup;
  public formImage: FormGroup;
  public imagesAllowed: number = 4;
  public limitReached: boolean;
  public showImage: boolean;
  public processing: boolean;
  public subscription: Subscription;


  constructor(
    private _adminProductService: AdminProductService,
    private _categoryService: CategoryService,
    private _loadingCtrl: LoadingController,
    private _navCtrl: NavController
  ) {
    this.$clickSave = new EventEmitter<void>();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.loadClickSave();
    this.generateImage();
    this.generateForm();
    this.loadCategories();
  }

  loadCategories() {
    this._categoryService.getCategories().subscribe(
      res => {
        this.categories = res.data;
        if (this.product) {
          this.categories.map(c => {
            c['checked'] = c.categoryId == this.product.categories
              .find(cp => cp?.categoryId == c.categoryId)?.categoryId
          })
        }
      }
    )
  }

  loadClickSave() {
    this.subscription = this.$clickSave.subscribe(
      () => this.clickedSave()
    )
  }

  generateImage() {
    this.formImage = new FormGroup({
      imageName: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
      ]),
      imageUrl: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200),
      ])
    })
  }

  private generateForm() {
    this.formProduct = new FormGroup({
      productName: new FormControl(this.product?.productName, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50)
      ]),

      description: new FormControl(this.product?.description, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200)
      ]),

      unitPrice: new FormControl(this.product?.unitPrice, [
        Validators.required
      ]),

      stock: new FormControl(this.product?.stock, [
        Validators.required
      ]),

      images: new FormArray([], Validators.required),

      categoryIds: new FormArray([]),
    });

    if (this.product) {
      this.product.images.forEach(i => { this.addImage(i) })
      this.product.categories.forEach(c => { this.addCategory(c) })
    }
  }

  clickedAddImage() {
    if (this.formImage.invalid) {
      this.formImage.markAllAsTouched();
      return ToastModel.showError('imagen invalida');
    }
    if (this.limitReached) return ToastModel.showError('llegaste al limited de imagenes permitidas');
    this.addImage(this.formImage.value, true);
    this.formImage.reset();
  }

  private addImage(image: IImageRes, isDirty?: boolean) {
    this.images.push(new FormGroup({
      imageName: new FormControl(image.imageName, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
      ]),
      imageUrl: new FormControl(image.imageUrl, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200),
      ])
    }))
    if (isDirty) this.images.markAsDirty();
    this.limitReached = this.images.length == this.imagesAllowed;
    this.showImage = false
  }

  clickedRemoveImage(image: IImageRes) {
    if (!this.images.length) return ToastModel.showError('no tienes imagenes que eliminar');

    let index = this.images.controls.findIndex(i => {
      return i.get('imageUrl').value == image.imageUrl &&
        i.get('imageName').value == image.imageName
    })
    this.images.removeAt(index);
    this.images.markAsDirty();
    this.limitReached = this.images.length == this.imagesAllowed;
  }

  clickedCategory(category: ICategoryRes) {
    category['checked'] ? this.removeCategory(category) : this.addCategory(category, true);
    category['checked'] = !category['checked'];
  }

  private addCategory(category: ICategoryRes, isDirty?: boolean) {
    this.categoryIds.push(new FormControl(category?.categoryId, Validators.required))
    if (isDirty) this.categoryIds.markAsDirty();
  }

  private removeCategory(category: ICategoryRes) {
    let index = this.categoryIds.controls.findIndex(c => c.value == category.categoryId);
    this.categoryIds.removeAt(index);
    this.categoryIds.markAsDirty();
  }

  public get images(): FormArray {
    return this.formProduct.get('images') as FormArray;
  }

  public get categoryIds(): FormArray {
    return this.formProduct.get('categoryIds') as FormArray;
  }

  public get body(): IProductReq {
    return this.formProduct.value as IProductReq;
  }

  private clickedSave() {
    if (this.processing) return;
    
    if (this.images.invalid) {
      this.showImage = true;
      this.formImage.markAllAsTouched();
      return ToastModel.showError('se requiere al menos una imagen');
    }

    if (this.formProduct.invalid) {
      this.formProduct.markAllAsTouched();
      return ToastModel.showError('tienes campos invalidos');
    }

    if (!this.formProduct.dirty) {
      return ToastModel.showError('no hay nada que guardar');
    }
    
    let observable: Observable<IResponse<null>>;
    if (this.product) {
      observable = this._adminProductService.updateProduct(this.product.productId, this.body)
      this.proccessRes(observable, 'modifico');
    } else {
      observable = this._adminProductService.createProduct(this.body)
      this.proccessRes(observable, 'creo');
    }
  }

  private async proccessRes(observable: Observable<IResponse<null>>, accion: string) {
    this.processing = true;
    (await this._loadingCtrl.create()).present();
    observable.subscribe(
      res => {
        this._loadingCtrl.dismiss();
        this.processing = false;
        ToastModel.showSuccess(`el producto se ${accion} correctamente`)
        this._navCtrl.navigateRoot('/auth/admin/products');
      },
      err => {
        console.log(err);
        this._loadingCtrl.dismiss();
        this.processing = false;
        if (err.status == 400) return ToastModel.showError('el nombre del producto ya esta en uso')
      }
    )
  }
}
