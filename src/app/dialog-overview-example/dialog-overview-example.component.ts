import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';
import {UserService} from '../services/user.service'


@Component({
  selector: 'app-dialog-overview-example',
  templateUrl: './dialog-overview-example.component.html',
  styleUrls: ['./dialog-overview-example.component.css'],
  providers: [UserService]
})
export class DialogOverviewExampleComponent {
  password: string;
  mail: string;

  constructor(private router: Router,
    public dialogRef: MatDialogRef<DialogOverviewExampleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userservice: UserService
  ) { }

    cerrar(){
      this.dialogRef.close();
    }

    enviar(mail, password){
      this.data.email = mail;
      this.data.password = password;
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
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
