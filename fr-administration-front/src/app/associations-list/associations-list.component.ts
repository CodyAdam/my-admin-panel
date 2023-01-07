import { Component, OnInit } from '@angular/core';
import {AssociationDTO} from "./association.dto";
import {ApiHelperService} from "../services/api-helper.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-associations-list',
  templateUrl: './associations-list.component.html',
})


export class AssociationsListComponent implements OnInit {

  associations: AssociationDTO[] = []

  constructor(
    private api: ApiHelperService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAssociations()
  }

  getAssociations() {
    this.api.get({
      endpoint: '/associations'
    }).then(res => {
      this.associations = res
    })
  }

  membersToString(asso: AssociationDTO) : string {
    return asso.members.map(m => `${m.firstname} ${m.name}`).join(', ')
  }

  show(asso: AssociationDTO) {
    this.router.navigate(['associations', asso.id])
  }
  delete(asso: AssociationDTO){
    this.api.delete({
      endpoint: `/associations/${asso.id}`
    }).then(() => this.getAssociations())
  }

}
