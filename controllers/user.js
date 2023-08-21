// Import modules
import User from '../models/user.js';

// Controllers
export const renderLogin = (req, res) => {
    const pageTitle = 'Login';
    res.render('pages/user/login', { pageTitle });
}

export const loginUser = (req, res) => {
    const redirectUrl = res.locals.returnTo || '/dashboard';
    req.flash('success', 'Welcome back!');
    res.redirect(redirectUrl);
}

export const renderRegister = (req, res) => {
    const pageTitle = 'Register';
    res.render('pages/user/register', { pageTitle });
}

export const registerUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);

        req.login(registeredUser, err => {
            if (err) {
                return next(err);
            }

            res.redirect('/dashboard');
        });

    } catch (error) {
        res.redirect('/register');
    }
}

export const logoutUser =  async (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }

        req.flash('success', 'Succesfully logged out')
        res.redirect('/');
    });
}