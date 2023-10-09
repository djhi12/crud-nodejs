// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const itemsRoute = require('./routes/items');
const { swaggerDocs, swaggerUi } = require('./swagger');
const validateItem = require('./utils/validation'); // Import the validation function
const itemController = require('./controllers/itemController'); // Import the item controller

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true, // Recommended for index support
});

const db = mongoose.connection;

db.on('error', (err) => {
    console.error(`MongoDB Connection Error: ${err.message}`);
});

db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.use(express.json());

// Use the items route
app.use('/api/items', itemsRoute);

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Root route
app.get('/', (req, res) => {
    res.send('Hello, this is the root of your API.');
});

// Create a new item with data validation and controller
app.post('/api/items', async (req, res) => {
    // Validate the request data
    if (!validateItem(req.body)) {
        return res.status(400).json({ error: 'Invalid item data' });
    }

    try {
        const newItem = new Item(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ error: 'Unable to create item' });
    }
});

// Update an item by ID with data validation and controller
app.put('/api/items/:id', async (req, res) => {
    // Validate the request data
    if (!validateItem(req.body)) {
        return res.status(400).json({ error: 'Invalid item data' });
    }

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
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
