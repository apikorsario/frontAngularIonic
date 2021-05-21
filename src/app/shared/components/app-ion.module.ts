import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { IonCategoryComponent } from "./ion-category/ion-category.component";
import { IonUserComponent } from "./ion-user/ion-user.component";

@NgModule({
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [
        IonUserComponent,
        IonCategoryComponent
    ],
    declarations: [
        IonUserComponent,
        IonCategoryComponent
    ]
})
export class AppIonModule { }