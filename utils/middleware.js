// Import modules

// Check if a user is logged in or not
export const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;

        req.flash('error', 'You must be signed in to access this page');
        return res.redirect('/login');
    }

    next();
}