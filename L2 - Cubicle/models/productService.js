const fs = require('fs');

const fileName = './models/database.json'
const data = JSON.parse(fs.readFileSync(fileName));

async function getList(query, fromDificult, toDificult) {
    
    return data.filter(q => q.name.toLowerCase().includes(query.toLowerCase()))
                .filter(q => q.difficultyLevel <= toDificult && q.difficultyLevel >= fromDificult);
}

async function getById(id) {
    return data.find(p => p.id == id);
}

async function create(name, description, imageUrl, difficultyLevel) {
    const id = 'ads-' + ('0000' + (Math.random() * 99999 | 0)).slice(4);
    data.push({
        id,
        name,
        description,
        imageUrl,
        difficultyLevel
    });

    await persist();
};

async function deleteById(id) {
    const index = data.find(p => p.id == id);
    data.splice(index, 1);

    await persist();
}

async function persist() {
    return new Promise((resolve, reject) => {
        fs.writeFile(fileName, 
            JSON.stringify(data, null, 2), 
            (err) => {
                if(err == null) {
                    resolve()
                } else {
                    reject(err);
                }
            });
    })
};

module.exports = {
    getList,
    getById,
    create,
    deleteById
}