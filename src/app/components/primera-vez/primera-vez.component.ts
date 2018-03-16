import { Component, OnInit, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { User } from "./../../interfaces/user";
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

import * as jsPDF from 'jspdf'


@Component({
  selector: 'app-primera-vez',
  templateUrl: './primera-vez.component.html',
  styleUrls: ['./primera-vez.component.css'],
  providers: [AuthenticationService, {provide: 'Window',  useValue: window} ]
})

export class PrimeraVezComponent implements OnInit {
  heroes = ['Windstorm', 'Bombasto', 'Magneta', 'Tornado'];

  user: string;
  password: string;
  email: string;
  mail: string;
  passwordRef: string;

static location: Location
public currentUser:any;
public rfc: any;

  constructor(private _httpAuthService:AuthenticationService,
              private router: Router,
              @Inject('Window') private window: Window
              ) {}

  ngOnInit() {
  }

  download() {

        var doc = new jsPDF();
        doc.text(20, 20, 'Hello world!');
        doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
        doc.addPage();
        doc.text(20, 20, 'Do you like that?');

        // Save the PDF
        doc.save('Test.pdf');
    }

  actualizarDatos(password, passwordRef, email) {
    this.rfc=JSON.parse(localStorage.getItem('currentUser'));
    let user = {
      id:       null,
      password: password,
      rfc:      this.rfc.rfc,
      email:    email
    }
    if(password == passwordRef){
    this._httpAuthService.actualizarDatos(user)
      .subscribe(
          data => {
              this.router.navigate(["listado"])
          },
          error => {
            console.error("error: ", error)
            console.log("A la verga");
          });
        }else{
        console.log("Escribe la misma contraseña en los dos campos")
      }
}
}
