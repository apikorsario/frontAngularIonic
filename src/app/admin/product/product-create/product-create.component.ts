import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { IImageReq } from 'src/app/shared/interfaces/requests/imagen-req';
import { AdminProductService } from 'src/app/shared/services/admin/admin-product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html'
})
export class ProductCreateComponent implements OnInit {

  public formProduct: FormGroup;

  constructor(
    private _adminProductService: AdminProductService
  ) { }

  ngOnInit() {
    this.generateForm();
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

      images: new FormArray([new FormGroup({
        imageUrl: new FormControl(null, Validators.required),
        imageName: new FormControl(null)
      })]),
      categoryIds: new FormArray([])
    })
  }

  public get images(): FormArray {
    console.log(this.formProduct.get('images'));
    
    return this.formProduct.get('images') as FormArray;
  }

  addImage() {
    this.images.push(new FormGroup({
      imageUrl: new FormControl(null, Validators.required),
      imageName: new FormControl(null)
    }))
  }

}
