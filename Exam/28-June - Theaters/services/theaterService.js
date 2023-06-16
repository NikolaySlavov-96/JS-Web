const TheaterModel = require("../models/TheaterModel");


async function getAll() {
    return TheaterModel.find({}).lean();
}

async function getById(id) {
    return TheaterModel.findById(id).lean();
}

async function createTheater(data) {
    
}

async function updateTheater(id, data) {

}

async function deleteTheater(id) {

}

module.exports = {
    getAll,
    getById,
    createTheater,
    updateTheater,
    deleteTheater
}