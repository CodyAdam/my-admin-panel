import { Component, OnInit } from '@angular/core';
import { AssociationDTO } from '../associations-list/association.dto';
import { ActivatedRoute } from '@angular/router';
import { ApiHelperService } from '../services/api-helper.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Member } from '../associations-list/association.member';
import { HttpStatusCode } from '@angular/common/http';
import { User } from '../users-list/users-list.component';
import {MinuteDTO} from "../associations-list/minutes.entity";

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

  newMinuteModal = new FormControl(false)
  newMinute = new FormGroup({
    date: new FormControl(new Date()),
    voters: new FormControl([]),
    content: new FormControl('')
  })

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

        const resquest = this.api.get({ endpoint: `/users/` });
        resquest.then((response) => {
          this.allUsers = [...response]; // copy
          this.users = this.allUsers.filter(
            (u) => !this.association.members.some((m) => m.id == u.id)
          );
        });
      });
  }
  updateMembers() {
    this.api
      .get({
        endpoint: `/associations/${this.id}/members`,
      })
      .then((members: Member[]) => {
        this.association.members = members;
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
    this.api
      .delete({
        endpoint: `/roles/${id}/${this.id}`,
      })
      .then(() => {
        this.association.members = this.association.members.filter(
          (m) => m.id != id
        );
      });
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
    let role: string = this.newMember.get('role')?.value!;

    this.api
      .post({
        endpoint: `/users/byEmail`,
        data: { email: email },
      })
      .then(async (u) => {
        if (this.association.members.some((m) => m.id == u.id)) {
          this.error = 'This user is already in the list';
        } else {
          await this.api
            .post({
              endpoint: `/roles`,
              data: {
                name: role,
                idUser: u.id,
                idAssociation: this.id,
              },
            })
            .then(() => {
              this.newMember.get('name')?.setValue('');
              this.newMember.get('role')?.setValue('');
              this.association.members.push(
                new Member(u.lastname, u.lastname, u.age, role, u.id, u.email)
              );
            });
        }
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

  clearError() {
    this.error = null;
  }

  changeRole(id: number, event: Event) {
    const value = (event.target as HTMLInputElement).value;

    this.api
      .put({
        endpoint: `/roles/${id}/${this.id}`,
        data: {
          name: value,
        },
      })
      .then(() => {
        this.association.members.find((m) => (m.id = id))!.role = value;
      });
  }

  createMinute() {
    let date = this.newMinute.get('date')?.value!;
    let voters = this.newMinute.get('voters')?.value!;
    let content = this.newMinute.get('content')?.value!;

    this.api.post({
      endpoint: `/minutes`,
      data: {
        content,
        date: date,
        idAssociation: this.id,
        idVoters: voters,
      }
    }).then((res: MinuteDTO) => {
      this.association.minutes.push(new MinuteDTO(
        res.id,
        res.date,
        res.content,
        res.users
      ))
      this.newMinuteModal.setValue(false)
    })
  }

  deleteMinute(min: MinuteDTO) {
    this.api.delete({
      endpoint: `/minutes/${min.id}`
    }).then(() => {
      this.association.minutes = this.association.minutes.filter(m => m.id != min.id)
    })
  }
}
