import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IProductRes } from '../interfaces/responses/product-res';
import { IResponse } from '../interfaces/responses/response-res';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService {

  constructor(private http: HttpClient) {
    super("products")
  }

  /**
   * getProducts
   */
  public getProducts() {
    return this.http.get(this.pathUrl).pipe(
      map(r => r as IResponse<Array<IProductRes>>)
    )
  }

  /**
   * getProductById
   */
  public getProductById(productId: string) {
    return this.http.get(`${this.pathUrl}${productId}`).pipe(
      map(r => r as IResponse<IProductRes>)
    )
  }
}
