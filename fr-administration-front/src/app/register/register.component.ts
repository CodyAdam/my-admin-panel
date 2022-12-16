import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiHelperService } from '../api-helper.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {


  constructor(
    private api: ApiHelperService,
    private router: Router
  ){}

  form = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    age: new FormControl(20),
    password: new FormControl('')
  })

  register(){
    this.api.post({
      endpoint: '/users', 
      data: {
        firstname: this.form.get('firstname'),
        lastname: this.form.get('lastname'),
        age: this.form.get('age'),
        password: this.form.get('password')
      }
    }).then(res => {
      this.router.navigate(['/login'], {queryParams: {
        id: res.id
      }})
    })
  }
}
