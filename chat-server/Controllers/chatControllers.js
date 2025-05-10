const chatModel = require("../Models/chatModel")

// createChat
// findUserChats
// findChat

const createChat = async(req, res) => {
    const {firstId, secondId} = req.body;
    // when creat a chat we will have two things in our requst body,both IDs senderID&reciverID

    try{
        const chat = await chatModel.findOne({
            members: {$all: [firstId, secondId]}
            //check if two members have IDs
            //$all : mongoodb operator, mean we must have [firstId] and [secondId] parameter to find
        })

        //if chat alredy exied. return the alredy exied one to the fount end
        if(chat) return res.status(200).json(chat);

        //if chat doesnt exit before, creates new one
        const newChat = new chatModel({
            members: [firstId, secondId]
        });

        // save to a new chat to the database
        const response = await newChat.save();

        //return the new created chat.
        res.status(200).json(response);

    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
};

//use req and res.
//when finding chats, we will passing the user ID of the currently logged in user through the URL parameter
const findUserChats = async(req, res) => {
    const userId = req.params.userId;
    // now we can make use of this user ID, to filter all the charts for this.

    try{
        const chats = await chatModel.find({
            members: {$in: [userId]},
            //$in : mongoodb operator, mean it only need one of parem ([userId] or [secondId]) to find
        });

        res.status(200).json(chats);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};

// find only one specified chat
const findChat = async(req, res) => {
    const {firstId, secondId} = req.params;

    try{
        const chats = await chatModel.findOne({
            members: {$all: [firstId, secondId]},
            // use these two ID to get chat
        });

        //send finded chat to the fount end
        res.status(200).json(chats);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports = {createChat,findUserChats,findChat};