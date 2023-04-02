const { html } = require("./util");
const cats = require("../data/cats");

function homeControler(req, res) {
  res.write(
    html(`<section class="cats">
    <ul>
        ${cats.map(
          (i) => `<li>
        <img src="${i.img}" alt="Black Cat">
        <h3></h3>
        <p><span>Breed: </span>${i.breed}</p>
        <p><span>Description: </span>${i.description}</p>
        <ul class="buttons">
            <li class="btn edit"><a href="">Change Info</a></li>
            <li class="btn delete"><a href="">New Home</a></li>
        </ul>
    </li>`
        )}
    </ul>
    </section>`)
  );
  res.end();
}

module.exports = {
  homeControler,
};
