import { Pipe, PipeTransform } from "@angular/core";
import { IProductRes } from "../interfaces/responses/product-res";
import { ISortOption } from "../interfaces/sort-option";

@Pipe({
    name: 'sortBy'
})
export class ProductSortPipe implements PipeTransform {
    transform(products: Array<IProductRes>, option: ISortOption) {
        switch (option?.sortId) {
            case 1:
                return products.sort((a, b) => {
                    return Date.parse(b.createdDate) - Date.parse(a.createdDate);
                });

            case 2:
                return products.sort((a, b) => {
                    return a.unitPrice - b.unitPrice;
                });

            case 3:
                return products.sort((a, b) => {
                    return b.unitPrice - a.unitPrice;
                });

            default: return products;
        }
    }
}