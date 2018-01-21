import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class ListaService {

  constructor(private http: Http) { }



  obtenerFactura(rfc)  {
    return this.http.get('http://104.236.84.230:7080/v1/users/', rfc)
    .map(res =>  {
      console.log(":v_ ", res)
      return res.json()})
  }
  obtenerFacturaUnica(file) {
    return this.http.get(`http://104.236.84.230:7080/v1/file/${file}`)
    .map(res =>  {
      console.log(":v_ ", res)
      return res.json()})
  }



}
