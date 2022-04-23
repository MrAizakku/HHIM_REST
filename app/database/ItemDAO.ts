//Object Model Dependencies
import { Household } from "../models/Household";
import { Item }      from "../models/Item";
import { DTO }       from "../database/DTO";

//MySQL Module Dependency
import * as mysql from "mysql";

//Util Module Dependency for Promisify
import * as util from "util";

export class ItemDAO 
{
    private host:string = "";
    private port:number = 3306;
    private username:string = "";
    private password:string = "";
    private schema:string = "";
    private pool;

    constructor(host:string, port:number, schema:string, username:string, password:string) 
    {
        this.host = host;
        this.port = port;
        this.schema = schema;
        this.username = username;
        this.password = password;
        this.pool = mysql.createPool({host: this.host, port: this.port, user: this.username, password: this.password, database: this.schema, connectionLimit: 10});
        //console.log(this.pool);
    }
    /************************
     *        ITEMS         *
     ************************/
    public readAll(callback: any) 
    {
        let items:Item[] = [];
        this.pool.getConnection(async function(err:any, connection:any)
        {
            if (err) throw err;
            //use Promisfy
            connection.query = util.promisify(connection.query);
            let result1 = await connection.query('SELECT * FROM ITEMS');
            for(let x=0;x < result1.length;++x)
            {
                items.push(new Item(result1[x].id, 
                                    result1[x].name,
                                    result1[x].description,
                                    result1[x].quantity,
                                    result1[x].household_id,
                                    result1[x].donation_flag,
                                    result1[x].created_at,
                                    result1[x].updated_at));
            }
            //callback to return results
            let dto = new DTO(-1, "", -1, []);
            if(items.length > 0) {
                dto = new DTO(200, "Get Success", items.length, items);
            } else {
                dto = new DTO(404, "Get Success: No Results", items.length, []);
            }
            if (connection) connection.release();
            callback(dto);
        })
    }

    //Route::get('/items/{item}', [ItemApiController::class, 'isolateById']);
    public readById(id:string, callback: any) 
    {
        let items:Item[] = [];
        this.pool.getConnection(async function(err:any, connection:any)
        {
            if (err) throw err;

            //use Promisfy
            connection.query = util.promisify(connection.query);
            let result1 = await connection.query("SELECT * FROM ITEMS WHERE ID = ? ORDER BY NAME", id);
            for(let x=0;x < result1.length;++x)
            {
                items.push(new Item(result1[x].id, 
                    result1[x].name,
                    result1[x].description,
                    result1[x].quantity,
                    result1[x].household_id,
                    result1[x].donation_flag,
                    result1[x].created_at,
                    result1[x].updated_at));
            }
            //return results
            let dto = new DTO(-1, "", -1, []);
            if(items.length > 0) {
                dto = new DTO(200, "Get Success", items.length, items);
            } else {
                dto = new DTO(404, "Get Success: No Results", items.length, []);
            }
            if (connection) connection.release();
            callback(dto);
        })
    }

    //Route::get('/items/household/{hhid}', [ItemApiController::class, 'isolateByHhid']);
    public readByHhid(id:string, callback: any) 
    {
        let items:Item[] = [];
        this.pool.getConnection(async function(err:any, connection:any)
        {
            if (err) throw err;

            //use Promisfy
            connection.query = util.promisify(connection.query);
            let result1 = await connection.query("SELECT * FROM ITEMS WHERE HOUSEHOLD_ID = ? ORDER BY NAME", id);
            for(let x=0;x < result1.length;++x)
            {
                items.push(new Item(result1[x].id, 
                    result1[x].name,
                    result1[x].description,
                    result1[x].quantity,
                    result1[x].household_id,
                    result1[x].donation_flag,
                    result1[x].created_at,
                    result1[x].updated_at));
            }
            //return items
            let dto = new DTO(-1, "", -1, []);
            if(items.length > 0) {
                dto = new DTO(200, "Get Success", items.length, items);
            } else {
                dto = new DTO(404, "Get Success: No Results", items.length, []);
            }
            if (connection) connection.release();
            callback(dto);
        })
    }

    //Route::post('/items', [ItemApiController::class, 'store']);
    public create(item:Item, callback: any)
    {
        //connection  
        this.pool.getConnection(async function(err:any, connection:any)
        {
            if (err) throw err;

            //use Promisfy
            connection.query = util.promisify(connection.query);
            let result1 = await connection.query('INSERT INTO ITEMS (NAME, DESCRIPTION, QUANTITY, HOUSEHOLD_ID, CREATED_AT, UPDATED_AT) VALUES(?,?,?,?,?,?)', [item.Name, item.Description, item.Quantity, item.Household_id, new Date(), new Date()]);
            //return results
            let dto = new DTO(-1, "", -1, []);
            if(result1.affectedRows == 1) {
                let result2 = await connection.query("SELECT * FROM ITEMS WHERE ID = ? ORDER BY NAME", result1.insertId);       
                dto = new DTO(200, "Post Success", 1, new Item(result2[0].id, 
                                                        result2[0].name,
                                                        result2[0].description,
                                                        result2[0].quantity,
                                                        result2[0].household_id,
                                                        result2[0].donation_flag,
                                                        result2[0].created_at,
                                                        result2[0].updated_at));
            } else {
                dto = new DTO(400, "Post Failure", 0, []);
            }
            if (connection) connection.release();
            callback(dto);
        });
    }

    //Route::put('/items/{item}', [ItemApiController::class, 'update']);
    public update(item:any, callback: any)
    {
        //the connection 
        this.pool.getConnection(async function(err:any, connection:any)
        {
            if (err) throw err;
            //use Promisfy
            connection.query = util.promisify(connection.query);
            let result1 = await connection.query('UPDATE ITEMS SET NAME=?, DESCRIPTION=?, QUANTITY=?, DONATION_FLAG=?, UPDATED_AT=? WHERE ID=?', [item.Name, item.Description, item.Quantity, item.Donation_flag, new Date(), item.Id]);
            //return results
            let dto = new DTO(-1, "", -1, []);
            if(result1.changedRows != 0) {
                let result2 = await connection.query("SELECT * FROM ITEMS WHERE ID = ?", item.Id);
                dto = new DTO(200, "Update Success", 1, new Item(result2[0].id, 
                                                            result2[0].name,
                                                            result2[0].description,
                                                            result2[0].quantity,
                                                            result2[0].household_id,
                                                            result2[0].donation_flag,
                                                            result2[0].created_at,
                                                            result2[0].updated_at));
            } else {
                dto = new DTO(404, "Update Failure", 0, []);
            }
            if (connection) connection.release();
            callback(dto);
        });
    }

    //Route::delete('/items/{item}', [ItemApiController::class, 'destroy']);
    public delete(item_id:number, callback: any)
    {
        this.pool.getConnection(async function(err:any, connection:any)
        {
            if (err) throw err;

            //use Promisfy
            connection.query = util.promisify(connection.query);
            //get object before deleting
            let result2 = await connection.query("SELECT * FROM ITEMS WHERE ID = ? ORDER BY NAME", item_id);
            let result1 = await connection.query('DELETE FROM ITEMS WHERE ID=?', item_id);
            //return results in DTO
            let dto = new DTO(-1, "", -1, []);
            if(result1.affectedRows == 1) {
                dto = new DTO(200, "Delete Success", 1, new Item(result2[0].id, 
                                                            result2[0].name,
                                                            result2[0].description,
                                                            result2[0].quantity,
                                                            result2[0].household_id,
                                                            result2[0].donation_flag,
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