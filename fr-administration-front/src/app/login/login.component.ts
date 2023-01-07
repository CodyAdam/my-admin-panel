import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiHelperService } from '../services/api-helper.service';
import { TokenStorageService } from '../services/token-storage.service';
import {FormControl, FormGroup} from "@angular/forms";
import {HttpErrorResponse, HttpStatusCode} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  host: { class: 'h-full' },
})
export class LoginComponent implements OnInit {

  loginGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })
  registerGroup = new FormGroup({
    email: new FormControl(''),
    age: new FormControl(0),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    password: new FormControl('')
  })

  public state: 'loading' | 'error' | 'success' | 'idle' = 'idle';
  errorMessage: string = ""

  @ViewChild('loginForm') loginForm: ElementRef<HTMLFormElement> | null = null;
  @ViewChild('registerForm') registerForm: ElementRef<HTMLFormElement> | null =
    null;
  constructor(
    private api: ApiHelperService,
    private token: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.token.isLogged()) this.state = 'success';
  }

  login() {
    if (!this.loginForm || !this.loginForm.nativeElement.checkValidity())
      return;
    this.state = 'loading';

    const [email, password] = [this.loginGroup.get('email')?.value, this.loginGroup.get('password')?.value];
    this.api
      .post({ endpoint: '/auth/login', data: { username: email, password } })
      .then((response) => {
        if (response.access_token && response.id) {
          this.token.save(response.access_token, response.id);
          this.state = 'success';
          this.router.navigateByUrl('/users');
        } else this.state = 'error';
      })
      .catch((error) => {
        if(error.status == HttpStatusCode.Unauthorized)
          this.errorMessage = "Wrong information entered"
        this.state = 'error';
      });
  }

  register() {
    if (!this.registerForm || !this.registerForm.nativeElement.checkValidity())
      return;
    this.state = 'loading';
    const data = {
      email: this.registerGroup.get('email')?.value,
      password: this.registerGroup.get('password')?.value,
      firstname: this.registerGroup.get('firstname')?.value,
      lastname: this.registerGroup.get('lastname')?.value,
      age: this.registerGroup.get('age')?.value,
    }
    this.api
      .post({ endpoint: '/auth/register', data})
      .then((response) => {
        if (response.access_token && response.id) {
          this.token.save(response.access_token, response.id);
          this.state = 'success';
          this.router.navigateByUrl('/users');
        } else this.state = 'error';
      })
      .catch((error) => {
        this.errorMessage = error.error.message
        this.state = 'error';
      });
  }

  submit(event: any): void {
    event.preventDefault();
  }

  closeErrorMessage() {
    this.state = "idle"
  }
}
