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
  selector: 'app-editbook',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule,
            MatIconModule, FormsModule, ReactiveFormsModule, MatSelectModule, NgForOf],
  templateUrl: './editbook.component.html',
  styleUrls: ['./editbook.component.css'],
  providers:[]
})
export class EditbookComponent implements OnInit{

  public Book:BookModel;
  public Authors:AuthorModel[] = [];
  

  constructor(route: ActivatedRoute, private apiService:BookapiService, private navigation: Router){
    this.Book = window.history.state as BookModel;   
    this.apiService.GetAuthors().then((x)=>{
      if(x!=undefined)
       {
         this.Authors = x;         
       }
    });
  }

  ngOnInit(): void {
    
  }

  back(){
    this.navigation.navigate(['/book']);
  }

  save(){
    this.apiService.UpdateBook(this.Book).then((x)=>{
      this.navigation.navigate(["/book"]);
    });    
  }
}
