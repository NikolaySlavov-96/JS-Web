const { getById, addAccessoryForCubes } = require("../services/servicesCube");
const { getAllAccessory } = require("../services/servicesAccessory");

const attachControllers = require("express").Router();

attachControllers.get("/accessory/:productId", async (req, res) => {
    const id = req.params.productId;
    const result = await getById(id);
    const accessory = await getAllAccessory();
    
    const missingAccessory = accessory.filter(a => result.accessories.every(r => r._id.toString() !== a._id.toString()));

    res.render("attach", {title: 'Attach Accessory', result, missingAccessory });
});

attachControllers.post("/accessory/:productId", async (req, res) => {
    const id = req.params.productId;
    const body = req.body;
    await addAccessoryForCubes(id, body);

    //for delete usualu
    const result = await getById(id);
    const accessory = await getAllAccessory();

    res.render("attach", {title: 'Attach Accessory', result, accessory });
});

module.exports = attachControllers;
