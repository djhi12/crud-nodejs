// models/item.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: String,
    description: String,
    // Add other fields as needed
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
