// Import modules
import Parser from 'rss-parser';
import Channel from '../models/channel.js';

// Start rss parser
let parser = new Parser();

// Controllers
export const renderDashboard = async (req, res) => {
    const pageTitle = 'Dashboard';

    const channel = await Channel.findOne({name: 'Chickens'});

    const url = channel.url;
    async function fetchSubreddit() {
        let feed = await parser.parseURL(url);

        let post = feed.items[0];
        return post;
    }

    let post = await fetchSubreddit();
    console.log(post);

    res.render('pages/dashboard', { pageTitle, post });
}