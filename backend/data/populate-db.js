const DUMMY_USERS = require('./data')
const bcrypt = require('bcrypt')
const User = require('../models/user')

module.exports = async function populateDb() {
    try {
        for (const userSchema of DUMMY_USERS) {
            userSchema.password = await bcrypt.hash(userSchema.password, 10);
            const newUser = new User(userSchema);
            await newUser.save();
            console.log("User saved:", newUser);
        }
    } catch (err) {
        console.error("Error saving users:", err);
    }
};
