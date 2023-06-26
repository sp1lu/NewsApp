// Import json data
import data from './config.json' assert { type: 'json' };
console.log(data);

// Declare DOM nodes
const dialogNetworkList = document.querySelector('.dialog-network-list');
const dialogNetworkForm = document.querySelector('#choose-network');

// Create cards
const createNetworkCard = function () {
    const card = document.createElement('div');
    card.classList.add('dialog-network-card');
    dialogNetworkList.append(card);

    return card;
}


for (let i = 0; i < data.length; i++) {
    let card = createNetworkCard();

    const networkLogo = document.createElement('img');
    networkLogo.classList.add('network-logo');
    networkLogo.src = data[i].logo;
    card.append(networkLogo);

    const networkName = document.createElement('p');
    networkName.classList.add('network-name');
    networkName.innerText = data[i].name;
    card.append(networkName);

    const networkCheckbox = document.createElement('input');
    networkCheckbox.setAttribute('type', 'checkbox');
    networkCheckbox.setAttribute('id', `${data[i].name.split(' ').join('')}`);
    networkCheckbox.setAttribute('name', `${data[i].name.split(' ').join('')}`);
    card.append(networkCheckbox);
}

// Local storage
dialogNetworkForm.addEventListener('submit', function () {
    console.log('CLICKED');

    let userArr = ['davide', 'rivolta']
    localStorage.setItem('user', JSON.stringify(userArr));
});

if (localStorage.getItem('user') !== null) {
    console.log("Sei già stato qui!");
}