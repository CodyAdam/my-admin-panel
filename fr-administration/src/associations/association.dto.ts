import { Member } from './association.member';
import { MinuteDTO } from '../minutes/minuteDTO.entity';

export class AssociationDTO {
  name: string;
  members: Member[];
  id: number;
  minutes: MinuteDTO[];
}
