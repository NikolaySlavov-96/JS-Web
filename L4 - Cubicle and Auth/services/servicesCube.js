const Cube = require('../models/Cube');
const Accessory = require('../models/accessory');

async function getAll(query, fromDificult, toDificult) {
    let result = await Cube.find({}).lean();

    if (query !== '' || fromDificult !== '' || toDificult !== '') {
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

async function addAccessoryForCubes(cubeId, accessoryId) {
    const cubes = await Cube.findById(cubeId).populate('accessories');
    const accessory = await Accessory.findById(accessoryId.accessory).populate('cubes');

    cubes.accessories.push(accessoryId.accessory)
    accessory.cubes.push(cubeId);

    await cubes.save();
    await accessory.save()
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