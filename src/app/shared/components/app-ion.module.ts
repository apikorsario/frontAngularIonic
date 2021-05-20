import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { IonUserComponent } from "./ion-user/ion-user.component";

@NgModule({
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [
        IonUserComponent
    ],
    declarations: [
        IonUserComponent
    ]
})
export class AppIonModule { }