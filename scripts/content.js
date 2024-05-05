const regex = /^https:\/\/wrskn\.io\/(\d{3})\/.+\/(\d{3}).*$/;

function checkForSelectedCard()
{
    var selectedCard = document.getElementsByClassName("game-selected-card--img");

    if (selectedCard == null || selectedCard.length == 0) {
        setTimeout(checkForSelectedCard, 100);
        return;
    }

    var cardImage = selectedCard[0].src;
    var matches = cardImage.match(regex);
    if (matches.length < 3) {
        setTimeout(checkForSelectedCard, 100);
        return;
    }

    var setId = matches[1];
    var cardId = matches[2];

    console.log(`SetID: ${setId}, Card ID: ${cardId}.`);

    setVariable('8KVnzBi36AOvrpJb', setId);
    setVariable('uxEnFDO1oA8yt44U', cardId);

    setTimeout(checkForSelectedCard, 1000); // Check the DOM again within a second.
}

function setVariable(key, value) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: value })
    };
    fetch(`http://localhost:7777/aitum/state/${key}`, requestOptions)
        .then(response => response.json());
}

(checkForSelectedCard());