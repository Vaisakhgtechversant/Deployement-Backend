const { mongoose } = require('mongoose');
const db = require('../database/db');
const dbLogin = require('../database/login');

const allFoods = async (req, res) => {
    try {
        const result = await db.foods.find();
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const AddFood = async (req, res) => {
    try {
        const { id, fname, price, available } = req.body
        const result = await db.foods.create({
            id, fname, price, available
        })
        res.status(201).json({
            message: "Food item added successfully!",
            data: result.data
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const deleteFood = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id);
        const objectId = new mongoose.Types.ObjectId(id);
        console.log(objectId);
        await db.foods.deleteOne(
            { _id: objectId }
        )
        res.status(201).json({
            message: "delete item successfully!",
        });
    } catch (err) {
        res.status(500).json({ error: err.message });

    }
}
const gwtSingleData = async (req, res) => {
    try {
        const { id } = req.params
        const objectId = new mongoose.Types.ObjectId(id);
        const result = await db.foods.findOne({
            _id: objectId
        })
        if (result) {
            res.status(200).json({
                message: "Food item fetched successfully!",
                data: result
            });
        } else {
            res.status(404).json({
                message: "Node data found",
            });
        }
    } catch (err) {

        res.status(500).json({ error: err.message });
    }
}

const UpdateData = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id);

        const { fname, price, available } = req.body;
        const objectId = new mongoose.Types.ObjectId(id);
        const result = await db.foods.findByIdAndUpdate(
            objectId,
            { fname, price, available },
            { new: true }
        );
        console.log('test', result);

        if (result) {
            res.status(200).json({
                message: "updated successfully!",
                data: result
            });
        } else {
            res.status(404).json({
                message: "No data found",
            });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });

    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const result = await dbLogin.logins.findOne({
            email,
            password
        })
        if (result) {
            res.status(200).json({
                message: "login successfully!",
                data: result
            });
        } else {
            res.status(404).json({
                message: "Invalid credentials",
            });
        }
    } catch (err) {

        res.status(500).json({ error: err.message });
    }
}

module.exports = { allFoods, AddFood, deleteFood, gwtSingleData, UpdateData, login };
