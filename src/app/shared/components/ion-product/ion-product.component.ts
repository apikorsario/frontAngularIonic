import { Component, Input, OnInit } from '@angular/core';
import { IProductRes } from '../../interfaces/responses/product-res';

@Component({
  selector: 'ion-product',
  templateUrl: './ion-product.component.html'
})
export class IonProductComponent implements OnInit {

  public slideOpts = {
    slidesPerView: 1
  };

  @Input() product: IProductRes;
  @Input() button: string;

  constructor() { }

  ngOnInit() {}

}
