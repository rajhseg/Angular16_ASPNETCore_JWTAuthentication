export class BookModel {

    public id:number = 0;
    public title: string ='';
    public description:string ='';
    public authorId:number =0;
    public authorName:string ='';
    
    constructor(){

    }
}

export class AuthorModel {

    public id:number = 0;
    
    public name: string = '';

    public photoName: string ='';

    public uploadPhotoContent: string = '';

    public downloadPhotoContent : string ='';

    public books: BookModel[]= [];
}

export class UpdateAuthorModel
{
    public userPhotoInBytes: string = "";

    public id: number = 0;
    
    public name: string ='';

    public photoName: string ='';

    public books: BookModel [] = [];
}

export class DeleteAuthorModal
{
    public id : number = 0;
}