import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {

  public segment: string = "signin";
  public email:string;

  constructor() { }

  ngOnInit() {
  }

  segmentChanged($event: CustomEvent){
    this.segment = $event.detail.value;
  }

  $goSignIn($event?: any){
    this.segment = 'signin';
    this.email = $event;
  }

}
