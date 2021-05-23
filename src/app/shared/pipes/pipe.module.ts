import { NgModule } from "@angular/core";
import { ProductOutCategoryPipe } from "./product-out-category.pipe";
import { ProductsByCategoryPipe } from "./products-by-category.pipe";
import { ProductSortPipe } from "./products-sort";
import { UserFilterPipe } from "./user-filter.pipe";

@NgModule({
    declarations: [
        ProductsByCategoryPipe,
        ProductSortPipe,
        ProductOutCategoryPipe,
        UserFilterPipe
    ],
    exports: [
        ProductsByCategoryPipe,
        ProductSortPipe,
        ProductOutCategoryPipe,
        UserFilterPipe
    ]
})

export class PipeModule {}