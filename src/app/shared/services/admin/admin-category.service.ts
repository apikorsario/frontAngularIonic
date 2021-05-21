import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { ICategoryReq } from "../../interfaces/requests/category-req";
import { IResponse } from "../../interfaces/responses/response-res";
import { BaseService } from "../base.service";

@Injectable({
    providedIn: 'root'
})
export class AdminCategoryService extends BaseService {

    constructor(private http: HttpClient) {
        super('AdminCategories');
    }

    /**
     * createCategory
     */
    public createCategory(body: ICategoryReq) {
        return this.http.post(this.pathUrl, body).pipe(
            map(r => r as IResponse<null>)
        )
    }

    /**
     * editCategory
     */
    public editCategory(categoryId: string, body: ICategoryReq) {
        return this.http.put(`${this.pathUrl}${categoryId}`, body).pipe(
            map(r => r as IResponse<null>)
        )
    }

    /**
     * deleteCategory
     */
    public deleteCategory(categoryId: string) {
        return this.http.delete(`${this.pathUrl}${categoryId}`).pipe(
            map(r => r as IResponse<null>)
        )
    }
}