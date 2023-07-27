import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { MatTableModule } from '@angular/material/table'
import { MatButtonModule } from '@angular/material/button'
import { BookModel } from 'src/app/Models/BookModel';
import { BookapiService } from 'src/app/services/bookapi.service';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatTableModule, MatButtonModule],
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
   
  public books: BookModel[] = [];
  public displayColumns: string[] = ['id', 'title', 'description', 'authorName', 'Actions'];

   constructor(private bookApiService: BookapiService, private router:Router){  
    this.LoadData();  
   }

   LoadData(){
    this.bookApiService.GetBooks().then((x)=>{
      if(x!=undefined){  
        this.books = x;
      }
    });
   }

   Edit(model:BookModel){
    this.router.navigate(["/book/editbook"],{ state: model});
   }

   Delete(model:BookModel){
    this.bookApiService.DeleteBook(model).then((x)=>{
        this.LoadData();
    })
   }

   AddBook(){
    this.router.navigateByUrl("/book/addbook");
   }

}
