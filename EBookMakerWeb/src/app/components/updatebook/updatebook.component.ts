import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-updatebook',
  templateUrl: './updatebook.component.html',
  styleUrls: ['./updatebook.component.css']
})
export class UpdatebookComponent implements OnInit {

  book:Book;
  titles:String[]=[];
  number:number;
  formBook;
  constructor(private formbuilder:FormBuilder,private bookService:BookService, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const bookIdFromRoute = String(routeParams.get('bookId'));
    this.book=new Book({});
    this.getBook(bookIdFromRoute);
    this.createBookForm();
  }


  getBook(bookId:string)
  {
    this.bookService.getBookById(bookId).subscribe(data =>{
      this.book=data.book;
      console.log(data);
    });
  }
  addTitle()
  {
    this.titles[this.number]="<h1 id="+this.number+">Titles</h1>";
    this.formBook.get('description').setValue(this.formBook.get('description').value+this.titles[this.number]);
    this.number++;
  }

  addSubTitle()
  {
    this.titles[this.number]="<h3 id="+this.number+">Titles</h3>";
    this.formBook.get('description').setValue(this.formBook.get('description').value+this.titles[this.number]);
    this.number++;
  }
  onClickSubmit()
  {

  }

  createBookForm()
  {
    this.formBook = this.formbuilder.group({
      title: ['',Validators.required],
      description: ['',Validators.required]
  });
  }
}
