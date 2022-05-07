//app dependencies
const { Household }         = require('./lib/app/models/Household');
const { Item }              = require('./lib/app/models/Item');
const { User }              = require('./lib/app/models/User');
const { HouseholdUser }     = require('./lib/app/models/HouseholdUser');
const { HouseholdDAO }      = require('./lib/app/database/HouseholdDAO');
const { ItemDAO }           = require('./lib/app/database/ItemDAO');
const { UserDAO }           = require('./lib/app/database/UserDAO');
const { HouseholdUserDAO }  = require('./lib/app/database/HouseholdUserDAO');
const { ReportDAO }         = require('./lib/app/database/ReportDAO')
const bodyParser            = require('body-parser');
const mysql                 = require('mysql');

//create insatnce of Express app on Port 3000
const express = require('express');
const app = express();
const port = 3009;
app.use(bodyParser.json());

const dbHost = "bv2rebwf6zzsv341.cbetxkdyhwsb.us-east-1.rds.amazonaws.com"
const dbPort = 3306
const dbSchema = "gehz15dwj1cf6wky"
const dbUsername = "eqz9ng3abq1exezg"
const dbPassword = "ycaoufn1xwltoi6y"
const dbPool = mysql.createPool({host: dbHost, port: dbPort, user: dbUsername, password: dbPassword, database: dbSchema, connectionLimit: 10});

//MIDDLEWARE
app.use(function (req, res, next) 
{
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
});

app.listen(process.env.PORT || port, () => {
    console.log(`App listening on port ${process.env.PORT}!`);
});

/************************
 *      HOUSEHOLDS      *
 ************************/
app.get('/households/', function(req, res)
{
    console.log('Inside GET /households');
    let DAO = new HouseholdDAO(dbPool);
    DAO.readAll(function(result)
    {
        res.json(result);
    });  
})

app.get('/households/:id', function(req, res)
{
    let id = req.params.id;
    if (id != parseInt(id)) {
        res.status(400).json({"error": "ERR 400: Invalid user Information"});
    } else {
        console.log('Inside GET /households for user param ' + id);
        let DAO = new HouseholdDAO(dbPool);
        DAO.readAllByUserId(id, function(result)
        {
            res.json(result);
        });  
    }
})

app.get('/household/:id', function(req, res)
{
    let id = req.params.id;
    if (id != parseInt(id)) {
        res.status(400).json({"error": "ERR 400: Invalid household Information"});
    } else {
        console.log('Inside GET /households for param ' + id);
        let DAO = new HouseholdDAO(dbPool);
        DAO.readById(id, function(result)
        {
            res.json(result);
        });  
    }
})

app.post('/household', function(req, res)
 {
    console.log("Inside POST /households", req.body)
    if(!req.body.name || !req.body.street || !req.body.city || !req.body.state || !req.body.zip || req.body.state.length > 2) {
        res.status(400).json({"error": "ERR 400: Invalid household Information"});
    }
    else
    {
        let items = [];
        for(let x=0; x<req.body.items.length; ++x)
        {
           items.push(new Item(-1, req.body.items[x].name, req.body.items[x].description, req.body.items[x].quantity));
        }
        let household = new Household(-1, req.body.name, req.body.street, req.body.city, req.body.state, req.body.zip, req.body.description, new Date(), new Date(), items);
 
        let DAO = new HouseholdDAO(dbPool);
 
        DAO.create(household, function(new_HH)
        {
            res.json(new_HH);
        });
    }
});

app.put('/household/', function(req, res)
{
    console.log("Inside PUT /households/", req.body)
    if(!req.body.id || !req.body.name || !req.body.street || !req.body.city || !req.body.state || !req.body.zip || req.body.state.length > 2) {
        res.status(400).json({"error": "ERR 400: Invalid household Information"});
    }
    else
    {
        let DAO = new HouseholdDAO(dbPool);
        let update_household = new Household(req.body.id, req.body.name, req.body.street, req.body.city, req.body.state, req.body.zip, req.body.description, "", "", []);

        DAO.update(update_household, function(new_HH)
        {
            res.json(new_HH);
        });
    }
});

app.delete('/household/:id', function(req, res)
{
    let id = req.params.id;
    if (id != parseInt(id)) {
        res.status(400).json({"error": "ERR 400: Invalid household Information"});
    } else {
        console.log("Inside DEL /households/", id)
        let DAO = new HouseholdDAO(dbPool);
        DAO.delete(Number(id), function(result)
        {
            res.json(result);
        });   
    }
});


 /************************
  *        ITEMS         *
  ************************/
app.get('/items/', function(req, res)
 {
     console.log('Inside GET /items');
     let DAO = new ItemDAO(dbPool);
     DAO.readAll(function(items)
     {
         res.json(items);
     });
})

app.get('/item/:id', function(req, res)
{
    let id = req.params.id;
    if (id != parseInt(id)) {
        res.status(400).json({"error": "ERR 400: Invalid item Information"});
    } else {
        console.log('Inside GET /item ', id);
        let DAO = new ItemDAO(dbPool);
        DAO.readById(id, function(items)
        {
            res.json(items);
        });
    }
})

app.get('/items/household/:id', function(req, res)
 {
    let id = req.params.id;
    if (id != parseInt(id)) {
        res.status(400).json({"error": "ERR 400: Invalid item Information"});
    } else {
        console.log('Inside GET /items/household/ ', id);
        let DAO = new ItemDAO(dbPool);
        DAO.readByHhid(id, function(item)
        {
            res.json(item);
        });
    }
})

app.post('/item', function(req, res)
 {
     console.log("Inside POST /items", req.body)
     if(!req.body.name || !req.body.description || !req.body.quantity || !req.body.households_id)
     {
         res.status(400).json({"error": "ERR 400: Invalid Item Information"});
     }
     else
     { 
        let item = new Item(-1, req.body.name, req.body.description, req.body.quantity, req.body.households_id, "", "");
        let DAO = new ItemDAO(dbPool);
        DAO.create(item, function(new_item)
        {
            res.json(new_item);
        });
     }
});

app.put('/item/', function(req, res)
{
    if(!req.body.id || !req.body.name || !req.body.description || !req.body.quantity) {
        res.status(400).json({"error": "ERR 400: Invalid item Information"});
    } else {
        let DAO = new ItemDAO(dbPool);
        let update_item = new Item(req.body.id, req.body.name, req.body.description, req.body.quantity, req.body.households_id, req.body.donation_flag, "", "");

        DAO.update(update_item, function(item)
        {
            res.json(item);
        });
    }
});

app.delete('/item/:id', function(req, res)
 {
    let id = req.params.id;
    if (id != parseInt(id)) {
        res.status(400).json({"error": "ERR 400: Invalid item Information"});
    } else {
        console.log("Inside DEL /item/" , req.body)
        let DAO = new ItemDAO(dbPool);
        DAO.delete(Number(id), function(item)
        {
            res.json(item);
        });    
    }
});

/************************
*        USERS         *
************************/
app.post('/authenticate/', function(req, res)
  {
    console.log("Inside AUTHENTICATE /authenticate/", req.body)
    
    if(!req.body.email || !req.body.password) { next(err); }
    else {
        let DAO = new UserDAO(dbPool);
        DAO.authenticate(req.body.email, req.body.password, function(users)
        {
            res.json(users);
        });
    }
});

app.get('/users/', function(req, res)
  {
      console.log('Inside GET /users readAll');
      let DAO = new UserDAO(dbPool);
      DAO.readAll(function(users)
      {
          res.json(users);
      });
});
 
app.get('/user/:id', function(req, res)
  {
    let id = req.params.id;
    if (id != parseInt(id)) {
        res.status(400).json({"error": "ERR 400: Invalid user Information"});
     }
    console.log('Inside GET /user for ' + id);
    let DAO = new UserDAO(dbPool);
    DAO.readById(id, function(user)
    {
        res.json(user);
    });
});
 
app.get('/user/email/:id', function(req, res)
  {
    console.log('Inside GET /user for ' + req.body.email);

    let id = req.params.id;
    if (!id) {   
        res.status(400).json({"error": "ERR 400: Invalid user Information"});
    }
    let DAO = new UserDAO(dbPool);
    DAO.readByEmail(id, function(user)
    {
        res.json(user);
    });
});
 
app.post('/user', function(req, res)
{
    console.log("Inside POST /user", req.body)
    
    if(!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.password) { 
        res.status(400).json({"error": "ERR 400: Invalid user Information"});
    }
    else
    { 
        let user = new User(-1, req.body.first_name, req.body.last_name, req.body.email, req.body.password, "", "");
        let DAO = new UserDAO(dbPool);
        DAO.create(user, function(new_user)
        {
            res.json(new_user);
        });
    }
});

app.put('/user/', function(req, res)
{
    console.log("Inside PUT /user/   " + req.body.id, req.body)
     
    if(!req.body.id || !req.body.first_name || !req.body.last_name || !req.body.email || !req.body.password) { 
        res.status(400).json({"error": "ERR 400: Invalid user Information"});
    }
    else
    {
        let DAO = new UserDAO(dbPool);
        let update_user = new User(req.body.id, req.body.first_name, req.body.last_name, req.body.email, req.body.password, "", "");
          DAO.update(update_user, function(user)
        {
            res.json(user);
        });
    }
});
 
app.delete('/user/:id', function(req, res)
{
    let id = req.params.id;
    if (id != parseInt(id)) {
        res.status(400).json({"error": "ERR 400: Invalid user Information"});
    }
    console.log("Inside DEL /user/" + id, req.body)
    let DAO = new UserDAO(dbPool);
    DAO.delete(Number(id), function(user)
    {
        res.json(user);
    });    
});

/************************
 *   HOUSEHOLD USERS    *
 ************************/
app.get('/householdusers/', function(req, res)
  {
    console.log('Inside GET /householdusers readAll');
    let DAO = new HouseholdUserDAO(dbPool);
    DAO.readAll(function(users)
    {
        res.json(users);
    });
});
 
app.get('/householduser/household/:id', function(req, res)
{
    let id = req.params.id;
    if (id != parseInt(id)) {
        res.status(400).json({"error": "ERR 400: Invalid householduser Information"});
    }
    console.log('Inside GET /householduser/household for ' + id);
    let DAO = new HouseholdUserDAO(dbPool);
    DAO.readByHouseholdId(id, function(user)
    {
        res.json(user);
    });
});
 
app.get('/householduser/user/:id', function(req, res)
  {
    let id = req.params.id;
    if (id != parseInt(id)) {
        res.status(400).json({"error": "ERR 400: Invalid householduser Information"});
    }
    console.log('Inside GET householduser/user for ' + id);
    let DAO = new HouseholdUserDAO(dbPool);
    DAO.readByUserId(id, function(user)
    {
        res.json(user);
    });
});
 
app.post('/householduser', function(req, res)
  {
    console.log("Inside POST /householduser", req.body)
    if(!req.body.user_id || !req.body.household_id ) { 
        res.status(400).json({"error": "ERR 400: Invalid householduser Information"});
    }
    else
    { 
        let user = new HouseholdUser(-1, req.body.user_id, req.body.household_id, "", "");
        let DAO = new HouseholdUserDAO(dbPool);
        DAO.create(user, function(new_user)
        {
            res.json(new_user);
        });
    }
});
 
app.delete('/householduser/:id', function(req, res)
{
    console.log("Inside DEL /householduser/   ", req.body)
    
    let id = req.params.id;
    if (id != parseInt(id)) {
        res.status(400).json({"error": "ERR 400: Invalid householduser Information"});
    }
    else {
        let DAO = new HouseholdUserDAO(dbPool);
        DAO.delete(Number(id), function(user)
        {
            res.json(user);
        });    
    }
});

/************************
 *         REPORT       *
 ************************/
 app.get('/report/', function(req, res)
 {
   console.log('Inside GET /report readAll');
   let DAO = new ReportDAO(dbPool);
   DAO.readByFlag(function(report)
   {
       res.json(report);
   });
});

//  Error Handling
app.get('/error', (req, res) => {
    res.send("Custom error landing page.")
})

app.use((error, req, res, next) => {
    console.log("### Error Error Error Error Error ###")
    console.log('Path: ', req.path)
    console.error('Error: ', error)
   
    if (error.type == 'redirect')
        res.redirect('/error')
    else if (error.type == 'time-out') // arbitrary condition check
        res.status(408).send(error)
    else
        res.status(400).json({"error": "ERR 400: Invalid Information"});
})