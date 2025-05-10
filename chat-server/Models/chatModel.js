const mongoose = require("mongoose")

// create a chate schema
const chatSchema = new mongoose.Schema(
    {
    members: Array, // array of members
    //every chat will only have two members. sender and receiver
    }
,
    {
    timestamps: true,
    }
);

//use chatSchema to create chat model
const chatModel = mongoose.model("Chat",chatSchema);

module.exports = chatModel;