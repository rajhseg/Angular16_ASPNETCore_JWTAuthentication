import { Component, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { BookapiService } from 'src/app/services/bookapi.service';
import { AuthorModel, DeleteAuthorModal } from 'src/app/Models/BookModel';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-author',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatTableModule, MatButtonModule],
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent {

  Authors:AuthorModel[] = [];
  displayColumns:string[] = ['id','name','books', 'Actions'];
  childDisplayColumns: string[] = ['id', 'title', 'description'];

  constructor(private api: BookapiService, private navManager: Router, @Inject(DOCUMENT) private document:Document){
    this.LoadData();
  }

  LoadData(){
    this.api.GetAuthors().then((x)=>{
      if(x!=undefined){
        this.Authors = x;
      }
    });
  }

  AddAuthor(){
    this.navManager.navigate(["/author/addauthor"]);
  }

  Edit(model:AuthorModel){
    this.navManager.navigate(["/author/editauthor"],{ state:model});
  }

  Delete(model:AuthorModel){
    var delModel = new DeleteAuthorModal();
    delModel.id = model.id;
    this.api.DeleteAuthor(delModel).then((x)=>{
      this.LoadData();
    });
  }

  showbooks(tableRef:string){
    var ele = this.document.getElementById('ctable'+tableRef);
    if(ele!=undefined){
    if(ele.style.display == "" || ele.style.display == undefined || ele.style.display == "none") {
        ele.style.display = "block";
      }
      else{
        ele.style.display = "none";
      }
    }
  }
}
