import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { UserService } from "./services/user.service";
import { User } from "./models/user";
import { Router } from "@angular/router";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  
  title = 'EBookMakerWeb';
  currentUser: User;
  constructor(
    private router: Router,
    private authenticationService: UserService){
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);}

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }
}
