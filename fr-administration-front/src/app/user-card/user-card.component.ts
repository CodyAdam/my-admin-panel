import { Component, Input, OnInit } from '@angular/core';
import { Member } from '../associations-list/association.member';
import { ApiHelperService } from '../services/api-helper.service';
import { User } from '../users-list/users-list.component';

export type Role = {
  id: number;
  name: string;
  idUser: User;
  idAssociation: Association;
};

export type Association = {
  id: number;
  name: string;
};

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
})
export class UserCardComponent implements OnInit {
  @Input() userid: number = 0;
  user: User | undefined;
  roles: Role[] | undefined;

  constructor(private api: ApiHelperService) {}

  ngOnInit(): void {
    this.api
      .get({
        endpoint: `/roles/userid/${this.userid}`,
      })
      .then((res) => {
        this.roles = res;
      })
      .finally(() => {
        const user = this.api
          .get({
            endpoint: `/users/${this.userid}`,
          })
          .then((res) => {
            this.user = res;
          });
      });
  }
}
