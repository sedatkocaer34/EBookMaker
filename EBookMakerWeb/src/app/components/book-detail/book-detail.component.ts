import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/book';
@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  book:Book;
  @ViewChild('dataContainer') dataContainer: ElementRef;
  constructor(private bookService:BookService, private route: ActivatedRoute) { }

  ngOnInit(): void
  {
    this.book=new Book({});
    const routeParams = this.route.snapshot.paramMap;
    const bookIdFromRoute = String(routeParams.get('bookId'));
    this.getBook(bookIdFromRoute);
  }
  
  getBook(bookId:string)
  {
    this.bookService.getBookById(bookId).subscribe(data =>{
      this.book=data.book;
      console.log(this.book);
      this.loadData(data.book.description);
      
    });
  }

  loadData(data)
  {
    this.dataContainer.nativeElement.innerHTML = data;
  }

}
