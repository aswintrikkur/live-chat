const express = require('express');
const { Users } = require('../models/userModel');
const router = express.Router();


router.post('/register', async (req, res, next) => {
    try {
        const { username, email, mobile, password } = req.body;
        const user = { username, email, mobile, password }


        const isExist = await Users.findOne({ email });
        if (isExist) {
            return res.status(400).json({
                message: 'User already exists'
            })
        };


        //store user in DB
        const dbResponse = await Users.create(user);
        res.status(200).json({
            message: 'user register successful'
        });

    } catch (error) {

        res.status(400).json({ error })
    }
});


router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        //handle missing props in req.body

        const userData = await Users.findOne({ email });
        if (!userData) {
            return res.status(400).json({
                message: 'user not found.'
            })
        };

        if (userData.password == password) {

            return res.status(200).json({ message: 'success', userData });
        }

        return res.status(400).json({
            message: 'invalid email or password'
        });

    } catch (error) {

        res.status(400).json({ error })

    }
});

router.get('/all', async (req, res, next) => {
    try {
        const dbResponse = await Users.find();
        res.json({
            users: dbResponse
        })

    } catch (error) {

        res.status(400).json({ error })

    }
});



module.exports = { userRoute: router }