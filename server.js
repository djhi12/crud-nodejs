// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const itemsRoute = require('./routes/items');
const { swaggerDocs, swaggerUi } = require('./swagger');

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

app.get('/', (req, res) => {
    res.send('Hello, this is the root of your API.');
});
//
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
