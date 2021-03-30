import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { UserService } from "../../services/user.service";
import { User } from "../../models/user";
import { Router } from "@angular/router";
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  currentUser: User;
  constructor(
    private router: Router,
    private authenticationService: UserService){
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);}
  ngOnInit(): void {
   
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/auth']);
  }

}
