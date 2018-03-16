import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';
import {UserService} from '../services/user.service'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {MatSnackBar} from '@angular/material';



@Component({
  selector: 'app-dialog-overview-example',
  templateUrl: './dialog-overview-example.component.html',
  styleUrls: ['./dialog-overview-example.component.css'],
  providers: [UserService]
})
export class DialogOverviewExampleComponent {
  password: string;
  mail: string;
  passwordRef: string;
  mailRef: string;

  constructor(private router: Router,
    public dialogRef: MatDialogRef<DialogOverviewExampleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userservice: UserService,
    public snackBar: MatSnackBar
  ) { }

    openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 2000,
      });
    }

    cerrar(){
      this.dialogRef.close();
    }

    enviar(mail, mailRef, password, passwordRef){
      this.data.email = mail;
      this.data.password = password;
      if(password == passwordRef && mail == mailRef){
      console.log("data: ", this.data)
      this.userservice.updateUser(this.data)
        .subscribe(
          data => {
            console.log("chaka: ", data),
          error =>  { console.error("error: ", error)}
          }
        )
      this.dialogRef.close();
      this.router.navigate(["listado"]);
    }else{
      console.log("Valida tu contraseña");
      this.openSnackBar("Valida los datos", "Cerrar");
      }
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
