const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    userId: {type:String, required: true},
    message:String,

},{timestamps:true})

const chatRoomSchema = new mongoose.Schema({
    users: { type: [String], requied:true },
    chat: [chatSchema]
})

module.exports = { ChatRoom: mongoose.model('ChatRoom', chatRoomSchema) }