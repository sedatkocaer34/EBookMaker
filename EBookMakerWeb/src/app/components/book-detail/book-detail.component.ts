import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  @ViewChild('dataContainer') dataContainer: ElementRef;
  constructor(private bookService:BookService, private route: ActivatedRoute) { }

  ngOnInit(): void
  {
    const routeParams = this.route.snapshot.paramMap;
    const bookIdFromRoute = String(routeParams.get('bookId'));
    this.getBook(bookIdFromRoute);
  }
  
  getBook(bookId:string)
  {
    this.bookService.getBookById(bookId).subscribe(data =>{
      this.loadData(data.book.description);
      console.log(data.book.description);
    });
  }

  loadData(data)
  {
    this.dataContainer.nativeElement.innerHTML = data;
  }

}
