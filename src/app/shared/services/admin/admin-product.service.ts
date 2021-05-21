import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { IProductReq } from "../../interfaces/requests/product-req";
import { IResponse } from "../../interfaces/responses/response-res";
import { BaseService } from "../base.service";

@Injectable({
    providedIn: 'root'
})
export class AdminProductService extends BaseService {

    constructor(private http: HttpClient) {
        super('AdminProducts');
    }

    /**
     * createProduct
     */
    public createProduct(body: IProductReq) {
        return this.http.post(this.pathUrl, body).pipe(
            map(r => r as IResponse<null>)
        )
    }
}