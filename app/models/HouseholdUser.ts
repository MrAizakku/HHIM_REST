export class HouseholdUser
{
    private id:number = -1;
    private user_id:number = -1;
    private household_id:number = -1;
    private created_at:string = "";
    private updated_at:string = "";

    constructor(id:number, user_id:number, household_id:number, created_at:string, updated_at:string){
        this.id = id;
        this.user_id = user_id;
        this.household_id = household_id;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    get Id():number{
        return this.id;
    }
    set Id(id:number){
        this.id = id;
    }

    get User_id():number{
        return this.user_id;
    }
    set User_id(user_id:number){
        this.user_id = user_id;
    }

    get Household_id():number{
        return this.household_id;
    }
    set Household_id(household_id:number){
        this.household_id = household_id;
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