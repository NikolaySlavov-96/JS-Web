const homeControler = require("express").Router();
const { getList } = require("../models/productService");

homeControler.get("/", async (req, res) => {
  const allCube = await getList();

  res.render("home", {allCube});
});

module.exports = homeControler;
