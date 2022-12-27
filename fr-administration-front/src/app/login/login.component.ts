import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiHelperService } from '../services/api-helper.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  host: { class: 'h-full' },
})
export class LoginComponent implements OnInit {
  public username: string | null = null;
  public password: string | null = null;
  public registerUsername: string | null = null;
  public registerPassword: string | null = null;
  public state: 'loading' | 'error' | 'success' | 'idle' = 'idle';
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

    const [username, password] = [this.username, this.password];
    this.api
      .post({ endpoint: '/auth/login', data: { username, password } })
      .then((response) => {
        if (response.access_token) {
          this.token.save(response.access_token);
          this.state = 'success';
          this.router.navigateByUrl('/users');
        } else this.state = 'error';
      })
      .catch((error) => {
        this.state = 'error';
      });
  }

  register() {
    if (!this.registerForm || !this.registerForm.nativeElement.checkValidity())
      return;
    this.state = 'loading';
    const [username, password] = [this.registerUsername, this.registerPassword];
    this.api
      .post({ endpoint: '/auth/register', data: { username, password } })
      .then((response) => {
        if (response.access_token) {
          this.token.save(response.access_token);
          this.state = 'success';
          this.router.navigateByUrl('/users');
        } else this.state = 'error';
      })
      .catch((error) => {
        this.state = 'error';
      });
  }

  handleChangeUsername(event: any): void {
    this.username = (event.target as HTMLInputElement).value;
    this.state = 'idle';
  }

  handleChangePassword(event: any): void {
    this.password = (event.target as HTMLInputElement).value;
    this.state = 'idle';
  }
  handleChangeRegisterUsername(event: any): void {
    this.registerUsername = (event.target as HTMLInputElement).value;
    this.state = 'idle';
  }
  handleChangeRegisterPassword(event: any): void {
    this.registerPassword = (event.target as HTMLInputElement).value;
    this.state = 'idle';
  }

  submit(event: any): void {
    event.preventDefault();
  }
}
