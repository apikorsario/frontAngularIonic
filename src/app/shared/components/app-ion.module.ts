import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { IonCategoryComponent } from "./ion-category/ion-category.component";
import { IonProductGridConponent } from "./ion-product-grid/ion-product-grid.component";
import { IonProductComponent } from "./ion-product/ion-product.component";
import { IonUserComponent } from "./ion-user/ion-user.component";

@NgModule({
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [
        IonUserComponent,
        IonCategoryComponent,
        IonProductComponent,
        IonProductGridConponent
    ],
    declarations: [
        IonUserComponent,
        IonCategoryComponent,
        IonProductComponent,
        IonProductGridConponent
    ]
})
export class AppIonModule { }