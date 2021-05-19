import { Component, Input, OnInit } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { ICategoryRes } from "../../interfaces/responses/category-res";
import { ISortOption } from "../../interfaces/sort-option";
import { CategoryService } from "../../services/category.service";

@Component({
    templateUrl: 'product-filter.popover.html'
})

export class ProductFilterPopover implements OnInit {
    @Input() filterCategory: ICategoryRes;
    @Input() filterSort: ISortOption;
    public categories: Array<ICategoryRes>;
    public sortOptions: Array<ISortOption> = [];

    constructor(
        private categoryService: CategoryService,
        private _popoverCtrl: PopoverController
    ) { }
    
    ngOnInit(): void {
        this.loadCategories();
        this.loadSortOptions();
    }
    
    loadSortOptions() {
        this.sortOptions.push(
            { sortId: 1, sortBy: 'más relevantes', selected: false },
            { sortId: 2, sortBy: 'menor precio', selected: false },
            { sortId: 3, sortBy: 'mayor precio', selected: false }
        );
        if (this.filterSort) {
            this.sortOptions.find(so => so.sortId == this.filterSort?.sortId).selected = true;
        } else{
            this.sortOptions.find(so => so.sortId == 1).selected = true;
        }
        
    }

    loadCategories() {
        this.categoryService.getCategories().subscribe(
            res => {
                this.categories = res.data.filter(c => c.products.length > 0);
                this.categories.forEach(c => {
                    c['selected'] = c.categoryId == this.filterCategory?.categoryId ? true : false;
                })
            },
            err => console.log(err)
        )
    }

    clickedCategory(category: ICategoryRes) {
        this._popoverCtrl.dismiss(category, "category");
    }

    clickedAllCategory() {
        this._popoverCtrl.dismiss("", "category");
    }

    clickedSort(sortOption: ISortOption) {
        this._popoverCtrl.dismiss(sortOption, "sort")
    }
}