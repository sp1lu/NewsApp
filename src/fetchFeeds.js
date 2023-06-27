const newsFeed = document.querySelector('.newsfeed');

const createArticleCards = function (array, index) {
    const articleCard = document.createElement('article');
    const articleTitle = document.createElement('h2');
    const articleLink = document.createElement('a');

    articleTitle.textContent = array[index].querySelector('title').innerHTML.replace('<![CDATA[', '').replace(']]>', '');
    articleLink.href = array[index].querySelector('link').innerHTML;
    articleLink.textContent = 'Read more';
    articleLink.setAttribute('target', '_blank');

    articleCard.append(articleTitle);
    articleCard.append(articleLink);
    newsFeed.append(articleCard);
}

function fetchSingleFeed(url) {
    fetch(url)
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            const items = data.querySelectorAll('item');

            for (let i = 0; i < 6; i++) {
                createArticleCards(items, i);
            }
        });
}

export function fetchAllFeeds() {

    if (localStorage.getItem('selectedFeeds') !== null) {
        const selectedFeedsUrl = JSON.parse(localStorage.getItem('selectedFeeds'));

        selectedFeedsUrl.forEach(
            url => fetchSingleFeed(url)
        );
    }
}