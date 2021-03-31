import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {Book} from '../models/book';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BookService {

  
  apiUrl: string = 'http://localhost:3000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  
  constructor(private httpClient:HttpClient) {}

  createBook(data:Book):Observable<any>{
    let API_URl=this.apiUrl+"/book/addnewbook";
    return this.httpClient.post(API_URl,data).pipe(catchError(this.error))
  }

  getBookById(bookId:String):Observable<any>{
    let API_URl=this.apiUrl+"/book/getbook/"+bookId;
    return this.httpClient.get(API_URl).pipe(map(book =>{
      return book;
    }));
  }

  getUserBookList(userId:String):Observable<any>{
    let API_URl=this.apiUrl+"/book/getbooklist/"+userId;
    return this.httpClient.get(API_URl).pipe(map(book =>{
      return book;
    }));
  }

  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage =  error.message;
    }
    return throwError(errorMessage);
  }

}
