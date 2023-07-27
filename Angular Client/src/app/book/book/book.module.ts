import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './book.component';
import { AddbookComponent } from '../addbook/addbook.component';
import { EditbookComponent } from '../editbook/editbook.component';
import { canChildPageActivate, canPageActivate } from 'src/app/services/pageactivate.service';

export const routes: Routes = [
  { 
    path:'',
    component:  BookComponent,
    children:[
         
    ],
    canActivate: [canPageActivate],
    canActivateChild:[canChildPageActivate]
  },
  { path:'editbook', component: EditbookComponent, canActivate:[canPageActivate]},
  { path:'addbook', component: AddbookComponent, canActivate:[canPageActivate]}   
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class BookModule { }
