import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { RequestOptions } from '@angular/http';
import { ResponseContentType } from '@angular/http';


@Injectable()
export class ListaService {
  url= 'http://localhost:7080/v1';
  //url= 'http://104.236.84.230:7080/v1'
  constructor(private http: Http) { }



  obtenerFactura(rfc)  {
    return this.http.get(`${this.url}/users/${rfc}`)
    .map(res =>  {
      console.log(res)
      return res.json()})

  }
  obtenerFacturaUnica(file) {
    return this.http.get(`${this.url}/file/${file}`)
    .map(res =>  {
      return res.json()})
  }
  // obtenerXML(file){
  //   return this.http.get(`http://104.236.84.230:7080/v1/file/xml/${file}/download`)
  //   .map(res => {
  //     return res
  //   })
  // }

//   downloadFile(file): Observable<Blob> {
//     let options = new RequestOptions({responseType: ResponseContentType.Blob });
//     return this.http.get(`http://104.236.84.230:7080/v1/file/xml/${file}/download`, options)
//         .map(res => res.blob())
// }

    dowloadUniqueXML(file){
      let options = new RequestOptions({responseType: ResponseContentType.Blob });
      return this.http.get(`${this.url}/file/xml/${file}/download`,options)
        .map( res =>  {
          return res.blob()})
    }

}
