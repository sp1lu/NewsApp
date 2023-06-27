function fetchFeed(url) {
    fetch(url)
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {


            const items = data.querySelectorAll('item');

            for (let i = 0; i < 6; i++) {
                const articleCard = document.createElement('article');
                const articleTitle = document.createElement('h2');
                /*  const articleExcerpt = document.createElement('p'); */
                const articleLink = document.createElement('a');

                const articleSource = document.createElement('p');



                articleTitle.textContent = items[i].querySelector('title').innerHTML.replace('<![CDATA[', '').replace(']]>', '');
                /* articleExcerpt.textContent = items[i].querySelector('description').innerHTML.replace('<![CDATA[', '').replace(']]>', ''); */
                articleLink.href = items[i].querySelector('link').innerHTML;
                articleLink.textContent = 'Read more';
                articleLink.setAttribute('target', '_blank');

                articleSource.textContent = `source: ${items[i].querySelector('category').getAttribute('domain').replace('https://www.', '')}`;
                articleSource.setAttribute('id', 'article-src');
                articleCard.append(articleTitle);
                /* articleCard.append(articleExcerpt); */
                articleCard.append(articleLink);
                articleCard.append(articleSource);

                newsFeed.append(articleCard);

            }
        });
}

/* console.log(data); */
const newsFeed = document.querySelector('.newsfeed');

export function doThings() {

    if (localStorage.getItem('selectedFeeds') !== null) {
        const selectedFeedsUrl = JSON.parse(localStorage.getItem('selectedFeeds'));

        selectedFeedsUrl.forEach(
            url => fetchFeed(url)
        );
    }
}