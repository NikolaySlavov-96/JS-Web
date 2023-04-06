const detailControler = require("express").Router();
const { getById } = require("../services/servicesCube");

detailControler.get("/:productId", async (req, res) => {
    const id = req.params.productId;
    const dataProduct = await getById(id);

    res.render("details", {title: 'Cubicle / Attach Accessory', dataProduct});
});

module.exports = detailControler;
