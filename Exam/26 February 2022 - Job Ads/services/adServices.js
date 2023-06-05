const Ad = require("../Models/Ad");


async function getThreeAds() {
    const ads = await Ad.find()
}