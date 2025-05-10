//#1
const mongoose = require("mongoose")//making use of mongoose

//shape of our document
const userShema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 3, maxlength: 30},
    email: {type: String, required: true, minlength:3, maxlength:200, unique: true},
    password: {type: String, required:true, minlength:3, maxlength: 1024,}
},
{
    timestamps: true,
});

// create a collectoin of users
const userModel = mongoose.model("User",userShema)
// exports to be able to be use in the another file
module.exports= userModel;

/**
 * pass: React567&
 * users:
 *  ch...
 *  mama
 *  hana
 */