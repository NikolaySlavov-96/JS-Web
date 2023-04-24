const Art = require("../models/Art");
const User = require("../models/User");


async function getAll() {
    return await Art.find({}).lean();
}

async function getById(id) {
    return await Art.findById(id).lean();
}

async function createArt(art) {
    const user = await User.findById(art.owner.toString());
    const artData = await Art.create(art);
    user.myPublication.push(artData._id);
    return await user.save();
}

async function updateArt(idArt, dataArt) {
    const art = await Art.findById(idArt);

    art.titleArt = dataArt.titleArt;
    art.technique = dataArt.technique
    art.picture = dataArt.picture
    art.certificate = dataArt.certificate

    await art.save();
}

async function deleteById(id) {
    return await Art.findByIdAndDelete(id);
}

async function shareArt(idArt, idUser) {
    const user = await User.findById(idUser);
    const art = await Art.findById(idArt);

    user.myShares.push(idArt);
    art.shared.push(idUser);

    await user.save();
    await art.save()
}

module.exports = {
    getAll,
    getById,
    createArt,
    updateArt,
    deleteById,
    shareArt
}