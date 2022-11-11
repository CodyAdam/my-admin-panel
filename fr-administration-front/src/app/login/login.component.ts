import { Component, OnInit } from '@angular/core';
import { ApiHelperService } from '../services/api-helper.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  public username: string | null = null;
  public password: string | null = null;
  public state: 'loading' | 'error' | 'success' | 'idle' = 'idle';
  constructor(
    private api: ApiHelperService,
    private token: TokenStorageService
  ) {}

  ngOnInit(): void {}
  login() {
    this.state = 'loading';
    const [username, password] = [this.username, this.password];
    this.api
      .post({ endpoint: '/auth/login', data: { username, password } })
      .then((response) => {
        if (response.access_token) {
          this.token.save(response.access_token);
          this.state = 'success';
          window.location.href = '/users';
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
}
