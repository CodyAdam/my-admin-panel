import { Component, OnInit } from '@angular/core';
import { ApiHelperService } from '../services/api-helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  public username: string | null = null;
  public password: string | null = null;
  constructor(private api: ApiHelperService) {}

  ngOnInit(): void {}
  login(): void {
    console.log('login', this.username, this.password);
    const [username, password] = [this.username, this.password];
    this.api
      .post({ endpoint: '/auth/login', data: { username, password } })
      .then((response) => console.log(response));
  }

  handleChangeUsername(event: any): void {
    this.username = (event.target as HTMLInputElement).value;
  }

  handleChangePassword(event: any): void {
    this.password = (event.target as HTMLInputElement).value;
  }
}
