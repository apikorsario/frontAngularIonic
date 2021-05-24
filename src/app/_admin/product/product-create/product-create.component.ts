import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html'
})
export class ProductCreateComponent {

  @Output() $clickSave: EventEmitter<void>;

  constructor() { 
    this.$clickSave = new EventEmitter<void>();
  }

  clickedSave() {
    this.$clickSave.emit();
  }

}
