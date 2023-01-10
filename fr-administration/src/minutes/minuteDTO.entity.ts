import { User } from 'src/users/user.entity';
export class MinuteDTO {
  id: number;
  date: string;
  content: string;
  users: User[];
}
