// Import modules
import express from 'express';
import ejsMate from 'ejs-mate';
import path from 'path';
import { fileURLToPath } from 'url';

import ExpressError from './utils/ExpressError.js';

import mongoose from 'mongoose';
import User from './models/user.js';

import session from 'express-session';

import passport from 'passport';
import LocalStrategy from 'passport-local';

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

// Middleware
app.use(express.urlencoded({ extended: true }));

// Session
const sessionConfig = {
    name: 'session',
    secret: 'notagreatsecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig));

// Authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routing
app.get('/', routerHome);

app.use('/', routerUser); // Middleware handling login and register user;

app.get('/dashboard', routerDashboard);

// Errors
app.all('*', (req, res, next) => {
    next(new ExpressError('Page not found', 404));
});

app.use((err, req, res, next) => {
    const pageTitle = 'Error';
    const { statusCode = 500 } = err;
    if (!err.message) {
        err.message = 'Something went wrong!'
    }
    res.status(statusCode).render('pages/errors', { pageTitle, err });
});

// Listening
app.listen(3000, () => {
    console.log('Listening on port 3000');
});