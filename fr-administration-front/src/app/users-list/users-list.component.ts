import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiHelperService, API_URL } from '../services/api-helper.service';

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

  constructor(private api: ApiHelperService) {}

  ngOnInit(): void {
    const resquest = this.api.get({ endpoint: `/users/` });
    resquest.then((response) => {
      this.users = response;
    });
  }

  deleteUser(id: number) {
    const resquest = this.api.delete({ endpoint: `/users/${id}` });
    resquest.then((response) => {
      this.users = this.users.filter((user) => user.id !== id);
    });
  }
}
