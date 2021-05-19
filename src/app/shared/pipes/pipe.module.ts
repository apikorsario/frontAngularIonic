import { NgModule } from "@angular/core";
import { ProductsByCategoryPipe } from "./products-by-category.pipe";
import { ProductSortPipe } from "./products-sort";

@NgModule({
    declarations: [
        ProductsByCategoryPipe,
        ProductSortPipe
    ],
    exports: [
        ProductsByCategoryPipe,
        ProductSortPipe
    ]
})

export class PipeModule {}