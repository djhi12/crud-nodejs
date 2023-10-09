const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const itemsRoute = require('./routes/items');
const authRoutes = require('./routes/auth');
const { swaggerDocs, swaggerUi } = require('./swagger');
const validateItem = require('./utils/validation');
const Item = require('./models/item');
const User = require('./models/user');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
    console.error(`MongoDB Connection Error: ${err.message}`);
});

db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.use(express.json());
app.use(cors());

// Passport Configuration (OAuth setup)
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Passport OAuth Configuration (Replace with your OAuth strategy setup)
// passport.use(yourOAuthStrategy);

// Serialize and deserialize user (Replace with your User model logic)
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

app.use('/api/items', itemsRoute);
app.use('/api/auth', authRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/', (req, res) => {
    res.send('Hello, this is the root of your API.');
});

app.post('/api/items', async (req, res) => {
    try {
        // Validate the request data
        if (!validateItem(req.body)) {
            return res.status(400).json({ error: 'Invalid item data' });
        }

        const newItem = new Item(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Unable to create item' });
    }
});

app.put('/api/items/:id', async (req, res) => {
    try {
        // Validate the request data
        if (!validateItem(req.body)) {
            return res.status(400).json({ error: 'Invalid item data' });
        }

        const { id } = req.params;
        const updatedItem = await Item.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedItem) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.status(200).json(updatedItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Unable to update item' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
