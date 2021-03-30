import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import { Router } from "@angular/router";
import { environment } from '../../../environments/environment';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  error:string;
  formLogin:FormGroup;
  formRegister:FormGroup;
  tabsign=true;
  success:string;
  user:User;
  submitlogin=false;
  submitregister=false;
  constructor(private fb:FormBuilder,private userService:UserService,private router:Router) { }
 
  ngOnInit(): void {
     if (this.userService.currentUser.subscribe(data =>{
        if(data)
          this.router.navigate(['/']);
     }))
    this.createLoginForm();
    this.createRegisterForm();
  }

  get loginFormValidaiton() { return this.formLogin.controls; }

  login() {
    this.submitlogin=true;
    if (this.formLogin.invalid) {
      return;
    }
    const val = this.formLogin.value;
    if (val.email && val.password) {
        this.userService.login(val.email, val.password).pipe(first()).subscribe(data => {
          if(data.status)
          {
            this.router.navigateByUrl('/');
          }
          else
          {
            this.error = data.message;
          }
      },
        error => {
            this.error = error;
        });
    }
  }

  get registerFormValidaiton() { return this.formRegister.controls; }

  register() {
    this.submitregister=true;
    if (this.formRegister.invalid) {
      return;
    }
    const val = this.formRegister.value;
    if (val.username && val.email && val.password && val.passwordconfirm) {
      if(val.password===val.passwordconfirm)
      {
        this.user = new User({username:val.username,email:val.email,password:val.password});
        this.userService.createUser(this.user).pipe(first()).subscribe(data => {
          if(data.status)
          {
            this.success="Success";
            this.changeTab();
          }
          else
          {
            this.error = data.message;
          }
      },
        error => {
            this.error = error;
        });
      }
      else
      {
        this.error ="Password and password confirm not match";
      }
    }
  }

  changeTab()
  {
    if(this.tabsign)
      this.tabsign=false;
    else
      this.tabsign=true;
  }

  createLoginForm()
  {
    this.formLogin = this.fb.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
  });
  }

  createRegisterForm()
  {
    this.formRegister = this.fb.group({
      email: ['',Validators.required],
      username: ['',Validators.required],
      passwordconfirm: ['',Validators.required],
      password: ['',Validators.required]
  });
  }
}
