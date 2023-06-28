import { fetchSingleFeed } from './fetchSingleFeed.js';

export function fetchAllFeeds() {

    if (localStorage.getItem('selectedFeeds') !== null) {
        const selectedFeeds = JSON.parse(localStorage.getItem('selectedFeeds'));
        const selectedFeedsUrl = [];

        for (let i = 0; i < selectedFeeds.length; i++) {
            let url = selectedFeeds[i].url;
            selectedFeedsUrl.push(url)
        }

        selectedFeedsUrl.forEach(url => {
            fetchSingleFeed(url)
        })

        /* for (let i = 0; i < selectedFeedsUrl.length; i++) {
            fetchSingleFeed(selectedFeedsUrl[i]);

            console.log(selectedFeeds[i].logo);
        } */
    }
}