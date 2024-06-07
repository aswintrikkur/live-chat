const express = require('express');
const { Users } = require('../models/userModel');
const { ChatRoom } = require('../models/chatRoomModel');
const router = express.Router();




// router.get("/", async (req, res) => {

//     try {
//         const { id } = req.body;

//         const dbResponse = await Users.findById(id);
//         res.json(dbResponse)

//     } catch (error) {
//         res.status(400).json(error)
//     }
// })




//--------------- create chatRoom -------------------
router.post("/room", async (req, res) => {

    try {
        const { idOne, idTwo } = req.body;

        const existingRoom = await ChatRoom.findOne({ users: { $all: [idOne, idTwo] } })
        if (existingRoom) {
            return res.json({ roomDetails: existingRoom });
            // return res.status(400).json({ message: 'room already exist' })
        }

        const newChatRoom = await ChatRoom.create({ users: [idOne, idTwo] })

        res.json(newChatRoom)

    } catch (error) {
        res.status(400).json(error)
    }
})


// --------------------------- send message ----------------------------
router.put("/", async (req, res) => {

    try {
        const { message, userId, roomId } = req.body;

        const updateChat = await ChatRoom.findByIdAndUpdate(roomId, { $push: { chat: { userId, message } } },
            { new: true })

        res.json({ roomDetails: updateChat })


    } catch (error) {
        res.status(400).json(error)
    }
})

// --------------------------- fetch message ----------------------------
router.get("/", async (req, res) => {

    try {
        const { roomId } = req.query;

        const dbResponse = await ChatRoom.findById(roomId);
        res.json({
            roomDetails: dbResponse
        })

    } catch (error) {
        res.status(400).json(error)
    }
})




module.exports = { chatRoute: router }