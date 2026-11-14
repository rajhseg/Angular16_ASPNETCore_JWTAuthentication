import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AuthorModel, BookModel, DeleteAuthorModal, UpdateAuthorModel } from '../Models/BookModel';
import { ENV_SERVER_URL } from '../InjectionTokens/Env_Server_Url';

@Injectable({
  providedIn: 'root'
})
export class BookapiService {

  constructor(private http:HttpClient,@Inject(ENV_SERVER_URL) private ServerUrl: string,) { }

  public async GetBooks() : Promise<BookModel[] | undefined> {
     var books = await this.http.get<BookModel[]>(this.ServerUrl+'/book/getbooks',  { withCredentials: true } ).toPromise();
     return books;
  }

  public async GetBook(id:number): Promise<BookModel|undefined> {
     var book = await this.http.get<BookModel>(this.ServerUrl+'/book/getbook?id='+id,  { withCredentials: true } ).toPromise();
     return book;
  }

  public async UpdateBook(book:BookModel): Promise<void> {
    await this.http.post(this.ServerUrl+'/book/updatebook', book,  { withCredentials: true } ).toPromise();
  }

  public async AddBook(book:BookModel): Promise<void> {
    await this.http.post(this.ServerUrl+'/book/addbook', book, { withCredentials: true } ).toPromise();
  }
  
  public async DeleteBook(book:BookModel): Promise<void> {
    await this.http.post(this.ServerUrl+'/book/deletebook', book,  { withCredentials: true } ).toPromise();
  }

  
  public async GetAuthors() : Promise<AuthorModel[] | undefined> {
    var books = await this.http.get<AuthorModel[]>(this.ServerUrl+'/author/getauthors',  { withCredentials: true } ).toPromise();
    return books;
 }

 public async GetAuthor(id:number): Promise<AuthorModel|undefined> {
    var book = await this.http.get<AuthorModel>(this.ServerUrl+'/author/getauthor?id='+id,  { withCredentials: true } ).toPromise();
    return book;
 }

 public async UpdateAuthor(author:UpdateAuthorModel): Promise<void> {
   await this.http.post(this.ServerUrl+'/author/updateauthor', author,  { withCredentials: true } ).toPromise();
 }

 public async AddAuthor(author:AuthorModel): Promise<void> {
   await this.http.post(this.ServerUrl+'/author/addauthor', author,  { withCredentials: true } ).toPromise();
 }
 
 public async DeleteAuthor(author:DeleteAuthorModal): Promise<void> {
   await this.http.post(this.ServerUrl+'/author/deleteauthor', author,  { withCredentials: true } ).toPromise();
 }

}
