export class User
{
    private id:number = -1;
    private first_name:string = "";
    private last_name:string = "";
    private email:string = "";
    private password:string = "";
    private created_at:string = "";
    private updated_at:string = "";

    constructor(id:number, first_name:string, last_name:string, email:string, password:string, created_at:string, updated_at:string){
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    get Id():number{
        return this.id;
    }
    set Id(id:number){
        this.id = id;
    }

    get First_name():string{
        return this.first_name;
    }
    set First_name(first_name:string){
        this.first_name = first_name;
    }

    get Last_name():string{
        return this.last_name;
    }
    set Last_name(last_name:string){
        this.last_name = last_name;
    }

    get Email():string{
        return this.email;
    }
    set Email(email:string){
        this.email = email;
    }

    get Password():string{
        return this.password;
    }
    set Password(password:string){
        this.password = password;
    }

    get Created_at():string{
        return this.created_at;
    }
    set Created_at(created_at:string){
        this.created_at = created_at;
    }

    get Updated_at():string{
        return this.updated_at;
    }
    set Updated_at(updated_at:string){
        this.updated_at = updated_at;
    }
}