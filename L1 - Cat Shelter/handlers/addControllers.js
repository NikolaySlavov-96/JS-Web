const { html } = require('./util');
const breed = require('../data/breeds');

function addBreed(req, res) {
    res.write(html(`<form action="/cats/addBreed" method="POST" class="cat-form" enctype="multipart/form-data">
    <h2>Add Cat Breed</h2>
    <label for="breed-name">Breed Name</label>
    <input name="breed" type="text" id="breed-name">
    <button type="submit">Add Breed</button>
</form>`));
    res.end();
}

function addCat(req, res) {
    res.write(html(`<form action="/cats/addCat" method="POST" class="cat-form" enctype="multipart/form-data">
    <h2>Add Cat</h2>
    <label for="name">Name</label>
    <input name="name" type="text" id="name">
    <label for="description">Description</label>
    <textarea name="description" id="description"></textarea>
    <label for="image">Image</label>
    <input name="upload" type="file" id="image">
    <label for="group">Breed</label>
    <select name="breed" id="group">
        ${breed.map(b => `<option value="${b.value}">${b.name}</option>`)}
    </select>
    <button type="submit">Add Cat</button>
</form>`));
    res.end()
}; 


module.exports = {
    addBreed,
    addCat
}