export class NewUser {
    name: string;
    nameUser: string;
    password: string;
    //authorities: string[];

    constructor(name: string, nameUser: string, password: string, authorities: string[]){
        this.name = name;
        this.nameUser = nameUser;
        this.password = password;
        //this.authorities = authorities;
    }
}
