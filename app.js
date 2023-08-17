// Import modules
import express from 'express';
import ejsMate from 'ejs-mate';
import path from 'path';
import { fileURLToPath } from 'url';

import { routerHome } from './routes/home.js';
import { routerUser } from './routes/user.js';

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
app.use('/', routerHome);

app.get('/login', routerUser);

app.get('/register', routerUser);

// Listening
app.listen(3000, () => {
    console.log('Listening on port 3000');
});