const { model, Schema, Types } = require("mongoose");

const cubeSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, minlength: 4 },
    difficultyLevel: { type: Number, required: true },
    accessories: { type: [Types.ObjectId], default: [], ref: "Accessory" },
    owner: { type: Types.ObjectId, ref: 'User' }
});

const Cube = model("Cube", cubeSchema);

module.exports = Cube;
