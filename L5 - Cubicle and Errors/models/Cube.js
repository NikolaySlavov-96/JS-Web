const { model, Schema, Types } = require("mongoose");

const cubeSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: String,
    difficultyLevel: { type: Number, required: true },
    accessories: { type: [Types.ObjectId], default: [], ref: "Accessory" },
    owner: { type: [Types.ObjectId], default: [], ref: 'User'}
});

const Cube = model("Cube", cubeSchema);

module.exports = Cube;
