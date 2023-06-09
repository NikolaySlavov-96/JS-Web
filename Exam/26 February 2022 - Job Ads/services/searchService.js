const User = require("../Models/User");
const Ad = require("../Models/Ad");

async function searchUser(email) {
    const userData = await User.find({ email });
    const userId = userData[0]._id.toString();
    const allAdForUser = await Ad.find({ author: userId }).lean();
    return allAdForUser;
}

module.exports = {
    searchUser,
}