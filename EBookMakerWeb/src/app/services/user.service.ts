import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {User} from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: string = 'http://localhost:3000/';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient:HttpClient) { }


  createUser(data:User):Observable<any>{
      let API_URl=this.apiUrl+"/users/addnewuser";
      return this.httpClient.post(API_URl,data).pipe(catchError(this.error))
  }

   // Handle Errors 
   error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
