import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginapiService } from '../../services/loginapi.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userName: string = '';
  password: string = '';

  constructor(private loginApi: LoginapiService, private navigation:Router, private tokenService: TokenService, private router: Router) { 
    var loggedin = this.tokenService.isLoggedIn();
    if(loggedin===true){
      navigation.navigateByUrl('author');
    }
  }

  async SignIn() {
    var response = await this.loginApi.SignIn(this.userName, this.password);
    
    if(response){
      this.router.navigateByUrl('/author');
    }
  }
}
