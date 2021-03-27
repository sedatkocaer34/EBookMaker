import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'EBookMakerWeb';
  titles:String[]=[];
  number:number;
  formdata;
  constructor(private formBuilder: FormBuilder) { }

  onClickSubmit(data) {
     
     
  }

  addTitle()
  {
    this.titles[this.number]="<h1 id="+this.number+">Titles</h1>";
    this.formdata.get('description').setValue(this.formdata.get('description').value+this.titles[this.number]);
    this.number++;
  }

  addSubTitle()
  {
    this.titles[this.number]="<h3 id="+this.number+">Titles</h3>";
    this.formdata.get('description').setValue(this.formdata.get('description').value+this.titles[this.number]);
    this.number++;
  }

  ngOnInit(): void {
    this.formdata = this.formBuilder.group({
              description: ['', [Validators.required,
                Validators.maxLength(400), Validators.minLength(5)]]
          });
      this.number=0;    
    }
}
