// Import modules
import { generateNetworkList } from "./dialog/feedChoice.js";
import { fetchAllFeeds } from "./fetchFeed/fetchAllFeeds.js";
import { resetFeed } from "./resetFeed.js";

// Create cards
generateNetworkList();

// Declare DOM nodes
const dialog = document.querySelector('dialog');
const dialogNetworkForm = document.querySelector('#choose-network');
const dialogCheckboxes = document.querySelectorAll('input[type="checkbox"]');
const dialogBtn = document.querySelector('#submitBtn');
const resetFeedBtn = document.querySelector('#reset-feed');
const optionsBtn = document.querySelector('.options-button');

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
            let obj = {
                name: item.id,
                url: `${item.dataset.url}`,
                logo: `${item.dataset.logo}`,
                website: `${item.dataset.website}`
            }

            selectedNetworks.push(obj);
        }
    })

    localStorage.setItem('selectedFeeds', JSON.stringify(selectedNetworks));

    let selectedFeeds = JSON.parse(localStorage.getItem('selectedFeeds'));
    console.log(selectedFeeds);

    if (document.querySelector('article')) {
        console.log('c\'erano cose e le ho cancellate');
        document.querySelectorAll('article').remove();
    } else {
        console.log('non c\'è nulla');
    }


    fetchAllFeeds();

});

let selectedFeeds = JSON.parse(localStorage.getItem('selectedFeeds'));

// Fetch data or no depending on localstorage content
if (localStorage.getItem('selectedFeeds') !== null) {
    console.log('I know you');

    dialog.close();

    fetchAllFeeds();

} else {
    console.log('First time?');

    dialog.showModal();

    dialog.addEventListener('cancel', event => {
        event.preventDefault();
    })
}

// Reset feed button
resetFeedBtn.addEventListener('click', resetFeed);

// Options button
optionsBtn.addEventListener('click', event => {
    dialog.showModal();

    // Check a checkbox if was already choosen in the past
    let feedsId = [];

    for (const feed of selectedFeeds) {
        const values = Object.values(feed);
        feedsId.push(values[0]);
    }

    const selectForm = document.forms['choose-network'];
    let allNetworks = selectForm.elements['singleNetwork'];

    allNetworks.forEach(item => {
        for (let i = 0; i < feedsId.length; i++) {
            if (item.id == feedsId[i]) {
                item.checked = true;
            }
        }
    })

});