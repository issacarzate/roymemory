import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AuthenticationService } from './../services/authentication.service';


@Component({
  selector: 'app-forgotten',
  templateUrl: './forgotten.component.html',
  styleUrls: ['./forgotten.component.css'],
  providers: [AuthenticationService]
})
export class ForgottenComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private _httpAuthService:AuthenticationService,
              private dialog: MatDialog,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    let user = this.activatedRoute.snapshot.queryParams["user"];
    console.log(user)
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  olvidePassword(password){
    let mail = this.activatedRoute.snapshot.queryParams["user"];
    this._httpAuthService.actualizarPassword(password, mail)
      .subscribe(
        data => {
          console.log("Contraseña enviada: ", mail, password)
          this.openSnackBar("Puedes ingresar con tu nueva contraseña", "Cerrar");
        }, error => {
          this.openSnackBar("Usuario Incorrecto", "Cerrar");
          console.error("error: ", error)
          console.log("A la verga");
        });
  }

}
