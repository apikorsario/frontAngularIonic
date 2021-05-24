import { NgModule } from "@angular/core";
import { FilterProductPipe } from "./product-filter.pipe";
import { ProductOutCategoryPipe } from "./product-out-category.pipe";
import { ProductsByCategoryPipe } from "./products-by-category.pipe";
import { ProductSortPipe } from "./products-sort.pipe";
import { UserFilterPipe } from "./user-filter.pipe";

@NgModule({
    declarations: [
        ProductsByCategoryPipe,
        ProductSortPipe,
        ProductOutCategoryPipe,
        UserFilterPipe,
        FilterProductPipe
    ],
    exports: [
        ProductsByCategoryPipe,
        ProductSortPipe,
        ProductOutCategoryPipe,
        UserFilterPipe,
        FilterProductPipe
    ]
})

export class AppPipeModule {}