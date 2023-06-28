// Import json data
import data from '../../config.json' assert { type: 'json' };

// Declare DOM nodes
const dialogNetworkList = document.querySelector('.dialog-network-list');

// Create network cards in dialog feed choice
const createNetworkCard = function () {
    const card = document.createElement('div');
    card.classList.add('dialog-network-card');
    dialogNetworkList.append(card);

    return card;
}

const printNetworkLabel = function (networkCard, item) {
    const networkLabel = document.createElement('label');
    networkLabel.classList.add('network-name');
    networkLabel.setAttribute('for', `${item.name.split(' ').join('')}`);
    /* networkLabel.innerText = item.name; */
    networkCard.append(networkLabel);

    return networkLabel;
}

const printNetworkLogo = function (networkLabel, item) {
    const networkLogo = document.createElement('img');
    networkLogo.classList.add('network-logo');
    networkLogo.src = item.logo;
    networkLabel.append(networkLogo);
}

const printNetworkCheckbox = function (networkLabel, item) {
    const networkCheckbox = document.createElement('input');
    networkCheckbox.setAttribute('type', 'checkbox');
    networkCheckbox.setAttribute('id', `${item.name.split(' ').join('')}`);
    networkCheckbox.setAttribute('name', `singleNetwork`);
    networkCheckbox.setAttribute('value', `${item.name}`);
    networkCheckbox.setAttribute('data-url', `${item.url}`);
    networkCheckbox.setAttribute('data-logo', `${item.logo}`);
    networkCheckbox.setAttribute('data-website', `${item.website}`);
    networkLabel.append(networkCheckbox);
}

export const generateNetworkList = () => {
    data.forEach(
        function (item) {
            let card = createNetworkCard();
            let label = printNetworkLabel(card, item);
            printNetworkLogo(label, item);
            printNetworkCheckbox(label, item);
        }
    )
}