import { Component, Input, OnInit } from '@angular/core';
import { IProductRes } from '../../interfaces/responses/product-res';

@Component({
  selector: 'ion-product',
  templateUrl: './ion-product.component.html'
})
export class IonProductComponent implements OnInit {

  public slideOpts = {
    slidesPerView: 1,
    // slidesPerColumn: 1,
    // slidesPerGroup: 1,
    // watchSlidesProgress: true,
    // spaceBetween: 0,
    // virtualTranslate: true,
    // autoHeight: true
  };

  @Input() product: IProductRes;
  @Input() button: string;

  constructor() { }

  ngOnInit() {}

}
