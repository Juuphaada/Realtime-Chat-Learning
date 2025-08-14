const messageModel = require("../Models/messageModel");
const cloudinary = require("../lib/cloudinary.js");

// create Message
const createMessage = async(req,res) => {
    const {chatId,senderId,text,image} = req.body;

    let imageURL;
    if(image){
        try{
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageURL = uploadResponse.secure_url;
        }catch(error){
            console.log("cloudinary error",error);
        }
    }

    console.log("imageURL", typeof imageURL);
    const message = new messageModel({
        chatId,senderId,text,image:imageURL
    })

    try{
        const response = await message.save();
        res.status(200).json(response);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};

// getMessages
const getMessages = async(req, res)=>{
    const {chatId} = req.params;

    try{
        const messages = await messageModel.find({chatId})
        res.status(200).json(messages);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports = {createMessage, getMessages};