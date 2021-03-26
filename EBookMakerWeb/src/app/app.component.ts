import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'EBookMakerWeb';

  formdata;
  constructor(private formBuilder: FormBuilder) { }

  onClickSubmit(data) {
      
      console.log(this.formdata.get('description').value); 
      this.formdata.get('description').setValue("<h1>ff</h1>")
          //  this.formdata.get('description').markAsTouched();
    
  }

  ngOnInit(): void {
    this.formdata = this.formBuilder.group({
              description: ['', [Validators.required,
                Validators.maxLength(400), Validators.minLength(5)]]
          });
    }
}
