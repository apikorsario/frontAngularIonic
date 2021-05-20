import { Component, Input, OnInit } from '@angular/core';
import { GravatarService } from '@infinitycube/gravatar';
import { IUserRes } from '../../interfaces/responses/user-res';

@Component({
  selector: 'ion-user',
  templateUrl: './ion-user.component.html'
})
export class IonUserComponent implements OnInit {

  @Input() user: IUserRes;
  @Input() button: string;

  constructor(
    private _gravatarService: GravatarService
  ) {
  }

  ngOnInit() {
    this.user.avatar = this._gravatarService.url(this.user.email, 100, 'wavatar')
  }

}
