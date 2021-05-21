import { Pipe, PipeTransform } from "@angular/core";
import { ICategoryRes } from "../interfaces/responses/category-res";
import { IProductRes } from "../interfaces/responses/product-res";

@Pipe({
    name: 'productOutCategory'
})
export class ProductOutCategoryPipe implements PipeTransform {

    transform(products: Array<IProductRes>, category: ICategoryRes) {
        if (!category) return products;
        return products
            .filter(p => p.productId != category.products
                .find(v => v.includes(p.productId)))
    }
}