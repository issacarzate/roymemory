import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { User } from "./../../interfaces/user";
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-logincomponent',
  templateUrl: './logincomponent.component.html',
  styleUrls: ['./logincomponent.component.css'],
  providers: [AuthenticationService]
})

export class LogincomponentComponent implements OnInit {

static location: Location
public currentUser:any;

  constructor(private _httpAuthService:AuthenticationService,
              private router: Router
              ) {}

  ngOnInit() {
  }

  login(rfc,password) {
    console.log("rfc: ",rfc)
    console.log("password: ",password)
    let user = {
      id:       null,
      password: password,
      rfc:      rfc
    }

    console.log("login component: ", user)
    this._httpAuthService.login(user)
      .subscribe(
          data => {
              this.currentUser=JSON.parse(localStorage.getItem('currentUser'));
              this.router.navigate(["listado"])
          },
          error => {
            console.error("error: ", error)
            console.log("A la verga");
          });
        }
}
