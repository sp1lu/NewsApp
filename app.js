// Import modules
import express from 'express';
import path from 'path';
import Parser from 'rss-parser';
import { fileURLToPath } from 'url';

// Start express app
const app = express();
let parser = new Parser();

// Adjust path as modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

const array = ['pippo', 'topolino'];

// Routing
app.get('/', (req, res) => {
    res.render('pages/home', { array });
});

// Listening
app.listen(3000, () => {
    console.log('Listening on port 3000');
});

// Fetch & parse subreddit
const url = 'https://www.reddit.com/r/chickens/new/.rss';

async function fetchSubreddit() {
    let feed = await parser.parseURL(url);

    /* console.log(feed.title);

    feed.items.forEach(item => {
        console.log(item.title + ':' + item.link)
    }); */

    /* console.log(feed); */
}

fetchSubreddit();