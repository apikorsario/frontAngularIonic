import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ICategoryReq } from '../../../shared/interfaces/requests/category-req';
import { ICategoryRes } from '../../../shared/interfaces/responses/category-res';
import { ConfirmModel } from '../../../shared/models/confirm.model';
import { ToastModel } from '../../../shared/models/toast.model';
import { AdminCategoryService } from '../../../shared/services/admin/admin-category.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html'
})
export class CategoryEditComponent implements OnInit {

  @Input() category: ICategoryRes;

  public formCategoryName: FormGroup;

  constructor(
    private _adminCategoryService: AdminCategoryService,
    private _modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.generateForm();
  }
  
  generateForm() {
    this.formCategoryName = new FormGroup({
      categoryName: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50)
      ])
    })
  }

  public get categoryName() : string {
    return this.formCategoryName.get('categoryName').value;
  }

  public get body() : ICategoryReq {
    return this.formCategoryName.value as ICategoryReq;
  }

  closeModal() {
    this._modalCtrl.dismiss();
  }

  updateCategoryName() {
    if (this.formCategoryName.invalid) {
      this.formCategoryName.markAllAsTouched();
      return ToastModel.showError('el nombre de la categoria es invalido')
    }

    this.category['updating'] = true;
    this._adminCategoryService.editCategory(this.category.categoryId, this.body).subscribe(
      res => {
        console.log(res);
        this.category.categoryName = this.categoryName;
        this.formCategoryName.reset();
        ToastModel.showSuccess(`categoria actualizada`);
        this.category['updating'] = false;
      },
      err => {
        this.category['updating'] = false;
        if (err.status == 400) return ToastModel.showError(`el nombre de la categoria ya existe`);
        ToastModel.showError(`ocurrio un error inesperado`);
      }
    )
  }

  async deleteCategory() {
    let message = `deseas eliminar la categoria ${this.category.categoryName}?`;
    if (!await ConfirmModel.show(message)) return;

    this.category['deleting'] = true;
    this._adminCategoryService.deleteCategory(this.category.categoryId).subscribe(
      res => {
        ToastModel.showSuccess(`la categoria ${this.category.categoryName} se elimino!`);
        this.category['deleting'] = false;
        this._modalCtrl.dismiss(null, 'deleted');
      },
      err => {
        ToastModel.showError(`ocurrio un error al eliminar la categoria!`);
        this.category['deleting'] = false;
      },
    )
  }
  
}
