// Import modules
import engine from 'ejs-mate';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import { fetchSubreddit } from './src/fetchParse.js';

import AppError from './appError.js';

// Start express app
const app = express();

// Adjust path as modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Set layouts
app.engine('ejs', engine);

// Set views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// Routing
app.get('/', async (req, res) => {
    const posts = await fetchSubreddit(); // Fetch data

    res.render('pages/home', { posts });
});

app.get('/test', (req, res) => {
    res.render('pages/test');
});

app.get('/boh', (req, res) => {
    res.render('pages/boh', { stylesheet: '/boh.css' })
});

app.get('/pippo', (req, res) => {
    res.render('pages/pippo', { stylesheet: '/boh.css' });
});

app.get('/error', (req, res) => {
    throw new AppError('Che è \'sta cafonata?', 418);
});

/* app.use((err, req, res, next) => {
    console.log('***********************');
    console.log('ERROR');
    console.log('***********************');
    next(err);
}); */

app.use((err, req, res, next) => {
    const { status = 500, message = 'Something went wrong!' } = err;
    res.status(status).send(message);
});

// Listening
app.listen(3000, () => {
    console.log('Listening on port 3000');
});