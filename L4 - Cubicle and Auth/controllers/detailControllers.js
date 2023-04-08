const detailControler = require("express").Router();
const { getAllAccessory } = require("../services/servicesAccessory");
const { getById } = require("../services/servicesCube");

detailControler.get("/:productId", async (req, res) => {
    const id = req.params.productId;
    const dataProduct = await getById(id);
    const accessory = await getAllAccessory();

    const viewAccessory = accessory.filter(a => dataProduct.accessories.every(r => r._id.toString() !== a._id.toString()));

    res.render("details", {title: 'Cubicle / Attach Accessory', dataProduct, viewAccessory});
});

detailControler.get('/:productId/edit', async (req, res) => {
    const idProdut = req.params.productId;
    const cubeInfor = await getById(idProdut);

    res.render('edit', {
        title: 'Edit Cube Page',
        cubeInfor,
    })
});

detailControler.post('/:productId/edit', (req, res) => {

});

detailControler.get('/:productId/delete', (req, res) => {
    res.render('delete', {
        title: 'Delete Cube Page'
    })
});

detailControler.post('/:productId/delete', (req, res) => {

});

module.exports = detailControler;
