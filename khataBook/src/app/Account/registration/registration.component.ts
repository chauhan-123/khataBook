import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  register = true;

  constructor() { }

  ngOnInit() {

  }

  signup() {
    this.register = false;
  }

  signin() {
    this.register = true;
  }
}
