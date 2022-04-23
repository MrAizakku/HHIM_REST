//app dependencies
const { Household }         = require('./lib/app/models/Household');
const { Item }              = require('./lib/app/models/Item');
const { User }              = require('./lib/app/models/User');
const { HouseholdUser }     = require('./lib/app/models/HouseholdUser');
const { HouseholdDAO }      = require('./lib/app/database/HouseholdDAO');
const { ItemDAO }           = require('./lib/app/database/ItemDAO');
const { UserDAO }           = require('./lib/app/database/UserDAO');
const { HouseholdUserDAO }  = require('./lib/app/database/HouseholdUserDAO');
const bodyParser            = require('body-parser')

//create insatnce of Express app on Port 3000
const express = require('express');
const app = express();
const port = 3009;
app.use(bodyParser.json());

//database config
// const dbHost = "l6glqt8gsx37y4hs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com"
// const dbPort = "3306";
// const dbSchema = "l45k3ed06hge7rsq"
// const dbUsername = "zrq8s4xaf2pvof0k"
// const dbPassword = "xc80ddjapuaj3w3b"

const dbHost = "localhost"
const dbPort = 3306;
const dbSchema = "cst451"
const dbUsername = "root"
const dbPassword = "root"

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
    let DAO = new HouseholdDAO(dbHost, dbPort, dbSchema, dbUsername, dbPassword);
    DAO.readAll(function(result)
    {
        res.json(result);
    });  
})

app.get('/households/:household', function(req, res)
{
    console.log('Inside GET /households for param ' + req.params.household);
    let DAO = new HouseholdDAO(dbHost, dbPort, dbSchema, dbUsername, dbPassword);
    DAO.readById(req.params.household, function(result)
    {
        res.json(result);
    });  
})

app.post('/households', function(req, res)
 {
     console.log("Inside POST /households", req.body)
     if(!req.body.name)
     {
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
 
        let DAO = new HouseholdDAO(dbHost, dbPort, dbSchema, dbUsername, dbPassword);
 
        DAO.create(household, function(new_HH)
        {
            res.json(new_HH);
        });
    }
});

app.put('/households/:id', function(req, res)
{
    console.log("Inside PUT /households/" + req.params.id, req.body)
    if(!req.body.name)
    {
        res.status(400).json({error: "ERR 400: Invalid Household Information"});
    }
    else
    {
        let DAO = new HouseholdDAO(dbHost, dbPort, dbSchema, dbUsername, dbPassword);
        let update_household = new Household(req.params.id, req.body.name, req.body.street, req.body.city, req.body.state, req.body.zip, req.body.description, "", "", []);

        DAO.update(update_household, function(new_HH)
        {
            res.json(new_HH);
        });
    }
});

app.delete('/households/:id', function(req, res)
{
    console.log("Inside DEL /households/" + req.params.id, req.body)
    let DAO = new HouseholdDAO(dbHost, dbPort, dbSchema, dbUsername, dbPassword);
    DAO.delete(Number(req.params.id), function(result)
    {
        res.json(result);
    });    
});


 /************************
  *        ITEMS         *
  ************************/
 app.get('/items/', function(req, res)
 {
     console.log('Inside GET /items');
     let DAO = new ItemDAO(dbHost, dbPort, dbSchema, dbUsername, dbPassword);
     DAO.readAll(function(items)
     {
         res.json(items);
     });
})

 app.get('/items/:item', function(req, res)
 {
     console.log('Inside GET /items for param ' + req.params.item);
     let DAO = new ItemDAO(dbHost, dbPort, dbSchema, dbUsername, dbPassword);
     DAO.readById(req.params.item, function(items)
     {
         res.json(items);
     });
})

 app.get('/items/household/:hhid', function(req, res)
 {
     console.log('Inside GET /items for household ' + req.params.hhid);
     let DAO = new ItemDAO(dbHost, dbPort, dbSchema, dbUsername, dbPassword);
     DAO.readByHhid(req.params.hhid, function(item)
     {
         res.json(item);
     });
})

 app.post('/items', function(req, res)
 {
     console.log("Inside POST /items", req.body)
     if(!req.body.name)
     {
         res.status(400).json({"error": "ERR 400: Invalid Item Information"});
     }
     else
     { 
        let item = new Item(-1, req.body.name, req.body.description, req.body.quantity, req.body.households_id, "", "");
        let DAO = new ItemDAO(dbHost, dbPort, dbSchema, dbUsername, dbPassword);
        DAO.create(item, function(new_item)
        {
            res.json(new_item);
        });
     }
});

app.put('/items/:id', function(req, res)
{
    console.log("Inside PUT /items/" + req.params.id, req.body)
    if(!req.body.name)
    {
        res.status(400).json({error: "ERR 400: Invalid Item Information"});
    }
    else
    {
        let DAO = new ItemDAO(dbHost, dbPort, dbSchema, dbUsername, dbPassword);
        let update_item = new Item(req.params.id, req.body.name, req.body.description, req.body.quantity, req.body.households_id, req.body.donation_flag, "", "");

        DAO.update(update_item, function(item)
        {
            res.json(item);
        });
    }
});

 app.delete('/items/:id', function(req, res)
 {
     console.log("Inside DEL /items/" + req.params.id, req.body)
     let DAO = new ItemDAO(dbHost, dbPort, dbSchema, dbUsername, dbPassword);
     DAO.delete(Number(req.params.id), function(item)
     {
         res.json(item);
     });    
 });

 /************************
  *        USERS         *
  ************************/
  app.get('/authenticate/', function(req, res)
  {
    console.log("Inside AUTHENTICATE /authenticate/", req.body)
    
    if(!req.body.email || !req.body.password) { next(err); }
    else {
        let DAO = new UserDAO(dbHost, dbPort, dbSchema, dbUsername, dbPassword);
        DAO.authenticate(req.body.email, req.body.password, function(users)
        {
            res.json(users);
        });
    }
 });

  app.get('/users/', function(req, res)
  {
      console.log('Inside GET /users readAll');
      let DAO = new UserDAO(dbHost, dbPort, dbSchema, dbUsername, dbPassword);
      DAO.readAll(function(users)
      {
          res.json(users);
      });
 });
 
  app.get('/user/', function(req, res)
  {
    if(!req.body.id) { next(err); }
    console.log('Inside GET /user for ' + req.body.id);
    let DAO = new UserDAO(dbHost, dbPort, dbSchema, dbUsername, dbPassword);
    DAO.readById(req.body.id, function(user)
    {
        res.json(user);
    });
 });
 
  app.get('/user/email', function(req, res)
  {
      console.log('Inside GET /user for ' + req.body.email);
      if(!req.body.email) { next(err); }
      let DAO = new UserDAO(dbHost, dbPort, dbSchema, dbUsername, dbPassword);
      DAO.readByEmail(req.body.email, function(user)
      {
          res.json(user);
      });
 });
 
  app.post('/user', function(req, res)
  {
    console.log("Inside POST /user", req.body)
    
    if(!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.password) { next(err); }
    else
    { 
        let user = new User(-1, req.body.first_name, req.body.last_name, req.body.email, req.body.password, "", "");
        let DAO = new UserDAO(dbHost, dbPort, dbSchema, dbUsername, dbPassword);
        DAO.create(user, function(new_user)
        {
            res.json(new_user);
        });
    }
 });

 app.put('/user/', function(req, res)
 {
    console.log("Inside PUT /user/   " + req.body.id, req.body)
     
    if(!req.body.id || !req.body.first_name || !req.body.last_name || !req.body.email || !req.body.password) { next(err); }
    else
    {
        let DAO = new UserDAO(dbHost, dbPort, dbSchema, dbUsername, dbPassword);
        let update_user = new User(req.body.id, req.body.first_name, req.body.last_name, req.body.email, req.body.password, "", "");
          DAO.update(update_user, function(user)
        {
            res.json(user);
        });
    }
 });
 
 app.delete('/user/', function(req, res)
 {
    if(!req.body.id) { next(err); }
     console.log("Inside DEL /user/" + req.body.id, req.body)
     let DAO = new UserDAO(dbHost, dbPort, dbSchema, dbUsername, dbPassword);
     DAO.delete(Number(req.body.id), function(user)
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
      let DAO = new HouseholdUserDAO(dbHost, dbPort, dbSchema, dbUsername, dbPassword);
      DAO.readAll(function(users)
      {
          res.json(users);
      });
 });
 
  app.get('/householduser/household', function(req, res)
  {
    if(!req.body.id) { next(err); }
      console.log('Inside GET /householduser/household for ' + req.body.id);
      let DAO = new HouseholdUserDAO(dbHost, dbPort, dbSchema, dbUsername, dbPassword);
      DAO.readByHouseholdId(req.body.id, function(user)
      {
          res.json(user);
      });
 });
 
  app.get('/householduser/user', function(req, res)
  {
      if(!req.body.id) { next(err); }
      console.log('Inside GET householduser/user for ' + req.body.id);
      let DAO = new HouseholdUserDAO(dbHost, dbPort, dbSchema, dbUsername, dbPassword);
      DAO.readByUserId(req.body.id, function(user)
      {
          res.json(user);
      });
 });
 
  app.post('/householduser', function(req, res)
  {
      console.log("Inside POST /householduser", req.body)
      if(!req.body.user_id || !req.body.household_id ) { next(err); }
      else
      { 
         let user = new HouseholdUser(-1, req.body.user_id, req.body.household_id, "", "");
         let DAO = new HouseholdUserDAO(dbHost, dbPort, dbSchema, dbUsername, dbPassword);
         DAO.create(user, function(new_user)
         {
             res.json(new_user);
         });
      }
 });
 
 app.delete('/householduser/', function(req, res)
 {
     console.log("Inside DEL /householduser/   ", req.body)
     if(!req.body.id) { next(err); }
     else {
        let DAO = new HouseholdUserDAO(dbHost, dbPort, dbSchema, dbUsername, dbPassword);
        DAO.delete(Number(req.body.id), function(user)
        {
            res.json(user);
        });    
    }
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