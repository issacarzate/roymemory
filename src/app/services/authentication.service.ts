import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
  url= 'http://localhost:7080/v1';
  //url= 'http://104.236.84.230:7080/v1'
  constructor(private http: Http, private router: Router) { }

  login(user)  {
    return this.http.post(`${this.url}/auth`, user)
      .map((response: Response) =>  {
        //inicia sesión
        let userdata = response.json()
        if(user && user.rfc && user.password &&
           userdata && userdata.password &&
           user.rfc == userdata.rfc &&
           user.password == userdata.password)  {
             localStorage.setItem('currentUser', JSON.stringify(userdata))}
        else if(user && user.rfc && user.password &&
           userdata && !userdata.password &&
           user.rfc == userdata.rfc &&
           user.password == userdata.rfc)  {
             localStorage.setItem('currentUser', JSON.stringify(userdata))}
        if(localStorage.getItem('currentUser')) {
           return userdata
        }

      })

  }
  actualizarDatos(user){
    return this.http.put(`${this.url}/auth`, user)//cambiar el url para que sirva para el proyecto

      .map((response: Response) =>  {
        //inicia sesión
        let user = response.json()
        //almacena el usuario
      })
  }
  logout()  {
    localStorage.removeItem('currentUser')
    this.router.navigate([""]);
  }

  olvidePassword(email){
    return this.http.get(`${this.url}/mail?email=${email}`)//cambiar el url para que sirva para el proyecto

      .map((response: Response) =>  {
      })
  }

  actualizarPassword(password, email){
    let user = {password: password}
    return this.http.put(`${this.url}/forgotPassword/${email}`, user)
    .map((response: Response) =>  {
    })
  }

}
