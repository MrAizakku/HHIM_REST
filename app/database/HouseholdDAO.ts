//Object Model Dependencies
import { Household } from "../models/Household";
import { Item } from "../models/Item";
import { DTO }       from "../database/DTO";

//Util Module Dependency for Promisify
import * as util from "util";

export class HouseholdDAO 
{
    private pool;

    constructor(pool: any) 
    {
        this.pool = pool;
    }
    
    //Route::get('/households');
    public readAll(callback: any) 
    {
        let households:Household[] = [];
        this.pool.getConnection(async function(err:any, connection:any)
        {
            if (err) throw err;
            //use Promisfy
            connection.query = util.promisify(connection.query);
            let result1 = await connection.query('SELECT * FROM HOUSEHOLDS');
            for(let x=0;x < result1.length;++x)
            {
                let HHID = result1[x].id;
                let items:Item[] = [];
                let result2 = await connection.query("SELECT * FROM ITEMS WHERE HOUSEHOLD_ID=?", [HHID]);
                for(let y=0;y < result2.length;++y)
                {
                    items.push(new Item(result2[y].id, result2[y].name, result2[y].description, result2[y].quantity, result2[y].household_id, result2[y].donation_flag, result2[y].created_at, result2[y].updated_at));
                }
                households.push(new Household(result1[x].id, 
                    result1[x].name,
                    result1[x].street,
                    result1[x].city,
                    result1[x].state,
                    result1[x].zip,
                    result1[x].description,
                    result1[x].created_at,
                    result1[x].updated_at,
                    items));
            }
            //callback to return results
            let dto = new DTO(-1, "", -1, []);
            if(households.length > 0) {
                dto = new DTO(200, "Get Success", households.length, households);
            } else {
                dto = new DTO(404, "Get Success: No Results", households.length, []);
            }
            if (connection) connection.release();
            callback(dto);
        })
    }

    //Route::get('/households/{household})
    public readById(id:string, callback: any) 
    {
        let households:Household[] = [];
        this.pool.getConnection(async function(err:any, connection:any)
        {
            if (err) throw err;

            //use Promisfy
            connection.query = util.promisify(connection.query);
            let result1 = await connection.query("SELECT * FROM HOUSEHOLDS WHERE ID = ? ORDER BY NAME", id);
            for(let x=0;x < result1.length;++x)
            {
                let items:Item[] = [];
                let result2 = await connection.query("SELECT * FROM ITEMS WHERE HOUSEHOLD_ID=?", id);
                for(let y=0;y < result2.length;++y)
                {
                    items.push(new Item(result2[y].id, result2[y].name, result2[y].description, result2[y].quantity, result2[y].household_id, result2[y].donation_flag, result2[y].created_at, result2[y].updated_at));
                }
                households.push(new Household(result1[x].id, 
                    result1[x].name,
                    result1[x].street,
                    result1[x].city,
                    result1[x].state,
                    result1[x].zip,
                    result1[x].description,
                    result1[x].created_at,
                    result1[x].updated_at,
                    items));
            }
            
            //callback to return results
            let dto = new DTO(-1, "", -1, []);
            if(households.length > 0) {
                dto = new DTO(200, "Get Success", households.length, households);
            } else {
                dto = new DTO(404, "Get Success: No Results", households.length, []);
            }
            if (connection) connection.release();
            callback(dto);
        })
    }

    //Route::post('/households', [HouseholdApiController::class, 'store']);
    public create(household:Household, callback: any)
    {
        //connection  
        this.pool.getConnection(async function(err:any, connection:any)
        {
            if (err) throw err;

            //dto for callback
            let dto = new DTO(-1, "", -1, []);
            
            //Inset The Household then Items
            connection.query = util.promisify(connection.query);
            let result1 = await connection.query('INSERT INTO HOUSEHOLDS (NAME, STREET, CITY, STATE, ZIP, DESCRIPTION, CREATED_AT, UPDATED_AT) VALUES(?,?,?,?,?,?,?,?)', [household.Name, household.Street, household.City, household.State, household.Zip, household.Description, new Date(), new Date()]);
            if(result1.affectedRows != 1)
            {
                dto = new DTO(400, "Post Failure", 0, []);
                callback(dto);
            }

            let household_id = result1.insertId;
            for(let y=0;y < household.Items.length;++y)
            {
                let result2 = await connection.query('INSERT INTO ITEMS (NAME, DESCRIPTION, QUANTITY, HOUSEHOLD_ID, CREATED_AT, UPDATED_AT) VALUES(?,?,?,?,?,?)', [household.Items[y].Name, household.Items[y].Description, household.Items[y].Quantity, household_id, new Date(), new Date()]);
            }

            //get new items and callback results
            if(result1.affectedRows == 1) {
                let result3 = await connection.query("SELECT * FROM HOUSEHOLDS WHERE ID=?", household_id);

                let items:Item[] = [];
                let result4 = await connection.query("SELECT * FROM ITEMS WHERE HOUSEHOLD_ID=?", household_id);
                for(let y=0;y < result4.length;++y)
                {
                    items.push(new Item(result4[y].id, result4[y].name, result4[y].description, result4[y].quantity, result4[y].household_id, result4[y].donation_flag, result4[y].created_at, result4[y].updated_at));
                }
                dto = new DTO(200, "Post Success", 1, new Household(result3[0].id, 
                                                                result3[0].name,
                                                                result3[0].street,
                                                                result3[0].city,
                                                                result3[0].state,
                                                                result3[0].zip,
                                                                result3[0].description,
                                                                result3[0].created_at,
                                                                result3[0].updated_at,
                                                                items));
            } else {
                dto = new DTO(400, "Post Failure", 0, []);
            }
            if (connection) connection.release();
            callback(dto);
        });
    }

    //Route::put('/households/{household}', [HouseholdApiController::class, 'update']);
    public update(household:any, callback: any)
    {
        //the connection 
        this.pool.getConnection(async function(err:any, connection:any)
        {
            if (err) throw err;
            //use Promisfy
            let changes = 0;
            connection.query = util.promisify(connection.query);
            let result1 = await connection.query('UPDATE HOUSEHOLDS SET NAME=?, STREET=?, CITY=?, STATE=?, ZIP=?, DESCRIPTION=?, UPDATED_AT=? WHERE ID=?', [household.Name, household.Street, household.City, household.State, household.Zip, household.Description, new Date(), household.Id]);
            
            //return results
            let dto = new DTO(-1, "", -1, []);
            if(result1.changedRows != 0) {
                let result3 = await connection.query("SELECT * FROM HOUSEHOLDS WHERE ID = ? ORDER BY NAME", household.Id);

                let items:Item[] = [];
                let result4 = await connection.query("SELECT * FROM ITEMS WHERE HOUSEHOLD_ID=?", household.Id);
                for(let y=0;y < result4.length;++y)
                {
                    items.push(new Item(result4[y].id, result4[y].name, result4[y].description, result4[y].quantity, result4[y].household_id, result4[y].donation_flag, result4[y].created_at, result4[y].updated_at));
                }
                dto = new DTO(200, "Put Success", 1, new Household(result3[0].id, 
                                                        result3[0].name,
                                                        result3[0].street,
                                                        result3[0].city,
                                                        result3[0].state,
                                                        result3[0].zip,
                                                        result3[0].description,
                                                        result3[0].created_at,
                                                        result3[0].updated_at,
                                                        items));
            } else {
                dto = new DTO(400, "Put Failure", 0, []);
            }
            if (connection) connection.release();
            callback(dto);
        });
    }

    //Route::delete('/households/{household}', [HouseholdApiController::class, 'destroy']);
    public delete(household_id:number, callback: any)
    {
        this.pool.getConnection(async function(err:any, connection:any)
        {
            if (err) throw err;

            //use Promisfy
            connection.query = util.promisify(connection.query);
            //get objects before deleting
            let items:Item[] = [];
            let result4 = await connection.query("SELECT * FROM ITEMS WHERE HOUSEHOLD_ID=?", household_id);
            for(let y=0;y < result4.length;++y)
            {
                items.push(new Item(result4[y].id, result4[y].name, result4[y].description, result4[y].quantity, result4[y].household_id, result4[y].donation_flag, result4[y].created_at, result4[y].updated_at));
            }
            let result3 = await connection.query("SELECT * FROM HOUSEHOLDS WHERE ID=?", household_id);

            //delete HH
            let result1 = await connection.query('DELETE FROM HOUSEHOLDS WHERE ID=?', household_id);

            //return results
            let dto = new DTO(-1, "", -1, []);
            if(result1.affectedRows == 1) {
                dto = new DTO(200, "Delete Success", 1, new Household(result3[0].id, 
                    result3[0].name,
                    result3[0].street,
                    result3[0].city,
                    result3[0].state,
                    result3[0].zip,
                    result3[0].description,
                    result3[0].created_at,
                    result3[0].updated_at,
                    items));
            } else {
                dto = new DTO(400, "Delete Failure", 0, []);
            }
            if (connection) connection.release();
            callback(dto);
        });
    }
}