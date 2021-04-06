import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  formChangePass:FormGroup;
  submited:boolean = false;
  loading:boolean = false;

  constructor(private formbuilder:FormBuilder,private userService:UserService,private router:Router) { }

  ngOnInit(): void
  {
    this.createNewPasswordForm();
  }
  updatePassword()
  {
    this.submited=true;
    this.loading=true;

    if (this.formChangePass.invalid) {
      this.loading=false;
      return;
    }
    
    const val = this.formChangePass.value;
    if(val.newpassconf!=val.newpass)
    {
      //TODO ERROR MESSAGE 
      this.loading=false;
      return;
    }
    this.formChangePass = this.formbuilder.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
      });

      this.userService.updatepassword(val.currentpass,val.newpass,JSON.parse(localStorage.getItem('currentUserVal')).id).subscribe(data =>{
          this.loading=false;
          if(data.status)
          {
            this.userService.logout();
            this.router.navigateByUrl('/auth');
          }
          else
          {
            console.log(data);
            //TODO Error handler
          }
      });
  }

  createNewPasswordForm()
  {
    this.formChangePass = this.formbuilder.group({
      currentpass:['',Validators.required],
      newpass: ['',Validators.required],
      newpassconf: ['',Validators.required], 
    });
  }

}
