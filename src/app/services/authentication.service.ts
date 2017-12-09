import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {

  constructor(private http: Http) { }

  login(user)  {
    console.log("login auth: ", user)
    // var User = {rfc: "123", password: "123"}
    // if(user === User) return User
    return this.http.post('http://104.236.84.230:7080/v1/auth', user)//cambiar el url para que sirva para el proyecto

      .map((response: Response) =>  {
        console.log(response)
        //inicia sesión
        let user = response.json()
        //almacena el usuario
        if(user && user.token)  localStorage.setItem('currentUser', JSON.stringify(user))
        localStorage.setItem('currentUser', JSON.stringify(user))
        console.log(localStorage.getItem('currentUser'))
      })

  }
  logout()  {
    localStorage.removeItem('currentUser')
  }

}
