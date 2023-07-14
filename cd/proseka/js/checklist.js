function gID(sID) {
  return document.getElementById(sID);
}

function cE(sName) {
  return document.createElement(sName);
}

function cT(sD) {
  return document.createTextNode(sD);
}

function sC(oID, cN) {
  oID.setAttribute('class', cN, 0);
  oID.className = cN;
}

let cardsArr = [];
let cardsMatch = [];
let cdTitleArr = [];

Papa.parse("./csv/cd_checklist.csv", {
  download: true,
  complete: function(results) {
    for (var i = 1; i < results.data.length; i++) {
      cardsArr.push(parseInt(results.data[i][0]));
      cdTitleArr.push(results.data[i][4]);
    }
  }
});

async function startup() {
  const loader = document.querySelector('#loader');

  loader.style.display = 'block';
  await cardData();
  loader.style.display = 'none';

  for (var i = 0; i < cardsArr.length; i++) {
    var card = cardsArr[i];
    var cdTitle = cdTitleArr[i];

    var grid = gID('proseka-cd');

    var cardLink = cE('a');
    grid.appendChild(cardLink);
    //cardLink.setAttribute('href', 'https://sekai.best/card/' + card[0]);

    var cardBody = cE('div');
    cardLink.appendChild(cardBody);
    cardBody.id = 'card' + (card);
    cardBody.className = 'card-body card-proseka active-card';

    var cardImg = cE('img');
    cardBody.appendChild(cardImg);
    cardImg.className = 'card-bg';
    cardImg.setAttribute('src', 'i/' + card + '.jpg');

    var cardFade = cE('div');
    cardFade.id = "cover" + card;
    cardFade.className = 'card-cover card-fade';
    cardFade.dataset.index = card;
    cardFade.title = cdTitle;
    console.log(cdTitle);
    cardBody.appendChild(cardFade);

    cardBody.addEventListener('click', function(event) {
      let currentCard = event.target.dataset.index;
      const classes = event.target.classList;

      if (classes.contains("card-fade")) {
        classes.toggle("card-fade");

        cardsMatch.push(parseInt(currentCard));

      } else {
        classes.toggle("card-fade");

        var filteredArray = cardsMatch.filter(function(e) { return e !== parseInt(currentCard) })
        cardsMatch = filteredArray;
      }

      localStorage.setItem('prskcd', JSON.stringify(cardsMatch));

    });
  }

  var savedCards = JSON.parse(localStorage.getItem('prskcd'));
  console.log(savedCards);
  for (var i = 0; i < savedCards.length; i++) {
    var currentCard = document.querySelector('[data-index="' + (savedCards[i]) + '"]');
    var classes = currentCard.classList;
    classes.toggle("card-fade");
    cardsMatch.push(savedCards[i]);
  }
}

async function cardData() {
  return cardsArr;
}
