import {Member} from "./association.member";

export class AssociationDTO {
  name: string;
  members: Member[];
  id: number;

  constructor(id: number, name: string, members: []) {
    this.name = name;
    this.members = members;
    this.id = id;
  }
}
