import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

// Import modules
import express from 'express';
import ejsMate from 'ejs-mate';
import path from 'path';
import { fileURLToPath } from 'url';

import ExpressError from './utils/ExpressError.js';

import mongoose from 'mongoose';
import User from './models/user.js';

import helmet from 'helmet';

import MongoStore from 'connect-mongo';

import session from 'express-session';
import flash from 'connect-flash';

import passport from 'passport';
import LocalStrategy from 'passport-local';

import { routerHome } from './routes/home.js';
import { routerDashboard } from './routes/dashboard.js';
import { routerUser } from './routes/user.js';
import { routerOnBoard } from './routes/onboard.js';
import { routerPreferences } from './routes/preferences.js';

// Connect Mongoose to MongoDB and handle success or errors
const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/newsapp';
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
app.use(express.static(path.join(__dirname, 'public')));

// Session
const secret = process.env.SECRET || 'notagreatsecret';
const store = MongoStore.create({ // Store session in database instead that in memory
    mongoUrl: dbUrl,
    touchAfter: 24 * 3600, // Update user session only once in 24 hours if not necessary (in seconds not ms)
    crypto: {
        secret: secret,
    }
});

store.on('error', function(e) {
    console.log('SESSION STORE', e);
});

const sessionConfig = {
    store: store,
    name: 'session',
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig));

// Flash messages
app.use(flash());

// Authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Locals middlewares
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// Routing
app.get('/', routerHome);
app.use('/', routerUser); // Middleware handling login and register user;
app.use('/dashboard', routerDashboard);
app.use('/onboard', routerOnBoard);
app.use('/preferences', routerPreferences);

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