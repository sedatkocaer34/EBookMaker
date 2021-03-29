import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {User} from '../models/user';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  apiUrl: string = 'http://localhost:3000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient:HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUserVal')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

   public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  createUser(data:User):Observable<any>{
      let API_URl=this.apiUrl+"/users/addnewuser";
      return this.httpClient.post(API_URl,data).pipe(catchError(this.error))
  }

  login( email:string, password:string):Observable<any>{
    let API_URl=this.apiUrl+"/users/signin";
 
    return this.httpClient.post<any>(API_URl,{email,password}).pipe(map(user =>{
      localStorage.setItem('currentUserVal', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return user;
    }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUserVal');
    this.currentUserSubject.next(null);
  }

   // Handle Errors 
   error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage =  error.error.message;
    }
    return throwError(errorMessage);
  }

}
