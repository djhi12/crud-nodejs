// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const itemsRoute = require('./routes/items');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(express.json());

// Use the items route
app.use('/api/items', itemsRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
