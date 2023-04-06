const detailControler = require("express").Router();
const { getById } = require("../services/servicesCube");

detailControler.get("/:productId", async (req, res) => {
  const id = req.params.productId;
  const dataProduct = await getById(id);
  console.log(dataProduct)

  res.render("details", dataProduct);
});

module.exports = detailControler;
