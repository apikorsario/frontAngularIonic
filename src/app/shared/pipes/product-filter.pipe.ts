import { Pipe, PipeTransform } from "@angular/core";
import { IProductRes } from "../interfaces/responses/product-res";

@Pipe({
    name: 'filterProduct'
})

export class FilterProductPipe implements PipeTransform {

    transform(products: Array<IProductRes>, search: string) {
        if (!search) return products;

        return products.filter(p => {
            return  p.productName.includes(search) ||
                    p.description.includes(search) ||
                    p.categories.map(c => c.categoryName).includes(search)
        })
    }
}