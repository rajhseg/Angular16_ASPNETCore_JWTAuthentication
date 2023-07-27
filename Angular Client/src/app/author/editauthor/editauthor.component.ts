import { Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthorModel, BookModel, UpdateAuthorModel } from 'src/app/Models/BookModel';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule} from '@angular/material/icon'
import { MatSelectModule } from '@angular/material/select'
import { MatButtonModule } from '@angular/material/button'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookapiService } from 'src/app/services/bookapi.service';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-editauthor',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule,
    MatIconModule, FormsModule, ReactiveFormsModule, MatSelectModule, NgForOf, MatCardModule],
  templateUrl: './editauthor.component.html',
  styleUrls: ['./editauthor.component.css']
})
export class EditauthorComponent {

  Author:AuthorModel = new AuthorModel();
  AuthorImage: string = '';
  ChangedImage: string | undefined = undefined ;
  UploadContent: string = '';
  UploadPhotoName: string|undefined = undefined;

 constructor(private navManager: Router ,private route: ActivatedRoute, private api:BookapiService){
  this.LoadData();
 }

 LoadData(){
  this.api.GetAuthor(window.history.state.id).then((x)=>{
    if(x!=undefined){
      this.Author = x;
      if(this.Author.downloadPhotoContent!=null){
        console.log(this.Author.downloadPhotoContent);
        this.AuthorImage = 'data:image/jpeg;base64,'+this.Author.downloadPhotoContent;
      }
      else{
        this.AuthorImage = "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=";
      }
    }
  });
 }
 
 save(){
  var model = new UpdateAuthorModel();
  model.books = [];
  model.id = this.Author.id;
  model.name = this.Author.name;
  if(this.UploadPhotoName!=undefined){
    model.photoName = this.UploadPhotoName;
    model.userPhotoInBytes = this.UploadContent;
  } else{
    model.photoName = this.Author.photoName;
    model.userPhotoInBytes = this.Author.downloadPhotoContent;
  }

  this.api.UpdateAuthor(model).then((x)=>{
    this.navManager.navigate(["/author"]);
  });
 }

 back(){
  this.navManager.navigate(["/author"]);
 }

 jpgnputChange($evt:Event){
  var file = (($evt.target as HTMLInputElement).files as FileList)[0]
   
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = ()=> {
    this.ChangedImage = reader.result?.toString();
    var data = reader.result?.toString().split("image/jpeg;base64,");
    if(data!=undefined)
      {
        this.UploadPhotoName = file.name;
        this.UploadContent = data[1];
      }
  }
 }
}
