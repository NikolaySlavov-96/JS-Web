const fs = require("fs");

const catsData = JSON.parse(fs.readFileSync("./data/cats.json"));

async function getListCat() {
  return catsData;
}

async function getCatsById(id) {
  return catsData.find((c) => c.id == id);
}

async function createCat(dataIn) {
    catsData.push(dataIn);

    await persist();
}

async function deleteCatsById(id) {
    const index = catsData.find(c => c.id == id);

    catsData.slice(index, 1);

    await persist();
};

function persist() {
    return new Promise((resolve, reject) => {
        fs.writeFile('./data/cats.json', 
            JSON.stringify(catsData, null, 2), 
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
    getListCat,
    getCatsById,
    createCat,
    deleteCatsById
}