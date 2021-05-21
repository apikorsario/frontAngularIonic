import { Component, Input, OnInit } from '@angular/core';
import { ICategoryRes } from '../../interfaces/responses/category-res';

@Component({
  selector: 'ion-category',
  templateUrl: './ion-category.component.html'
})
export class IonCategoryComponent implements OnInit {

  @Input() category: ICategoryRes;
  @Input() button: string;

  constructor() { }

  ngOnInit() {}

}
