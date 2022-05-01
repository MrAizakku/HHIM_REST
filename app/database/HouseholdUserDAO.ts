//Object Model Dependencies
import { HouseholdUser } from "../models/HouseholdUser";
import { DTO }  from "../database/DTO";

//Util Module Dependency for Promisify
import * as util from "util";

export class HouseholdUserDAO 
{
    private pool;

    constructor(pool: any) 
    {
        this.pool = pool;
    }
    /************************
     *   HOUSEHOLD USERS    *
     ************************/
    public readAll(callback: any) 
    {
        let householdusers:HouseholdUser[] = [];
        this.pool.getConnection(async function(err:any, connection:any)
        {
            if (err) throw err;
            //use Promisfy
            connection.query = util.promisify(connection.query);
            let result1 = await connection.query('SELECT * FROM HOUSEHOLD_USERS');
            for(let x=0;x < result1.length;++x)
            {
                householdusers.push(new HouseholdUser(result1[x].id, 
                                    result1[x].user_id,
                                    result1[x].household_id,
                                    result1[x].created_at,
                                    result1[x].updated_at));
            }
            //callback to return results
            let dto = new DTO(-1, "", -1, []);
            if(householdusers.length > 0) {
                dto = new DTO(200, "Get Success", householdusers.length, householdusers);
            } else {
                dto = new DTO(404, "Get Success: No Results", householdusers.length, []);
            }
            if (connection) connection.release();
            callback(dto);
        })
    }

    public readByHouseholdId(household_id:string, callback: any) 
    {
        let householdusers:HouseholdUser[] = [];
        this.pool.getConnection(async function(err:any, connection:any)
        {
            if (err) throw err;

            //use Promisfy
            connection.query = util.promisify(connection.query);
            let result1 = await connection.query("SELECT * FROM HOUSEHOLD_USERS WHERE HOUSEHOLD_ID = ?", household_id);
            for(let x=0;x < result1.length;++x)
            {
                householdusers.push(new HouseholdUser(result1[x].id, 
                                    result1[x].user_id,
                                    result1[x].household_id,
                                    result1[x].created_at,
                                    result1[x].updated_at));
            }
            //return results
            let dto = new DTO(-1, "", -1, []);
            if(householdusers.length > 0) {
                dto = new DTO(200, "Get Success", householdusers.length, householdusers);
            } else {
                dto = new DTO(404, "Get Success: No Results", householdusers.length, []);
            }
            if (connection) connection.release();
            callback(dto);
        })
    }

    public readByUserId(user_id:string, callback: any) 
    {
        let householdusers:HouseholdUser[] = [];
        this.pool.getConnection(async function(err:any, connection:any)
        {
            if (err) throw err;

            //use Promisfy
            connection.query = util.promisify(connection.query);
            let result1 = await connection.query("SELECT * FROM HOUSEHOLD_USERS WHERE USER_ID = ?", user_id);
            for(let x=0;x < result1.length;++x)
            {
                householdusers.push(new HouseholdUser(result1[x].id, 
                                    result1[x].user_id,
                                    result1[x].household_id,
                                    result1[x].created_at,
                                    result1[x].updated_at));
            }
            //return results
            let dto = new DTO(-1, "", -1, []);
            if(householdusers.length > 0) {
                dto = new DTO(200, "Get Success", householdusers.length, householdusers);
            } else {
                dto = new DTO(404, "Get Success: No Results", householdusers.length, []);
            }
            if (connection) connection.release();
            callback(dto);
        })
    }

    public create(householduser:HouseholdUser, callback: any)
    {
        //connection  
        this.pool.getConnection(async function(err:any, connection:any)
        {
            if (err) throw err;

            //use Promisfy
            connection.query = util.promisify(connection.query);
            let result1 = await connection.query('INSERT INTO HOUSEHOLD_USERS (USER_ID, HOUSEHOLD_ID, CREATED_AT, UPDATED_AT) VALUES(?,?,?,?)', [householduser.User_id, householduser.Household_id, new Date(), new Date()]);
            //return results
            let dto = new DTO(-1, "", -1, []);
            if(result1.affectedRows == 1) {
                let result2 = await connection.query("SELECT * FROM HOUSEHOLD_USERS WHERE ID = ?", result1.insertId);       
                dto = new DTO(200, "Post Success", 1, new HouseholdUser(result2[0].id, 
                                                                        result2[0].user_id,
                                                                        result2[0].household_id,
                                                                        result2[0].created_at,
                                                                        result2[0].updated_at));
            } else {
                dto = new DTO(400, "Post Failure", 0, []);
            }
            if (connection) connection.release();
            callback(dto);
        });
    }

    public delete(id:number, callback: any)
    {
        this.pool.getConnection(async function(err:any, connection:any)
        {
            if (err) throw err;

            //use Promisfy
            connection.query = util.promisify(connection.query);
            //get object before deleting
            let result2 = await connection.query("SELECT * FROM HOUSEHOLD_USERS WHERE ID = ?", id);
            let result1 = await connection.query('DELETE FROM HOUSEHOLD_USERS WHERE ID=?', id);
            //return results in DTO
            let dto = new DTO(-1, "", -1, []);
            if(result1.affectedRows == 1) {
                dto = new DTO(200, "Delete Success", 1, new HouseholdUser(result2[0].id, 
                                                            result2[0].user_id,
                                                            result2[0].household_id,
                                                            result2[0].created_at,
                                                            result2[0].updated_at));
            } else {
                dto = new DTO(400, "Delete Failure", 0, []);
            }
            if (connection) connection.release();
            callback(dto);
        });
    }
}