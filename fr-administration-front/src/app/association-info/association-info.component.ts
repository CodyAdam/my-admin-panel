import { Component, OnInit } from '@angular/core';
import { AssociationDTO } from '../associations-list/association.dto';
import { ActivatedRoute } from '@angular/router';
import { ApiHelperService } from '../services/api-helper.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Member } from '../associations-list/association.member';
import { HttpStatusCode } from '@angular/common/http';
import { User } from '../users-list/users-list.component';

@Component({
  selector: 'app-association-info',
  templateUrl: './association-info.component.html',
})
export class AssociationInfoComponent implements OnInit {
  association!: AssociationDTO;
  edit: boolean = false;
  id!: number;
  allUsers: User[] = [];
  users: User[] = [];

  error: string | null = null;

  name = new FormControl('');
  newMember = new FormGroup({
    name: new FormControl(''),
    role: new FormControl(''),
  });

  constructor(private route: ActivatedRoute, private api: ApiHelperService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.updateInfos();
    });
    const resquest = this.api.get({ endpoint: `/users/` });
    resquest.then((response) => {
      this.allUsers = [...response]; // copy
      this.users = this.allUsers.filter(
        (u) => !this.association.members.some((m) => m.id == u.id)
      );
    });
  }

  updateInfos() {
    this.api
      .get({
        endpoint: `/associations/${this.id}`,
      })
      .then((asso: AssociationDTO) => {
        this.association = asso;
        this.name.setValue(asso.name);
        this.users = this.allUsers.filter(
          (u) => !this.association.members.some((m) => m.id == u.id)
        );
      });
  }

  changeEdit(state: boolean) {
    this.edit = state;
    if (!state) this.updateInfos();
  }

  submit() {
    let data = {
      name: this.name.value,
      idUsers: this.association.members.map((m) => m.id),
    };
    this.api
      .put({
        endpoint: `/associations/${this.id}`,
        data,
      })
      .then((asso) => {
        this.association = asso;
        this.edit = false;
        this.users = this.allUsers.filter(
          (u) => !this.association.members.some((m) => m.id == u.id)
        );
      });
  }

  removeUser(id: number) {
    this.association.members = this.association.members.filter(
      (m) => m.id != id
    );
    this.users = this.allUsers.filter(
      (u) => !this.association.members.some((m) => m.id == u.id)
    );
  }

  addMember() {
    this.error = null;

    const name = this.newMember.get('name')?.value;
    if (name == '' || this.association.members.some((m) => m.email == name))
      return;
    this.newMember.disable();
    // if name already exists in members
    let email: string = this.newMember.get('name')?.value!;

    this.api
      .post({
        endpoint: `/users/byEmail`,
        data: { email: email },
      })
      .then((u) => {
        this.association.members.push(
          new Member(u.lastname, u.firstname, u.age, '', u.id, u.email)
        );
      })
      .catch((e) => {
        console.log(e);
        if (e.status == HttpStatusCode.NotFound) {
          this.error = e.error.message;
        }
      })
      .finally(() => {
        this.newMember.enable();
        this.users = this.allUsers.filter(
          (u) => !this.association.members.some((m) => m.id == u.id)
        );
      });
  }
}
