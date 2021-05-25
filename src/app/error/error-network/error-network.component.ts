import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-error-network',
  templateUrl: './error-network.component.html'
})
export class ErrorNetwork implements OnInit {

  constructor(
    private _navCtrl: NavController
  ) { }

  ngOnInit() {}

  doRefresh(event: any) {
    this._navCtrl.navigateRoot('/');
    event.detail.complete();
  }

}
