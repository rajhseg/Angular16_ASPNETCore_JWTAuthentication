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
  selector: 'app-addbook',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule,
    MatIconModule, FormsModule, ReactiveFormsModule, MatSelectModule, NgForOf],
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent {
  public Book:BookModel = new BookModel();
  public Authors:AuthorModel[] = [];
  
  constructor(private apiService: BookapiService, private navigation: Router){
    this.apiService.GetAuthors().then((x)=>{
      if(x!=undefined)
       {
         this.Authors = x;         
       }
    });
  }

  back(){
    this.navigation.navigate(["/book"]);
  }

  save(){
    this.apiService.AddBook(this.Book).then((x)=>{
     this.navigation.navigate(["/book"]);
    });
  }
}
