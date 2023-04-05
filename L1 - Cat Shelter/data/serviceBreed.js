const fs = require("fs");

const breedsData = JSON.parse(fs.readFileSync("./data/breeds.json"));

async function getListBreed() {
  return breedsData;
}

async function getBreedById(id) {
  return breedsData.find((c) => c.id == id);
}

async function createBreed(dataIn) {
    breedsData.push(dataIn);

    await persist();
}

async function deleteBreedById(id) {
    const index = breedsData.find(c => c.id == id);

    breedsData.slice(index, 1);

    await persist();
};

function persist() {
    return new Promise((resolve, reject) => {
        fs.writeFile('./data/breeds.json', 
            JSON.stringify(breedsData, null, 2), 
            (err) => {
                if(err == null) {
                    resolve();
                } else {
                    reject(err);
                }
            });
    });
};

module.exports = {
    getListBreed,
    getBreedById,
    createBreed,
    deleteBreedById
}