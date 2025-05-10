//#1
const express = require("express")
const cors = require('cors');//allow to comunicate with the fornt-end
const mongoose = require("mongoose");
const userRoute = require("./Routes/userRoute");

const chatRoute = require("./Routes/chatRoute");
const messageRoute = require("./Routes/messageRoute");

//#1 
const app = express(); //express's object  to creat the app
require("dotenv").config();//bring dotenv variable here to be able to read ATLAS_URI in .env file(line 43), and config

//middleware funtion
//#1
app.use(express.json()); //call paticular methoud from express, allow us to use json send and recive data from front-end
app.use(cors());
//type url follow with "/api/users/register" it will return "Register" from userRoute
app.use("/api/users", userRoute);

app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

//#1
//create API
// CRUD, C: created(app.post), R: read(app.get), U: update(app.put), D: delete(app.delete)
app.get("/", (req , res) => {
  //send message to clien
  res.send("welcome");
});

//#1
const port = process.env.PORT || 5000; //set port automatic , if 5000 unavalible it will chang automatically,  [process.env] reading environment variable from .env flie
const uri = process.env.ATLAS_URI;//connect mongoo, read enviroment variable from .env file

app.listen(port, (req,res) => {
  console.log(`Server running on port: ${port}`)
});

mongoose.connect(uri,{ //connect mongoo
  //setting
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(()=> console.log("MongoDB connection established"))//then() , when connnection success
.catch((error)=>console.log("MongoDB connection failed:", error.message));//catch() , if there're error

