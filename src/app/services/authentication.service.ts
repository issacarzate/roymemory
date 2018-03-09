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
        let userdata = response.json()
        if(user && user.rfc && user.password &&
           userdata && userdata.password &&
           user.rfc == userdata.rfc &&
           user.password == userdata.password)  {
             console.log("1")
             localStorage.setItem('currentUser', JSON.stringify(userdata))}
        else if(user && user.rfc && user.password &&
           userdata && !userdata.password &&
           user.rfc == userdata.rfc &&
           user.password == userdata.rfc)  {
             console.log("2")
             localStorage.setItem('currentUser', JSON.stringify(userdata))}
        if(localStorage.getItem('currentUser')) {
           console.log("localStorage: ",localStorage.getItem('currentUser'))
           return userdata
        }

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

  olvidePassword(email){
    console.log(`http://104.236.84.230:7080/v1/mail?email=${email}`)
    return this.http.get(`http://104.236.84.230:7080/v1/mail?email=${email}`)//cambiar el url para que sirva para el proyecto

      .map((response: Response) =>  {
        console.log(response)
      })
  }

  actualizarPassword(password, email){
    let user = {password: password}
    console.log("email: ", email)
    console.log("password: ",user)
    return this.http.put(`http://104.236.84.230:7080/v1/forgotPassword/${email}`, user)
    .map((response: Response) =>  {
      console.log(response)
    })
  }

}
