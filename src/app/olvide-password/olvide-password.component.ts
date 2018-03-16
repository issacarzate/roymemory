import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import {MatSnackBar} from '@angular/material';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-olvide-password',
  templateUrl: './olvide-password.component.html',
  styleUrls: ['./olvide-password.component.css'],
  providers: [AuthenticationService]
})
export class OlvidePasswordComponent implements OnInit {
  email: string;

  constructor(private _httpAuthService:AuthenticationService,
    private router: Router,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  olvideContrasena(email) {
    if(email==null){
      this.openSnackBar("Ingresa un correo", "Cerrar");
    }
  this._httpAuthService.olvidePassword(email).subscribe(
      data => {
              this.openSnackBar("Revisa tu bandeja de entrada", "Cerrar");
            },
      error => {
        this.openSnackBar("Error: Inténtalo mas tarde", "Cerrar");
        console.error("error: ", error)
      });
    }
}
