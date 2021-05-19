import { Component, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { IPopOption } from '../../interfaces/pop-option';

@Component({
  selector: 'app-user-option',
  templateUrl: './user-option.component.html'
})
export class UserOptionComponent {
  @Input() popOptions: Array<IPopOption>;

  constructor(
    private _popoverCtrl: PopoverController
  ) { }

  clickedOption(option: IPopOption) {
    this._popoverCtrl.dismiss(null, option.role);
  }

}
