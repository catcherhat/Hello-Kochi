//Import modules.
const Express = require('express');
const Cors = require('cors');
const BodyParser = require('body-parser');
const Mongoose = require('mongoose');


//Import database models.
const {HotelModel} = require('./Models/Hotel');
const{AdminModel} = require('./Models/Admin');
const{TouristModel} = require('./Models/Tourist');
const{TaxiModel} = require('./Models/Taxi');
const{GuideModel} = require('./Models/Guide');
Mongoose.connect("mongodb+srv://rajalak:123@cluster0.nmz5fqn.mongodb.net/?retryWrites=true&w=majority");
//Add middlewares.
const app = Express();
app.use(Cors());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended:true}));


//Authenticate the login credentials for the organiser using JSON Web Tokens.
app.post("/adminlogin",async (req,res)=>{
    let request = req.body;
    console.log(request)
    let data = await AdminModel.find();
    let adminuser = data[0].user;
    let adminpass = data[0].password;
    if(request.user!==adminuser)
    {
        res.status(401).send("Invalid username!!");
    }
    else if(request.password!==adminpass)
    {
        res.status(401).send("Invalid password!!");
    }
    else
    {
        let payload = {subject:adminuser+adminpass};
        let token = jwt.sign(payload,'secretKey');
        res.status(200).send({token});
    }
});

//Register respective house captains.
app.post("/Guide", async(req,res)=>{
    let data = req.body;
    let obj = new GuideModel(data);
    console.log(data)
    let result = await obj.save();
    res.send(result);
});

//Authenticate house captains using JSON Web Tokens.
app.post("/Guidelogin",async (req,res)=>{
    let request = req.body;
    let data = await GuideModel.findOne({"user":request.user});
    let user = data.user;
    let pass = data.password;
    let city = data.city;
    if(user!==request.user)
    {
        res.status(401).send("Invalid username!!");
    }
    else if(pass!==request.password)
    {
        res.status(401).send("Invalid password!!");
    }
    else if(house!==request.house)
    {
        res.status(401).send("Invalid housename!!");
    }
    else
    {
        let payload = {subject:user+pass+house};
        let token = jwt.sign(payload,'secretKey');
        res.status(200).send(token);
    }
});

//Register students.
app.post("/addTourist",async (req,res)=>{
    let data = req.body;
    let obj = new TouristModel(data);
    let result = await obj.save();
    res.send(result);
});

//Gets the full list of students.
app.get("/viewToursists",async (req,res)=>{
    let data = await TouristModel.find();
    res.send(data);
});


//To get students by house name.
app.get("/viewtourist/:cityname", (req,res)=>{
    const cityname = req.params.housename;
    TouristModel.find({"city":cityname}).then((h)=>{res.send(h)});
});

//Authenticate student login using JSON Web Tokens.
app.post("/studentlogin",async(req,res)=>{
    let request = req.body;
    let data = await TouristModel.findOne({"name":request.name});
    let name = data.name;
    let city = data.city;
    let pass = data.pass;
    if(request.name!==name)
    {
        res.status(401),send("Invalid name!!");
    }
    else if(request.house!==house)
    {
        res.status(401).send("Invalid house name!!");
    }
    else if(request.pass!==pass)
    {
        res.status(401).send("Invalid password!!");
    }
    else
    {
        let payload = {subject:name+house+pass};
        let token = jwt.sign(payload,'secretKey');
        res.send(token);
    }
});


//Captain removes a student as per needs.
app.delete("/deletetourist",(req,res)=>{
    TouristModel.deleteOne({"_id":req.body._id},req.body,(err,data)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.send("Deletion successful!");
        }
    });
});

//To remove an event from the events array of a particular student.
app.post("/removeevent/:id/:city",async (req,res)=>{       
    const id = req.params.id;
    const city = req.params.city;
    let data = await TouristModel.findOne({"_id":id});
    for(let i=0;i<data.city.length;i++)
    {
        if(data.city[i] === city)
        {
            data.city.splice(i,1);
        }
    }
   
});

//Send an error if resource requested is invalid.

//Using port 3000.
app.listen(3000,()=>{
    console.log("Server running at http://localhost:3000");
});