// Import modules

// Controllers
export const renderLogin = (req, res) => {
    const pageTitle = 'Login';
    res.render('pages/user/login', { pageTitle });
}