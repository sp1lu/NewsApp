// Import modules
import Parser from 'rss-parser';
import Channel from '../models/channel.js';

// Start rss parser
let parser = new Parser();

// Controllers
export const renderDashboard = async (req, res) => {
    const pageTitle = 'Dashboard';

    const channels = await Channel.find();
    const posts = [];
    for (const channel of channels) {
        let url = channel.url;
        let feed = await parser.parseURL(url);
        feed.items.forEach(item => {
            posts.push(item);
        });
    }

    posts.sort(function(a, b) {
        const dateA = new Date(a.isoDate);
        const dateB = new Date(b.isoDate);
        return dateB - dateA;
    });

    res.render('pages/dashboard', { pageTitle, posts });
}