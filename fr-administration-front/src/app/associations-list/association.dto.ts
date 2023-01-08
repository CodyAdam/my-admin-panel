import {Member} from "./association.member";
import {MinuteDTO} from "./minutes.entity";

export class AssociationDTO {
  name: string;
  members: Member[];
  id: number;
  minutes: MinuteDTO[];


  constructor(name: string, members: Member[], id: number, minutes: MinuteDTO[]) {
    this.name = name;
    this.members = members;
    this.id = id;
    this.minutes = minutes;
  }
}
