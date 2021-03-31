export class Book{
    title:String;
    description:String;
    userId:String;
    constructor(book) {
        {
          this.title = book.title || '';
          this.description = book.description || '';
          this.userId = book.userId || '';
        }
    }
    
}