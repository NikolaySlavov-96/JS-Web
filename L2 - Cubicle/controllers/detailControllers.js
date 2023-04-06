const detailControler = require("express").Router();
const { getById } = require("../models/productService");

detailControler.get("/:productId", async (req, res) => {
  const id = req.params.productId;
  const dataProduct = await getById(id);

  res.render("details", { title: 'Cubicle', dataProduct });
});

module.exports = detailControler;
