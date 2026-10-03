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
    
    try{
        //res.send("Register");
        const {name,email,password} = req.body;
        
        const normalizedEmail = email && email.trim().toLowerCase(); // convert email to lowercase
        const trimedName = name && name.trim().replace(/\s+/g, ' ') 
        // remove whitespace at the start and the end of name and reduce whitespace between name.

        console.log("trimName",trimedName)

        let user = await userModel.findOne({email : normalizedEmail}); // return true if regising user alredy exise

        if(user) 
            return res.status(400).json("User with the given email already exist..");

        // if user does not enter all field
        if(!trimedName || !normalizedEmail || !password) 
            return res.status(400).json("All fields are required");

        if(trimedName.length > 20) 
            return res.status(400).json("Username mushn't longer than 20 characters");

        // if worng email format
        if(!validator.isEmail(normalizedEmail))
            return res.status(400).json("Email must be valid email...");

        // if password isnt strong enouge
        if(!validator.isStrongPassword(password)) 
            return res.status(400).json("Password must be a strong password...");

        if(password.length > 40) 
            return res.status(400).json("Password length mushn't longer than 40 characters");

        user = new userModel({name: trimedName,  email: normalizedEmail, password: password});//add the new user

        const salt = await bcrypt.genSalt(10);// random String length to hash a password
        user.password = await bcrypt.hash(user.password, salt);// hash a password and change password in to the hashed one
        await user.save();//save the new user into the database

        const token = createToken(user._id)
        //resporn user._id, name,email, token , do not send password, It must be secret
        res.status(200).json({_id: user._id, name: trimedName, email: normalizedEmail, token: token})

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
        if(!email||!password) return res.status(400).json("All fields are required")

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