import { Component, OnInit } from '@angular/core';
import { User } from "./../../interfaces/user"

@Component({
  selector: 'app-logincomponent',
  templateUrl: './logincomponent.component.html',
  styleUrls: ['./logincomponent.component.css']
})
export class LogincomponentComponent implements OnInit {

  constructor() {
    var user: User
   }

  ngOnInit() {
  }

  login(user) {
    console.log("user: ", user)
  }

}
