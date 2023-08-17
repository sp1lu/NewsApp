// Import modules
import express from 'express';
import ejsMate from 'ejs-mate';
import path from 'path';
import { fileURLToPath } from 'url';

import mongoose from 'mongoose';

import { routerHome } from './routes/home.js';
import { routerDashboard } from './routes/dashboard.js';
import { routerUser } from './routes/user.js';

// Connect Mongoose to MongoDB and handle success or errors
const dbUrl = 'mongodb://127.0.0.1:27017/newsapp';
mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

// Start express app
const app = express();

// Adjust path as modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set layouts
app.engine('ejs', ejsMate);

// Set views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// Routing
app.get('/', routerHome);

app.get('/dashboard', routerDashboard);

app.get('/login', routerUser);

app.get('/register', routerUser);

// Listening
app.listen(3000, () => {
    console.log('Listening on port 3000');
});