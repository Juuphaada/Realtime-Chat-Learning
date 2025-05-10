//#1
const express = require("express")
//get registerUser funtion from userControllers.js
const {registerUser, loginUser, findUser, getUsers} = require("../Controllers/userControllers")

//#1
const router = express.Router();//create mini app, small version of express

/**
//#1
//type url follow with "/api/users/register" it will return "Register" from userRoute

router.post("/register",(req,res)=>{
    res.send("Register")
});
**/

//get "Register" from userControllers.js
//when regising a user, send data to database
router.post("/register", registerUser); // "registerUser" is a funtion from userControllers.js file
router.post("/login", loginUser);
router.get("/find/:userId", findUser);
router.get("/", getUsers);

//#1
module.exports = router;