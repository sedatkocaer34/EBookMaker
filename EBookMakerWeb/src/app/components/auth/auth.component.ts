import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import { Router } from "@angular/router";
import { environment } from '../../../environments/environment';
import { first } from 'rxjs/operators';
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
  constructor(private fb:FormBuilder,private userService:UserService,private router:Router) { }
 
  ngOnInit(): void {
     if (this.userService.currentUser.subscribe(data =>{
        if(data)
          this.router.navigate(['/']);
     }))
    this.createLoginForm();
    this.createRegisterForm();
  }

  login() {
    const val = this.formLogin.value;
    if (val.email && val.password) {
        this.userService.login(val.email, val.password).pipe(first()).subscribe(data => {
        this.router.navigateByUrl('/');
      },
        error => {
            this.error = error;
        });
    }
  }

  register() {
    const val = this.formLogin.value;
    if (val.email && val.password) {
        this.userService.login(val.email, val.password).subscribe(() => {
        this.router.navigateByUrl('/');});
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
