import { Association } from "./association.entity"
import { Member } from "./association.member"

export class AssociationDTO{
    name: string
    members: Member[]
}