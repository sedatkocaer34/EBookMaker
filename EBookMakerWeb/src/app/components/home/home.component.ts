import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  bookList:Book[];
  constructor(private formBuilder: FormBuilder,private bookService:BookService) { }

  ngOnInit(): void {
    this.bookList=[];
    this.getUserBookList(JSON.parse(localStorage.getItem('currentUserVal')).id);
  }

  getUserBookList(userId:String)
  {
    this.bookService.getUserBookList(userId).subscribe(book =>{
      console.log(book);
      this.bookList=book;
    });
  }

}
