import { createArticleCards } from "./createFeedCard.js";

export function fetchSingleFeed(url) {
    fetch(url)
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            const items = data.querySelectorAll('item');

            /* console.log(data); */

            for (let i = 0; i < 6; i++) {
                createArticleCards(items, i);
            }
        });
}