export function resetFeed() {
    if (localStorage.getItem('selectedFeeds') !== null) {
        localStorage.removeItem("selectedFeeds");
    }
    location.reload();
}