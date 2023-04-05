const homeControler = require("express").Router();
const { getList } = require("../models/productService");

homeControler.get("/", async (req, res) => {
  const query = req.query.search || "";
  const fromDificult = Number(req.query.from) || 1;
  const toDificult = Number(req.query.to) || 100;

  const allCube = await getList(query, fromDificult, toDificult);

  res.render("home", { allCube, query, fromDificult, toDificult });
});

module.exports = homeControler;
