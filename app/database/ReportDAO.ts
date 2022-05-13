    
    //Object Model Dependencies
import { Report }    from "../models/Report";
import { DTO }       from "../database/DTO";

//Util Module Dependency for Promisify
import * as util from "util";

export class ReportDAO 
{
    private pool;

    constructor(pool: any) 
    {
        this.pool = pool;
    }
    
    public readByFlag(callback: any) 
    {
        let report:Report[] = [];
        this.pool.getConnection(async function(err:any, connection:any)
        {
            if (err) throw err;

            //use Promisfy
            connection.query = util.promisify(connection.query);
            let result1 = await connection.query("SELECT i.id, i.name, i.description, i.quantity, i.updated_at, h.state, (SELECT u.email FROM users u WHERE u.id = hu.user_id LIMIT 1) AS email FROM items i JOIN households h ON h.id = i.household_id JOIN household_users hu ON hu.household_id = h.id WHERE donation_flag IS NOT NULL ORDER BY NAME");
            for(let x=0;x < result1.length;++x)
            {
                report.push(new Report(result1[x].id, 
                    result1[x].name,
                    result1[x].description,
                    result1[x].quantity,
                    result1[x].updated_at,
                    result1[x].state,
                    result1[x].email));
            }
            //return results
            let dto = new DTO(-1, "", -1, []);
            if(report.length > 0) {
                dto = new DTO(200, "Get Success", report.length, report);
            } else {
                dto = new DTO(404, "Get Success: No Results", report.length, []);
            }
            if (connection) connection.release();
            callback(dto);
        })
    }
}