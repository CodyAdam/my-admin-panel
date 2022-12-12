import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export class User {
  constructor(
    public id: number,
    public password: string,
    public lastname: string,
    public firstname: string,
    public age: number
  ){}
}
const users: User[] = [
  new User(0, 'mdp1', 'Doe', 'John', 23),
  new User(1, 'mdp2', 'Doe', 'Jane', 32)
]

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  displayedColumns: string[] = [
    'id', 'lastname', 'firstname', 'age'
  ]
  dataSource = []

  constructor(
    private http: HttpClient
  ){}

  ngOnInit(): void {
    const request: Observable<any> = this.http.get(
      environment.BACK_URL + '/users',
      {observe: 'response'}
    );
    lastValueFrom(request).then(response => this.dataSource = response.body);
  }

}
