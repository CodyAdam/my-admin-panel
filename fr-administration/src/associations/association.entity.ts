export class Association {
    id: number
    idUsers: number[]
    name: string

    constructor(id: number, idUsers: number[], name: string){
        this.id = id
        this.idUsers = idUsers
        this.name = name
    }
}