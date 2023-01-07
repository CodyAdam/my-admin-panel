export class Member {
  name: string;
  firstname: string;
  age: number;
  role: string;
  id: number;
  email: string;


  constructor(name: string, firstname: string, age: number, role: string, id: number, email: string) {
    this.name = name;
    this.firstname = firstname;
    this.age = age;
    this.role = role;
    this.id = id;
    this.email = email;
  }
}
