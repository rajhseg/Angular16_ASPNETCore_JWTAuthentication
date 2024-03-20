import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TokenService } from './services/token.service';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { LoaderService } from './services/loader.service';
import { LoginapiService } from './services/loginapi.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, MatProgressBarModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'AngularApp';

  isLoaderVisible:boolean =false;
  isMenuVisible: boolean =false;

  constructor(private tokenService: TokenService, private navigation:Router, private loader:LoaderService,
    private loginService: LoginapiService){
    this.isMenuVisible = tokenService.isLoggedIn();
    this.tokenService.isAuthenticated$.subscribe(x=>{
      this.isMenuVisible = x;
    });

    this.loader.loader$.subscribe((x)=>{
      this.isLoaderVisible = x;
    })
  }

  ngOnInit(): void {
    
  }

  SignOut(){
    this.loginService.SignOut("dummyuser", this.tokenService.GetToken()).subscribe(x=>{
      this.tokenService.logout();
      this.navigation.navigateByUrl("login");
    });    
  }

}
