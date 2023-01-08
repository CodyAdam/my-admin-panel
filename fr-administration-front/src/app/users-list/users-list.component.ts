import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiHelperService, API_URL } from '../services/api-helper.service';
import { FormControl, FormGroup } from '@angular/forms';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';

export type User = {
  id: number;
  lastname: string;
  firstname: string;
  age: number;
  password: string;
  email: string;
};

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  host: { class: 'h-full' },
})
export class UsersListComponent implements OnInit {
  users: User[] = [];

  search = new FormGroup({
    name: new FormControl(''),
  });

  constructor(
    private api: ApiHelperService,
    private auth: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.updateUsers();
  }

  updateUsers() {
    const resquest = this.api.get({ endpoint: `/users/` });
    resquest.then((response) => {
      this.users = response;
    });
  }
  searchUsers() {
    let name: string = this.search.get('name')?.value!;
    if (name.length == 0) {
      this.updateUsers();
      return;
    }
    this.api
      .get({
        endpoint: `/users/search/${name}`,
      })
      .then((res: User[]) => {
        this.users = res;
      });
  }

  deleteUser(id: number) {
    const resquest = this.api.delete({ endpoint: `/users/${id}` });
    resquest.then((response) => {
      this.users = this.users.filter((user) => user.id !== id);
      if (id == this.auth.getUserId()) {
        this.auth.clear();
        // go to login page
        this.router.navigate(['/login']);
      }
    });
  }
}
