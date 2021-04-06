import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import {UserService} from '../../services/user.service';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  submited:boolean = false;
  errormessages:string;
  successmessages:string;
  user:User;
  loading:boolean;
  formUpdateProfile:FormGroup;
  constructor(private fb:FormBuilder,private userService:UserService) { }

  ngOnInit(): void {
    this.user=new User({});
    this.getUserProfile();
    this.createUpdateProfileForm();
  }

  getUserProfile()
  {
     this.userService.getUser(JSON.parse(localStorage.getItem('currentUserVal')).id).subscribe(data =>{
          this.user=data;
          
     })
  }

  updateProfile()
  {
    this.loading=true;
    this.submited=true;
    if(this.formUpdateProfile.invalid)
    {
      this.loading=false;
      return;
    }

    const val = this.formUpdateProfile.value;
    this.userService.updateProfile(new User({username:val.username,email:val.email,id:JSON.parse(localStorage.getItem('currentUserVal')).id})).subscribe(data =>{

        this.loading=false;
        if(data.status)
        {
          this.successmessages="Profile Updated";
        }
        else
        {
          this.errormessages = data.message;
        }
    });
  }

  get updatePorfileFormValidaiton() { return this.formUpdateProfile.controls; }

  createUpdateProfileForm()
  {
    this.formUpdateProfile = this.fb.group({
      email: ['',Validators.required],
      username: ['',Validators.required],
      password: ['',Validators.required]
  });
  }

}
