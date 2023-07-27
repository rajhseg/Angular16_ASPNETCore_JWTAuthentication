import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: 'login', loadComponent: () => LoginComponent },
  { path: 'home', loadComponent: () => HomeComponent },
  { path: 'author', loadChildren: () => import('./author/author/author.module').then(x=>x.AuthorModule) },
  { path: 'book', loadChildren: ()=> import('./book/book/book.module').then(x=>x.BookModule) },
  { path: '**', redirectTo:'login' }
];
