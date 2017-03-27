import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  user = {
    username: '',
    password: ''
  };

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form:FormGroup) {
    console.log(form);
  }

}
