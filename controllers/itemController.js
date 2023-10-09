// Import the Item model
const Item = require('../model/item');

// Controller for handling CRUD operations
const itemController = {
    // Create a new item
    createItem: async (req, res) => {
        try {
            const newItem = new Item(req.body);
            await newItem.save();
            res.status(201).json(newItem);
        } catch (error) {
            res.status(500).json({ error: 'Unable to create item' });
        }
    },

    // Get all items
    getAllItems: async (req, res) => {
        try {
            const items = await Item.find();
            res.status(200).json(items);
        } catch (error) {
            res.status(500).json({ error: 'Unable to fetch items' });
        }
    },

    // Update an item by ID
    updateItem: async (req, res) => {
        const { id } = req.params;
        try {
            const updatedItem = await Item.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedItem) {
                return res.status(404).json({ error: 'Item not found' });
            }
            res.status(200).json(updatedItem);
        } catch (error) {
            res.status(500).json({ error: 'Unable to update item' });
        }
    },

    // Delete an item by ID
    deleteItem: async (req, res) => {
        const { id } = req.params;
        try {
            const deletedItem = await Item.findByIdAndRemove(id);
            if (!deletedItem) {
                return res.status(404).json({ error: 'Item not found' });
            }
            res.status(204).end(); // No content
        } catch (error) {
            res.status(500).json({ error: 'Unable to delete item' });
        }
    },
};

module.exports = itemController;
