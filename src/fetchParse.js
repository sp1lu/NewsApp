// Import modules
import Parser from 'rss-parser';

// Start rss-parser
let parser = new Parser();

// Fetch & parse subreddit
const url = 'https://www.reddit.com/r/chickens/new/.rss';

export async function fetchSubreddit() {
    let feed = await parser.parseURL(url);

    /* console.log(feed.title);

    feed.items.forEach(item => {
        console.log(item.title + ':' + item.link)
    }); */

    /* console.log(feed.items[0]); */

    return feed;
}