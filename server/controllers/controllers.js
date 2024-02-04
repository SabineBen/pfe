const jwtHelper = require("../helpers/jwt");
const collection = require("../models/user");
require('dotenv').config();

exports.checkUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await collection.findOne({ email: email });

        if (!user) {
            return res.json("notexist");
        }

        if (user.password !== password) {
            return res.json("incorrectpassword");
        }

        const token = jwtHelper.generateToken({ email: email });
        return res.json({ token });
    } catch (error) {
        console.error("Error:", error);
        return res.json("fail");
    }
};


exports.signupUser = async (req, res) => {
    const { email, password, name, phoneNumber } = req.body;

    const data = {
        email: email,
        password: password,
        name: name,
        phoneNumber: phoneNumber,
    };

    try {
        const check = await collection.findOne({ email: email });

        if (check) {
            return res.json("exist");
        }

        await collection.create(data);
        const token = jwtHelper.generateToken({ email: email });
        console.log("Token:", token);
        console.log("User's email:", email);
        return res.json({ token });
    } catch (error) {
        console.error("Error:", error);
        return res.json("fail");
    }
};
