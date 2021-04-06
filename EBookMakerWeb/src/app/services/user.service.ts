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

  getUser(id:string):Observable<any>{
    let API_URl=this.apiUrl+"/users/getUser/"+id;
    return this.httpClient.get(API_URl).pipe(map(user =>{
      return user;
    }));
  }

  login( email:string, password:string):Observable<any>{
    let API_URl=this.apiUrl+"/users/signin";
    return this.httpClient.post<any>(API_URl,{email,password}).pipe(map(user =>{
      if(user.status)
      {
        localStorage.setItem('currentUserVal', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }
      else
      {
       return user;
      }
    }));
  }

  updatepassword( oldpass:string, newpass:string,userId:string):Observable<any>{
    let API_URl=this.apiUrl+"/users/updatepassword/"+userId;
    return this.httpClient.put<any>(API_URl,{oldpass,newpass}).pipe(map(data =>{
        return data;
    }));
  }

  logout() {
    localStorage.removeItem('currentUserVal');
    this.currentUserSubject.next(null);
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
