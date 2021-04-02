import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { Router } from "@angular/router";
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  titles:String[]=[];
  number:number;
  formdata;
  book:Book;
  constructor(private router:Router,private formBuilder: FormBuilder, private bookService:BookService) { }

  addTitle()
  {
    this.titles[this.number]="<h1 id="+this.number+">Titles</h1>";
    this.formdata.get('description').setValue(this.formdata.get('description').value+this.titles[this.number]);
    this.number++;
  }

  addSubTitle()
  {
    this.titles[this.number]="<h3 id="+this.number+">Titles</h3>";
    this.formdata.get('description').setValue(this.formdata.get('description').value+this.titles[this.number]);
    this.number++;
  }

  ngOnInit(): void {
    this.formdata = this.formBuilder.group({
              title:['',[Validators.required,
                Validators.maxLength(200), Validators.minLength(1)]],
              description: ['', [Validators.required,
                Validators.maxLength(400), Validators.minLength(5)]]
          });
      this.number=0;    
    }

    addBook()
    {
      if (this.formdata.invalid) {
        return;
      }
      const val = this.formdata.value;
      this.book=new Book({title:val.title,description:val.description,userId:JSON.parse(localStorage.getItem('currentUserVal')).id})
      this.bookService.createBook(this.book).subscribe(data =>{
          if(data.status)
          {
            this.router.navigate(['/home']);
          }
      });
    }
}
