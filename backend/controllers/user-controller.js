const User = require('../models/user')
const populateDb = require("../data/populate-db");
const bcrypt = require('bcrypt')

const SALT_ROUNDS = 10

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

exports.login = async (req, res, next) => {
    const {email, password} = req.body
    //TODO: validate all fields
    try {
        const userCheck = await User.exists(email)
        if (!userCheck) {
            return res.status(404).json({message: 'User not found!'})
        }

        const userFromDb = await User.findOne(user.email)
        if (!userFromDb) {
            throw new Error("Error during fetching user from the database!")
        }

        const isPasswordMatch = await bcrypt.compare(password, userFromDb.password)

        if (isPasswordMatch) {
            return res.status(200).json({message: 'User logged in successfully!'})
        }
        res.status(401).json({message: 'Invalid credentials!'})

    } catch (err) {
        res.status(409).json({message: err.message})
    }
}

exports.register = async (req, res, next) => {
    const user = req.body
    //TODO: validate all fields
    try {
        const userCheck = await User.exists(user.email)
        if (userCheck) {
            throw new Error("This email is already taken!")
        }

        const userToDb = new User({
            ...user,
            password: await bcrypt.hash(user.password, SALT_ROUNDS)
        })

        await userToDb.save()

        res.status(201).json({message: 'User registered successfully!'})

    } catch (err) {
        res.status(409).json({message: err.message})
    }
}

exports.populateDb = async (req, res, next) => {
    try {
        await populateDb()
        res.status(201).json("Db populated")
    } catch (err) {
        res.status(409).json({message: err.message});
    }
}
