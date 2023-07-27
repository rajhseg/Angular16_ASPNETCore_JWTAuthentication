import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthorComponent } from './author.component';
import { AddauthorComponent } from '../addauthor/addauthor.component';
import { EditauthorComponent } from '../editauthor/editauthor.component';
import { canChildPageActivate, canPageActivate } from 'src/app/services/pageactivate.service';

export const routes:Routes = [
  { 
    path: '', 
    component: AuthorComponent,
    children:[
      
    ],    
    canActivate: [canPageActivate],
    canActivateChild:[canChildPageActivate]
  },
  { path:'addauthor', component: AddauthorComponent, canActivate: [canPageActivate]},
  { path:'editauthor', component: EditauthorComponent,  canActivate: [canPageActivate]},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class AuthorModule { }
