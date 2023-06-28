const newsFeed = document.querySelector('.newsfeed');

export const createArticleCards = function (items, index) {
    const articleCard = document.createElement('article');
    const articleTitle = document.createElement('h2');
    const articleLink = document.createElement('a');

    articleTitle.textContent = items[index].querySelector('title').innerHTML.replace('<![CDATA[', '').replace(']]>', '');

    const stringifiedLink = (items[index].querySelector('link').innerHTML).toString();

    if (stringifiedLink.includes('<![CDATA[')) {
        const adjustedLink = stringifiedLink.replace('<![CDATA[', '').replace(']]>', '');
        articleLink.href = adjustedLink;

    } else {
        articleLink.href = stringifiedLink;
    }

    articleLink.textContent = 'Read more';
    articleLink.setAttribute('target', '_blank');

    articleCard.append(articleTitle);
    articleCard.append(articleLink);
    newsFeed.append(articleCard);
}