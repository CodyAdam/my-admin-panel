import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiHelperService } from '../api-helper.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  form: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  })
  loginError: boolean = false

  constructor(
    private api: ApiHelperService,
    private token: TokenStorageService
  ){}
  ngOnInit(): void {
    
  }


  login(): void {
    this.loginError = false
    this.api.post({
      endpoint: '/auth/login',
      data: {
        username: this.form.get('username')?.value,
        password: this.form.get('password')?.value
      }
    }).then(response => {
      this.token.save(response.access_token)
    }).catch((err: HttpErrorResponse) => {
      if(err.status === 401){
        this.loginError = true
        this.form.get('password')?.setValue('')
      }
    })
  }
}
