const Accessory = require("../models/accessory");


async function getAll() {
    const result = await Accessory.find({}).lean();
    return result;
}

async function getById(id) {
    const result = await Accessory.findById(id).lean();
    return result;
}

async function createAccessory(name, imageUrl, description) {
    await Accessory.create({
        name,
        imageUrl,
        description
    });
};

module.exports = {
    createAccessory
}