const Cube = require('../models/Cube');

async function getAll(query, fromDificult, toDificult) {
    let result = await Cube.find({}).lean();

    if(query !== '' || fromDificult !== '' || toDificult !== '') {
        result = result.filter(f => f.name.toLowerCase().includes(query.toLowerCase()))
            .filter(q => q.difficultyLevel <= toDificult && q.difficultyLevel >= fromDificult);
    }

    return result;
}

async function getById(id) {
    const result = await Cube.findById(id).lean();
    return result;
}

async function createCube(name, description, imageUrl, difficultyLevel) {
    await Cube.create({
        name,
        description,
        imageUrl,
        difficultyLevel
    });
};

async function addAccessoryForCubes(id, accessoryId) {
    console.log(id);
    console.log(accessoryId.accessory);
}

async function deleteById(id) {
    const result = await Cube.findByIdAndRemove(id);
    return result;
}

module.exports = {
    getAll,
    getById,
    addAccessoryForCubes,
    createCube
}