import { Injectable, signal, WritableSignal } from '@angular/core';
import { LoginResponse } from '../Models/LoginResponse';
import { toObservable } from '@angular/core/rxjs-interop'
import { LoginapiService } from './loginapi.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  token: string | null = '';
  isSignIn: WritableSignal<boolean> = signal(false);
  isAuthenticated$ = toObservable(this.isSignIn);

  constructor() { 
    this.GetToken();
  }

  isLoggedIn(): boolean {
    this.GetToken();
    return this.isSignIn();
  }

  UpdateToken(response: LoginResponse){
    if(response.token!=undefined){
    this.token = response.token;
    this.isSignIn.set(true);
    localStorage.setItem("user_info", this.encode(this.token));
    localStorage.setItem("sid",this.encode(response.userName));
   }
 }

 GetSid(): string {
  var _sid = localStorage.getItem("sid");
  if(_sid!=null){
    return this.decode(_sid);
  }
  return "";
 }

   GetToken(): string {
    
    var _token = localStorage.getItem("user_info")!;
    if(_token!=null){
    this.token = this.decode(_token);
      
      if(this.token==undefined || this.token=="" || this.token==null)
      {        
        this.isSignIn.set(false);    
        localStorage.clear();    
      }
      else {  
        if(this.token!=undefined)
          this.isSignIn.set(true);
      }
      return this.token;
    } else {
      this.isSignIn.set(false);
      return "";
    }
  }  

  logout() {
    this.token="";
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

