const Cube = require('../models/Cube');

async function getAll(query, fromDificult, toDificult) {
    const search = {}
    if(query !== '') {
        search.name = query;
    }
    const result = await Cube.find(search).lean();
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

module.exports = {
    getAll,
    getById,
    createCube
}