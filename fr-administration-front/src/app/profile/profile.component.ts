import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiHelperService } from '../services/api-helper.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  host: { class: 'h-full' },
})
export class ProfileComponent implements OnInit {
  profile = new FormGroup({
    firstname: new FormControl('Loading...'),
    lastname: new FormControl('Loading...'),
    email: new FormControl('Loading...'),
    age: new FormControl(0),
    password: new FormControl(''),
    newpassword: new FormControl(''),
  });

  state: 'idle' | 'success' | 'error' = 'idle';
  errorMessage: string = '';

  constructor(
    private api: ApiHelperService,
    private token: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.token.getUserId();
    if (Number.isNaN(id)) this.router.navigateByUrl('/login');
    this.api.get({ endpoint: `/users/${id}` }).then((response) => {
      this.profile.patchValue(response);
    });
  }

  submit(e: Event) {
    this.state = 'idle';
    e.preventDefault();
    const id = this.token.getUserId();
    if (Number.isNaN(id)) this.router.navigateByUrl('/login');
    this.api
      .put({
        endpoint: `/users/${id}`,
        data: {
          ...this.profile.value,
          password: this.profile.get('newpassword')?.value || undefined,
          newpassword: undefined,
        },
      })
      .catch((error) => {
        this.state = 'error';
        this.errorMessage = error.error.message;
      })
      .then((response) => {
        this.ngOnInit();
        this.state = 'success';
      });
  }

  closeErrorMessage() {
    this.state = 'idle';
  }
}
