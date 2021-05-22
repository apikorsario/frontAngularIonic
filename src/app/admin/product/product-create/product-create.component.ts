import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { IImageReq } from 'src/app/shared/interfaces/requests/imagen-req';
import { IProductReq } from 'src/app/shared/interfaces/requests/product-req';
import { ICategoryRes } from 'src/app/shared/interfaces/responses/category-res';
import { ToastModel } from 'src/app/shared/models/toast.model';
import { AdminProductService } from 'src/app/shared/services/admin/admin-product.service';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html'
})
export class ProductCreateComponent implements OnInit {

  public formProduct: FormGroup;
  public categories: Array<ICategoryRes>;
  public limitImgs: number = 4;
  public saving: boolean;

  constructor(
    private _adminProductService: AdminProductService,
    private _categoryService: CategoryService,
    private _loadingCtrl: LoadingController,
    private _navCtrl: NavController
  ) { }

  ngOnInit() {
    this.generateForm();
    this.loadCategories();
  }

  generateForm() {
    this.formProduct = new FormGroup({
      productName: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50)
      ]),

      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200)
      ]),

      unitPrice: new FormControl(null, [
        Validators.required
      ]),

      stock: new FormControl(null, [
        Validators.required
      ]),

      images: new FormArray([], Validators.required),
      categoryIds: new FormArray([])
    })
  }

  public get images(): FormArray {
    return this.formProduct.get('images') as FormArray;
  }

  public get categoryIds() : FormArray {
    return this.formProduct.get('categoryIds') as FormArray;
  }

  public get productName() : string {
    return this.formProduct.get('productName').value;
  }
  
  public get body() : IProductReq {
    return this.formProduct.value as IProductReq;
  }
  

  clickedAddImage() {
    if (this.images.controls.find(c => c.invalid)) {
      this.images.markAllAsTouched();
      return ToastModel.showError('tiene imagenes invalidas')
    }

    if (this.images.length == this.limitImgs) {
      this.images['limit'] = true;
      return ToastModel.showError(`el limited de imagenes es ${this.limitImgs}`) 
    }
    
    this.addImage()
  }

  clickedRemoveImage(image:IImageReq) {
    let index = this.images.controls.findIndex(c => {
      return  c.get('imageUrl').value == image.imageUrl && 
              c.get('imageName').value == image.imageName
    });
    this.images.removeAt(index)
    this.images['limit'] = false;
    if (this.images.valid) this.addImage()
  }

  addImage() {
    this.images.push(new FormGroup({
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
    }))
  }

  clickedAlreadyImages(){
    if (this.images.invalid) {
      this.images.markAllAsTouched();
      return ToastModel.showError('tiene imagenes invalidas')
    }
    this.images['limit'] = true;
  }

  imageIsValid(image: IImageReq) {
    return this.images.controls.find(c => {
      return  c.get('imageUrl').value == image.imageUrl && 
              c.get('imageName').value == image.imageName
    }).valid;
  }


  loadCategories() {
    this._categoryService.getCategories().subscribe(
      res => this.categories = res.data
    )
  }

  clickedCategory(category: ICategoryRes) {
    if (category['checked']) {
      this.removeCategory(category);
      category['checked'] = false;
    } else {
      this.addCategory(category);
      category['checked'] = true;
    }

  }

  addCategory(category: ICategoryRes) {
    this.categoryIds.push(new FormControl(category.categoryId));
  }

  removeCategory(category: ICategoryRes) {
    let index = this.categoryIds.controls.findIndex(p => p.value == category.categoryId);
    this.categoryIds.removeAt(index);
  }


  async clickedSaveProduct() {
    if (!this.images.length) {
      this.addImage();
      this.images.markAllAsTouched();
      return ToastModel.showError('debe agregar al menos una imagen');
    }
    if (this.images.invalid) {
      this.images.markAllAsTouched();
      return ToastModel.showError('tiene imagenes invalidas');
    }
    if (this.formProduct.invalid) {
      this.formProduct.markAllAsTouched();
      return ToastModel.showError('el formulario tiene campos invalidos');
    }

    this.saving = true;
    (await this._loadingCtrl.create()).present();
    this._adminProductService.createProduct(this.body).subscribe(
      res => {
        ToastModel.showSuccess(`el producto ${this.productName} se creó correctamente`);
        this.saving = false;
        this._loadingCtrl.dismiss();
        this._navCtrl.navigateRoot('auth/admin/products');
      },
      err => {
        console.log(err);
        this.saving = false;
        this._loadingCtrl.dismiss();
        if (err.status == 400) return ToastModel.showError('el nombre del producto ya esta en uso');
        ToastModel.showError(`ocurrio un problema al crear el producto`);
      }
    )
    
  }

}
