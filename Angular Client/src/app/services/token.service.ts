import { Injectable, signal, WritableSignal } from '@angular/core';
import { LoginResponse } from '../Models/LoginResponse';
import { toObservable } from '@angular/core/rxjs-interop'
import { LoginapiService } from './loginapi.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  // token: string | null = '';
  isSignIn: WritableSignal<boolean> = signal(false);
  isAuthenticated$ = toObservable(this.isSignIn);

  constructor() { 
  }

  isLoggedIn(): boolean {
    return this.isSignIn();
  }

  UpdateToken(response: LoginResponse){
    if(response!=undefined){
    this.isSignIn.set(true);
    localStorage.setItem("sid",this.encode(response.userName));
   }
 }

 updateAntiForgery(_a: string) {
  localStorage.setItem("anti_token", this.encode(_a));
 }

 GetSid(): string {
  var _sid = localStorage.getItem("sid");
  if(_sid!=null){
    return this.decode(_sid);
  }
  return "";
 }

 getAntiToken(): string {
  let val = localStorage.getItem("anti_token") || "";
  let token = this.decode(val);
  return token;
 }  

  logout() {
    localStorage.removeItem("user_info");
    localStorage.removeItem("sid");
    this.isSignIn.set(false);
  }

  
  decode(str: string):string { 
    return atob(str);    
   }

  encode(str: string):string {
    return btoa(str)
  }

}

