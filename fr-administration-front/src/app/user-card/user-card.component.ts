import { Component, Input, OnInit } from '@angular/core';
import { Member } from '../associations-list/association.member';
import { User } from '../users-list/users-list.component';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
})
export class UserCardComponent implements OnInit {
  @Input() user: Partial<User & Member> = {
    id: 0,
    name: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    age: 0,
    role: '',
  };

  constructor() {}

  ngOnInit(): void {}
}
