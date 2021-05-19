import { Pipe, PipeTransform } from "@angular/core";
import { ICategoryRes } from "../interfaces/responses/category-res";
import { IProductRes } from "../interfaces/responses/product-res";

@Pipe({
    name: 'productsByCategory'
})
export class ProductsByCategoryPipe implements PipeTransform {

    transform(products: Array<IProductRes>, category: ICategoryRes) {
        if (category) {
            return products.filter(p => p.categories.find(c => c.categoryId == category.categoryId));
        }
        return products;
    }

}