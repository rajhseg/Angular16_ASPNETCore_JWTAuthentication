import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from './token.service';
import { LoginapiService } from './loginapi.service';

export const canPageActivate: CanActivateFn = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot)=>{
  var tokenService = inject(TokenService);
  var loginApiService = inject(LoginapiService);
  var navigation = inject(Router);
  var loggedin = false;
  var token =  tokenService.GetToken()

  if(token!=null) {

    try
    {
      var sid_model = await loginApiService.Validate(token)
      var sid_local = tokenService.GetSid();

      if(sid_model?.sid===sid_local){
        loggedin = tokenService.isLoggedIn();  
      }
    }
    catch(ex){
      loggedin = false;
    }

  }

  if(!loggedin){
    tokenService.logout();
    navigation.navigateByUrl("login");
  }

  return loggedin;
}

export const canChildPageActivate: CanActivateChildFn =  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot)=>{
  var tokenService = inject(TokenService);
  var navigation = inject(Router);
  var loggedin = tokenService.isLoggedIn();  

  if(!loggedin){
    navigation.navigateByUrl("login");
  }

  return loggedin;
}