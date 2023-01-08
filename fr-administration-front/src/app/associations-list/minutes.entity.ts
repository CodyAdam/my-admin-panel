import {User} from "../users-list/users-list.component";
import {AssociationDTO} from "./association.dto";

export class MinuteDTO {
  id: number;
  date: string;
  content: string;
  users: User[];


  constructor(id: number, date: string, content: string, users: User[]) {
    this.id = id;
    this.date = date;
    this.content = content;
    this.users = users;
  }
}
