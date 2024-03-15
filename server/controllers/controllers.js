// server/controllers/controllers.js
const jwtHelper = require("../helpers/jwt");
const collection = require("../models/User");
const Data = require("../models/Data");
const Item = require('../models/Project');


exports.checkUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await collection.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        const token = jwtHelper.generateToken({ email: email, role: user.role });
        return res.json({ token, user });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

exports.signupUser = async (req, res) => {
    const { email, password, name, phoneNumber, role } = req.body;

    const userData = {
        email: email,
        password: password,
        name: name,
        phoneNumber: phoneNumber,
        role: role || "user"
    };

    try {
        const userExists = await collection.findOne({ email: email });
        if (userExists) {
            return res.status(409).json({ message: "Email already exists" });
        }

        await collection.create(userData);

        const token = jwtHelper.generateToken({ email: email, role: userData.role });

        return res.status(201).json({
            message: "User created successfully",
            token: token,
            userData,
        });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

exports.getCodeLibelle = async (req, res) => {
    try {
        const products = await Data.find({}, 'CODE LIBELLE');
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
exports.createItem = async (req, res) => {
    try {
        const newItem = await Item.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                item: newItem._id

            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.getItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.json({ items });
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ message: 'Failed to fetch items' });
    }
};

exports.deleteItem = async (req, res) => {
    try {
        const itemId = req.params.itemId;
        await Item.findByIdAndDelete(itemId);
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Failed to delete item' });
    }
};

exports.updateItem = async (req, res) => {
    try {
        const itemId = req.params.itemId;
        const { name, type } = req.body;
        const updatedItem = await Item.findByIdAndUpdate(itemId, { name, type }, { new: true });
        res.status(200).json({ message: 'Item updated successfully', item: updatedItem });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Failed to update item' });
    }
};
