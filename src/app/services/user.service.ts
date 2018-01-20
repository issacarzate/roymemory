import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import { catchError, map, tap } from 'rxjs/operators'
import 'rxjs/add/operator/map';
import { User} from '../interfaces/user';


@Injectable()
export class UserService {
  url= 'http://192.241.211.154/api/users';

  constructor(private _http: Http){}

  updateUser(user)  {
    console.log(":v ", user)
    return this._http.post('http://104.236.84.230:7080/v1/users/', user)
          .pipe(
            tap(hola => console.log("hola"),
            catchError(error => console.log("error")))
          )
      // .map(response =>  {
      //   console.log("actualizado: ", response)
      //   return response.json()
      // })
  }

  getUsers(){
    return this._http.get(this.url)
      .map(res => res.json());
  }

  getPaises(){
    return this._http.get("/public/js/paises.json")
      .map(res => res.json());
  }

  searchUsers(term : string ){
    return this._http.get('http://192.241.211.154/api/listas?user='+term)
      .map(res => res.json());
  }

  searchUser(term : string ){
    return this._http.get(this.url +'/'+term)
      .map(res => res.json());
  }
  addTheme(idUser : number, idCat : number , body){
    var headers = new Headers ();
    headers.append('Content-Type','application/json');
    return this._http.post('http://192.241.211.154/api/themes/relation',body,{headers:headers})
      .map(res => res.json());
  }
  addCard(body){
    var headers = new Headers ();
    headers.append('Content-Type','application/json');
    return this._http.post('http://192.241.211.154/api/BankCard',body,{headers:headers})
      .map(res => res.json());
  }

  getCards(term){
    return this._http.get(this.url +'/bankcard/'+term)
      .map(res => res.json());
  }


  postUsers(user: User){
    var headers = new Headers ();
    headers.append('Content-Type','application/json');
    return this._http.post(this.url, user, {headers: headers})
    .map(res => res.json());
  }

  deleteUser(term: string){
    var headers = new Headers ();
    headers.append('Content-Type','application/json');
    return this._http.delete(this.url+"/"+term, {headers: headers})
    .map(res => res.json());
  }

  // updateUsers(user: User, term: string){
  //   var headers = new Headers ();
  //   headers.append('Content-Type','application/json');
  //   return this._http.put(this.url+"/"+term, user, {headers: headers})
  //   .map(res => res.json());
  // }
  private jwt() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if(currentUser && currentUser.token)  {
      let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token })
      return new RequestOptions({headers:headers})
    }
  }
}
