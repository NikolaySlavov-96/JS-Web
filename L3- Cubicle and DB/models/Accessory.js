const { model, Schema, Types } = require("mongoose");

const accessorySchema = new Schema({
    name: {type: String, required: true},
    imageUrl: String,
    description: {type: String, required: true},
    cubes: {type: [Types.ObjectId], default: []}
});

const Accessory = model('Accessory', accessorySchema);

module.exports = Accessory;