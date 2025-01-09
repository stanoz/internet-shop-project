const User = require('../models/user')
const populateDb = require("../data/populate-db");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
        res.status(409).json({
            status: 'error',
            error: err.message,
        })
    }
}

exports.login = async (req, res, next) => {
    const {email, password} = req.body

    try {
        const userCheck = await User.exists({email})
        if (!userCheck) {
            return res.status(404).json({message: 'User not found!'})
        }

        const userFromDb = await User.findOne({email})
        if (!userFromDb) {
            throw new Error("Error during fetching user from the database!")
        }

        const isPasswordMatch = await bcrypt.compare(password, userFromDb.password)

        if (isPasswordMatch) {
            const jwtToken = jwt.sign({email}, 'AccessToken', {expiresIn: '10h'})
            res.cookie('token', jwtToken, {
                httpOnly: true,
                sameSite: 'Strict',
                maxAge: 36000000 //10h
            })
            return res.status(200).json({message: 'User logged in successfully!'})
        }
        res.status(401).json({message: 'Invalid credentials!'})

    } catch (err) {
        res.status(409).json({message: err.message})
    }
}

exports.register = async (req, res, next) => {
    const user = req.body

    try {
        const userCheck = await User.exists({email: user.email})
        if (userCheck) {
            throw new Error("This email is already taken!")
        }

        const userToDb = new User({
            ...user,
            password: await bcrypt.hash(user.password, SALT_ROUNDS),
            isAdmin: false
        })

        await userToDb.save()

        const jwtToken = jwt.sign({email : user.email}, 'AccessToken', {expiresIn: '10h'})
        res.cookie('token', jwtToken, {
            httpOnly: true,
            sameSite: 'Strict',
            maxAge: 36000000 //10h
        })

        res.status(201).json({message: 'User registered successfully!'})

    } catch (err) {
        res.status(409).json({message: err.message})
    }
}

exports.logout = async (req, res, next) => {
    if (!req.cookies.token) {
        return res.status(401).json({message: "There is no token"})
    }

    res.clearCookie('token', {path: '/'})
    res.status(200).json({message: "User logout successfully"})
}

exports.editProfile = async (req, res, next) => {
    const id = req.params.id;

    try {
        const userFromDb = await User.findById(id).lean();

        if (!userFromDb) {
            return res.status(404).json({message: 'User not found'});
        }

        if (userFromDb.email !== req.user.email && req.user.email !== 'admin@example.com') {
            return res.status(403).json({message: 'Permission to update user denied'});
        }

        if (req.body.isAdmin && req.user.email !== 'admin@example.com') {
            return res.status(403).json({message: "Permission to update user's role denied"});
        }

        const filteredBody = Object.fromEntries(
            Object.entries(req.body).filter(([key, value]) => value)
        );

        const updatedUser = {...userFromDb, ...filteredBody}

        if (filteredBody.password) {
            updatedUser.password = await bcrypt.hash(filteredBody.password, SALT_ROUNDS);
        }

        const user = await User.findOneAndUpdate({_id: id}, {...updatedUser}, {new: true});
        if (!user) {
            return res.status(409).json({message: 'Failed to update user'});
        }

        res.status(200).json({message: 'User updated successfully'});
    } catch (err) {
        next(err)
    }
}

exports.populateDb = async (req, res, next) => {
    try {
        await populateDb()
        res.status(201).json("Db populated")
    } catch (err) {
        next(err)
    }
}
