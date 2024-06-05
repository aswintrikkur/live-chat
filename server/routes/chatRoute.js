const express = require('express');
const { Users } = require('../models/userModel');
const router = express.Router();




router.get("/", async (req, res) => {

    try {
        const { id } = req.body;

        const dbResponse = await Users.findById(id);
        res.json(dbResponse)

    } catch (error) {
        res.status(400).json(error)
    }
})



router.post("/", async (req, res) => {

    try {
        const { message, id } = req.body;

        await Users.updateOne({ _id: id }, { $push: { chat:message } })

        const dbResponse = await Users.findById(id); 


        res.json(dbResponse)

    } catch (error) {
        res.status(400).json(error)
    }
})




module.exports = { chatRoute: router }