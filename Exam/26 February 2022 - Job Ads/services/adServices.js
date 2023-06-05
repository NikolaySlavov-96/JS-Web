const Ad = require("../Models/Ad");


async function getAllAds() {
    return Ad.find({}).lean();
}

async function getThreeAds() {
    return Ad.find({}).lean();
}

async function createAd(data) {
    return await Ad.create(data);
}

async function getOneAd(id) {
    return Ad.findById(id).lean();
}

async function getAdPopulate(id) {
    return Ad.findById(id).populate('userApplied').lean();
}

async function applyAd(id, userId) {
    const ad = await Ad.findById(id);
    ad.userApplied.push(userId);
    await ad.save();
}

async function updateAd(id, data) {
    const inputData = await Ad.findById(id);

    inputData.headline = data.headline
    inputData.location = data.location
    inputData.company = data.company
    inputData.description = data.description

    await inputData.save();
}

async function removeById(id) {
    return Ad.findByIdAndDelete(id);
}

module.exports = {
    getAllAds,
    getThreeAds,
    createAd,
    getOneAd,
    getAdPopulate,
    applyAd,
    updateAd,
    removeById
}