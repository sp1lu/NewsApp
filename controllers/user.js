// Import modules

// Controllers
export const renderLogin = (req, res) => {
    const pageTitle = 'Login';
    res.render('pages/user/login', { pageTitle });
}

export const renderRegister = (req, res) => {
    const pageTitle = 'Register';
    res.render('pages/user/register', { pageTitle });
}