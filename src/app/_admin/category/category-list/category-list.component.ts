import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { ICategoryRes } from 'src/app/shared/interfaces/responses/category-res';
import { CategoryEditComponent } from 'src/app/_admin/category/category-edit/category-edit.component';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html'
})
export class CategoryListComponent implements OnInit {
  
  public categories: Array<ICategoryRes>;

  constructor(
    private _categoryService: CategoryService,
    private _loadingCtrl: LoadingController,
    private _modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.loadCategories();
  }
  
  async loadCategories() {
    (await this._loadingCtrl.create()).present();

    this._categoryService.getCategories().subscribe(
      res => {
        this.categories = res.data;
        this._loadingCtrl.dismiss();
      },
      err => {
        console.log(err);
        this._loadingCtrl.dismiss();
      }
    )
  }

  doRefresh(event: CustomEvent) {
    this._categoryService.getCategories().subscribe(
      res => {
        this.categories = res.data;
        event.detail.complete();
      },
      err => {
        console.log(err);
        event.detail.complete();
      }
    )
  }

  async clickedCategory(category: ICategoryRes) {
    let modal = await this._modalCtrl.create({
      component: CategoryEditComponent,
      componentProps: { category }
    });
    modal.present();
    let res = await modal.onWillDismiss();
    if (res.role == 'deleted') return this.removeFromCategories(category.categoryId);
  }

  removeFromCategories(categoryId: string) {
    let index = this.categories.findIndex(c => c.categoryId == categoryId);
    this.categories.splice(index, 1);
  }
}
