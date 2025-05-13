import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDatails } from './user-datails';

import {CookieService} from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private cookie: CookieService) { }

  registerData(data: UserDatails) {
    return this.http.post('https://node-app-tljn.onrender.com/api/register', data, {withCredentials: true});
  }

  loginData(data: {email: string, password: string}) {
    return this.http.post('https://node-app-tljn.onrender.com/api/login', data, {withCredentials: true})
  }
  verifyEmail(data: {code: string}) {
    return this.http.post('https://node-app-tljn.onrender.com/api/verify-email', data, {withCredentials: true});
  }

  logout(){
    return this.http.post('https://node-app-tljn.onrender.com/api/logout',{}, {withCredentials: true}).subscribe(res => {
      this.cookie.delete('token')});
  }
  getUserInfo(){
    return this.http.get<{firstName:string}>('https://node-app-tljn.onrender.com/api/user-info', {withCredentials: true})
  }



  

}
