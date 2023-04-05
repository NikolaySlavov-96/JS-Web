const homeControler = require("express").Router();
const { getList } = require("../models/productService");

homeControler.get("/", async (req, res) => {
  const query = req.query.search || "";
  const fromDificult = req.query.from || '';
  const toDificult = req.query.to || '';

  const allCube = await getList(query, fromDificult, toDificult);

  res.render("home", { allCube });
});

module.exports = homeControler;
