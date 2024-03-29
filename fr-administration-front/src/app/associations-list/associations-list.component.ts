import { Component, OnInit } from '@angular/core';
import { AssociationDTO } from './association.dto';
import { ApiHelperService } from '../services/api-helper.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-associations-list',
  templateUrl: './associations-list.component.html',
})
export class AssociationsListComponent implements OnInit {
  associations: AssociationDTO[] = [];

  newAsso = new FormGroup({
    name: new FormControl(''),
  });
  modalNewAsso = new FormControl(false);
  search = new FormGroup({
    name: new FormControl('')
  })

  constructor(private api: ApiHelperService, private router: Router) {}

  ngOnInit(): void {
    this.getAssociations();
  }

  getAssociations() {
    this.api
      .get({
        endpoint: '/associations',
      })
      .then((res) => {
        this.associations = res;
      });
  }

  membersToString(asso: AssociationDTO): string {
    if (asso.members.length === 0) return 'No members';
    let str = '';
    str = asso.members.map((m) => `${m.firstname} ${m.name}`).join(', ');
    if (str.length > 20) str = asso.members.length + ' members';
    return str;
  }

  searchAsso(){
    let name: string = this.search.get('name')?.value!

    if(name.length == 0) {
      this.getAssociations();
      return;
    }

    this.api.get({
      endpoint: `/associations/search/${name}`,
    }).then((res: AssociationDTO[]) => {
      this.associations = res
    })
  }

  show(asso: AssociationDTO) {
    this.router.navigate(['associations', asso.id]);
  }
  delete(asso: AssociationDTO) {
    this.api
      .delete({
        endpoint: `/associations/${asso.id}`,
      })
      .then(() => this.getAssociations());
  }

  createAsso() {
    let name = this.newAsso.get('name')?.value!;
    this.api
      .post({
        endpoint: '/associations',
        data: {
          name,
          idUsers: [],
        },
      })
      .then((asso: AssociationDTO) => {
        this.router.navigate(['associations', asso.id]);
      });
  }
}
