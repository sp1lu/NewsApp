// Import modules
import { generateNetworkList } from "./feedChoice.js";
import { doThings } from "./fetchFeeds.js";
import { resetFeed } from "./resetFeed.js";

// Declare DOM nodes
const dialog = document.querySelector('dialog');
const dialogNetworkForm = document.querySelector('#choose-network');
const dialogCheckboxes = document.querySelectorAll('input[type="checkbox"]');
const dialogBtn = document.querySelector('#submitBtn');
const resetFeedBtn = document.querySelector('#reset-feed');

// Show dialog
dialog.showModal();

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

    console.log(selectedNetworks);
    localStorage.setItem('selectedFeeds', JSON.stringify(selectedNetworks));

    doThings();

});

// Local storage
if (localStorage.getItem('selectedFeeds') !== null) {

    console.log('I know you');

    dialog.remove();

} else {
    console.log('First time?');
}

// Reset feed
resetFeedBtn.addEventListener('click', resetFeed);

// Fetch data
/* fetchFeed(); */
doThings();