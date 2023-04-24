const User = require("../models/User")

async function profileData(id) {
    const data = await User.findById(id);
    const result = {
        username: data.username,
        address: data.address,
        myPublication: [],
        myShares: [],
    };

    if (data.myPublication.length > 0) {
        const myPublications = await User.findById(id).populate('myPublication')
        for(const key in myPublications.myPublication) {
            result.myPublication.push(myPublications.myPublication[key].titleArt);
        }
    }
    
    if (data.myShares.length > 0) {
        const myShares = await User.findById(id).populate('myShares')
        for(const key in myShares.myShares) {
            result.myShares.push(myShares.myShares[key].titleArt)
        }
    }
    
    return result
}

module.exports = {
    profileData
}