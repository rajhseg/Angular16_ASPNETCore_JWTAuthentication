import { Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthorModel, BookModel } from 'src/app/Models/BookModel';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule} from '@angular/material/icon'
import { MatSelectModule } from '@angular/material/select'
import { MatButtonModule } from '@angular/material/button'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookapiService } from 'src/app/services/bookapi.service';

@Component({
  selector: 'app-addauthor',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule,
    MatIconModule, FormsModule, ReactiveFormsModule, MatSelectModule, NgForOf],
  templateUrl: './addauthor.component.html',
  styleUrls: ['./addauthor.component.css']
})
export class AddauthorComponent {
 Author:AuthorModel = new AuthorModel();

 constructor(private navManager: Router, private api:BookapiService){

 }

 save(){
  this.Author.books = [];
  this.Author.downloadPhotoContent = "";
  this.Author.photoName = "";
  this.Author.uploadPhotoContent = "";

  this.api.AddAuthor(this.Author).then((x)=>{
    this.navManager.navigate(["/author"]);
  });
 }

 back(){
  this.navManager.navigate(["/author"]);
 }

}
