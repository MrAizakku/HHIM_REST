//Object Model Dependencies
import { User } from "../models/User";
import { DTO }  from "../database/DTO";

//Util Module Dependency for Promisify
import * as util from "util";

export class UserDAO 
{
    private pool;

    constructor(pool: any) 
    {
        this.pool = pool;
    }

    /************************
     *         USER         *
     ************************/
     public authenticate(e:any, p:any, callback: any) 
     {
         let pass:boolean = false;
         this.pool.getConnection(async function(err:any, connection:any)
         {
             if (err) throw err;
             //use Promisfy
             connection.query = util.promisify(connection.query);
             let result1 = await connection.query('SELECT * FROM USERS WHERE EMAIL = ? AND PASSWORD = ?', [e, p]);
             
             //callback to return results
             if(result1.length > 0) { pass = true; }
             if (connection) { connection.release(); }
             callback(pass);
         })
     }

    public readAll(callback: any) 
    {
        let users:User[] = [];
        this.pool.getConnection(async function(err:any, connection:any)
        {
            if (err) throw err;
            //use Promisfy
            connection.query = util.promisify(connection.query);
            let result1 = await connection.query('SELECT * FROM USERS');
            for(let x=0;x < result1.length;++x)
            {
                users.push(new User(result1[x].id, 
                                    result1[x].first_name,
                                    result1[x].last_name,
                                    result1[x].email,
                                    "HIDDEN",
                                    result1[x].created_at,
                                    result1[x].updated_at));
            }
            //callback to return results
            let dto = new DTO(-1, "", -1, []);
            if(users.length > 0) {
                dto = new DTO(200, "Get Success", users.length, users);
            } else {
                dto = new DTO(404, "Get Success: No Results", users.length, []);
            }
            if (connection) connection.release();
            callback(dto);
        })
    }

    public readById(id:string, callback: any) 
    {
        let users:User[] = [];
        this.pool.getConnection(async function(err:any, connection:any)
        {
            if (err) throw err;

            //use Promisfy
            connection.query = util.promisify(connection.query);
            let result1 = await connection.query("SELECT * FROM USERS WHERE ID = ?", id);
            for(let x=0;x < result1.length;++x)
            {
                users.push(new User(result1[x].id, 
                                    result1[x].first_name,
                                    result1[x].last_name,
                                    result1[x].email,
                                    "HIDDEN",
                                    result1[x].created_at,
                                    result1[x].updated_at));
            }
            //return results
            let dto = new DTO(-1, "", -1, []);
            if(users.length > 0) {
                dto = new DTO(200, "Get Success", users.length, users);
            } else {
                dto = new DTO(404, "Get Success: No Results", users.length, []);
            }
            if (connection) connection.release();
            callback(dto);
        })
    }

    public readByEmail(email:string, callback: any) 
    {
        let users:User[] = [];
        this.pool.getConnection(async function(err:any, connection:any)
        {
            if (err) throw err;

            //use Promisfy
            connection.query = util.promisify(connection.query);
            let result1 = await connection.query("SELECT * FROM USERS WHERE EMAIL = ?", email);
            for(let x=0;x < result1.length;++x)
            {
                users.push(new User(result1[x].id, 
                                    result1[x].first_name,
                                    result1[x].last_name,
                                    result1[x].email,
                                    "HIDDEN",
                                    result1[x].created_at,
                                    result1[x].updated_at));
            }
            //return results
            let dto = new DTO(-1, "", -1, []);
            if(users.length > 0) {
                dto = new DTO(200, "Get Success", users.length, users);
            } else {
                dto = new DTO(404, "Get Success: No Results", users.length, []);
            }
            if (connection) connection.release();
            callback(dto);
        })
    }

    public create(user:User, callback: any)
    {
        //connection  
        this.pool.getConnection(async function(err:any, connection:any)
        {
            if (err) throw err;

            //use Promisfy
            connection.query = util.promisify(connection.query);
            let result1 = await connection.query('INSERT INTO USERS (FIRST_NAME, LAST_NAME, EMAIL, PASSWORD, CREATED_AT, UPDATED_AT) VALUES(?,?,?,?,?,?)', [user.First_name, user.Last_name, user.Email, user.Password, new Date(), new Date()]);
            //return results
            let dto = new DTO(-1, "", -1, []);
            if(result1.affectedRows == 1) {
                let result2 = await connection.query("SELECT * FROM USERS WHERE ID = ?", result1.insertId);       
                dto = new DTO(200, "Post Success", 1, new User(result2[0].id, 
                                                                result2[0].first_name,
                                                                result2[0].last_name,
                                                                result2[0].email,
                                                                "HIDDEN",
                                                                result2[0].created_at,
                                                                result2[0].updated_at));
            } else {
                dto = new DTO(400, "Post Failure", 0, []);
            }
            if (connection) connection.release();
            callback(dto);
        });
    }

    public update(user:any, callback: any)
    {
        //the connection 
        this.pool.getConnection(async function(err:any, connection:any)
        {
            if (err) throw err;
            //use Promisfy
            connection.query = util.promisify(connection.query);
            let result1 = await connection.query('UPDATE USERS SET FIRST_NAME=?, LAST_NAME=?, EMAIL=?, PASSWORD=?, UPDATED_AT=? WHERE ID=?', [user.First_name, user.Last_name, user.Email, user.Password, new Date(), user.Id]);
            //return results
            let dto = new DTO(-1, "", -1, []);
            if(result1.changedRows != 0) {
                let result2 = await connection.query("SELECT * FROM USERS WHERE ID = ?", user.Id);
                dto = new DTO(200, "Update Success", 1, new User(result2[0].id, 
                                                            result2[0].first_name,
                                                            result2[0].last_name,
                                                            result2[0].email,
                                                            "HIDDEN",                                                        
                                                            result2[0].created_at,
                                                            result2[0].updated_at));
            } else {
                dto = new DTO(404, "Update Failure", 0, []);
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
            let result2 = await connection.query("SELECT * FROM USERS WHERE ID = ?", id);
            let result1 = await connection.query('DELETE FROM USERS WHERE ID=?', id);
            //return results in DTO
            let dto = new DTO(-1, "", -1, []);
            if(result1.affectedRows == 1) {
                dto = new DTO(200, "Delete Success", 1, new User(result2[0].id, 
                                                            result2[0].first_name,
                                                            result2[0].last_name,
                                                            result2[0].email,
                                                            "HIDDEN",
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