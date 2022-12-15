//Main packages
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//Config
const { DATA_LOGIN, DATA_PASS, DATA_CONNECTION } = require("./config.json")
var port = 80
//Using body parser
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//Listener and Port binding
const listener = app.listen(port, () => {
  console.log("Your app running and listening on port " + listener.address().port);
});

//Database
    mongoose.connect(`mongodb://${DATA_LOGIN}:${DATA_PASS}@${DATA_CONNECTION}/?authSource=admin`);
  
    var db = mongoose.connection;
  
    db.on("error", console.error.bind(console, "connection error:"));
  
    db.once("open", function() {
      console.log("Database connected!");
    });

//Route for getting data
app.get("/get/:name", async (request, response) => {
//Schema
   require('./models/data')
const userModel = mongoose.model('Data')
  
  //Function to check data
  async function userDataCheck() {
    const userData = await userModel.findOne({ name: `${request.params.name}` })

    if (userData) {
      return userData
    } else {
      const newUserDataInstance = new userModel({
        user: `${request.params.data}`
      })
      
      const newUserData = await newUserDataInstance.save()
      

      return newUserData
    }
  }

  response.json(await userDataCheck());
});


//Route for updating data
app.post("/update/:name", async (request, response) => {

  //Schema
   require('./models/data')
const userModel = mongoose.model('Data')
  
  await userModel.findOneAndUpdate(
    { userID: `${request.params.name}` }, //For which user
    { $set: { data: request.body.data } } //Data to be changed
  );
  //Response if all was succesful
  response.send(`Updated data, for user: ${request.params.name}`);
});

//Create data for a user
app.post("/create/:name", async (request, response) => {
  //Schema loading
  require('./models/data')
  const userModel = mongoose.model('Data')

  if(userModel) {
     await userModel.create({
      user: request.params.name,
      data: request.body.data || "No data were provided in body!"
     })
  }
  response.send(`Data created, for user: ${request.params.name}`)
})
