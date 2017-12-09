import { Component, OnInit } from '@angular/core';
import { User } from "./../../interfaces/user";
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-logincomponent',
  templateUrl: './logincomponent.component.html',
  styleUrls: ['./logincomponent.component.css'],
  providers: [AuthenticationService]
})
export class LogincomponentComponent implements OnInit {
public currentUser:any;

  constructor(private _httpAuthService:AuthenticationService) {
    var user: User
   }

  ngOnInit() {
  }

  login(user) {
    console.log("login component: ", user)
    this._httpAuthService.login(user)
      .subscribe(
          data => {
              console.log("Login");
              this.currentUser=JSON.parse(localStorage.getItem('currentUser'));
              location.reload();
          },
          error => {
            console.error("error: ", error)
            console.log("A la verga");
          });
        }
}
