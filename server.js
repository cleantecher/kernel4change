const mongoose= require("mongoose");
// test structure to see if the connection to the mongo database is establisehd
const structureImported = require("./models/category");
// activating express
const express= require("express");
// helps to create the html index path
const path= require("path");
// schema for test
const structureExported = require("./models/category");
const entryModel = require("./models/entry");
// schema for test

// schema for app
const structureCategory = require("./models/category");
// schema for app

// need method override to edit and delete documents
const methodOveride=require("method-override");
const { timeStamp } = require("console");

// initiating the command for express and storing it in variable called app
const app=express();
// setting the path location to the views folder
app.set("views", path.join(__dirname,"views"));

// ensuring code written in ejs can be viewed properly on the browser
app.set("view engine", "ejs");
// making sure all the characters are interpreted properly for input fields
app.use(express.urlencoded({extended:true}))
// creates the functionality for us to use method override to edit entries
app.use(methodOveride("_method"));
// create the ability to interpret css code and render it on the ejs engine
app.use(express.static(path.join(__dirname, 'public')));
// connection open to the database
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/kernel4change')//wanted the actual address localhost didnt work
    .then(()=> {
      console.log("Mongo->Connection from node.js open, kernel4change db should be created")
    })
    .catch(err=> {
      console.log(" Mongo-> the following error occured from the node.js file.")
      console.log(err)
      console.log("Mongo-> check if your running the mongod in the powershell")
    })
    // use `await mongoose.connect('mongodb://user:password@localhost:27017/helloWorld);` if your database has auth enabled
  }


// test variables to make sure things are being saved in the db
// const firstInput= new structureImported({name:"dummyVariable",message:"check if working"})
// const secondInput= new structureImported({name:"save",message:"trying to save from node.js"})
// secondInput.save();

// testing that the connection is set right to the browser
// app.get("/dbContents", (req, res)=>{
//     res.send("contents of db go here")
// })

// start test code for crud//
app.get("/input", (req, res)=>{
    res.render("input")
    console.log("did you hit enter in the address bar? the server was refresed at get request localhost:3000/input")
})

app.post("/input", (req,res)=>{
    console.log("posted from the input form");
    console.log(req.body);
    const newMessage= new structureImported(req.body);
    newMessage.save();
    res.send("product should be in db")
})

// note here the structureexprorted refers to the db
app.get("/dbContents", async(req,res)=>{
    const allEntries= await structureExported.find({});
    console.log(allEntries);
    res.render("allEntries", {allEntries})
})

app.get("/dbContents/:id", async(req,res)=>{
    const{id}= req.params;
    const eachdbEntry= await structureExported.findById(id);
    console.log(eachdbEntry);
    res.render("eachEntry",{eachdbEntry})
})

app.get("/dbContents/:id/edit", async(req,res)=>{
    const{id}=req.params;
    const eachdbEntry= await structureExported.findById(id);
    res.render("edit", {eachdbEntry})
})
// first put request, needs method override to be initiated properly
app.put("/dbContents/:id", async(req,res)=>{
    // console.log(req.body);
    // res.send("this is the put request")
    const {id}= req.params;
    const updatedEntry = await structureExported.findByIdAndUpdate(id, req.body, {runValidators:true})
    console.log(req.body);
    res.redirect(`/dbContents/${updatedEntry._id}`)
})
// end test code for crud//
// crud= tested success(entry edit retrival, (delete function not tested))

app.get('/login', (req, res) => {
    res.render('login')
})




app.get("/admin", async(req,res)=>{
    const {email, password} = req.query
    if(email == 'aman@cleantecher.com' && password == '011235813') {
      return  res.render("admin")
    } else {
    
      return  res.render("login")
    }
})

app.post("/admin", (req,res)=>{
    console.log("data from admin");
    console.log(req.body);
    const newCategory= new structureCategory(req.body);
    newCategory.save();
    res.render("admin")
})

app.get("/adminAll", async(req,res)=>{
    const allEntries= await structureCategory.find({});
    console.log(allEntries);
    res.render("adminAll", {allEntries})
})

app.get("/adminAll/:id", async(req,res)=>{
    const{id}=req.params;
    const eachdbEntry= await structureCategory.findById(id);
    res.render("adminEntry", {eachdbEntry})
})

app.put("/adminAll/:id", async(req,res)=>{
    // console.log(req.body);
    // res.send("this is the put request")
    const {id}= req.params;
    const updatedEntry = await structureCategory.findByIdAndUpdate(id, req.body, {runValidators:true})
    console.log(req.body);
    res.redirect(`/adminAll/${updatedEntry._id}`)
})

app.get("/", async(req,res)=>{
    const allEntries= await structureCategory.find({});
    console.log("all entries sent to main page");
    res.render("index", {allEntries})
})

app.post("/track", async (req,res)=>{
    const { entry, classId, recommendation, details, email, university} = req.body
    const allEntries= await structureCategory.find({});
    const clicks = JSON.parse(entry)
    const data = await entryModel.create({
        email,
        classId,
        recommendation,
        clicks,
        university,
        details,
        date: new Date()
    })

    return res.json({
        data
    })
})


// opening app connection and link to the server on port 3000 keep this line as the last one in the code
app.listen(3000, ()=>{
    console.log("app is listening on port 3000")
})