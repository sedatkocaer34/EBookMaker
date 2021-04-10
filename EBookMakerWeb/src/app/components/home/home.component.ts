import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  bookList:Book[];
  currentUser:User;
  constructor(private formBuilder: FormBuilder,private bookService:BookService,private userService:UserService) { }

  ngOnInit(): void {
    
    if(!this.userService.currentUserValue)
    {
      console.log(this.userService.currentUserValue);
      this.currentUser=this.userService.currentUserValue;
    }
    else
    {
      console.log("girdim");
      this.bookList=[];
      this.getUserBookList(JSON.parse(localStorage.getItem('currentUserVal')).id);
    }
  }

  getUserBookList(userId:String)
  {
    this.bookService.getUserBookList(userId).subscribe(book =>{
      this.bookList=book;
    });
  }

}
