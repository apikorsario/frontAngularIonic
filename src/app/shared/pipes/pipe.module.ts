import { NgModule } from "@angular/core";
import { ProductOutCategoryPipe } from "./product-out-category.pipe";
import { ProductsByCategoryPipe } from "./products-by-category.pipe";
import { ProductSortPipe } from "./products-sort";

@NgModule({
    declarations: [
        ProductsByCategoryPipe,
        ProductSortPipe,
        ProductOutCategoryPipe
    ],
    exports: [
        ProductsByCategoryPipe,
        ProductSortPipe,
        ProductOutCategoryPipe
    ]
})

export class PipeModule {}