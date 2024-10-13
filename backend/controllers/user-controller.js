const User = require('../models/user')
const populateDb = require("../data/populate-db");

exports.getTest = (req, res, next) => {
    res.send('hello')
}
exports.getAll = async (req, res, next) => {
    try {
        const users = await User.find()

        if (Array.isArray(users)) {
            res.status(200).json({
                status: 'success',
                data: users,
            })
        } else {
            res.status(404).json({
                status: 'no users found',
                data: [],
            })
        }
    } catch (err) {
        res.status(500).json({
            status: 'error',
            error: err.message,
        })
    }
}

exports.populateDb = async (req, res, next) => {
    try {
        await populateDb()
        res.status(201).json("Db populated")
    } catch (err) {
        res.status(409).json({message: e.message});
    }
}
