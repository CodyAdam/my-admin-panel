import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
})
export class UsersListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'lastname', 'firstname', 'age'];
  dataSource: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const resquest = this.http.get('http://localhost:3000/users', {
      observe: 'response',
    });
    lastValueFrom(resquest).then(
      (response) => (this.dataSource = response.body)
    );
  }
}
