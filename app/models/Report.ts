export class Report
{
    private item_id:number = -1;
    private name:string = "";
    private description:string = "";
    private quantity:number = -1;
    private updated_at:string = "";
    private state:string = "";
    private email:string = "";

    constructor(item_id:number, name:string, description:string, quantity:number, updated_at:string, state:string, email:string){
        this.item_id = item_id;
        this.name = name;
        this.description = description;
        this.quantity = quantity;
        this.updated_at = updated_at;
        this.state = state;
        this.email = email;
    }

    get Item_id():number{
        return this.item_id;
    }
    set Item_id(item_id:number){
        this.item_id = item_id;
    }

    get Name():string{
        return this.name;
    }
    set Name(name:string){
        this.name = name;
    }

    get Description():string{
        return this.description;
    }
    set Description(description:string){
        this.description = description;
    }

    get Quantity():number{
        return this.quantity;
    }
    set Quantity(quantity:number){
        this.quantity = quantity;
    }

    get Updated_at():string{
        return this.updated_at;
    }
    set Updated_at(updated_at:string){
        this.updated_at = updated_at;
    }

    get State():string{
        return this.state;
    }
    set State(state:string){
        this.state = state;
    }

    get Email():string{
        return this.email;
    }
    set Email(email:string){
        this.email = email;
    }
}