import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { API_URL } from '../services/api-helper.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  host: { class: 'h-full' },
})
export class UsersListComponent implements OnInit {
  users: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const resquest = this.http.get(API_URL + '/users', {
      observe: 'response',
    });
    lastValueFrom(resquest).then((response) => (this.users = response.body));
  }
}
