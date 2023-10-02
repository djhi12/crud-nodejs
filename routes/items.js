// routes/items.js
const express = require('express');
const router = express.Router();
const Item = require('../models/item');

// GET all items
router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// POST a new item
router.post('/', async (req, res) => {
    try {
        const newItem = new Item(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// PUT (update) an item by ID
router.put('/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        const updatedItem = await Item.findByIdAndUpdate(itemId, req.body, {
            new: true, // Return the updated item
        });

        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.json(updatedItem);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// DELETE an item by ID
router.delete('/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        const deletedItem = await Item.findByIdAndRemove(itemId);

        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.json({ message: 'Item deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
