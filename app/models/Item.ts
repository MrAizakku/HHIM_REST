export class Item
{
    private id:number = -1;
    private name:string = "";
    private description:string = "";
    private quantity:number = -1;
    private household_id:number = -1;
    private donation_flag:string = "";
    private created_at:string = "";
    private updated_at:string = "";

    constructor(id:number, name:string, description:string, quantity:number, household_id:number, donation_flag:string, created_at:string, updated_at:string){
        this.id = id;
        this.name = name;
        this.description = description;
        this.quantity = quantity;
        this.household_id = household_id;
        this.donation_flag = donation_flag;
        this.created_at = created_at;
        this.updated_at = updated_at;
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

    get Household_id():number{
        return this.household_id;
    }
    set Household_id(household_id:number){
        this.household_id = household_id;
    }

    get Donation_flag():string{
        return this.donation_flag;
    }
    set Donation_flag(donation_flag:string){
        this.donation_flag = donation_flag;
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