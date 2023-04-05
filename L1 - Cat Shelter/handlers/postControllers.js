const { IncomingForm } = require("formidable");
const { createCat } = require("../data/serviceCats");
const { createBreed: breedModul } = require("../data/serviceBreed");

function createBreed(req, res) {
  const form = new IncomingForm();

  form.parse(req, async (err, fields) => {
    const item = {
      id: "ads" + ("0000" + ((Math.random() * 9999) | 0)).slice(-4),
      name: fields.breed,
      value: fields.breed,
    };

    await breedModul(item)

    res.writeHead(301, ["Location", "/"]);

    res.end();
  });
}

function createCats(req, res) {
  const form = new IncomingForm();

  form.parse(req, async (err, fields) => {
    const item = {
      id: "ads" + ("0000" + ((Math.random() * 9999) | 0)).slice(-4),
      name: fields.name,
      description: fields.description,
      breed: fields.breed,
    };

    await createCat(item);

    res.writeHead(301, ["Location", "/"]);
    res.end();
  });
}

module.exports = {
  createBreed,
  createCats,
};
