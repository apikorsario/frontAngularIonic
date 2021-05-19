import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { map } from "rxjs/operators";
import { ICategoryRes } from "../interfaces/responses/category-res";
import { IResponse } from "../interfaces/responses/response-res";

@Injectable({
    providedIn: 'root'
})
export class CategoryService extends BaseService {
    constructor(private http: HttpClient){
        super("categories");
    }

    /**
     * getCategories
     */
    public getCategories() {
        return this.http.get(this.pathUrl).pipe(
            map(r => r as IResponse<Array<ICategoryRes>>)
        );
    }
}