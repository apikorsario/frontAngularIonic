import { Component, Input, OnInit } from '@angular/core';
import { IProductRes } from '../../interfaces/responses/product-res';

@Component({
  selector: 'ion-product-grid',
  templateUrl: './ion-product-grid.component.html'
})
export class IonProductGridConponent {

  public slideOpts = {
    slidesPerView: 1
  };

  @Input() product: IProductRes;
  @Input() date: boolean;
}
