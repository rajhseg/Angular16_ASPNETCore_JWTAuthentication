import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';
import { Observable, from, lastValueFrom, tap } from 'rxjs';
import { TokenService } from '../services/token.service';
import { ENV_SERVER_URL } from '../InjectionTokens/Env_Server_Url';
import { LoaderService } from '../services/loader.service';

export function TokenAuthInterceptorFn(req: HttpRequest<unknown>, next:HttpHandlerFn){
  var ServerUrl: string = inject(ENV_SERVER_URL);
  var loader: LoaderService = inject(LoaderService);

  loader.start();

  if(req.url != ServerUrl+'/Login/SignIn' && req.url != ServerUrl+'/Login/Validate') {      
    return from(handle(req, next)).pipe(tap(x=> loader.stop()));      
  } else{
    return next(req).pipe(tap(x=>loader.stop()));
  }  

}

async function handle(req: HttpRequest<unknown>, next: HttpHandlerFn) {

  var token = inject(TokenService);
  var _token = token.GetToken();

  const authReq = req.clone({
    setHeaders: {
      Authorization: 'Bearer '+_token
    }
  })

  return await lastValueFrom(next(authReq));
}
