import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {

  constructor(private http: Http, private router: Router) { }

  login(user)  {
    return this.http.post('http://104.236.84.230:7080/v1/auth', user)
      .map((response: Response) =>  {
        console.log(response)
        //inicia sesión
        let user = response.json()
        //almacena el usuario
        if(user && user.token)  localStorage.setItem('currentUser', JSON.stringify(user))
        localStorage.setItem('currentUser', JSON.stringify(user))
        console.log(localStorage.getItem('currentUser'))
        return user
      })

  }
  actualizarDatos(user){
    return this.http.put('http://104.236.84.230:7080/v1/auth', user)//cambiar el url para que sirva para el proyecto

      .map((response: Response) =>  {
        console.log(response)
        //inicia sesión
        let user = response.json()
        //almacena el usuario
      })
  }
  logout()  {
    localStorage.removeItem('currentUser')
    this.router.navigate([""]);
  }

}
