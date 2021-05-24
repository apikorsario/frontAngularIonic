import { Pipe, PipeTransform } from "@angular/core";
import { IProductRes } from "../interfaces/responses/product-res";
import { ISortOption } from "../interfaces/sort-option";

@Pipe({
    name: 'sortBy'
})
export class ProductSortPipe implements PipeTransform {
    transform(products: Array<IProductRes>, option: ISortOption) {
        if(option?.sortId == 2){
            return products.sort((a,b) => {
                return a.unitPrice - b.unitPrice;
            })
        }
        if(option?.sortId == 3){
            return products.sort((a,b) => {
                return b.unitPrice - a.unitPrice;
            })
        }
        return products;
    }
}