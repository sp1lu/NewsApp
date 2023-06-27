// Import modules
import { generateNetworkList } from "./feedChoice.js";
import { fetchAllFeeds } from "./fetchFeeds.js";
import { resetFeed } from "./resetFeed.js";

// Declare DOM nodes
const dialog = document.querySelector('dialog');
const dialogNetworkForm = document.querySelector('#choose-network');
const dialogCheckboxes = document.querySelectorAll('input[type="checkbox"]');
const dialogBtn = document.querySelector('#submitBtn');
const resetFeedBtn = document.querySelector('#reset-feed');

// Create cards
generateNetworkList;

// Enable submit button if at least one checkbox is checked
dialogBtn.disabled = true;

dialogCheckboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
        if (checkbox.checked === false) {
            dialogBtn.disabled = true;
        } else {
            dialogBtn.disabled = false;
        }
    })
})

// Form behaviour
dialogNetworkForm.addEventListener('submit', function () {
    const selectForm = document.forms['choose-network'];
    let allNetworks = selectForm.elements['singleNetwork'];
    let selectedNetworks = [];

    allNetworks.forEach(item => {
        if (item.checked) {
            selectedNetworks.push(item.dataset.url);
        }
    })

    localStorage.setItem('selectedFeeds', JSON.stringify(selectedNetworks));

    fetchAllFeeds();

});

// Fetch data or no depending on localstorage content
if (localStorage.getItem('selectedFeeds') !== null) {

    console.log('I know you');

    dialog.remove();
    fetchAllFeeds();

} else {
    console.log('First time?');

    dialog.showModal();
}

// Reset feed button
resetFeedBtn.addEventListener('click', resetFeed);