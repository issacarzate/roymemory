import { Component, OnInit, Inject } from '@angular/core';
//import { Location } from '@angular/common';
import { User } from "./../../interfaces/user";
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
//import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {DialogOverviewExampleComponent} from '../../dialog-overview-example/dialog-overview-example.component';
import {OlvidePasswordComponent} from '../../olvide-password/olvide-password.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatSnackBar} from '@angular/material';

//import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-logincomponent',
  templateUrl: './logincomponent.component.html',
  styleUrls: ['./logincomponent.component.css'],
  providers: [AuthenticationService, {provide: 'Window',  useValue: window} ]
})

export class LogincomponentComponent implements OnInit {
  closeResult: string;
  heroes = ['Windstorm', 'Bombasto', 'Magneta', 'Tornado'];
  animal: string;
  name: string;
  user: string;
  password: string;

static location: Location
public currentUser:any;

  constructor(private _httpAuthService:AuthenticationService,
              private router: Router,
              @Inject('Window') private window: Window,
              private dialog: MatDialog,
              public snackBar: MatSnackBar
              ) {}

  ngOnInit() {}

  openDialog(user): void {
    let dialogRef = this.dialog.open(DialogOverviewExampleComponent, {
      width: '350px',
      data: user
    });
    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
    });
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  openPasswordDialog() {
    let dialogRef = this.dialog.open(OlvidePasswordComponent, {
      width: '350px'
    });


    dialogRef.afterClosed().subscribe(result => {
    });
  }

  mailUpdate(correo){
    let user2 = JSON.parse(localStorage.getItem('currentUser'));
    user2.correo=correo;
    this._httpAuthService.actualizarDatos(user2)
    .subscribe(
      data => {
        this.currentUser=JSON.parse(localStorage.getItem('currentUser'));
        let user = JSON.parse(localStorage.getItem('currentUser'));
        this.router.navigate(["listado"])
  },
    error => {
      console.error("error: ", error)
    });
  }

  login(rfc,password) {
    let user = {
      id:       null,
      password: password,
      rfc:      rfc
    }
    this._httpAuthService.login(user)
      .subscribe(
          data => {
              let serveruser = data
              this.currentUser = (JSON.parse(localStorage.getItem('currentUser'))) ? JSON.parse(localStorage.getItem('currentUser')) : null
              this.currentUser=JSON.parse(localStorage.getItem('currentUser'));
              if (this.currentUser && !this.currentUser.email) {
                   this.openDialog(serveruser);
                } else if (this.currentUser && this.currentUser.email) {
                   this.router.navigate(["listado"])
                } else {
                  this.openSnackBar("El usuario y/o contraseña son inválidos", "Cerrar");
                }
          },
          error => {
            this.openSnackBar("El usuario y/o contraseña son inválidos", "Cerrar");
            console.error("error: ", error)
          });
        }
}
