// Import modules
import Parser from 'rss-parser';
import Channel from '../models/channel.js';
import User from '../models/user.js';

// Start rss parser
let parser = new Parser();

// Controllers
export const renderDashboard = async (req, res) => {
    const pageTitle = 'Dashboard';

    const user = await User.findOne({ username: 'spilu' });

    const channels = [];
    user.channels.forEach(element => {
        channels.push(element);
    });

    user.customChannels.forEach(element => {
        channels.push(element);
    });

    const posts = [];
    for (const channel of channels) {
        let feed = await parser.parseURL(channel.url);
        feed.items.forEach(item => {
            posts.push(item);
        })
    }

    posts.sort(function (a, b) {
        const dateA = new Date(a.isoDate);
        const dateB = new Date(b.isoDate);
        return dateB - dateA;
    });

    const compareDate = (post) => {
        let currentDate = new Date();
        let postDate = new Date(Date.parse(post.isoDate));
        let minutes = (currentDate - postDate)/60e3;
        let hours = minutes / 60;

        if (hours < 1) {
            return `${Math.round(minutes)} minutes ago`
        } else if (hours > 24) {
            return `More than 24 hours ago`
        } else {
            return `${Math.round(hours)} hours ago`
        }
    }

    const getShortUrl = (post) => {
        let cutLeft = post.link.substring(post.link.indexOf(".") + 1);
        let shortUrl = cutLeft.substring(0, cutLeft.indexOf("/"));
        return shortUrl;
    }

    res.render('pages/dashboard', { pageTitle, posts, compareDate, getShortUrl });
}