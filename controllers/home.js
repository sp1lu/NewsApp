// Import modules

// Controllers
export const renderHome = (req, res) => {
    const pageTitle = 'Homepage';
    res.render('pages/home', { pageTitle });
}