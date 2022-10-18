import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Association } from './association.entity';

const associations: Association[] = [
    {
        id: 0,
        idUsers: [0],
        name: 'ADAPEI'
    }
]

@Injectable()
export class AssociationsService {
    getAll(): Association[] {
        return associations
    }
    findById(id: number): Association {
        let res = associations.find(a => a.id === id)
        if(!res)
            throw new HttpException(`Association ${id} not found`, HttpStatus.NOT_FOUND)
        return res
    }
    getNewId(): number {
        let max = 0
        associations.forEach(a => {
            if(a.id > max)
                max = a.id
        })
        return max+1
    }
    create(idUsers: number[], name: string): Association {
        let ass = new Association(this.getNewId(), idUsers, name)
        associations.push(ass)
        return ass
    }
    update(id: number, idUsers: number[], name: string): Association {
        let ass = this.findById(id)

        if(idUsers)
            ass.idUsers = idUsers
        if(name)
            ass.name = name

        return ass
    }
    delete(id: number){
        let index = -1
        for(let i=0; i<associations.length; i++){
            if(associations[i].id === id)
                index = i
        }
        if(index === -1)
            return false
        associations.splice(index, 1)
        return true
    }
}
