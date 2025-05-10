//#1
const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const  jwt = require("jsonwebtoken");

//#1
//create a token
const createToken = (_id) =>{
    const jwtkey = process.env.JWT_SECRET_KEY; //JWT_SECRET_KEY is environment in .env file
    //https://jwt.io/
    return jwt.sign({_id}, jwtkey,{expiresIn: "3d"});
}

//#1
// check if user alredy exist in the database
const registerUser = async (req,res)=>{
    //console.log("registerInfo", {name : req.name, email : req.email, pass: req.password});
    try{
        //res.send("Register");
        const {name,email,password} = req.body;

        console.log("registerInfo", {name : name, email : email, pass: password})
        
        //#1
        //find user
        // when using"await", type "async" before "registerUser" funtion
        let user = await userModel.findOne({email}); // return true if regising user alredy exise

        // if there alredy user on database resporn with error message 400
        if(user) 
            return res.status(400).json("User with the given email already exist..");
        // if user does not enter all field
        if(!name || !email || !password) 
            return res.status(400).json("All fields are required");
        // if worng email format
        if(!validator.isEmail(email)) 
            return res.status(400).json("Email must be valid email...");
        // if password isnt strong enouge
        if(!validator.isStrongPassword(password)) 
            return res.status(400).json("Password must be a strong password...");
        
        //#1
        user = new userModel({name, email, password});//add new user in database

        const salt = await bcrypt.genSalt(10);// random String length to hash a password
        user.password = await bcrypt.hash(user.password, salt);// hash a password and change password in to the hashed one
        await user.save();

        const token = createToken(user._id)
        //resporn user._id, name,email, token , do not send password, It must be secret
        res.status(200).json({_id: user._id, name,email, token})

    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};

//#1
//try find paticular user
const loginUser = async(req, res) =>{
    const {email,password} = req.body;

    try{
        let user = await userModel.findOne({email}); //.findOne, passing an object which is {email}
        
        if(!user) return res.status(400).json("Invalid email or password...")//if this email doesnt exise
        // if correct
        // bcrypt. = to decord passwords and compare passwords together
        // if vaild isValidPassword = ture
        const isValidPassword = await bcrypt.compare(password, user.password)

        if(!isValidPassword) 
            return res.status(400).json("Invalid email or password...");
            
        //send detail
        const token = createToken(user._id)
        //resporn user._id, name,email, token , do not send password, It must be secret
        res.status(200).json({_id: user._id, name:user.name ,email, token})
    
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};
//async function to get req and res
const findUser = async(req,res)=>{
    //params.userId passing userId to the parameter
    const userId = req.params.userId;//(when req userId will be on  URL)
    try{
        const user = await userModel.findById(userId)//.findById, expecting only one parameter that is string
        res.status(200).json(user);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};

//geting all the users
const getUsers = async(req,res)=>{
    try{
        const user = await userModel.find();
        res.status(200).json(user);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};

//#1
module.exports = {registerUser, loginUser, findUser, getUsers};