// Import modules
import engine from 'ejs-mate';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import { fetchSubreddit } from './src/fetchParse.js';

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

// Fetch data
const posts = await fetchSubreddit();

// Routing
app.get('/', (req, res) => {
    res.render('pages/home', { posts });
});

app.get('/test', (req, res) => {
    res.render('pages/test');
});

app.get('/boh', (req, res) => {
    res.render('pages/boh', { stylesheet: '/boh.css' })
});

app.get('/pippo', (req, res) => {
    res.render('pages/pippo', { stylesheet: '/style.css' });
});

// Listening
app.listen(3000, () => {
    console.log('Listening on port 3000');
});