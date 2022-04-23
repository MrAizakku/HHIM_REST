import { Item } from "./Item";

export class Household
{
    private id:number = -1;
    private name:string = "";
    private street:string = "";
    private city:string = "";
    private state:string = "";
    private zip:string = "";
    private description:string = "";
    private created_at:string = "";
    private updated_at:string = "";
    private items:Item[];

    constructor(id:number, name:string, street:string, city:string, state:string, zip:string, description:string, created_at:string, updated_at:string, items:Item[]){
        this.id = id;
        this.name = name;
        this.street = street;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.description = description;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.items = items;
    }

    get Id():number{
        return this.id;
    }
    set Id(id:number){
        this.id = id;
    }

    get Name():string{
        return this.name;
    }
    set Name(name:string){
        this.name = name;
    }

    get Street():string{
        return this.street;
    }
    set Street(street:string){
        this.street = street;
    }

    get City():string{
        return this.city;
    }
    set City(city:string){
        this.city = city;
    }

    get State():string{
        return this.state;
    }
    set State(state:string){
        this.state = state;
    }

    get Zip():string{
        return this.zip;
    }
    set Zip(zip:string){
        this.zip = zip;
    }

    get Description():string{
        return this.description;
    }
    set Description(description:string){
        this.description = description;
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

    get Items():Item[]{
        return this.items;
    }
    set Items(items:Item[]){
        this.items = items;
    }
}