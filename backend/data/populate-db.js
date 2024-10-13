const DUMMY_USERS = require('./data')

const User = require('../models/user')

module.exports = async function populateDb() {
    try {
        for (const userSchema of DUMMY_USERS) {
            const userToDb = new User(userSchema);
            const savedUser = await userToDb.save();
            console.log("User saved:", savedUser);
        }
    } catch (err) {
        console.error("Error saving users:", err);
    }
};
