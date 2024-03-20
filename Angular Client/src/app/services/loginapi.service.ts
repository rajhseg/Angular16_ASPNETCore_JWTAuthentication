import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { LoginResponse } from '../Models/LoginResponse';
import { LoginRequest } from '../Models/LoginRequest';
import { inject } from '@angular/core/testing';
import { ENV_SERVER_URL } from '../InjectionTokens/Env_Server_Url';
import { TokenService } from './token.service';
import { ValidateTokenModel, ValidateTokenResponseModel } from '../Models/TokenModel';
import { from, lastValueFrom, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginapiService {

  constructor(@Inject(ENV_SERVER_URL) private ServerUrl: string, private http: HttpClient, private tokenService: TokenService) { }

  SignIn(username: string, password: string): Promise<boolean> {

    var request = new LoginRequest(username, password);
   
    return lastValueFrom(this.http.post<LoginResponse>(this.ServerUrl + "/Login/SignIn", request).pipe(map((x)=>{

      if(x!=undefined){
        this.tokenService.UpdateToken(x);
        return true;
      }  else{
        return false;
      } 
    })));

  }

  SignOut(username:string, token: string): Observable<any> {
    var request = new LoginRequest(username, token);
    return this.http.post(this.ServerUrl+"/Login/SignOut", request);
  }

  async Validate(token:string): Promise<ValidateTokenResponseModel | undefined> {
    return await this.http.post<ValidateTokenResponseModel>(this.ServerUrl+'/login/validate',new ValidateTokenModel(token)).toPromise();
  }

}
