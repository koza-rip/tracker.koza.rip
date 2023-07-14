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
let skillsArr = [];
let cardsMatch = [];
var scoreUpSkills = [];
var scoreUpCards = [];

var ichika = [];
var saki = [];
var honami = [];
var shiho = [];

var minori = [];
var haruka = [];
var airi = [];
var shizuku = [];

var kohane = [];
var an = [];
var akito = [];
var toya = [];

var tsukasa = [];
var emu = [];
var nene = [];
var rui = [];

var kanade = [];
var mafuyu = [];
var ena = [];
var mizuki = [];

var miku = [];
var lnmiku = [];
var mmjmiku = [];
var vbsmiku = [];
var wxsmiku = [];
var niigomiku = [];

var rin = [];
var lnrin = [];
var mmjrin = [];
var vbsrin = [];
var wxsrin = [];
var niigorin = [];

var len = [];
var lnlen = [];
var mmjlen = [];
var vbslen = [];
var wxslen = [];
var niigolen = [];

var luka = [];
var lnluka = [];
var mmjluka = [];
var vbsluka = [];
var wxsluka = [];
var niigoluka = [];

var meiko = [];
var lnmeiko = [];
var mmjmeiko = [];
var vbsmeiko = [];
var wxsmeiko = [];
var niigomeiko = [];

var kaito = [];
var lnkaito = [];
var mmjkaito = [];
var vbskaito = [];
var wxskaito = [];
var niigokaito = [];

async function startup() {
  const loader = document.querySelector('#loader');

  loader.style.display = 'block';
  await cardData();
  await skillsMatch();
  await characterMatch();
  loader.style.display = 'none';

  for (var i = 0; i < cardsArr.length; i++) {
    var card = cardsArr[i];

    var grid = gID('proseka-cards');

    var cardLink = cE('a');
    grid.appendChild(cardLink);
    //cardLink.setAttribute('href', 'https://sekai.best/card/' + card[0]);

    var cardBody = cE('div');
    cardLink.appendChild(cardBody);
    cardBody.id = 'card' + (card[0]);
    cardBody.className = 'card-body card-prsk active-card';
    cardBody.dataset.char = card[1];
    cardBody.dataset.attr = card[3];
    cardBody.dataset.support = card[5];

    var cardImg = cE('img');
    cardBody.appendChild(cardImg);
    cardImg.className = 'card-bg';
    cardImg.setAttribute('src', 'https://koza.rip/assets/cards/icon/proseka/' + card[0] + '.jpg');

    var cardFrame = cE('div');
    cardBody.appendChild(cardFrame);
    if (card[2] === "rarity_birthday") {
      cardFrame.className = 'card-frame frame-bd';
    } else if (card[2] === "rarity_1") {
      cardFrame.className = 'card-frame frame-1';
    } else if (card[2] === "rarity_2") {
      cardFrame.className = 'card-frame frame-2';
    } else if (card[2] === "rarity_3") {
      cardFrame.className = 'card-frame frame-3';
    } else {
      cardFrame.className = 'card-frame frame-4';
    }

    var cardAttr = cE('div');
    cardBody.appendChild(cardAttr);
    cardAttr.className = 'card-attr attr-' + card[3];

    if (card[2] === "rarity_birthday") {
      var cardStar = cE('div');
      cardBody.appendChild(cardStar);
      cardStar.className = 'card-star birthday-pos birthday';
    } else if (card[2] === "rarity_1") {
      for (var j = 0; j < 1; j++) {
        var cardStar = cE('div');
        cardBody.appendChild(cardStar);
        cardStar.className = 'card-star star-pos-' + (j+1) + ' star-normal';
      }
    } else if (card[2] === "rarity_2") {
      for (var j = 0; j < 2; j++) {
        var cardStar = cE('div');
        cardBody.appendChild(cardStar);
        cardStar.className = 'card-star star-pos-' + (j+1) + ' star-normal';
      }
    } else if (card[2] === "rarity_3") {
      for (var j = 0; j < 3; j++) {
        var cardStar = cE('div');
        cardBody.appendChild(cardStar);
        cardStar.className = 'card-star star-pos-' + (j+1) + ' star';
      }
    } else {
      for (var j = 0; j < 4; j++) {
        var cardStar = cE('div');
        cardBody.appendChild(cardStar);
        cardStar.className = 'card-star star-pos-' + (j+1) + ' star';
      }
    }

    var cardFade = cE('div');
    cardFade.id = "cover" + card[0];
    cardFade.className = 'card-cover card-fade';
    cardFade.dataset.index = card[0];
    cardBody.appendChild(cardFade);

    cardBody.addEventListener('click', function(event) {
      let currentCard = event.target.dataset.index;
      const classes = event.target.classList;

      if (classes.contains("card-fade")) {
        classes.toggle("card-fade");

        cardsMatch.push(parseInt(currentCard));

        ////console.log(cardsMatch);
      } else {
        classes.toggle("card-fade");

        var filteredArray = cardsMatch.filter(function(e) { return e !== parseInt(currentCard) })
        cardsMatch = filteredArray;
      }

      localStorage.setItem('cards', JSON.stringify(cardsMatch));
      ////console.log(localStorage.getItem('cards'));

      characterTableSetup();
    });
  }

  var savedCards = JSON.parse(localStorage.getItem('cards'));
  ////console.log(savedCards);
  for (var i = 0; i < savedCards.length; i++) {
    var currentCard = document.querySelector('[data-index="' + (savedCards[i]) + '"]');
    var classes = currentCard.classList;
    classes.toggle("card-fade");
    cardsMatch.push(savedCards[i]);
  }

  await characterTableSetup();
  scoreCellHighlight();
}

function scoreCellHighlight() {
  var scoreCellSpans = document.getElementsByClassName("score-span");
  //console.log(scoreCellSpans);
  for (const span of scoreCellSpans) {
    var spanText = parseInt(span.textContent);
    //console.log(spanText);
    if (spanText >= 100) {
      //console.log(span.parentElement);
      span.parentElement.className = "table-light";
    }
  }
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

async function characterTableSetup() {

  // all leoni cards
  var leoniCards = gID("leoni");

  leoniCards.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "1" && card.dataset.char !== "2" && card.dataset.char !== "3" && card.dataset.char !== "4") {
          card.style.display = 'none';
        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  // cool leoni cards
  var coolLnCards = gID("ln-cool");

  coolLnCards.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "1" && card.dataset.char !== "2" && card.dataset.char !== "3" && card.dataset.char !== "4" || card.dataset.attr !== "cool") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  // cute leoni cards
  var cuteLnCards = gID("ln-cute");

  cuteLnCards.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "1" && card.dataset.char !== "2" && card.dataset.char !== "3" && card.dataset.char !== "4" || card.dataset.attr !== "cute") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  // happy leoni cards
  var happyLnCards = gID("ln-happy");

  happyLnCards.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "1" && card.dataset.char !== "2" && card.dataset.char !== "3" && card.dataset.char !== "4" || card.dataset.attr !== "happy") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  // mysterious leoni cards
  var mystLnCards = gID("ln-mysterious");

  mystLnCards.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "1" && card.dataset.char !== "2" && card.dataset.char !== "3" && card.dataset.char !== "4" || card.dataset.attr !== "mysterious") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  // pure leoni cards
  var pureLnCards = gID("ln-pure");

  pureLnCards.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "1" && card.dataset.char !== "2" && card.dataset.char !== "3" && card.dataset.char !== "4" || card.dataset.attr !== "pure") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  // all leoni vs cards
  var leoniVsCards = gID("leoni-vs");

  leoniVsCards.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "21" && card.dataset.char !== "22" && card.dataset.char !== "23" && card.dataset.char !== "24" && card.dataset.char !== "25" && card.dataset.char !== "26" || card.dataset.support !== "light_sound") {
          card.style.display = 'none';
        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  // cool leoni vs cards
  var coolLnVsCards = gID("ln-vs-cool");

  coolLnVsCards.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "21" && card.dataset.char !== "22" && card.dataset.char !== "23" && card.dataset.char !== "24" && card.dataset.char !== "25" && card.dataset.char !== "26" || card.dataset.support !== "light_sound" || card.dataset.attr !== "cool") {
          card.style.display = 'none';
        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  // cute leoni vs cards
  var cuteLnVsCards = gID("ln-vs-cute");

  cuteLnVsCards.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "21" && card.dataset.char !== "22" && card.dataset.char !== "23" && card.dataset.char !== "24" && card.dataset.char !== "25" && card.dataset.char !== "26" || card.dataset.support !== "light_sound" || card.dataset.attr !== "cute") {
          card.style.display = 'none';
        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  // happy leoni vs cards
  var happyLnVsCards = gID("ln-vs-happy");

  happyLnVsCards.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "21" && card.dataset.char !== "22" && card.dataset.char !== "23" && card.dataset.char !== "24" && card.dataset.char !== "25" && card.dataset.char !== "26" || card.dataset.attr !== "happy" || card.dataset.support !== "light_sound") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  // mysterious leoni vs cards
  var mystLnVsCards = gID("ln-vs-mysterious");

  mystLnVsCards.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "21" && card.dataset.char !== "22" && card.dataset.char !== "23" && card.dataset.char !== "24" && card.dataset.char !== "25" && card.dataset.char !== "26" || card.dataset.attr !== "mysterious" || card.dataset.support !== "light_sound") {
          card.style.display = 'none';
        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  // pure leoni vs cards
  var pureLnVsCards = gID("ln-vs-pure");

  pureLnVsCards.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "21" && card.dataset.char !== "22" && card.dataset.char !== "23" && card.dataset.char !== "24" && card.dataset.char !== "25" && card.dataset.char !== "26" || card.dataset.attr !== "pure" || card.dataset.support !== "light_sound") {
          card.style.display = 'none';
        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  // Ichika
  const tableSpanCoolIchika = cE("span");
  tableSpanCoolIchika.className = "score-span";
  const tableSpanCoolIchikaRarity = cE("span");
  tableSpanCoolIchikaRarity.className = "score-rarity-span";
  const tableSpanCuteIchika = cE("span");
  tableSpanCuteIchika.className = "score-span";
  const tableSpanCuteIchikaRarity = cE("span");
  tableSpanCoolIchikaRarity.className = "score-rarity-span";
  const tableSpanHappyIchika = cE("span");
  tableSpanHappyIchika.className = "score-span";
  const tableSpanHappyIchikaRarity = cE("span");
  tableSpanCoolIchikaRarity.className = "score-rarity-span";
  const tableSpanMystIchika = cE("span");
  tableSpanMystIchika.className = "score-span";
  const tableSpanMystIchikaRarity = cE("span");
  tableSpanCoolIchikaRarity.className = "score-rarity-span";
  const tableSpanPureIchika = cE("span");
  tableSpanPureIchika.className = "score-span";
  const tableSpanPureIchikaRarity = cE("span");
  tableSpanCoolIchikaRarity.className = "score-rarity-span";

  var ichikaTemp = [];
  var ichikaCards = gID("ichika");
  var ichikaCool = gID("cool-ichika");
  var ichikaCoolVal = 0;
  var ichikaCoolRarity = "";
  var ichikaCute = gID("cute-ichika");
  var ichikaCuteVal = 0;
  var ichikaCuteRarity = "";
  var ichikaHappy = gID("happy-ichika");
  var ichikaHappyVal = 0;
  var ichikaHappyRarity = "";
  var ichikaMyst = gID("mysterious-ichika");
  var ichikaMystVal = 0;
  var ichikaMystRarity = "";
  var ichikaPure = gID("pure-ichika");
  var ichikaPureVal = 0;
  var ichikaPureRarity = "";

  for (var i = 0; i < ichika.length; i++) {
    if (cardsMatch.includes(ichika[i][0][0][0])) {
      ichikaTemp.push(ichika[i]);
    }
  }

  ichikaTemp.sort((a, b) => a[0][1] - b[0][1]);

  for (var i = 0; i < ichikaTemp.length; i++) {
    var attr = ichikaTemp[i][0][0][3];
    var ichikaVal = ichikaTemp[i][0][1];
    var rarity = ichikaTemp[i][0][0][2];

    if (attr === "cool" && ichikaVal > ichikaCoolVal) {
      ichikaCoolVal = ichikaVal;
      ichikaCoolRarity = rarity;
      //console.log(ichikaCoolRarity);
    } else if (attr === "cute" && ichikaVal > ichikaCuteVal) {
      ichikaCuteVal = ichikaVal;
      ichikaCuteRarity = rarity;
    } else if (attr === "happy" && ichikaVal > ichikaHappyVal) {
      ichikaHappyVal = ichikaVal;
      ichikaHappyRarity = rarity;
    } else if (attr === "mysterious" && ichikaVal > ichikaMystVal) {
      ichikaMystVal = ichikaVal;
      ichikaMystRarity = rarity;
    } else if (attr === "pure" && ichikaVal > ichikaPureVal) {
      ichikaPureVal = ichikaVal;
      ichikaPureRarity = rarity;
    }
  }

  removeAllChildNodes(ichikaCool);
  removeAllChildNodes(ichikaCute);
  removeAllChildNodes(ichikaHappy);
  removeAllChildNodes(ichikaMyst);
  removeAllChildNodes(ichikaPure);

  var rarityImg = cE('img');
  tableSpanCoolIchikaRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (ichikaCoolRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + ichikaCoolRarity + '.png');
    ichikaCool.appendChild(tableSpanCoolIchikaRarity);
  }

  tableSpanCoolIchika.textContent = ichikaCoolVal + "%";
  //ichikaCool.removeChild(ichikaCool.firstChild);
  ichikaCool.appendChild(tableSpanCoolIchika);

  var rarityImg = cE('img');
  tableSpanCuteIchikaRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (ichikaCuteRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + ichikaCuteRarity + '.png');
    ichikaCute.appendChild(tableSpanCuteIchikaRarity);
  }

  tableSpanCuteIchika.textContent = ichikaCuteVal + "%";
  //ichikaCute.removeChild(ichikaCute.firstChild);
  ichikaCute.appendChild(tableSpanCuteIchika);

  var rarityImg = cE('img');
  tableSpanHappyIchikaRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (ichikaHappyRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + ichikaHappyRarity + '.png');
    ichikaHappy.appendChild(tableSpanHappyIchikaRarity);
  }

  tableSpanHappyIchika.textContent = ichikaHappyVal + "%";
  //ichikaHappy.removeChild(ichikaHappy.firstChild);
  ichikaHappy.appendChild(tableSpanHappyIchika);

  var rarityImg = cE('img');
  tableSpanMystIchikaRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (ichikaMystRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + ichikaMystRarity + '.png');
    ichikaMyst.appendChild(tableSpanMystIchikaRarity);
  }

  tableSpanMystIchika.textContent = ichikaMystVal + "%";
  //ichikaMyst.removeChild(ichikaMyst.firstChild);
  ichikaMyst.appendChild(tableSpanMystIchika);

  var rarityImg = cE('img');
  tableSpanPureIchikaRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (ichikaPureRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + ichikaPureRarity + '.png');
    ichikaPure.appendChild(tableSpanPureIchikaRarity);
  }

  tableSpanPureIchika.textContent = ichikaPureVal + "%";
  //ichikaPure.removeChild(ichikaPure.firstChild);
  ichikaPure.appendChild(tableSpanPureIchika);

  ichikaCards.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");
    //let currentCard = event.target.dataset.index;
    //const classes = event.target.classList;

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "1") {
          card.style.display = 'none';
        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  ichikaCool.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");
    //let currentCard = event.target.dataset.index;
    //const classes = event.target.classList;

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "1" || card.dataset.attr !== "cool") {
          card.style.display = 'none';
        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  ichikaCute.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");
    //let currentCard = event.target.dataset.index;
    //const classes = event.target.classList;

    for (const card of cardIcons) {
      // 👇️ Remove element from DOM
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "1" || card.dataset.attr !== "cute") {
          card.style.display = 'none';
        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  ichikaHappy.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");
    //let currentCard = event.target.dataset.index;
    //const classes = event.target.classList;

    for (const card of cardIcons) {
      // 👇️ Remove element from DOM
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "1" || card.dataset.attr !== "happy") {
          card.style.display = 'none';
        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  ichikaMyst.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");
    //let currentCard = event.target.dataset.index;
    //const classes = event.target.classList;

    for (const card of cardIcons) {
      // 👇️ Remove element from DOM
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "1" || card.dataset.attr !== "mysterious") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  ichikaPure.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");
    //let currentCard = event.target.dataset.index;
    //const classes = event.target.classList;

    for (const card of cardIcons) {
      // 👇️ Remove element from DOM
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "1" || card.dataset.attr !== "pure") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  // Saki
  const tableSpanCoolSaki = cE("span");
  tableSpanCoolSaki.className = "score-span";
  const tableSpanCoolSakiRarity = cE("span");
  tableSpanCoolSakiRarity.className = "score-rarity-span";
  const tableSpanCuteSaki = cE("span");
  tableSpanCuteSaki.className = "score-span";
  const tableSpanCuteSakiRarity = cE("span");
  tableSpanCoolSakiRarity.className = "score-rarity-span";
  const tableSpanHappySaki = cE("span");
  tableSpanHappySaki.className = "score-span";
  const tableSpanHappySakiRarity = cE("span");
  tableSpanCoolSakiRarity.className = "score-rarity-span";
  const tableSpanMystSaki = cE("span");
  tableSpanMystSaki.className = "score-span";
  const tableSpanMystSakiRarity = cE("span");
  tableSpanCoolSakiRarity.className = "score-rarity-span";
  const tableSpanPureSaki = cE("span");
  tableSpanPureSaki.className = "score-span";
  const tableSpanPureSakiRarity = cE("span");
  tableSpanCoolSakiRarity.className = "score-rarity-span";

  var sakiTemp = [];
  var sakiCards = gID("saki");
  var sakiCool = gID("cool-saki");
  var sakiCoolVal = 0;
  var sakiCoolRarity = "";
  var sakiCute = gID("cute-saki");
  var sakiCuteVal = 0;
  var sakiCuteRarity = "";
  var sakiHappy = gID("happy-saki");
  var sakiHappyVal = 0;
  var sakiHappyRarity = "";
  var sakiMyst = gID("mysterious-saki");
  var sakiMystVal = 0;
  var sakiMystRarity = "";
  var sakiPure = gID("pure-saki");
  var sakiPureVal = 0;
  var sakiPureRarity = "";

  for (var i = 0; i < saki.length; i++) {
    if (cardsMatch.includes(saki[i][0][0][0])) {
      sakiTemp.push(saki[i]);
    }
  }

  sakiTemp.sort((a, b) => a[0][1] - b[0][1]);

  for (var i = 0; i < sakiTemp.length; i++) {
    var attr = sakiTemp[i][0][0][3];
    var sakiVal = sakiTemp[i][0][1];
    var rarity = sakiTemp[i][0][0][2];

    if (attr === "cool" && sakiVal > sakiCoolVal) {
      sakiCoolVal = sakiVal;
      sakiCoolRarity = rarity;
      ////console.log(sakiCoolRarity);
    } else if (attr === "cute" && sakiVal > sakiCuteVal) {
      sakiCuteVal = sakiVal;
      sakiCuteRarity = rarity;
    } else if (attr === "happy" && sakiVal > sakiHappyVal) {
      sakiHappyVal = sakiVal;
      sakiHappyRarity = rarity;
    } else if (attr === "mysterious" && sakiVal > sakiMystVal) {
      sakiMystVal = sakiVal;
      sakiMystRarity = rarity;
    } else if (attr === "pure" && sakiVal > sakiPureVal) {
      sakiPureVal = sakiVal;
      sakiPureRarity = rarity;
    }
  }

  removeAllChildNodes(sakiCool);
  removeAllChildNodes(sakiCute);
  removeAllChildNodes(sakiHappy);
  removeAllChildNodes(sakiMyst);
  removeAllChildNodes(sakiPure);

  var rarityImg = cE('img');
  tableSpanCoolSakiRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (sakiCoolRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + sakiCoolRarity + '.png');
    sakiCool.appendChild(tableSpanCoolSakiRarity);
  }

  tableSpanCoolSaki.textContent = sakiCoolVal + "%";
  sakiCool.appendChild(tableSpanCoolSaki);

  var rarityImg = cE('img');
  tableSpanCuteSakiRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (sakiCuteRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + sakiCuteRarity + '.png');
    sakiCute.appendChild(tableSpanCuteSakiRarity);
  }

  tableSpanCuteSaki.textContent = sakiCuteVal + "%";
  sakiCute.appendChild(tableSpanCuteSaki);

  var rarityImg = cE('img');
  tableSpanHappySakiRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (sakiHappyRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + sakiHappyRarity + '.png');
    sakiHappy.appendChild(tableSpanHappySakiRarity);
  }

  tableSpanHappySaki.textContent = sakiHappyVal + "%";
  sakiHappy.appendChild(tableSpanHappySaki);

  var rarityImg = cE('img');
  tableSpanMystSakiRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (sakiMystRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + sakiMystRarity + '.png');
    sakiMyst.appendChild(tableSpanMystSakiRarity);
  }

  tableSpanMystSaki.textContent = sakiMystVal + "%";
  sakiMyst.appendChild(tableSpanMystSaki);

  var rarityImg = cE('img');
  tableSpanPureSakiRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (sakiPureRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + sakiPureRarity + '.png');
    sakiPure.appendChild(tableSpanPureSakiRarity);
  }

  tableSpanPureSaki.textContent = sakiPureVal + "%";
  sakiPure.appendChild(tableSpanPureSaki);

  sakiCards.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "2") {
          card.style.display = 'none';
        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  sakiCool.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "2" || card.dataset.attr !== "cool") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  sakiCute.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "2" || card.dataset.attr !== "cute") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  sakiHappy.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "2" || card.dataset.attr !== "happy") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  sakiMyst.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "2" || card.dataset.attr !== "mysterious") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  sakiPure.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "2" || card.dataset.attr !== "pure") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  // Honami
  const tableSpanCoolHonami = cE("span");
  tableSpanCoolHonami.className = "score-span";
  const tableSpanCoolHonamiRarity = cE("span");
  tableSpanCoolHonamiRarity.className = "score-rarity-span";
  const tableSpanCuteHonami = cE("span");
  tableSpanCuteHonami.className = "score-span";
  const tableSpanCuteHonamiRarity = cE("span");
  tableSpanCoolHonamiRarity.className = "score-rarity-span";
  const tableSpanHappyHonami = cE("span");
  tableSpanHappyHonami.className = "score-span";
  const tableSpanHappyHonamiRarity = cE("span");
  tableSpanCoolHonamiRarity.className = "score-rarity-span";
  const tableSpanMystHonami = cE("span");
  tableSpanMystHonami.className = "score-span";
  const tableSpanMystHonamiRarity = cE("span");
  tableSpanCoolHonamiRarity.className = "score-rarity-span";
  const tableSpanPureHonami = cE("span");
  tableSpanPureHonami.className = "score-span";
  const tableSpanPureHonamiRarity = cE("span");
  tableSpanCoolHonamiRarity.className = "score-rarity-span";

  var honamiTemp = [];
  var honamiCards = gID("honami");
  var honamiCool = gID("cool-honami");
  var honamiCoolVal = 0;
  var honamiCoolRarity = "";
  var honamiCute = gID("cute-honami");
  var honamiCuteVal = 0;
  var honamiCuteRarity = "";
  var honamiHappy = gID("happy-honami");
  var honamiHappyVal = 0;
  var honamiHappyRarity = "";
  var honamiMyst = gID("mysterious-honami");
  var honamiMystVal = 0;
  var honamiMystRarity = "";
  var honamiPure = gID("pure-honami");
  var honamiPureVal = 0;
  var honamiPureRarity = "";

  for (var i = 0; i < honami.length; i++) {
    if (cardsMatch.includes(honami[i][0][0][0])) {
      honamiTemp.push(honami[i]);
    }
  }

  honamiTemp.sort((a, b) => a[0][1] - b[0][1]);

  for (var i = 0; i < honamiTemp.length; i++) {
    var attr = honamiTemp[i][0][0][3];
    var honamiVal = honamiTemp[i][0][1];
    var rarity = honamiTemp[i][0][0][2];

    if (attr === "cool" && honamiVal > honamiCoolVal) {
      honamiCoolVal = honamiVal;
      honamiCoolRarity = rarity;
      ////console.log(honamiCoolRarity);
    } else if (attr === "cute" && honamiVal > honamiCuteVal) {
      honamiCuteVal = honamiVal;
      honamiCuteRarity = rarity;
    } else if (attr === "happy" && honamiVal > honamiHappyVal) {
      honamiHappyVal = honamiVal;
      honamiHappyRarity = rarity;
    } else if (attr === "mysterious" && honamiVal > honamiMystVal) {
      honamiMystVal = honamiVal;
      honamiMystRarity = rarity;
    } else if (attr === "pure" && honamiVal > honamiPureVal) {
      honamiPureVal = honamiVal;
      honamiPureRarity = rarity;
    }
  }

  removeAllChildNodes(honamiCool);
  removeAllChildNodes(honamiCute);
  removeAllChildNodes(honamiHappy);
  removeAllChildNodes(honamiMyst);
  removeAllChildNodes(honamiPure);

  var rarityImg = cE('img');
  tableSpanCoolHonamiRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (honamiCoolRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + honamiCoolRarity + '.png');
    honamiCool.appendChild(tableSpanCoolHonamiRarity);
  }

  tableSpanCoolHonami.textContent = honamiCoolVal + "%";
  honamiCool.appendChild(tableSpanCoolHonami);

  var rarityImg = cE('img');
  tableSpanCuteHonamiRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (honamiCuteRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + honamiCuteRarity + '.png');
    honamiCute.appendChild(tableSpanCuteHonamiRarity);
  }

  tableSpanCuteHonami.textContent = honamiCuteVal + "%";
  honamiCute.appendChild(tableSpanCuteHonami);

  var rarityImg = cE('img');
  tableSpanHappyHonamiRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (honamiHappyRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + honamiHappyRarity + '.png');
    honamiHappy.appendChild(tableSpanHappyHonamiRarity);
  }

  tableSpanHappyHonami.textContent = honamiHappyVal + "%";
  honamiHappy.appendChild(tableSpanHappyHonami);

  var rarityImg = cE('img');
  tableSpanMystHonamiRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (honamiMystRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + honamiMystRarity + '.png');
    honamiMyst.appendChild(tableSpanMystHonamiRarity);
  }

  tableSpanMystHonami.textContent = honamiMystVal + "%";
  honamiMyst.appendChild(tableSpanMystHonami);

  var rarityImg = cE('img');
  tableSpanPureHonamiRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (honamiPureRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + honamiPureRarity + '.png');
    honamiPure.appendChild(tableSpanPureHonamiRarity);
  }

  tableSpanPureHonami.textContent = honamiPureVal + "%";
  honamiPure.appendChild(tableSpanPureHonami);

  honamiCards.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "3") {
          card.style.display = 'none';
        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  honamiCool.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "3" || card.dataset.attr !== "cool") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  honamiCute.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "3" || card.dataset.attr !== "cute") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  honamiHappy.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "3" || card.dataset.attr !== "happy") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  honamiMyst.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "3" || card.dataset.attr !== "mysterious") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  honamiPure.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "3" || card.dataset.attr !== "pure") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  // Shiho
  const tableSpanCoolShiho = cE("span");
  tableSpanCoolShiho.className = "score-span";
  const tableSpanCoolShihoRarity = cE("span");
  tableSpanCoolShihoRarity.className = "score-rarity-span";
  const tableSpanCuteShiho = cE("span");
  tableSpanCuteShiho.className = "score-span";
  const tableSpanCuteShihoRarity = cE("span");
  tableSpanCoolShihoRarity.className = "score-rarity-span";
  const tableSpanHappyShiho = cE("span");
  tableSpanHappyShiho.className = "score-span";
  const tableSpanHappyShihoRarity = cE("span");
  tableSpanCoolShihoRarity.className = "score-rarity-span";
  const tableSpanMystShiho = cE("span");
  tableSpanMystShiho.className = "score-span";
  const tableSpanMystShihoRarity = cE("span");
  tableSpanCoolShihoRarity.className = "score-rarity-span";
  const tableSpanPureShiho = cE("span");
  tableSpanPureShiho.className = "score-span";
  const tableSpanPureShihoRarity = cE("span");
  tableSpanCoolShihoRarity.className = "score-rarity-span";

  var shihoTemp = [];
  var shihoCards = gID("shiho");
  var shihoCool = gID("cool-shiho");
  var shihoCoolVal = 0;
  var shihoCoolRarity = "";
  var shihoCute = gID("cute-shiho");
  var shihoCuteVal = 0;
  var shihoCuteRarity = "";
  var shihoHappy = gID("happy-shiho");
  var shihoHappyVal = 0;
  var shihoHappyRarity = "";
  var shihoMyst = gID("mysterious-shiho");
  var shihoMystVal = 0;
  var shihoMystRarity = "";
  var shihoPure = gID("pure-shiho");
  var shihoPureVal = 0;
  var shihoPureRarity = "";

  for (var i = 0; i < shiho.length; i++) {
    if (cardsMatch.includes(shiho[i][0][0][0])) {
      shihoTemp.push(shiho[i]);
    }
  }

  shihoTemp.sort((a, b) => a[0][1] - b[0][1]);

  for (var i = 0; i < shihoTemp.length; i++) {
    var attr = shihoTemp[i][0][0][3];
    var shihoVal = shihoTemp[i][0][1];
    var rarity = shihoTemp[i][0][0][2];

    if (attr === "cool" && shihoVal > shihoCoolVal) {
      shihoCoolVal = shihoVal;
      shihoCoolRarity = rarity;
      ////console.log(shihoCoolRarity);
    } else if (attr === "cute" && shihoVal > shihoCuteVal) {
      shihoCuteVal = shihoVal;
      shihoCuteRarity = rarity;
    } else if (attr === "happy" && shihoVal > shihoHappyVal) {
      shihoHappyVal = shihoVal;
      shihoHappyRarity = rarity;
    } else if (attr === "mysterious" && shihoVal > shihoMystVal) {
      shihoMystVal = shihoVal;
      shihoMystRarity = rarity;
    } else if (attr === "pure" && shihoVal > shihoPureVal) {
      shihoPureVal = shihoVal;
      shihoPureRarity = rarity;
    }
  }

  removeAllChildNodes(shihoCool);
  removeAllChildNodes(shihoCute);
  removeAllChildNodes(shihoHappy);
  removeAllChildNodes(shihoMyst);
  removeAllChildNodes(shihoPure);

  var rarityImg = cE('img');
  tableSpanCoolShihoRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (shihoCoolRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + shihoCoolRarity + '.png');
    shihoCool.appendChild(tableSpanCoolShihoRarity);
  }

  tableSpanCoolShiho.textContent = shihoCoolVal + "%";
  shihoCool.appendChild(tableSpanCoolShiho);

  var rarityImg = cE('img');
  tableSpanCuteShihoRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (shihoCuteRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + shihoCuteRarity + '.png');
    shihoCute.appendChild(tableSpanCuteShihoRarity);
  }

  tableSpanCuteShiho.textContent = shihoCuteVal + "%";
  shihoCute.appendChild(tableSpanCuteShiho);

  var rarityImg = cE('img');
  tableSpanHappyShihoRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (shihoHappyRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + shihoHappyRarity + '.png');
    shihoHappy.appendChild(tableSpanHappyShihoRarity);
  }

  tableSpanHappyShiho.textContent = shihoHappyVal + "%";
  shihoHappy.appendChild(tableSpanHappyShiho);

  var rarityImg = cE('img');
  tableSpanMystShihoRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (shihoMystRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + shihoMystRarity + '.png');
    shihoMyst.appendChild(tableSpanMystShihoRarity);
  }

  tableSpanMystShiho.textContent = shihoMystVal + "%";
  shihoMyst.appendChild(tableSpanMystShiho);

  var rarityImg = cE('img');
  tableSpanPureShihoRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (shihoPureRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + shihoPureRarity + '.png');
    shihoPure.appendChild(tableSpanPureShihoRarity);
  }

  tableSpanPureShiho.textContent = shihoPureVal + "%";
  shihoPure.appendChild(tableSpanPureShiho);

  shihoCards.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "4") {
          card.style.display = 'none';
        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  shihoCool.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "4" || card.dataset.attr !== "cool") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  shihoCute.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "4" || card.dataset.attr !== "cute") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  shihoHappy.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "4" || card.dataset.attr !== "happy") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  shihoMyst.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "4" || card.dataset.attr !== "mysterious") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  shihoPure.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "4" || card.dataset.attr !== "pure") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  // LnMiku
  const tableSpanCoolLnMiku = cE("span");
  tableSpanCoolLnMiku.className = "score-span";
  const tableSpanCoolLnMikuRarity = cE("span");
  tableSpanCoolLnMikuRarity.className = "score-rarity-span";
  const tableSpanCuteLnMiku = cE("span");
  tableSpanCuteLnMiku.className = "score-span";
  const tableSpanCuteLnMikuRarity = cE("span");
  tableSpanCoolLnMikuRarity.className = "score-rarity-span";
  const tableSpanHappyLnMiku = cE("span");
  tableSpanHappyLnMiku.className = "score-span";
  const tableSpanHappyLnMikuRarity = cE("span");
  tableSpanCoolLnMikuRarity.className = "score-rarity-span";
  const tableSpanMystLnMiku = cE("span");
  tableSpanMystLnMiku.className = "score-span";
  const tableSpanMystLnMikuRarity = cE("span");
  tableSpanCoolLnMikuRarity.className = "score-rarity-span";
  const tableSpanPureLnMiku = cE("span");
  tableSpanPureLnMiku.className = "score-span";
  const tableSpanPureLnMikuRarity = cE("span");
  tableSpanCoolLnMikuRarity.className = "score-rarity-span";

  var lnmikuTemp = [];
  var lnmikuCards = gID("ln-miku");
  var lnmikuCool = gID("cool-ln-miku");
  var lnmikuCoolVal = 0;
  var lnmikuCoolRarity = "";
  var lnmikuCute = gID("cute-ln-miku");
  var lnmikuCuteVal = 0;
  var lnmikuCuteRarity = "";
  var lnmikuHappy = gID("happy-ln-miku");
  var lnmikuHappyVal = 0;
  var lnmikuHappyRarity = "";
  var lnmikuMyst = gID("mysterious-ln-miku");
  var lnmikuMystVal = 0;
  var lnmikuMystRarity = "";
  var lnmikuPure = gID("pure-ln-miku");
  var lnmikuPureVal = 0;
  var lnmikuPureRarity = "";

  for (var i = 0; i < lnmiku.length; i++) {
    if (cardsMatch.includes(lnmiku[i][0][0][0])) {
      lnmikuTemp.push(lnmiku[i]);
    }
  }

  lnmikuTemp.sort((a, b) => a[0][1] - b[0][1]);

  for (var i = 0; i < lnmikuTemp.length; i++) {
    var attr = lnmikuTemp[i][0][0][3];
    var lnmikuVal = lnmikuTemp[i][0][1];
    var rarity = lnmikuTemp[i][0][0][2];

    if (attr === "cool" && lnmikuVal > lnmikuCoolVal) {
      lnmikuCoolVal = lnmikuVal;
      lnmikuCoolRarity = rarity;
      ////console.log(lnmikuCoolRarity);
    } else if (attr === "cute" && lnmikuVal > lnmikuCuteVal) {
      lnmikuCuteVal = lnmikuVal;
      lnmikuCuteRarity = rarity;
    } else if (attr === "happy" && lnmikuVal > lnmikuHappyVal) {
      lnmikuHappyVal = lnmikuVal;
      lnmikuHappyRarity = rarity;
    } else if (attr === "mysterious" && lnmikuVal > lnmikuMystVal) {
      lnmikuMystVal = lnmikuVal;
      lnmikuMystRarity = rarity;
    } else if (attr === "pure" && lnmikuVal > lnmikuPureVal) {
      lnmikuPureVal = lnmikuVal;
      lnmikuPureRarity = rarity;
    }
  }

  removeAllChildNodes(lnmikuCool);
  removeAllChildNodes(lnmikuCute);
  removeAllChildNodes(lnmikuHappy);
  removeAllChildNodes(lnmikuMyst);
  removeAllChildNodes(lnmikuPure);

  var rarityImg = cE('img');
  tableSpanCoolLnMikuRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (lnmikuCoolRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + lnmikuCoolRarity + '.png');
    lnmikuCool.appendChild(tableSpanCoolLnMikuRarity);
  }

  tableSpanCoolLnMiku.textContent = lnmikuCoolVal + "%";
  lnmikuCool.appendChild(tableSpanCoolLnMiku);

  var rarityImg = cE('img');
  tableSpanCuteLnMikuRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (lnmikuCuteRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + lnmikuCuteRarity + '.png');
    lnmikuCute.appendChild(tableSpanCuteLnMikuRarity);
  }

  tableSpanCuteLnMiku.textContent = lnmikuCuteVal + "%";
  lnmikuCute.appendChild(tableSpanCuteLnMiku);

  var rarityImg = cE('img');
  tableSpanHappyLnMikuRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (lnmikuHappyRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + lnmikuHappyRarity + '.png');
    lnmikuHappy.appendChild(tableSpanHappyLnMikuRarity);
  }

  tableSpanHappyLnMiku.textContent = lnmikuHappyVal + "%";
  lnmikuHappy.appendChild(tableSpanHappyLnMiku);

  var rarityImg = cE('img');
  tableSpanMystLnMikuRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (lnmikuMystRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + lnmikuMystRarity + '.png');
    lnmikuMyst.appendChild(tableSpanMystLnMikuRarity);
  }

  tableSpanMystLnMiku.textContent = lnmikuMystVal + "%";
  lnmikuMyst.appendChild(tableSpanMystLnMiku);

  var rarityImg = cE('img');
  tableSpanPureLnMikuRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (lnmikuPureRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + lnmikuPureRarity + '.png');
    lnmikuPure.appendChild(tableSpanPureLnMikuRarity);
  }

  tableSpanPureLnMiku.textContent = lnmikuPureVal + "%";
  lnmikuPure.appendChild(tableSpanPureLnMiku);

  lnmikuCards.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "21" || card.dataset.support !== "light_sound") {
          card.style.display = 'none';
        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  lnmikuCool.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "21" || card.dataset.support !== "light_sound" || card.dataset.attr !== "cool") {
          card.style.display = 'none';
        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  lnmikuCute.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "21" || card.dataset.support !== "light_sound" || card.dataset.attr !== "cute") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  lnmikuHappy.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "21" || card.dataset.support !== "light_sound" || card.dataset.attr !== "happy") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  lnmikuMyst.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "21" || card.dataset.support !== "light_sound" || card.dataset.attr !== "mysterious") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  lnmikuPure.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "21" || card.dataset.support !== "light_sound" || card.dataset.attr !== "pure") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  // LnRin
  const tableSpanCoolLnRin = cE("span");
  tableSpanCoolLnRin.className = "score-span";
  const tableSpanCoolLnRinRarity = cE("span");
  tableSpanCoolLnRinRarity.className = "score-rarity-span";
  const tableSpanCuteLnRin = cE("span");
  tableSpanCuteLnRin.className = "score-span";
  const tableSpanCuteLnRinRarity = cE("span");
  tableSpanCoolLnRinRarity.className = "score-rarity-span";
  const tableSpanHappyLnRin = cE("span");
  tableSpanHappyLnRin.className = "score-span";
  const tableSpanHappyLnRinRarity = cE("span");
  tableSpanCoolLnRinRarity.className = "score-rarity-span";
  const tableSpanMystLnRin = cE("span");
  tableSpanMystLnRin.className = "score-span";
  const tableSpanMystLnRinRarity = cE("span");
  tableSpanCoolLnRinRarity.className = "score-rarity-span";
  const tableSpanPureLnRin = cE("span");
  tableSpanPureLnRin.className = "score-span";
  const tableSpanPureLnRinRarity = cE("span");
  tableSpanCoolLnRinRarity.className = "score-rarity-span";

  var lnrinTemp = [];
  var lnrinCards = gID("ln-rin");
  var lnrinCool = gID("cool-ln-rin");
  var lnrinCoolVal = 0;
  var lnrinCoolRarity = "";
  var lnrinCute = gID("cute-ln-rin");
  var lnrinCuteVal = 0;
  var lnrinCuteRarity = "";
  var lnrinHappy = gID("happy-ln-rin");
  var lnrinHappyVal = 0;
  var lnrinHappyRarity = "";
  var lnrinMyst = gID("mysterious-ln-rin");
  var lnrinMystVal = 0;
  var lnrinMystRarity = "";
  var lnrinPure = gID("pure-ln-rin");
  var lnrinPureVal = 0;
  var lnrinPureRarity = "";

  for (var i = 0; i < lnrin.length; i++) {
    if (cardsMatch.includes(lnrin[i][0][0][0])) {
      lnrinTemp.push(lnrin[i]);
    }
  }

  lnrinTemp.sort((a, b) => a[0][1] - b[0][1]);

  for (var i = 0; i < lnrinTemp.length; i++) {
    var attr = lnrinTemp[i][0][0][3];
    var lnrinVal = lnrinTemp[i][0][1];
    var rarity = lnrinTemp[i][0][0][2];

    if (attr === "cool" && lnrinVal > lnrinCoolVal) {
      lnrinCoolVal = lnrinVal;
      lnrinCoolRarity = rarity;
      //console.log(lnrinCoolRarity);
    } else if (attr === "cute" && lnrinVal > lnrinCuteVal) {
      lnrinCuteVal = lnrinVal;
      lnrinCuteRarity = rarity;
    } else if (attr === "happy" && lnrinVal > lnrinHappyVal) {
      lnrinHappyVal = lnrinVal;
      lnrinHappyRarity = rarity;
    } else if (attr === "mysterious" && lnrinVal > lnrinMystVal) {
      lnrinMystVal = lnrinVal;
      lnrinMystRarity = rarity;
    } else if (attr === "pure" && lnrinVal > lnrinPureVal) {
      lnrinPureVal = lnrinVal;
      lnrinPureRarity = rarity;
    }
  }

  removeAllChildNodes(lnrinCool);
  removeAllChildNodes(lnrinCute);
  removeAllChildNodes(lnrinHappy);
  removeAllChildNodes(lnrinMyst);
  removeAllChildNodes(lnrinPure);

  var rarityImg = cE('img');
  tableSpanCoolLnRinRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (lnrinCoolRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + lnrinCoolRarity + '.png');
    lnrinCool.appendChild(tableSpanCoolLnRinRarity);
  }

  tableSpanCoolLnRin.textContent = lnrinCoolVal + "%";
  lnrinCool.appendChild(tableSpanCoolLnRin);

  var rarityImg = cE('img');
  tableSpanCuteLnRinRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (lnrinCuteRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + lnrinCuteRarity + '.png');
    lnrinCute.appendChild(tableSpanCuteLnRinRarity);
  }

  tableSpanCuteLnRin.textContent = lnrinCuteVal + "%";
  lnrinCute.appendChild(tableSpanCuteLnRin);

  var rarityImg = cE('img');
  tableSpanHappyLnRinRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (lnrinHappyRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + lnrinHappyRarity + '.png');
    lnrinHappy.appendChild(tableSpanHappyLnRinRarity);
  }

  tableSpanHappyLnRin.textContent = lnrinHappyVal + "%";
  lnrinHappy.appendChild(tableSpanHappyLnRin);

  var rarityImg = cE('img');
  tableSpanMystLnRinRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (lnrinMystRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + lnrinMystRarity + '.png');
    lnrinMyst.appendChild(tableSpanMystLnRinRarity);
  }

  tableSpanMystLnRin.textContent = lnrinMystVal + "%";
  lnrinMyst.appendChild(tableSpanMystLnRin);

  var rarityImg = cE('img');
  tableSpanPureLnRinRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (lnrinPureRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + lnrinPureRarity + '.png');
    lnrinPure.appendChild(tableSpanPureLnRinRarity);
  }

  tableSpanPureLnRin.textContent = lnrinPureVal + "%";
  lnrinPure.appendChild(tableSpanPureLnRin);

  lnrinCards.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "22" || card.dataset.support !== "light_sound") {
          card.style.display = 'none';
        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  lnrinCool.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "22" || card.dataset.support !== "light_sound" || card.dataset.attr !== "cool") {
          card.style.display = 'none';
        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  lnrinCute.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "22" || card.dataset.support !== "light_sound" || card.dataset.attr !== "cute") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  lnrinHappy.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "22" || card.dataset.support !== "light_sound" || card.dataset.attr !== "happy") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  lnrinMyst.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "22" || card.dataset.support !== "light_sound" || card.dataset.attr !== "mysterious") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  lnrinPure.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "22" || card.dataset.support !== "light_sound" || card.dataset.attr !== "pure") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  // LnLen
  const tableSpanCoolLnLen = cE("span");
  tableSpanCoolLnLen.className = "score-span";
  const tableSpanCoolLnLenRarity = cE("span");
  tableSpanCoolLnLenRarity.className = "score-rarity-span";
  const tableSpanCuteLnLen = cE("span");
  tableSpanCuteLnLen.className = "score-span";
  const tableSpanCuteLnLenRarity = cE("span");
  tableSpanCoolLnLenRarity.className = "score-rarity-span";
  const tableSpanHappyLnLen = cE("span");
  tableSpanHappyLnLen.className = "score-span";
  const tableSpanHappyLnLenRarity = cE("span");
  tableSpanCoolLnLenRarity.className = "score-rarity-span";
  const tableSpanMystLnLen = cE("span");
  tableSpanMystLnLen.className = "score-span";
  const tableSpanMystLnLenRarity = cE("span");
  tableSpanCoolLnLenRarity.className = "score-rarity-span";
  const tableSpanPureLnLen = cE("span");
  tableSpanPureLnLen.className = "score-span";
  const tableSpanPureLnLenRarity = cE("span");
  tableSpanCoolLnLenRarity.className = "score-rarity-span";

  var lnlenTemp = [];
  var lnlenCards = gID("ln-len");
  var lnlenCool = gID("cool-ln-len");
  var lnlenCoolVal = 0;
  var lnlenCoolRarity = "";
  var lnlenCute = gID("cute-ln-len");
  var lnlenCuteVal = 0;
  var lnlenCuteRarity = "";
  var lnlenHappy = gID("happy-ln-len");
  var lnlenHappyVal = 0;
  var lnlenHappyRarity = "";
  var lnlenMyst = gID("mysterious-ln-len");
  var lnlenMystVal = 0;
  var lnlenMystRarity = "";
  var lnlenPure = gID("pure-ln-len");
  var lnlenPureVal = 0;
  var lnlenPureRarity = "";

  for (var i = 0; i < lnlen.length; i++) {
    if (cardsMatch.includes(lnlen[i][0][0][0])) {
      lnlenTemp.push(lnlen[i]);
    }
  }

  lnlenTemp.sort((a, b) => a[0][1] - b[0][1]);

  for (var i = 0; i < lnlenTemp.length; i++) {
    var attr = lnlenTemp[i][0][0][3];
    var lnlenVal = lnlenTemp[i][0][1];
    var rarity = lnlenTemp[i][0][0][2];

    if (attr === "cool" && lnlenVal > lnlenCoolVal) {
      lnlenCoolVal = lnlenVal;
      lnlenCoolRarity = rarity;
      //console.log(lnlenCoolRarity);
    } else if (attr === "cute" && lnlenVal > lnlenCuteVal) {
      lnlenCuteVal = lnlenVal;
      lnlenCuteRarity = rarity;
    } else if (attr === "happy" && lnlenVal > lnlenHappyVal) {
      lnlenHappyVal = lnlenVal;
      lnlenHappyRarity = rarity;
    } else if (attr === "mysterious" && lnlenVal > lnlenMystVal) {
      lnlenMystVal = lnlenVal;
      lnlenMystRarity = rarity;
    } else if (attr === "pure" && lnlenVal > lnlenPureVal) {
      lnlenPureVal = lnlenVal;
      lnlenPureRarity = rarity;
    }
  }

  removeAllChildNodes(lnlenCool);
  removeAllChildNodes(lnlenCute);
  removeAllChildNodes(lnlenHappy);
  removeAllChildNodes(lnlenMyst);
  removeAllChildNodes(lnlenPure);

  var rarityImg = cE('img');
  tableSpanCoolLnLenRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (lnlenCoolRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + lnlenCoolRarity + '.png');
    lnlenCool.appendChild(tableSpanCoolLnLenRarity);
  }

  tableSpanCoolLnLen.textContent = lnlenCoolVal + "%";
  lnlenCool.appendChild(tableSpanCoolLnLen);

  var rarityImg = cE('img');
  tableSpanCuteLnLenRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (lnlenCuteRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + lnlenCuteRarity + '.png');
    lnlenCute.appendChild(tableSpanCuteLnLenRarity);
  }

  tableSpanCuteLnLen.textContent = lnlenCuteVal + "%";
  lnlenCute.appendChild(tableSpanCuteLnLen);

  var rarityImg = cE('img');
  tableSpanHappyLnLenRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (lnlenHappyRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + lnlenHappyRarity + '.png');
    lnlenHappy.appendChild(tableSpanHappyLnLenRarity);
  }

  tableSpanHappyLnLen.textContent = lnlenHappyVal + "%";
  lnlenHappy.appendChild(tableSpanHappyLnLen);

  var rarityImg = cE('img');
  tableSpanMystLnLenRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (lnlenMystRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + lnlenMystRarity + '.png');
    lnlenMyst.appendChild(tableSpanMystLnLenRarity);
  }

  tableSpanMystLnLen.textContent = lnlenMystVal + "%";
  lnlenMyst.appendChild(tableSpanMystLnLen);

  var rarityImg = cE('img');
  tableSpanPureLnLenRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (lnlenPureRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + lnlenPureRarity + '.png');
    lnlenPure.appendChild(tableSpanPureLnLenRarity);
  }

  tableSpanPureLnLen.textContent = lnlenPureVal + "%";
  lnlenPure.appendChild(tableSpanPureLnLen);

  lnlenCards.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "23" || card.dataset.support !== "light_sound") {
          card.style.display = 'none';
        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  lnlenCool.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "23" || card.dataset.support !== "light_sound" || card.dataset.attr !== "cool") {
          card.style.display = 'none';
        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  lnlenCute.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "23" || card.dataset.support !== "light_sound" || card.dataset.attr !== "cute") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  lnlenHappy.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "23" || card.dataset.support !== "light_sound" || card.dataset.attr !== "happy") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  lnlenMyst.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "23" || card.dataset.support !== "light_sound" || card.dataset.attr !== "mysterious") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  lnlenPure.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "23" || card.dataset.support !== "light_sound" || card.dataset.attr !== "pure") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  // LnLuka
  const tableSpanCoolLnLuka = cE("span");
  tableSpanCoolLnLuka.className = "score-span";
  const tableSpanCoolLnLukaRarity = cE("span");
  tableSpanCoolLnLukaRarity.className = "score-rarity-span";
  const tableSpanCuteLnLuka = cE("span");
  tableSpanCuteLnLuka.className = "score-span";
  const tableSpanCuteLnLukaRarity = cE("span");
  tableSpanCoolLnLukaRarity.className = "score-rarity-span";
  const tableSpanHappyLnLuka = cE("span");
  tableSpanHappyLnLuka.className = "score-span";
  const tableSpanHappyLnLukaRarity = cE("span");
  tableSpanCoolLnLukaRarity.className = "score-rarity-span";
  const tableSpanMystLnLuka = cE("span");
  tableSpanMystLnLuka.className = "score-span";
  const tableSpanMystLnLukaRarity = cE("span");
  tableSpanCoolLnLukaRarity.className = "score-rarity-span";
  const tableSpanPureLnLuka = cE("span");
  tableSpanPureLnLuka.className = "score-span";
  const tableSpanPureLnLukaRarity = cE("span");
  tableSpanCoolLnLukaRarity.className = "score-rarity-span";

  var lnlukaTemp = [];
  var lnlukaCards = gID("ln-luka");
  var lnlukaCool = gID("cool-ln-luka");
  var lnlukaCoolVal = 0;
  var lnlukaCoolRarity = "";
  var lnlukaCute = gID("cute-ln-luka");
  var lnlukaCuteVal = 0;
  var lnlukaCuteRarity = "";
  var lnlukaHappy = gID("happy-ln-luka");
  var lnlukaHappyVal = 0;
  var lnlukaHappyRarity = "";
  var lnlukaMyst = gID("mysterious-ln-luka");
  var lnlukaMystVal = 0;
  var lnlukaMystRarity = "";
  var lnlukaPure = gID("pure-ln-luka");
  var lnlukaPureVal = 0;
  var lnlukaPureRarity = "";

  for (var i = 0; i < lnluka.length; i++) {
    if (cardsMatch.includes(lnluka[i][0][0][0])) {
      lnlukaTemp.push(lnluka[i]);
    }
  }

  lnlukaTemp.sort((a, b) => a[0][1] - b[0][1]);

  for (var i = 0; i < lnlukaTemp.length; i++) {
    var attr = lnlukaTemp[i][0][0][3];
    var lnlukaVal = lnlukaTemp[i][0][1];
    var rarity = lnlukaTemp[i][0][0][2];

    if (attr === "cool" && lnlukaVal > lnlukaCoolVal) {
      lnlukaCoolVal = lnlukaVal;
      lnlukaCoolRarity = rarity;
      //console.log(lnlukaCoolRarity);
    } else if (attr === "cute" && lnlukaVal > lnlukaCuteVal) {
      lnlukaCuteVal = lnlukaVal;
      lnlukaCuteRarity = rarity;
    } else if (attr === "happy" && lnlukaVal > lnlukaHappyVal) {
      lnlukaHappyVal = lnlukaVal;
      lnlukaHappyRarity = rarity;
    } else if (attr === "mysterious" && lnlukaVal > lnlukaMystVal) {
      lnlukaMystVal = lnlukaVal;
      lnlukaMystRarity = rarity;
    } else if (attr === "pure" && lnlukaVal > lnlukaPureVal) {
      lnlukaPureVal = lnlukaVal;
      lnlukaPureRarity = rarity;
    }
  }

  removeAllChildNodes(lnlukaCool);
  removeAllChildNodes(lnlukaCute);
  removeAllChildNodes(lnlukaHappy);
  removeAllChildNodes(lnlukaMyst);
  removeAllChildNodes(lnlukaPure);

  var rarityImg = cE('img');
  tableSpanCoolLnLukaRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (lnlukaCoolRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + lnlukaCoolRarity + '.png');
    lnlukaCool.appendChild(tableSpanCoolLnLukaRarity);
  }

  tableSpanCoolLnLuka.textContent = lnlukaCoolVal + "%";
  lnlukaCool.appendChild(tableSpanCoolLnLuka);

  var rarityImg = cE('img');
  tableSpanCuteLnLukaRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (lnlukaCuteRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + lnlukaCuteRarity + '.png');
    lnlukaCute.appendChild(tableSpanCuteLnLukaRarity);
  }

  tableSpanCuteLnLuka.textContent = lnlukaCuteVal + "%";
  lnlukaCute.appendChild(tableSpanCuteLnLuka);

  var rarityImg = cE('img');
  tableSpanHappyLnLukaRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (lnlukaHappyRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + lnlukaHappyRarity + '.png');
    lnlukaHappy.appendChild(tableSpanHappyLnLukaRarity);
  }

  tableSpanHappyLnLuka.textContent = lnlukaHappyVal + "%";
  lnlukaHappy.appendChild(tableSpanHappyLnLuka);

  var rarityImg = cE('img');
  tableSpanMystLnLukaRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (lnlukaMystRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + lnlukaMystRarity + '.png');
    lnlukaMyst.appendChild(tableSpanMystLnLukaRarity);
  }

  tableSpanMystLnLuka.textContent = lnlukaMystVal + "%";
  lnlukaMyst.appendChild(tableSpanMystLnLuka);

  var rarityImg = cE('img');
  tableSpanPureLnLukaRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (lnlukaPureRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + lnlukaPureRarity + '.png');
    lnlukaPure.appendChild(tableSpanPureLnLukaRarity);
  }

  tableSpanPureLnLuka.textContent = lnlukaPureVal + "%";
  lnlukaPure.appendChild(tableSpanPureLnLuka);

  lnlukaCards.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "24" || card.dataset.support !== "light_sound") {
          card.style.display = 'none';
        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  lnlukaCool.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "24" || card.dataset.support !== "light_sound" || card.dataset.attr !== "cool") {
          card.style.display = 'none';
        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  lnlukaCute.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "24" || card.dataset.support !== "light_sound" || card.dataset.attr !== "cute") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  lnlukaHappy.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "24" || card.dataset.support !== "light_sound" || card.dataset.attr !== "happy") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  lnlukaMyst.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "24" || card.dataset.support !== "light_sound" || card.dataset.attr !== "mysterious") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  lnlukaPure.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "24" || card.dataset.support !== "light_sound" || card.dataset.attr !== "pure") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  // LnMeiko
  const tableSpanCoolLnMeiko = cE("span");
  tableSpanCoolLnMeiko.className = "score-span";
  const tableSpanCoolLnMeikoRarity = cE("span");
  tableSpanCoolLnMeikoRarity.className = "score-rarity-span";
  const tableSpanCuteLnMeiko = cE("span");
  tableSpanCuteLnMeiko.className = "score-span";
  const tableSpanCuteLnMeikoRarity = cE("span");
  tableSpanCoolLnMeikoRarity.className = "score-rarity-span";
  const tableSpanHappyLnMeiko = cE("span");
  tableSpanHappyLnMeiko.className = "score-span";
  const tableSpanHappyLnMeikoRarity = cE("span");
  tableSpanCoolLnMeikoRarity.className = "score-rarity-span";
  const tableSpanMystLnMeiko = cE("span");
  tableSpanMystLnMeiko.className = "score-span";
  const tableSpanMystLnMeikoRarity = cE("span");
  tableSpanCoolLnMeikoRarity.className = "score-rarity-span";
  const tableSpanPureLnMeiko = cE("span");
  tableSpanPureLnMeiko.className = "score-span";
  const tableSpanPureLnMeikoRarity = cE("span");
  tableSpanCoolLnMeikoRarity.className = "score-rarity-span";

  var lnmeikoTemp = [];
  var lnmeikoCards = gID("ln-meiko");
  var lnmeikoCool = gID("cool-ln-meiko");
  var lnmeikoCoolVal = 0;
  var lnmeikoCoolRarity = "";
  var lnmeikoCute = gID("cute-ln-meiko");
  var lnmeikoCuteVal = 0;
  var lnmeikoCuteRarity = "";
  var lnmeikoHappy = gID("happy-ln-meiko");
  var lnmeikoHappyVal = 0;
  var lnmeikoHappyRarity = "";
  var lnmeikoMyst = gID("mysterious-ln-meiko");
  var lnmeikoMystVal = 0;
  var lnmeikoMystRarity = "";
  var lnmeikoPure = gID("pure-ln-meiko");
  var lnmeikoPureVal = 0;
  var lnmeikoPureRarity = "";

  for (var i = 0; i < lnmeiko.length; i++) {
    if (cardsMatch.includes(lnmeiko[i][0][0][0])) {
      lnmeikoTemp.push(lnmeiko[i]);
    }
  }

  lnmeikoTemp.sort((a, b) => a[0][1] - b[0][1]);

  for (var i = 0; i < lnmeikoTemp.length; i++) {
    var attr = lnmeikoTemp[i][0][0][3];
    var lnmeikoVal = lnmeikoTemp[i][0][1];
    var rarity = lnmeikoTemp[i][0][0][2];

    if (attr === "cool" && lnmeikoVal > lnmeikoCoolVal) {
      lnmeikoCoolVal = lnmeikoVal;
      lnmeikoCoolRarity = rarity;
      //console.log(lnmeikoCoolRarity);
    } else if (attr === "cute" && lnmeikoVal > lnmeikoCuteVal) {
      lnmeikoCuteVal = lnmeikoVal;
      lnmeikoCuteRarity = rarity;
    } else if (attr === "happy" && lnmeikoVal > lnmeikoHappyVal) {
      lnmeikoHappyVal = lnmeikoVal;
      lnmeikoHappyRarity = rarity;
    } else if (attr === "mysterious" && lnmeikoVal > lnmeikoMystVal) {
      lnmeikoMystVal = lnmeikoVal;
      lnmeikoMystRarity = rarity;
    } else if (attr === "pure" && lnmeikoVal > lnmeikoPureVal) {
      lnmeikoPureVal = lnmeikoVal;
      lnmeikoPureRarity = rarity;
    }
  }

  removeAllChildNodes(lnmeikoCool);
  removeAllChildNodes(lnmeikoCute);
  removeAllChildNodes(lnmeikoHappy);
  removeAllChildNodes(lnmeikoMyst);
  removeAllChildNodes(lnmeikoPure);

  var rarityImg = cE('img');
  tableSpanCoolLnMeikoRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (lnmeikoCoolRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + lnmeikoCoolRarity + '.png');
    lnmeikoCool.appendChild(tableSpanCoolLnMeikoRarity);
  }

  tableSpanCoolLnMeiko.textContent = lnmeikoCoolVal + "%";
  lnmeikoCool.appendChild(tableSpanCoolLnMeiko);

  var rarityImg = cE('img');
  tableSpanCuteLnMeikoRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (lnmeikoCuteRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + lnmeikoCuteRarity + '.png');
    lnmeikoCute.appendChild(tableSpanCuteLnMeikoRarity);
  }

  tableSpanCuteLnMeiko.textContent = lnmeikoCuteVal + "%";
  lnmeikoCute.appendChild(tableSpanCuteLnMeiko);

  var rarityImg = cE('img');
  tableSpanHappyLnMeikoRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (lnmeikoHappyRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + lnmeikoHappyRarity + '.png');
    lnmeikoHappy.appendChild(tableSpanHappyLnMeikoRarity);
  }

  tableSpanHappyLnMeiko.textContent = lnmeikoHappyVal + "%";
  lnmeikoHappy.appendChild(tableSpanHappyLnMeiko);

  var rarityImg = cE('img');
  tableSpanMystLnMeikoRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (lnmeikoMystRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + lnmeikoMystRarity + '.png');
    lnmeikoMyst.appendChild(tableSpanMystLnMeikoRarity);
  }

  tableSpanMystLnMeiko.textContent = lnmeikoMystVal + "%";
  lnmeikoMyst.appendChild(tableSpanMystLnMeiko);

  var rarityImg = cE('img');
  tableSpanPureLnMeikoRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (lnmeikoPureRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + lnmeikoPureRarity + '.png');
    lnmeikoPure.appendChild(tableSpanPureLnMeikoRarity);
  }

  tableSpanPureLnMeiko.textContent = lnmeikoPureVal + "%";
  lnmeikoPure.appendChild(tableSpanPureLnMeiko);

  lnmeikoCards.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "25" || card.dataset.support !== "light_sound") {
          card.style.display = 'none';
        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  lnmeikoCool.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "25" || card.dataset.support !== "light_sound" || card.dataset.attr !== "cool") {
          card.style.display = 'none';
        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  lnmeikoCute.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "25" || card.dataset.support !== "light_sound" || card.dataset.attr !== "cute") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  lnmeikoHappy.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "25" || card.dataset.support !== "light_sound" || card.dataset.attr !== "happy") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  lnmeikoMyst.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "25" || card.dataset.support !== "light_sound" || card.dataset.attr !== "mysterious") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  lnmeikoPure.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "25" || card.dataset.support !== "light_sound" || card.dataset.attr !== "pure") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  // LnKaito
  const tableSpanCoolLnKaito = cE("span");
  tableSpanCoolLnKaito.className = "score-span";
  const tableSpanCoolLnKaitoRarity = cE("span");
  tableSpanCoolLnKaitoRarity.className = "score-rarity-span";
  const tableSpanCuteLnKaito = cE("span");
  tableSpanCuteLnKaito.className = "score-span";
  const tableSpanCuteLnKaitoRarity = cE("span");
  tableSpanCoolLnKaitoRarity.className = "score-rarity-span";
  const tableSpanHappyLnKaito = cE("span");
  tableSpanHappyLnKaito.className = "score-span";
  const tableSpanHappyLnKaitoRarity = cE("span");
  tableSpanCoolLnKaitoRarity.className = "score-rarity-span";
  const tableSpanMystLnKaito = cE("span");
  tableSpanMystLnKaito.className = "score-span";
  const tableSpanMystLnKaitoRarity = cE("span");
  tableSpanCoolLnKaitoRarity.className = "score-rarity-span";
  const tableSpanPureLnKaito = cE("span");
  tableSpanPureLnKaito.className = "score-span";
  const tableSpanPureLnKaitoRarity = cE("span");
  tableSpanCoolLnKaitoRarity.className = "score-rarity-span";

  var lnkaitoTemp = [];
  var lnkaitoCards = gID("ln-kaito");
  var lnkaitoCool = gID("cool-ln-kaito");
  var lnkaitoCoolVal = 0;
  var lnkaitoCoolRarity = "";
  var lnkaitoCute = gID("cute-ln-kaito");
  var lnkaitoCuteVal = 0;
  var lnkaitoCuteRarity = "";
  var lnkaitoHappy = gID("happy-ln-kaito");
  var lnkaitoHappyVal = 0;
  var lnkaitoHappyRarity = "";
  var lnkaitoMyst = gID("mysterious-ln-kaito");
  var lnkaitoMystVal = 0;
  var lnkaitoMystRarity = "";
  var lnkaitoPure = gID("pure-ln-kaito");
  var lnkaitoPureVal = 0;
  var lnkaitoPureRarity = "";

  for (var i = 0; i < lnkaito.length; i++) {
    if (cardsMatch.includes(lnkaito[i][0][0][0])) {
      lnkaitoTemp.push(lnkaito[i]);
    }
  }

  lnkaitoTemp.sort((a, b) => a[0][1] - b[0][1]);

  for (var i = 0; i < lnkaitoTemp.length; i++) {
    var attr = lnkaitoTemp[i][0][0][3];
    var lnkaitoVal = lnkaitoTemp[i][0][1];
    var rarity = lnkaitoTemp[i][0][0][2];

    if (attr === "cool" && lnkaitoVal > lnkaitoCoolVal) {
      lnkaitoCoolVal = lnkaitoVal;
      lnkaitoCoolRarity = rarity;
      //console.log(lnkaitoCoolRarity);
    } else if (attr === "cute" && lnkaitoVal > lnkaitoCuteVal) {
      lnkaitoCuteVal = lnkaitoVal;
      lnkaitoCuteRarity = rarity;
    } else if (attr === "happy" && lnkaitoVal > lnkaitoHappyVal) {
      lnkaitoHappyVal = lnkaitoVal;
      lnkaitoHappyRarity = rarity;
    } else if (attr === "mysterious" && lnkaitoVal > lnkaitoMystVal) {
      lnkaitoMystVal = lnkaitoVal;
      lnkaitoMystRarity = rarity;
    } else if (attr === "pure" && lnkaitoVal > lnkaitoPureVal) {
      lnkaitoPureVal = lnkaitoVal;
      lnkaitoPureRarity = rarity;
    }
  }

  removeAllChildNodes(lnkaitoCool);
  removeAllChildNodes(lnkaitoCute);
  removeAllChildNodes(lnkaitoHappy);
  removeAllChildNodes(lnkaitoMyst);
  removeAllChildNodes(lnkaitoPure);

  var rarityImg = cE('img');
  tableSpanCoolLnKaitoRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (lnkaitoCoolRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + lnkaitoCoolRarity + '.png');
    lnkaitoCool.appendChild(tableSpanCoolLnKaitoRarity);
  }

  tableSpanCoolLnKaito.textContent = lnkaitoCoolVal + "%";
  lnkaitoCool.appendChild(tableSpanCoolLnKaito);

  var rarityImg = cE('img');
  tableSpanCuteLnKaitoRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (lnkaitoCuteRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + lnkaitoCuteRarity + '.png');
    lnkaitoCute.appendChild(tableSpanCuteLnKaitoRarity);
  }

  tableSpanCuteLnKaito.textContent = lnkaitoCuteVal + "%";
  lnkaitoCute.appendChild(tableSpanCuteLnKaito);

  var rarityImg = cE('img');
  tableSpanHappyLnKaitoRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (lnkaitoHappyRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + lnkaitoHappyRarity + '.png');
    lnkaitoHappy.appendChild(tableSpanHappyLnKaitoRarity);
  }

  tableSpanHappyLnKaito.textContent = lnkaitoHappyVal + "%";
  lnkaitoHappy.appendChild(tableSpanHappyLnKaito);

  var rarityImg = cE('img');
  tableSpanMystLnKaitoRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (lnkaitoMystRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + lnkaitoMystRarity + '.png');
    lnkaitoMyst.appendChild(tableSpanMystLnKaitoRarity);
  }

  tableSpanMystLnKaito.textContent = lnkaitoMystVal + "%";
  lnkaitoMyst.appendChild(tableSpanMystLnKaito);

  var rarityImg = cE('img');
  tableSpanPureLnKaitoRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (lnkaitoPureRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + lnkaitoPureRarity + '.png');
    lnkaitoPure.appendChild(tableSpanPureLnKaitoRarity);
  }

  tableSpanPureLnKaito.textContent = lnkaitoPureVal + "%";
  lnkaitoPure.appendChild(tableSpanPureLnKaito);

  lnkaitoCards.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "26" || card.dataset.support !== "light_sound") {
          card.style.display = 'none';
        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  lnkaitoCool.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "26" || card.dataset.support !== "light_sound" || card.dataset.attr !== "cool") {
          card.style.display = 'none';
        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  lnkaitoCute.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "26" || card.dataset.support !== "light_sound" || card.dataset.attr !== "cute") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  lnkaitoHappy.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "26" || card.dataset.support !== "light_sound" || card.dataset.attr !== "happy") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  lnkaitoMyst.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "26" || card.dataset.support !== "light_sound" || card.dataset.attr !== "mysterious") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  lnkaitoPure.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "26" || card.dataset.support !== "light_sound" || card.dataset.attr !== "pure") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  // all mmj cards
  var mmjCards = gID("mmj");

  mmjCards.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "5" && card.dataset.char !== "6" && card.dataset.char !== "7" && card.dataset.char !== "8") {
          card.style.display = 'none';
        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  // cool mmj cards
  var coolMmjCards = gID("mmj-cool");

  coolMmjCards.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "5" && card.dataset.char !== "6" && card.dataset.char !== "7" && card.dataset.char !== "8" || card.dataset.attr !== "cool") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  // cute mmj cards
  var cuteMmjCards = gID("mmj-cute");

  cuteMmjCards.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "5" && card.dataset.char !== "6" && card.dataset.char !== "7" && card.dataset.char !== "8" || card.dataset.attr !== "cute") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  // happy mmj cards
  var happyMmjCards = gID("mmj-happy");

  happyMmjCards.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "5" && card.dataset.char !== "6" && card.dataset.char !== "7" && card.dataset.char !== "8" || card.dataset.attr !== "happy") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  // mysterious mmj cards
  var mystMmjCards = gID("mmj-mysterious");

  mystMmjCards.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "5" && card.dataset.char !== "6" && card.dataset.char !== "7" && card.dataset.char !== "8" || card.dataset.attr !== "mysterious") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  // pure mmj cards
  var pureMmjCards = gID("mmj-pure");

  pureMmjCards.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "5" && card.dataset.char !== "6" && card.dataset.char !== "7" && card.dataset.char !== "8" || card.dataset.attr !== "pure") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  // all mmj vs cards
  var mmjVsCards = gID("mmj-vs");

  mmjVsCards.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "21" && card.dataset.char !== "22" && card.dataset.char !== "23" && card.dataset.char !== "24" && card.dataset.char !== "25" && card.dataset.char !== "26" || card.dataset.support !== "idol") {
          card.style.display = 'none';
        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  // cool mmj vs cards
  var coolMmjVsCards = gID("mmj-vs-cool");

  coolMmjVsCards.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "21" && card.dataset.char !== "22" && card.dataset.char !== "23" && card.dataset.char !== "24" && card.dataset.char !== "25" && card.dataset.char !== "26" || card.dataset.support !== "idol" || card.dataset.attr !== "cool") {
          card.style.display = 'none';
        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  // cute mmj vs cards
  var cuteMmjVsCards = gID("mmj-vs-cute");

  cuteMmjVsCards.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "21" && card.dataset.char !== "22" && card.dataset.char !== "23" && card.dataset.char !== "24" && card.dataset.char !== "25" && card.dataset.char !== "26" || card.dataset.support !== "idol" || card.dataset.attr !== "cute") {
          card.style.display = 'none';
        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  // happy mmj vs cards
  var happyMmjVsCards = gID("mmj-vs-happy");

  happyMmjVsCards.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "21" && card.dataset.char !== "22" && card.dataset.char !== "23" && card.dataset.char !== "24" && card.dataset.char !== "25" && card.dataset.char !== "26" || card.dataset.attr !== "happy" || card.dataset.support !== "idol") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  // mysterious mmj vs cards
  var mystMmjVsCards = gID("mmj-vs-mysterious");

  mystMmjVsCards.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "21" && card.dataset.char !== "22" && card.dataset.char !== "23" && card.dataset.char !== "24" && card.dataset.char !== "25" && card.dataset.char !== "26" || card.dataset.attr !== "mysterious" || card.dataset.support !== "idol") {
          card.style.display = 'none';
        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  // pure mmj vs cards
  var pureMmjVsCards = gID("mmj-vs-pure");

  pureMmjVsCards.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "21" && card.dataset.char !== "22" && card.dataset.char !== "23" && card.dataset.char !== "24" && card.dataset.char !== "25" && card.dataset.char !== "26" || card.dataset.attr !== "pure" || card.dataset.support !== "idol") {
          card.style.display = 'none';
        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  // Minori
  const tableSpanCoolMinori = cE("span");
  tableSpanCoolMinori.className = "score-span";
  const tableSpanCoolMinoriRarity = cE("span");
  tableSpanCoolMinoriRarity.className = "score-rarity-span";
  const tableSpanCuteMinori = cE("span");
  tableSpanCuteMinori.className = "score-span";
  const tableSpanCuteMinoriRarity = cE("span");
  tableSpanCoolMinoriRarity.className = "score-rarity-span";
  const tableSpanHappyMinori = cE("span");
  tableSpanHappyMinori.className = "score-span";
  const tableSpanHappyMinoriRarity = cE("span");
  tableSpanCoolMinoriRarity.className = "score-rarity-span";
  const tableSpanMystMinori = cE("span");
  tableSpanMystMinori.className = "score-span";
  const tableSpanMystMinoriRarity = cE("span");
  tableSpanCoolMinoriRarity.className = "score-rarity-span";
  const tableSpanPureMinori = cE("span");
  tableSpanPureMinori.className = "score-span";
  const tableSpanPureMinoriRarity = cE("span");
  tableSpanCoolMinoriRarity.className = "score-rarity-span";

  var minoriTemp = [];
  var minoriCards = gID("minori");
  var minoriCool = gID("cool-minori");
  var minoriCoolVal = 0;
  var minoriCoolRarity = "";
  var minoriCute = gID("cute-minori");
  var minoriCuteVal = 0;
  var minoriCuteRarity = "";
  var minoriHappy = gID("happy-minori");
  var minoriHappyVal = 0;
  var minoriHappyRarity = "";
  var minoriMyst = gID("mysterious-minori");
  var minoriMystVal = 0;
  var minoriMystRarity = "";
  var minoriPure = gID("pure-minori");
  var minoriPureVal = 0;
  var minoriPureRarity = "";

  for (var i = 0; i < minori.length; i++) {
    if (cardsMatch.includes(minori[i][0][0][0])) {
      minoriTemp.push(minori[i]);
    }
  }

  minoriTemp.sort((a, b) => a[0][1] - b[0][1]);

  for (var i = 0; i < minoriTemp.length; i++) {
    var attr = minoriTemp[i][0][0][3];
    var minoriVal = minoriTemp[i][0][1];
    var rarity = minoriTemp[i][0][0][2];

    if (attr === "cool" && minoriVal > minoriCoolVal) {
      minoriCoolVal = minoriVal;
      minoriCoolRarity = rarity;
      //console.log(minoriCoolRarity);
    } else if (attr === "cute" && minoriVal > minoriCuteVal) {
      minoriCuteVal = minoriVal;
      minoriCuteRarity = rarity;
    } else if (attr === "happy" && minoriVal > minoriHappyVal) {
      minoriHappyVal = minoriVal;
      minoriHappyRarity = rarity;
    } else if (attr === "mysterious" && minoriVal > minoriMystVal) {
      minoriMystVal = minoriVal;
      minoriMystRarity = rarity;
    } else if (attr === "pure" && minoriVal > minoriPureVal) {
      minoriPureVal = minoriVal;
      minoriPureRarity = rarity;
    }
  }

  removeAllChildNodes(minoriCool);
  removeAllChildNodes(minoriCute);
  removeAllChildNodes(minoriHappy);
  removeAllChildNodes(minoriMyst);
  removeAllChildNodes(minoriPure);

  var rarityImg = cE('img');
  tableSpanCoolMinoriRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (minoriCoolRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + minoriCoolRarity + '.png');
    minoriCool.appendChild(tableSpanCoolMinoriRarity);
  }

  tableSpanCoolMinori.textContent = minoriCoolVal + "%";
  minoriCool.appendChild(tableSpanCoolMinori);

  var rarityImg = cE('img');
  tableSpanCuteMinoriRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (minoriCuteRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + minoriCuteRarity + '.png');
    minoriCute.appendChild(tableSpanCuteMinoriRarity);
  }

  tableSpanCuteMinori.textContent = minoriCuteVal + "%";
  minoriCute.appendChild(tableSpanCuteMinori);

  var rarityImg = cE('img');
  tableSpanHappyMinoriRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (minoriHappyRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + minoriHappyRarity + '.png');
    minoriHappy.appendChild(tableSpanHappyMinoriRarity);
  }

  tableSpanHappyMinori.textContent = minoriHappyVal + "%";
  minoriHappy.appendChild(tableSpanHappyMinori);

  var rarityImg = cE('img');
  tableSpanMystMinoriRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (minoriMystRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + minoriMystRarity + '.png');
    minoriMyst.appendChild(tableSpanMystMinoriRarity);
  }

  tableSpanMystMinori.textContent = minoriMystVal + "%";
  minoriMyst.appendChild(tableSpanMystMinori);

  var rarityImg = cE('img');
  tableSpanPureMinoriRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (minoriPureRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + minoriPureRarity + '.png');
    minoriPure.appendChild(tableSpanPureMinoriRarity);
  }

  tableSpanPureMinori.textContent = minoriPureVal + "%";
  minoriPure.appendChild(tableSpanPureMinori);

  minoriCards.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "5") {
          card.style.display = 'none';
        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  minoriCool.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "5" || card.dataset.attr !== "cool") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  minoriCute.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "5" || card.dataset.attr !== "cute") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  minoriHappy.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "5" || card.dataset.attr !== "happy") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  minoriMyst.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "5" || card.dataset.attr !== "mysterious") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  minoriPure.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "5" || card.dataset.attr !== "pure") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  // Haruka
  const tableSpanCoolHaruka = cE("span");
  tableSpanCoolHaruka.className = "score-span";
  const tableSpanCoolHarukaRarity = cE("span");
  tableSpanCoolHarukaRarity.className = "score-rarity-span";
  const tableSpanCuteHaruka = cE("span");
  tableSpanCuteHaruka.className = "score-span";
  const tableSpanCuteHarukaRarity = cE("span");
  tableSpanCoolHarukaRarity.className = "score-rarity-span";
  const tableSpanHappyHaruka = cE("span");
  tableSpanHappyHaruka.className = "score-span";
  const tableSpanHappyHarukaRarity = cE("span");
  tableSpanCoolHarukaRarity.className = "score-rarity-span";
  const tableSpanMystHaruka = cE("span");
  tableSpanMystHaruka.className = "score-span";
  const tableSpanMystHarukaRarity = cE("span");
  tableSpanCoolHarukaRarity.className = "score-rarity-span";
  const tableSpanPureHaruka = cE("span");
  tableSpanPureHaruka.className = "score-span";
  const tableSpanPureHarukaRarity = cE("span");
  tableSpanCoolHarukaRarity.className = "score-rarity-span";

  var harukaTemp = [];
  var harukaCards = gID("haruka");
  var harukaCool = gID("cool-haruka");
  var harukaCoolVal = 0;
  var harukaCoolRarity = "";
  var harukaCute = gID("cute-haruka");
  var harukaCuteVal = 0;
  var harukaCuteRarity = "";
  var harukaHappy = gID("happy-haruka");
  var harukaHappyVal = 0;
  var harukaHappyRarity = "";
  var harukaMyst = gID("mysterious-haruka");
  var harukaMystVal = 0;
  var harukaMystRarity = "";
  var harukaPure = gID("pure-haruka");
  var harukaPureVal = 0;
  var harukaPureRarity = "";

  for (var i = 0; i < haruka.length; i++) {
    if (cardsMatch.includes(haruka[i][0][0][0])) {
      harukaTemp.push(haruka[i]);
    }
  }

  harukaTemp.sort((a, b) => a[0][1] - b[0][1]);

  for (var i = 0; i < harukaTemp.length; i++) {
    var attr = harukaTemp[i][0][0][3];
    var harukaVal = harukaTemp[i][0][1];
    var rarity = harukaTemp[i][0][0][2];

    if (attr === "cool" && harukaVal > harukaCoolVal) {
      harukaCoolVal = harukaVal;
      harukaCoolRarity = rarity;
      //console.log(harukaCoolRarity);
    } else if (attr === "cute" && harukaVal > harukaCuteVal) {
      harukaCuteVal = harukaVal;
      harukaCuteRarity = rarity;
    } else if (attr === "happy" && harukaVal > harukaHappyVal) {
      harukaHappyVal = harukaVal;
      harukaHappyRarity = rarity;
    } else if (attr === "mysterious" && harukaVal > harukaMystVal) {
      harukaMystVal = harukaVal;
      harukaMystRarity = rarity;
    } else if (attr === "pure" && harukaVal > harukaPureVal) {
      harukaPureVal = harukaVal;
      harukaPureRarity = rarity;
    }
  }

  removeAllChildNodes(harukaCool);
  removeAllChildNodes(harukaCute);
  removeAllChildNodes(harukaHappy);
  removeAllChildNodes(harukaMyst);
  removeAllChildNodes(harukaPure);

  var rarityImg = cE('img');
  tableSpanCoolHarukaRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (harukaCoolRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + harukaCoolRarity + '.png');
    harukaCool.appendChild(tableSpanCoolHarukaRarity);
  }

  tableSpanCoolHaruka.textContent = harukaCoolVal + "%";
  harukaCool.appendChild(tableSpanCoolHaruka);

  var rarityImg = cE('img');
  tableSpanCuteHarukaRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (harukaCuteRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + harukaCuteRarity + '.png');
    harukaCute.appendChild(tableSpanCuteHarukaRarity);
  }

  tableSpanCuteHaruka.textContent = harukaCuteVal + "%";
  harukaCute.appendChild(tableSpanCuteHaruka);

  var rarityImg = cE('img');
  tableSpanHappyHarukaRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (harukaHappyRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + harukaHappyRarity + '.png');
    harukaHappy.appendChild(tableSpanHappyHarukaRarity);
  }

  tableSpanHappyHaruka.textContent = harukaHappyVal + "%";
  harukaHappy.appendChild(tableSpanHappyHaruka);

  var rarityImg = cE('img');
  tableSpanMystHarukaRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (harukaMystRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + harukaMystRarity + '.png');
    harukaMyst.appendChild(tableSpanMystHarukaRarity);
  }

  tableSpanMystHaruka.textContent = harukaMystVal + "%";
  harukaMyst.appendChild(tableSpanMystHaruka);

  var rarityImg = cE('img');
  tableSpanPureHarukaRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (harukaPureRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + harukaPureRarity + '.png');
    harukaPure.appendChild(tableSpanPureHarukaRarity);
  }

  tableSpanPureHaruka.textContent = harukaPureVal + "%";
  harukaPure.appendChild(tableSpanPureHaruka);

  harukaCards.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "6") {
          card.style.display = 'none';
        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  harukaCool.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "6" || card.dataset.attr !== "cool") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  harukaCute.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "6" || card.dataset.attr !== "cute") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  harukaHappy.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "6" || card.dataset.attr !== "happy") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  harukaMyst.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "6" || card.dataset.attr !== "mysterious") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  harukaPure.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "6" || card.dataset.attr !== "pure") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  // Airi
  const tableSpanCoolAiri = cE("span");
  tableSpanCoolAiri.className = "score-span";
  const tableSpanCoolAiriRarity = cE("span");
  tableSpanCoolAiriRarity.className = "score-rarity-span";
  const tableSpanCuteAiri = cE("span");
  tableSpanCuteAiri.className = "score-span";
  const tableSpanCuteAiriRarity = cE("span");
  tableSpanCoolAiriRarity.className = "score-rarity-span";
  const tableSpanHappyAiri = cE("span");
  tableSpanHappyAiri.className = "score-span";
  const tableSpanHappyAiriRarity = cE("span");
  tableSpanCoolAiriRarity.className = "score-rarity-span";
  const tableSpanMystAiri = cE("span");
  tableSpanMystAiri.className = "score-span";
  const tableSpanMystAiriRarity = cE("span");
  tableSpanCoolAiriRarity.className = "score-rarity-span";
  const tableSpanPureAiri = cE("span");
  tableSpanPureAiri.className = "score-span";
  const tableSpanPureAiriRarity = cE("span");
  tableSpanCoolAiriRarity.className = "score-rarity-span";

  var airiTemp = [];
  var airiCards = gID("airi");
  var airiCool = gID("cool-airi");
  var airiCoolVal = 0;
  var airiCoolRarity = "";
  var airiCute = gID("cute-airi");
  var airiCuteVal = 0;
  var airiCuteRarity = "";
  var airiHappy = gID("happy-airi");
  var airiHappyVal = 0;
  var airiHappyRarity = "";
  var airiMyst = gID("mysterious-airi");
  var airiMystVal = 0;
  var airiMystRarity = "";
  var airiPure = gID("pure-airi");
  var airiPureVal = 0;
  var airiPureRarity = "";

  for (var i = 0; i < airi.length; i++) {
    if (cardsMatch.includes(airi[i][0][0][0])) {
      airiTemp.push(airi[i]);
    }
  }

  airiTemp.sort((a, b) => a[0][1] - b[0][1]);

  for (var i = 0; i < airiTemp.length; i++) {
    var attr = airiTemp[i][0][0][3];
    var airiVal = airiTemp[i][0][1];
    var rarity = airiTemp[i][0][0][2];

    if (attr === "cool" && airiVal > airiCoolVal) {
      airiCoolVal = airiVal;
      airiCoolRarity = rarity;
      //console.log(airiCoolRarity);
    } else if (attr === "cute" && airiVal > airiCuteVal) {
      airiCuteVal = airiVal;
      airiCuteRarity = rarity;
    } else if (attr === "happy" && airiVal > airiHappyVal) {
      airiHappyVal = airiVal;
      airiHappyRarity = rarity;
    } else if (attr === "mysterious" && airiVal > airiMystVal) {
      airiMystVal = airiVal;
      airiMystRarity = rarity;
    } else if (attr === "pure" && airiVal > airiPureVal) {
      airiPureVal = airiVal;
      airiPureRarity = rarity;
    }
  }

  removeAllChildNodes(airiCool);
  removeAllChildNodes(airiCute);
  removeAllChildNodes(airiHappy);
  removeAllChildNodes(airiMyst);
  removeAllChildNodes(airiPure);

  var rarityImg = cE('img');
  tableSpanCoolAiriRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (airiCoolRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + airiCoolRarity + '.png');
    airiCool.appendChild(tableSpanCoolAiriRarity);
  }

  tableSpanCoolAiri.textContent = airiCoolVal + "%";
  airiCool.appendChild(tableSpanCoolAiri);

  var rarityImg = cE('img');
  tableSpanCuteAiriRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (airiCuteRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + airiCuteRarity + '.png');
    airiCute.appendChild(tableSpanCuteAiriRarity);
  }

  tableSpanCuteAiri.textContent = airiCuteVal + "%";
  airiCute.appendChild(tableSpanCuteAiri);

  var rarityImg = cE('img');
  tableSpanHappyAiriRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (airiHappyRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + airiHappyRarity + '.png');
    airiHappy.appendChild(tableSpanHappyAiriRarity);
  }

  tableSpanHappyAiri.textContent = airiHappyVal + "%";
  airiHappy.appendChild(tableSpanHappyAiri);

  var rarityImg = cE('img');
  tableSpanMystAiriRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (airiMystRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + airiMystRarity + '.png');
    airiMyst.appendChild(tableSpanMystAiriRarity);
  }

  tableSpanMystAiri.textContent = airiMystVal + "%";
  airiMyst.appendChild(tableSpanMystAiri);

  var rarityImg = cE('img');
  tableSpanPureAiriRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (airiPureRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + airiPureRarity + '.png');
    airiPure.appendChild(tableSpanPureAiriRarity);
  }

  tableSpanPureAiri.textContent = airiPureVal + "%";
  airiPure.appendChild(tableSpanPureAiri);

  airiCards.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "7") {
          card.style.display = 'none';
        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  airiCool.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "7" || card.dataset.attr !== "cool") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  airiCute.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "7" || card.dataset.attr !== "cute") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  airiHappy.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "7" || card.dataset.attr !== "happy") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  airiMyst.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "7" || card.dataset.attr !== "mysterious") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  airiPure.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "7" || card.dataset.attr !== "pure") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  // Shizuku
  const tableSpanCoolShizuku = cE("span");
  tableSpanCoolShizuku.className = "score-span";
  const tableSpanCoolShizukuRarity = cE("span");
  tableSpanCoolShizukuRarity.className = "score-rarity-span";
  const tableSpanCuteShizuku = cE("span");
  tableSpanCuteShizuku.className = "score-span";
  const tableSpanCuteShizukuRarity = cE("span");
  tableSpanCoolShizukuRarity.className = "score-rarity-span";
  const tableSpanHappyShizuku = cE("span");
  tableSpanHappyShizuku.className = "score-span";
  const tableSpanHappyShizukuRarity = cE("span");
  tableSpanCoolShizukuRarity.className = "score-rarity-span";
  const tableSpanMystShizuku = cE("span");
  tableSpanMystShizuku.className = "score-span";
  const tableSpanMystShizukuRarity = cE("span");
  tableSpanCoolShizukuRarity.className = "score-rarity-span";
  const tableSpanPureShizuku = cE("span");
  tableSpanPureShizuku.className = "score-span";
  const tableSpanPureShizukuRarity = cE("span");
  tableSpanCoolShizukuRarity.className = "score-rarity-span";

  var shizukuTemp = [];
  var shizukuCards = gID("shizuku");
  var shizukuCool = gID("cool-shizuku");
  var shizukuCoolVal = 0;
  var shizukuCoolRarity = "";
  var shizukuCute = gID("cute-shizuku");
  var shizukuCuteVal = 0;
  var shizukuCuteRarity = "";
  var shizukuHappy = gID("happy-shizuku");
  var shizukuHappyVal = 0;
  var shizukuHappyRarity = "";
  var shizukuMyst = gID("mysterious-shizuku");
  var shizukuMystVal = 0;
  var shizukuMystRarity = "";
  var shizukuPure = gID("pure-shizuku");
  var shizukuPureVal = 0;
  var shizukuPureRarity = "";

  for (var i = 0; i < shizuku.length; i++) {
    if (cardsMatch.includes(shizuku[i][0][0][0])) {
      shizukuTemp.push(shizuku[i]);
    }
  }

  shizukuTemp.sort((a, b) => a[0][1] - b[0][1]);

  for (var i = 0; i < shizukuTemp.length; i++) {
    var attr = shizukuTemp[i][0][0][3];
    var shizukuVal = shizukuTemp[i][0][1];
    var rarity = shizukuTemp[i][0][0][2];

    if (attr === "cool" && shizukuVal > shizukuCoolVal) {
      shizukuCoolVal = shizukuVal;
      shizukuCoolRarity = rarity;
      //console.log(shizukuCoolRarity);
    } else if (attr === "cute" && shizukuVal > shizukuCuteVal) {
      shizukuCuteVal = shizukuVal;
      shizukuCuteRarity = rarity;
    } else if (attr === "happy" && shizukuVal > shizukuHappyVal) {
      shizukuHappyVal = shizukuVal;
      shizukuHappyRarity = rarity;
    } else if (attr === "mysterious" && shizukuVal > shizukuMystVal) {
      shizukuMystVal = shizukuVal;
      shizukuMystRarity = rarity;
    } else if (attr === "pure" && shizukuVal > shizukuPureVal) {
      shizukuPureVal = shizukuVal;
      shizukuPureRarity = rarity;
    }
  }

  removeAllChildNodes(shizukuCool);
  removeAllChildNodes(shizukuCute);
  removeAllChildNodes(shizukuHappy);
  removeAllChildNodes(shizukuMyst);
  removeAllChildNodes(shizukuPure);

  var rarityImg = cE('img');
  tableSpanCoolShizukuRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (shizukuCoolRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + shizukuCoolRarity + '.png');
    shizukuCool.appendChild(tableSpanCoolShizukuRarity);
  }

  tableSpanCoolShizuku.textContent = shizukuCoolVal + "%";
  shizukuCool.appendChild(tableSpanCoolShizuku);

  var rarityImg = cE('img');
  tableSpanCuteShizukuRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (shizukuCuteRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + shizukuCuteRarity + '.png');
    shizukuCute.appendChild(tableSpanCuteShizukuRarity);
  }

  tableSpanCuteShizuku.textContent = shizukuCuteVal + "%";
  shizukuCute.appendChild(tableSpanCuteShizuku);

  var rarityImg = cE('img');
  tableSpanHappyShizukuRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (shizukuHappyRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + shizukuHappyRarity + '.png');
    shizukuHappy.appendChild(tableSpanHappyShizukuRarity);
  }

  tableSpanHappyShizuku.textContent = shizukuHappyVal + "%";
  shizukuHappy.appendChild(tableSpanHappyShizuku);

  var rarityImg = cE('img');
  tableSpanMystShizukuRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (shizukuMystRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + shizukuMystRarity + '.png');
    shizukuMyst.appendChild(tableSpanMystShizukuRarity);
  }

  tableSpanMystShizuku.textContent = shizukuMystVal + "%";
  shizukuMyst.appendChild(tableSpanMystShizuku);

  var rarityImg = cE('img');
  tableSpanPureShizukuRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (shizukuPureRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + shizukuPureRarity + '.png');
    shizukuPure.appendChild(tableSpanPureShizukuRarity);
  }

  tableSpanPureShizuku.textContent = shizukuPureVal + "%";
  shizukuPure.appendChild(tableSpanPureShizuku);

  shizukuCards.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "8") {
          card.style.display = 'none';
        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  shizukuCool.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "8" || card.dataset.attr !== "cool") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  shizukuCute.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "8" || card.dataset.attr !== "cute") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  shizukuHappy.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "8" || card.dataset.attr !== "happy") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  shizukuMyst.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "8" || card.dataset.attr !== "mysterious") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  shizukuPure.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "8" || card.dataset.attr !== "pure") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  // MmjMiku
  const tableSpanCoolMmjMiku = cE("span");
  tableSpanCoolMmjMiku.className = "score-span";
  const tableSpanCoolMmjMikuRarity = cE("span");
  tableSpanCoolMmjMikuRarity.className = "score-rarity-span";
  const tableSpanCuteMmjMiku = cE("span");
  tableSpanCuteMmjMiku.className = "score-span";
  const tableSpanCuteMmjMikuRarity = cE("span");
  tableSpanCoolMmjMikuRarity.className = "score-rarity-span";
  const tableSpanHappyMmjMiku = cE("span");
  tableSpanHappyMmjMiku.className = "score-span";
  const tableSpanHappyMmjMikuRarity = cE("span");
  tableSpanCoolMmjMikuRarity.className = "score-rarity-span";
  const tableSpanMystMmjMiku = cE("span");
  tableSpanMystMmjMiku.className = "score-span";
  const tableSpanMystMmjMikuRarity = cE("span");
  tableSpanCoolMmjMikuRarity.className = "score-rarity-span";
  const tableSpanPureMmjMiku = cE("span");
  tableSpanPureMmjMiku.className = "score-span";
  const tableSpanPureMmjMikuRarity = cE("span");
  tableSpanCoolMmjMikuRarity.className = "score-rarity-span";

  var mmjmikuTemp = [];
  var mmjmikuCards = gID("mmj-miku");
  var mmjmikuCool = gID("cool-mmj-miku");
  var mmjmikuCoolVal = 0;
  var mmjmikuCoolRarity = "";
  var mmjmikuCute = gID("cute-mmj-miku");
  var mmjmikuCuteVal = 0;
  var mmjmikuCuteRarity = "";
  var mmjmikuHappy = gID("happy-mmj-miku");
  var mmjmikuHappyVal = 0;
  var mmjmikuHappyRarity = "";
  var mmjmikuMyst = gID("mysterious-mmj-miku");
  var mmjmikuMystVal = 0;
  var mmjmikuMystRarity = "";
  var mmjmikuPure = gID("pure-mmj-miku");
  var mmjmikuPureVal = 0;
  var mmjmikuPureRarity = "";

  for (var i = 0; i < mmjmiku.length; i++) {
    if (cardsMatch.includes(mmjmiku[i][0][0][0])) {
      mmjmikuTemp.push(mmjmiku[i]);
    }
  }

  mmjmikuTemp.sort((a, b) => a[0][1] - b[0][1]);

  for (var i = 0; i < mmjmikuTemp.length; i++) {
    var attr = mmjmikuTemp[i][0][0][3];
    var mmjmikuVal = mmjmikuTemp[i][0][1];
    var rarity = mmjmikuTemp[i][0][0][2];

    if (attr === "cool" && mmjmikuVal > mmjmikuCoolVal) {
      mmjmikuCoolVal = mmjmikuVal;
      mmjmikuCoolRarity = rarity;
      //console.log(mmjmikuCoolRarity);
    } else if (attr === "cute" && mmjmikuVal > mmjmikuCuteVal) {
      mmjmikuCuteVal = mmjmikuVal;
      mmjmikuCuteRarity = rarity;
    } else if (attr === "happy" && mmjmikuVal > mmjmikuHappyVal) {
      mmjmikuHappyVal = mmjmikuVal;
      mmjmikuHappyRarity = rarity;
    } else if (attr === "mysterious" && mmjmikuVal > mmjmikuMystVal) {
      mmjmikuMystVal = mmjmikuVal;
      mmjmikuMystRarity = rarity;
    } else if (attr === "pure" && mmjmikuVal > mmjmikuPureVal) {
      mmjmikuPureVal = mmjmikuVal;
      mmjmikuPureRarity = rarity;
    }
  }

  removeAllChildNodes(mmjmikuCool);
  removeAllChildNodes(mmjmikuCute);
  removeAllChildNodes(mmjmikuHappy);
  removeAllChildNodes(mmjmikuMyst);
  removeAllChildNodes(mmjmikuPure);

  var rarityImg = cE('img');
  tableSpanCoolMmjMikuRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (mmjmikuCoolRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + mmjmikuCoolRarity + '.png');
    mmjmikuCool.appendChild(tableSpanCoolMmjMikuRarity);
  }

  tableSpanCoolMmjMiku.textContent = mmjmikuCoolVal + "%";
  mmjmikuCool.appendChild(tableSpanCoolMmjMiku);

  var rarityImg = cE('img');
  tableSpanCuteMmjMikuRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (mmjmikuCuteRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + mmjmikuCuteRarity + '.png');
    mmjmikuCute.appendChild(tableSpanCuteMmjMikuRarity);
  }

  tableSpanCuteMmjMiku.textContent = mmjmikuCuteVal + "%";
  mmjmikuCute.appendChild(tableSpanCuteMmjMiku);

  var rarityImg = cE('img');
  tableSpanHappyMmjMikuRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (mmjmikuHappyRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + mmjmikuHappyRarity + '.png');
    mmjmikuHappy.appendChild(tableSpanHappyMmjMikuRarity);
  }

  tableSpanHappyMmjMiku.textContent = mmjmikuHappyVal + "%";
  mmjmikuHappy.appendChild(tableSpanHappyMmjMiku);

  var rarityImg = cE('img');
  tableSpanMystMmjMikuRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (mmjmikuMystRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + mmjmikuMystRarity + '.png');
    mmjmikuMyst.appendChild(tableSpanMystMmjMikuRarity);
  }

  tableSpanMystMmjMiku.textContent = mmjmikuMystVal + "%";
  mmjmikuMyst.appendChild(tableSpanMystMmjMiku);

  var rarityImg = cE('img');
  tableSpanPureMmjMikuRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (mmjmikuPureRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + mmjmikuPureRarity + '.png');
    mmjmikuPure.appendChild(tableSpanPureMmjMikuRarity);
  }

  tableSpanPureMmjMiku.textContent = mmjmikuPureVal + "%";
  mmjmikuPure.appendChild(tableSpanPureMmjMiku);

  mmjmikuCards.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "21" || card.dataset.support !== "idol") {
          card.style.display = 'none';
        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  mmjmikuCool.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "21" || card.dataset.support !== "idol" || card.dataset.attr !== "cool") {
          card.style.display = 'none';
        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  mmjmikuCute.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "21" || card.dataset.support !== "idol" || card.dataset.attr !== "cute") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  mmjmikuHappy.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "21" || card.dataset.support !== "idol" || card.dataset.attr !== "happy") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  mmjmikuMyst.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "21" || card.dataset.support !== "idol" || card.dataset.attr !== "mysterious") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  mmjmikuPure.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "21" || card.dataset.support !== "idol" || card.dataset.attr !== "pure") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  // MmjRin
  const tableSpanCoolMmjRin = cE("span");
  tableSpanCoolMmjRin.className = "score-span";
  const tableSpanCoolMmjRinRarity = cE("span");
  tableSpanCoolMmjRinRarity.className = "score-rarity-span";
  const tableSpanCuteMmjRin = cE("span");
  tableSpanCuteMmjRin.className = "score-span";
  const tableSpanCuteMmjRinRarity = cE("span");
  tableSpanCoolMmjRinRarity.className = "score-rarity-span";
  const tableSpanHappyMmjRin = cE("span");
  tableSpanHappyMmjRin.className = "score-span";
  const tableSpanHappyMmjRinRarity = cE("span");
  tableSpanCoolMmjRinRarity.className = "score-rarity-span";
  const tableSpanMystMmjRin = cE("span");
  tableSpanMystMmjRin.className = "score-span";
  const tableSpanMystMmjRinRarity = cE("span");
  tableSpanCoolMmjRinRarity.className = "score-rarity-span";
  const tableSpanPureMmjRin = cE("span");
  tableSpanPureMmjRin.className = "score-span";
  const tableSpanPureMmjRinRarity = cE("span");
  tableSpanCoolMmjRinRarity.className = "score-rarity-span";

  var mmjrinTemp = [];
  var mmjrinCards = gID("mmj-rin");
  var mmjrinCool = gID("cool-mmj-rin");
  var mmjrinCoolVal = 0;
  var mmjrinCoolRarity = "";
  var mmjrinCute = gID("cute-mmj-rin");
  var mmjrinCuteVal = 0;
  var mmjrinCuteRarity = "";
  var mmjrinHappy = gID("happy-mmj-rin");
  var mmjrinHappyVal = 0;
  var mmjrinHappyRarity = "";
  var mmjrinMyst = gID("mysterious-mmj-rin");
  var mmjrinMystVal = 0;
  var mmjrinMystRarity = "";
  var mmjrinPure = gID("pure-mmj-rin");
  var mmjrinPureVal = 0;
  var mmjrinPureRarity = "";

  for (var i = 0; i < mmjrin.length; i++) {
    if (cardsMatch.includes(mmjrin[i][0][0][0])) {
      mmjrinTemp.push(mmjrin[i]);
    }
  }

  mmjrinTemp.sort((a, b) => a[0][1] - b[0][1]);

  for (var i = 0; i < mmjrinTemp.length; i++) {
    var attr = mmjrinTemp[i][0][0][3];
    var mmjrinVal = mmjrinTemp[i][0][1];
    var rarity = mmjrinTemp[i][0][0][2];

    if (attr === "cool" && mmjrinVal > mmjrinCoolVal) {
      mmjrinCoolVal = mmjrinVal;
      mmjrinCoolRarity = rarity;
      //console.log(mmjrinCoolRarity);
    } else if (attr === "cute" && mmjrinVal > mmjrinCuteVal) {
      mmjrinCuteVal = mmjrinVal;
      mmjrinCuteRarity = rarity;
    } else if (attr === "happy" && mmjrinVal > mmjrinHappyVal) {
      mmjrinHappyVal = mmjrinVal;
      mmjrinHappyRarity = rarity;
    } else if (attr === "mysterious" && mmjrinVal > mmjrinMystVal) {
      mmjrinMystVal = mmjrinVal;
      mmjrinMystRarity = rarity;
    } else if (attr === "pure" && mmjrinVal > mmjrinPureVal) {
      mmjrinPureVal = mmjrinVal;
      mmjrinPureRarity = rarity;
    }
  }

  removeAllChildNodes(mmjrinCool);
  removeAllChildNodes(mmjrinCute);
  removeAllChildNodes(mmjrinHappy);
  removeAllChildNodes(mmjrinMyst);
  removeAllChildNodes(mmjrinPure);

  var rarityImg = cE('img');
  tableSpanCoolMmjRinRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (mmjrinCoolRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + mmjrinCoolRarity + '.png');
    mmjrinCool.appendChild(tableSpanCoolMmjRinRarity);
  }

  tableSpanCoolMmjRin.textContent = mmjrinCoolVal + "%";
  mmjrinCool.appendChild(tableSpanCoolMmjRin);

  var rarityImg = cE('img');
  tableSpanCuteMmjRinRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (mmjrinCuteRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + mmjrinCuteRarity + '.png');
    mmjrinCute.appendChild(tableSpanCuteMmjRinRarity);
  }

  tableSpanCuteMmjRin.textContent = mmjrinCuteVal + "%";
  mmjrinCute.appendChild(tableSpanCuteMmjRin);

  var rarityImg = cE('img');
  tableSpanHappyMmjRinRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (mmjrinHappyRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + mmjrinHappyRarity + '.png');
    mmjrinHappy.appendChild(tableSpanHappyMmjRinRarity);
  }

  tableSpanHappyMmjRin.textContent = mmjrinHappyVal + "%";
  mmjrinHappy.appendChild(tableSpanHappyMmjRin);

  var rarityImg = cE('img');
  tableSpanMystMmjRinRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (mmjrinMystRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + mmjrinMystRarity + '.png');
    mmjrinMyst.appendChild(tableSpanMystMmjRinRarity);
  }

  tableSpanMystMmjRin.textContent = mmjrinMystVal + "%";
  mmjrinMyst.appendChild(tableSpanMystMmjRin);

  var rarityImg = cE('img');
  tableSpanPureMmjRinRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (mmjrinPureRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + mmjrinPureRarity + '.png');
    mmjrinPure.appendChild(tableSpanPureMmjRinRarity);
  }

  tableSpanPureMmjRin.textContent = mmjrinPureVal + "%";
  mmjrinPure.appendChild(tableSpanPureMmjRin);

  mmjrinCards.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "22" || card.dataset.support !== "idol") {
          card.style.display = 'none';
        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  mmjrinCool.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "22" || card.dataset.support !== "idol" || card.dataset.attr !== "cool") {
          card.style.display = 'none';
        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  mmjrinCute.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "22" || card.dataset.support !== "idol" || card.dataset.attr !== "cute") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  mmjrinHappy.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "22" || card.dataset.support !== "idol" || card.dataset.attr !== "happy") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  mmjrinMyst.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "22" || card.dataset.support !== "idol" || card.dataset.attr !== "mysterious") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  mmjrinPure.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "22" || card.dataset.support !== "idol" || card.dataset.attr !== "pure") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  // MmjLen
  const tableSpanCoolMmjLen = cE("span");
  tableSpanCoolMmjLen.className = "score-span";
  const tableSpanCoolMmjLenRarity = cE("span");
  tableSpanCoolMmjLenRarity.className = "score-rarity-span";
  const tableSpanCuteMmjLen = cE("span");
  tableSpanCuteMmjLen.className = "score-span";
  const tableSpanCuteMmjLenRarity = cE("span");
  tableSpanCoolMmjLenRarity.className = "score-rarity-span";
  const tableSpanHappyMmjLen = cE("span");
  tableSpanHappyMmjLen.className = "score-span";
  const tableSpanHappyMmjLenRarity = cE("span");
  tableSpanCoolMmjLenRarity.className = "score-rarity-span";
  const tableSpanMystMmjLen = cE("span");
  tableSpanMystMmjLen.className = "score-span";
  const tableSpanMystMmjLenRarity = cE("span");
  tableSpanCoolMmjLenRarity.className = "score-rarity-span";
  const tableSpanPureMmjLen = cE("span");
  tableSpanPureMmjLen.className = "score-span";
  const tableSpanPureMmjLenRarity = cE("span");
  tableSpanCoolMmjLenRarity.className = "score-rarity-span";

  var mmjlenTemp = [];
  var mmjlenCards = gID("mmj-len");
  var mmjlenCool = gID("cool-mmj-len");
  var mmjlenCoolVal = 0;
  var mmjlenCoolRarity = "";
  var mmjlenCute = gID("cute-mmj-len");
  var mmjlenCuteVal = 0;
  var mmjlenCuteRarity = "";
  var mmjlenHappy = gID("happy-mmj-len");
  var mmjlenHappyVal = 0;
  var mmjlenHappyRarity = "";
  var mmjlenMyst = gID("mysterious-mmj-len");
  var mmjlenMystVal = 0;
  var mmjlenMystRarity = "";
  var mmjlenPure = gID("pure-mmj-len");
  var mmjlenPureVal = 0;
  var mmjlenPureRarity = "";

  for (var i = 0; i < mmjlen.length; i++) {
    if (cardsMatch.includes(mmjlen[i][0][0][0])) {
      mmjlenTemp.push(mmjlen[i]);
    }
  }

  mmjlenTemp.sort((a, b) => a[0][1] - b[0][1]);

  for (var i = 0; i < mmjlenTemp.length; i++) {
    var attr = mmjlenTemp[i][0][0][3];
    var mmjlenVal = mmjlenTemp[i][0][1];
    var rarity = mmjlenTemp[i][0][0][2];

    if (attr === "cool" && mmjlenVal > mmjlenCoolVal) {
      mmjlenCoolVal = mmjlenVal;
      mmjlenCoolRarity = rarity;
      //console.log(mmjlenCoolRarity);
    } else if (attr === "cute" && mmjlenVal > mmjlenCuteVal) {
      mmjlenCuteVal = mmjlenVal;
      mmjlenCuteRarity = rarity;
    } else if (attr === "happy" && mmjlenVal > mmjlenHappyVal) {
      mmjlenHappyVal = mmjlenVal;
      mmjlenHappyRarity = rarity;
    } else if (attr === "mysterious" && mmjlenVal > mmjlenMystVal) {
      mmjlenMystVal = mmjlenVal;
      mmjlenMystRarity = rarity;
    } else if (attr === "pure" && mmjlenVal > mmjlenPureVal) {
      mmjlenPureVal = mmjlenVal;
      mmjlenPureRarity = rarity;
    }
  }

  removeAllChildNodes(mmjlenCool);
  removeAllChildNodes(mmjlenCute);
  removeAllChildNodes(mmjlenHappy);
  removeAllChildNodes(mmjlenMyst);
  removeAllChildNodes(mmjlenPure);

  var rarityImg = cE('img');
  tableSpanCoolMmjLenRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (mmjlenCoolRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + mmjlenCoolRarity + '.png');
    mmjlenCool.appendChild(tableSpanCoolMmjLenRarity);
  }

  tableSpanCoolMmjLen.textContent = mmjlenCoolVal + "%";
  mmjlenCool.appendChild(tableSpanCoolMmjLen);

  var rarityImg = cE('img');
  tableSpanCuteMmjLenRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (mmjlenCuteRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + mmjlenCuteRarity + '.png');
    mmjlenCute.appendChild(tableSpanCuteMmjLenRarity);
  }

  tableSpanCuteMmjLen.textContent = mmjlenCuteVal + "%";
  mmjlenCute.appendChild(tableSpanCuteMmjLen);

  var rarityImg = cE('img');
  tableSpanHappyMmjLenRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (mmjlenHappyRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + mmjlenHappyRarity + '.png');
    mmjlenHappy.appendChild(tableSpanHappyMmjLenRarity);
  }

  tableSpanHappyMmjLen.textContent = mmjlenHappyVal + "%";
  mmjlenHappy.appendChild(tableSpanHappyMmjLen);

  var rarityImg = cE('img');
  tableSpanMystMmjLenRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (mmjlenMystRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + mmjlenMystRarity + '.png');
    mmjlenMyst.appendChild(tableSpanMystMmjLenRarity);
  }

  tableSpanMystMmjLen.textContent = mmjlenMystVal + "%";
  mmjlenMyst.appendChild(tableSpanMystMmjLen);

  var rarityImg = cE('img');
  tableSpanPureMmjLenRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (mmjlenPureRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + mmjlenPureRarity + '.png');
    mmjlenPure.appendChild(tableSpanPureMmjLenRarity);
  }

  tableSpanPureMmjLen.textContent = mmjlenPureVal + "%";
  mmjlenPure.appendChild(tableSpanPureMmjLen);

  mmjlenCards.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "23" || card.dataset.support !== "idol") {
          card.style.display = 'none';
        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  mmjlenCool.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "23" || card.dataset.support !== "idol" || card.dataset.attr !== "cool") {
          card.style.display = 'none';
        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  mmjlenCute.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "23" || card.dataset.support !== "idol" || card.dataset.attr !== "cute") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  mmjlenHappy.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "23" || card.dataset.support !== "idol" || card.dataset.attr !== "happy") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  mmjlenMyst.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "23" || card.dataset.support !== "idol" || card.dataset.attr !== "mysterious") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  mmjlenPure.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "23" || card.dataset.support !== "idol" || card.dataset.attr !== "pure") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  // MmjLuka
  const tableSpanCoolMmjLuka = cE("span");
  tableSpanCoolMmjLuka.className = "score-span";
  const tableSpanCoolMmjLukaRarity = cE("span");
  tableSpanCoolMmjLukaRarity.className = "score-rarity-span";
  const tableSpanCuteMmjLuka = cE("span");
  tableSpanCuteMmjLuka.className = "score-span";
  const tableSpanCuteMmjLukaRarity = cE("span");
  tableSpanCoolMmjLukaRarity.className = "score-rarity-span";
  const tableSpanHappyMmjLuka = cE("span");
  tableSpanHappyMmjLuka.className = "score-span";
  const tableSpanHappyMmjLukaRarity = cE("span");
  tableSpanCoolMmjLukaRarity.className = "score-rarity-span";
  const tableSpanMystMmjLuka = cE("span");
  tableSpanMystMmjLuka.className = "score-span";
  const tableSpanMystMmjLukaRarity = cE("span");
  tableSpanCoolMmjLukaRarity.className = "score-rarity-span";
  const tableSpanPureMmjLuka = cE("span");
  tableSpanPureMmjLuka.className = "score-span";
  const tableSpanPureMmjLukaRarity = cE("span");
  tableSpanCoolMmjLukaRarity.className = "score-rarity-span";

  var mmjlukaTemp = [];
  var mmjlukaCards = gID("mmj-luka");
  var mmjlukaCool = gID("cool-mmj-luka");
  var mmjlukaCoolVal = 0;
  var mmjlukaCoolRarity = "";
  var mmjlukaCute = gID("cute-mmj-luka");
  var mmjlukaCuteVal = 0;
  var mmjlukaCuteRarity = "";
  var mmjlukaHappy = gID("happy-mmj-luka");
  var mmjlukaHappyVal = 0;
  var mmjlukaHappyRarity = "";
  var mmjlukaMyst = gID("mysterious-mmj-luka");
  var mmjlukaMystVal = 0;
  var mmjlukaMystRarity = "";
  var mmjlukaPure = gID("pure-mmj-luka");
  var mmjlukaPureVal = 0;
  var mmjlukaPureRarity = "";

  for (var i = 0; i < mmjluka.length; i++) {
    if (cardsMatch.includes(mmjluka[i][0][0][0])) {
      mmjlukaTemp.push(mmjluka[i]);
    }
  }

  mmjlukaTemp.sort((a, b) => a[0][1] - b[0][1]);

  for (var i = 0; i < mmjlukaTemp.length; i++) {
    var attr = mmjlukaTemp[i][0][0][3];
    var mmjlukaVal = mmjlukaTemp[i][0][1];
    var rarity = mmjlukaTemp[i][0][0][2];

    if (attr === "cool" && mmjlukaVal > mmjlukaCoolVal) {
      mmjlukaCoolVal = mmjlukaVal;
      mmjlukaCoolRarity = rarity;
      //console.log(mmjlukaCoolRarity);
    } else if (attr === "cute" && mmjlukaVal > mmjlukaCuteVal) {
      mmjlukaCuteVal = mmjlukaVal;
      mmjlukaCuteRarity = rarity;
    } else if (attr === "happy" && mmjlukaVal > mmjlukaHappyVal) {
      mmjlukaHappyVal = mmjlukaVal;
      mmjlukaHappyRarity = rarity;
    } else if (attr === "mysterious" && mmjlukaVal > mmjlukaMystVal) {
      mmjlukaMystVal = mmjlukaVal;
      mmjlukaMystRarity = rarity;
    } else if (attr === "pure" && mmjlukaVal > mmjlukaPureVal) {
      mmjlukaPureVal = mmjlukaVal;
      mmjlukaPureRarity = rarity;
    }
  }

  removeAllChildNodes(mmjlukaCool);
  removeAllChildNodes(mmjlukaCute);
  removeAllChildNodes(mmjlukaHappy);
  removeAllChildNodes(mmjlukaMyst);
  removeAllChildNodes(mmjlukaPure);

  var rarityImg = cE('img');
  tableSpanCoolMmjLukaRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (mmjlukaCoolRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + mmjlukaCoolRarity + '.png');
    mmjlukaCool.appendChild(tableSpanCoolMmjLukaRarity);
  }

  tableSpanCoolMmjLuka.textContent = mmjlukaCoolVal + "%";
  mmjlukaCool.appendChild(tableSpanCoolMmjLuka);

  var rarityImg = cE('img');
  tableSpanCuteMmjLukaRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (mmjlukaCuteRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + mmjlukaCuteRarity + '.png');
    mmjlukaCute.appendChild(tableSpanCuteMmjLukaRarity);
  }

  tableSpanCuteMmjLuka.textContent = mmjlukaCuteVal + "%";
  mmjlukaCute.appendChild(tableSpanCuteMmjLuka);

  var rarityImg = cE('img');
  tableSpanHappyMmjLukaRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (mmjlukaHappyRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + mmjlukaHappyRarity + '.png');
    mmjlukaHappy.appendChild(tableSpanHappyMmjLukaRarity);
  }

  tableSpanHappyMmjLuka.textContent = mmjlukaHappyVal + "%";
  mmjlukaHappy.appendChild(tableSpanHappyMmjLuka);

  var rarityImg = cE('img');
  tableSpanMystMmjLukaRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (mmjlukaMystRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + mmjlukaMystRarity + '.png');
    mmjlukaMyst.appendChild(tableSpanMystMmjLukaRarity);
  }

  tableSpanMystMmjLuka.textContent = mmjlukaMystVal + "%";
  mmjlukaMyst.appendChild(tableSpanMystMmjLuka);

  var rarityImg = cE('img');
  tableSpanPureMmjLukaRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (mmjlukaPureRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + mmjlukaPureRarity + '.png');
    mmjlukaPure.appendChild(tableSpanPureMmjLukaRarity);
  }

  tableSpanPureMmjLuka.textContent = mmjlukaPureVal + "%";
  mmjlukaPure.appendChild(tableSpanPureMmjLuka);

  mmjlukaCards.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "24" || card.dataset.support !== "idol") {
          card.style.display = 'none';
        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  mmjlukaCool.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "24" || card.dataset.support !== "idol" || card.dataset.attr !== "cool") {
          card.style.display = 'none';
        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  mmjlukaCute.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "24" || card.dataset.support !== "idol" || card.dataset.attr !== "cute") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  mmjlukaHappy.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "24" || card.dataset.support !== "idol" || card.dataset.attr !== "happy") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  mmjlukaMyst.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "24" || card.dataset.support !== "idol" || card.dataset.attr !== "mysterious") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  mmjlukaPure.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "24" || card.dataset.support !== "idol" || card.dataset.attr !== "pure") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  // MmjMeiko
  const tableSpanCoolMmjMeiko = cE("span");
  tableSpanCoolMmjMeiko.className = "score-span";
  const tableSpanCoolMmjMeikoRarity = cE("span");
  tableSpanCoolMmjMeikoRarity.className = "score-rarity-span";
  const tableSpanCuteMmjMeiko = cE("span");
  tableSpanCuteMmjMeiko.className = "score-span";
  const tableSpanCuteMmjMeikoRarity = cE("span");
  tableSpanCoolMmjMeikoRarity.className = "score-rarity-span";
  const tableSpanHappyMmjMeiko = cE("span");
  tableSpanHappyMmjMeiko.className = "score-span";
  const tableSpanHappyMmjMeikoRarity = cE("span");
  tableSpanCoolMmjMeikoRarity.className = "score-rarity-span";
  const tableSpanMystMmjMeiko = cE("span");
  tableSpanMystMmjMeiko.className = "score-span";
  const tableSpanMystMmjMeikoRarity = cE("span");
  tableSpanCoolMmjMeikoRarity.className = "score-rarity-span";
  const tableSpanPureMmjMeiko = cE("span");
  tableSpanPureMmjMeiko.className = "score-span";
  const tableSpanPureMmjMeikoRarity = cE("span");
  tableSpanCoolMmjMeikoRarity.className = "score-rarity-span";

  var mmjmeikoTemp = [];
  var mmjmeikoCards = gID("mmj-meiko");
  var mmjmeikoCool = gID("cool-mmj-meiko");
  var mmjmeikoCoolVal = 0;
  var mmjmeikoCoolRarity = "";
  var mmjmeikoCute = gID("cute-mmj-meiko");
  var mmjmeikoCuteVal = 0;
  var mmjmeikoCuteRarity = "";
  var mmjmeikoHappy = gID("happy-mmj-meiko");
  var mmjmeikoHappyVal = 0;
  var mmjmeikoHappyRarity = "";
  var mmjmeikoMyst = gID("mysterious-mmj-meiko");
  var mmjmeikoMystVal = 0;
  var mmjmeikoMystRarity = "";
  var mmjmeikoPure = gID("pure-mmj-meiko");
  var mmjmeikoPureVal = 0;
  var mmjmeikoPureRarity = "";

  for (var i = 0; i < mmjmeiko.length; i++) {
    if (cardsMatch.includes(mmjmeiko[i][0][0][0])) {
      mmjmeikoTemp.push(mmjmeiko[i]);
    }
  }

  mmjmeikoTemp.sort((a, b) => a[0][1] - b[0][1]);

  for (var i = 0; i < mmjmeikoTemp.length; i++) {
    var attr = mmjmeikoTemp[i][0][0][3];
    var mmjmeikoVal = mmjmeikoTemp[i][0][1];
    var rarity = mmjmeikoTemp[i][0][0][2];

    if (attr === "cool" && mmjmeikoVal > mmjmeikoCoolVal) {
      mmjmeikoCoolVal = mmjmeikoVal;
      mmjmeikoCoolRarity = rarity;
      //console.log(mmjmeikoCoolRarity);
    } else if (attr === "cute" && mmjmeikoVal > mmjmeikoCuteVal) {
      mmjmeikoCuteVal = mmjmeikoVal;
      mmjmeikoCuteRarity = rarity;
    } else if (attr === "happy" && mmjmeikoVal > mmjmeikoHappyVal) {
      mmjmeikoHappyVal = mmjmeikoVal;
      mmjmeikoHappyRarity = rarity;
    } else if (attr === "mysterious" && mmjmeikoVal > mmjmeikoMystVal) {
      mmjmeikoMystVal = mmjmeikoVal;
      mmjmeikoMystRarity = rarity;
    } else if (attr === "pure" && mmjmeikoVal > mmjmeikoPureVal) {
      mmjmeikoPureVal = mmjmeikoVal;
      mmjmeikoPureRarity = rarity;
    }
  }

  removeAllChildNodes(mmjmeikoCool);
  removeAllChildNodes(mmjmeikoCute);
  removeAllChildNodes(mmjmeikoHappy);
  removeAllChildNodes(mmjmeikoMyst);
  removeAllChildNodes(mmjmeikoPure);

  var rarityImg = cE('img');
  tableSpanCoolMmjMeikoRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (mmjmeikoCoolRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + mmjmeikoCoolRarity + '.png');
    mmjmeikoCool.appendChild(tableSpanCoolMmjMeikoRarity);
  }

  tableSpanCoolMmjMeiko.textContent = mmjmeikoCoolVal + "%";
  mmjmeikoCool.appendChild(tableSpanCoolMmjMeiko);

  var rarityImg = cE('img');
  tableSpanCuteMmjMeikoRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (mmjmeikoCuteRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + mmjmeikoCuteRarity + '.png');
    mmjmeikoCute.appendChild(tableSpanCuteMmjMeikoRarity);
  }

  tableSpanCuteMmjMeiko.textContent = mmjmeikoCuteVal + "%";
  mmjmeikoCute.appendChild(tableSpanCuteMmjMeiko);

  var rarityImg = cE('img');
  tableSpanHappyMmjMeikoRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (mmjmeikoHappyRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + mmjmeikoHappyRarity + '.png');
    mmjmeikoHappy.appendChild(tableSpanHappyMmjMeikoRarity);
  }

  tableSpanHappyMmjMeiko.textContent = mmjmeikoHappyVal + "%";
  mmjmeikoHappy.appendChild(tableSpanHappyMmjMeiko);

  var rarityImg = cE('img');
  tableSpanMystMmjMeikoRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (mmjmeikoMystRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + mmjmeikoMystRarity + '.png');
    mmjmeikoMyst.appendChild(tableSpanMystMmjMeikoRarity);
  }

  tableSpanMystMmjMeiko.textContent = mmjmeikoMystVal + "%";
  mmjmeikoMyst.appendChild(tableSpanMystMmjMeiko);

  var rarityImg = cE('img');
  tableSpanPureMmjMeikoRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (mmjmeikoPureRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + mmjmeikoPureRarity + '.png');
    mmjmeikoPure.appendChild(tableSpanPureMmjMeikoRarity);
  }

  tableSpanPureMmjMeiko.textContent = mmjmeikoPureVal + "%";
  mmjmeikoPure.appendChild(tableSpanPureMmjMeiko);

  mmjmeikoCards.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "25" || card.dataset.support !== "idol") {
          card.style.display = 'none';
        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  mmjmeikoCool.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "25" || card.dataset.support !== "idol" || card.dataset.attr !== "cool") {
          card.style.display = 'none';
        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  mmjmeikoCute.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "25" || card.dataset.support !== "idol" || card.dataset.attr !== "cute") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  mmjmeikoHappy.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "25" || card.dataset.support !== "idol" || card.dataset.attr !== "happy") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  mmjmeikoMyst.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "25" || card.dataset.support !== "idol" || card.dataset.attr !== "mysterious") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  mmjmeikoPure.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "25" || card.dataset.support !== "idol" || card.dataset.attr !== "pure") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  // MmjKaito
  const tableSpanCoolMmjKaito = cE("span");
  tableSpanCoolMmjKaito.className = "score-span";
  const tableSpanCoolMmjKaitoRarity = cE("span");
  tableSpanCoolMmjKaitoRarity.className = "score-rarity-span";
  const tableSpanCuteMmjKaito = cE("span");
  tableSpanCuteMmjKaito.className = "score-span";
  const tableSpanCuteMmjKaitoRarity = cE("span");
  tableSpanCoolMmjKaitoRarity.className = "score-rarity-span";
  const tableSpanHappyMmjKaito = cE("span");
  tableSpanHappyMmjKaito.className = "score-span";
  const tableSpanHappyMmjKaitoRarity = cE("span");
  tableSpanCoolMmjKaitoRarity.className = "score-rarity-span";
  const tableSpanMystMmjKaito = cE("span");
  tableSpanMystMmjKaito.className = "score-span";
  const tableSpanMystMmjKaitoRarity = cE("span");
  tableSpanCoolMmjKaitoRarity.className = "score-rarity-span";
  const tableSpanPureMmjKaito = cE("span");
  tableSpanPureMmjKaito.className = "score-span";
  const tableSpanPureMmjKaitoRarity = cE("span");
  tableSpanCoolMmjKaitoRarity.className = "score-rarity-span";

  var mmjkaitoTemp = [];
  var mmjkaitoCards = gID("mmj-kaito");
  var mmjkaitoCool = gID("cool-mmj-kaito");
  var mmjkaitoCoolVal = 0;
  var mmjkaitoCoolRarity = "";
  var mmjkaitoCute = gID("cute-mmj-kaito");
  var mmjkaitoCuteVal = 0;
  var mmjkaitoCuteRarity = "";
  var mmjkaitoHappy = gID("happy-mmj-kaito");
  var mmjkaitoHappyVal = 0;
  var mmjkaitoHappyRarity = "";
  var mmjkaitoMyst = gID("mysterious-mmj-kaito");
  var mmjkaitoMystVal = 0;
  var mmjkaitoMystRarity = "";
  var mmjkaitoPure = gID("pure-mmj-kaito");
  var mmjkaitoPureVal = 0;
  var mmjkaitoPureRarity = "";

  for (var i = 0; i < mmjkaito.length; i++) {
    if (cardsMatch.includes(mmjkaito[i][0][0][0])) {
      mmjkaitoTemp.push(mmjkaito[i]);
    }
  }

  mmjkaitoTemp.sort((a, b) => a[0][1] - b[0][1]);

  for (var i = 0; i < mmjkaitoTemp.length; i++) {
    var attr = mmjkaitoTemp[i][0][0][3];
    var mmjkaitoVal = mmjkaitoTemp[i][0][1];
    var rarity = mmjkaitoTemp[i][0][0][2];

    if (attr === "cool" && mmjkaitoVal > mmjkaitoCoolVal) {
      mmjkaitoCoolVal = mmjkaitoVal;
      mmjkaitoCoolRarity = rarity;
      //console.log(mmjkaitoCoolRarity);
    } else if (attr === "cute" && mmjkaitoVal > mmjkaitoCuteVal) {
      mmjkaitoCuteVal = mmjkaitoVal;
      mmjkaitoCuteRarity = rarity;
    } else if (attr === "happy" && mmjkaitoVal > mmjkaitoHappyVal) {
      mmjkaitoHappyVal = mmjkaitoVal;
      mmjkaitoHappyRarity = rarity;
    } else if (attr === "mysterious" && mmjkaitoVal > mmjkaitoMystVal) {
      mmjkaitoMystVal = mmjkaitoVal;
      mmjkaitoMystRarity = rarity;
    } else if (attr === "pure" && mmjkaitoVal > mmjkaitoPureVal) {
      mmjkaitoPureVal = mmjkaitoVal;
      mmjkaitoPureRarity = rarity;
    }
  }

  removeAllChildNodes(mmjkaitoCool);
  removeAllChildNodes(mmjkaitoCute);
  removeAllChildNodes(mmjkaitoHappy);
  removeAllChildNodes(mmjkaitoMyst);
  removeAllChildNodes(mmjkaitoPure);

  var rarityImg = cE('img');
  tableSpanCoolMmjKaitoRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (mmjkaitoCoolRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + mmjkaitoCoolRarity + '.png');
    mmjkaitoCool.appendChild(tableSpanCoolMmjKaitoRarity);
  }

  tableSpanCoolMmjKaito.textContent = mmjkaitoCoolVal + "%";
  mmjkaitoCool.appendChild(tableSpanCoolMmjKaito);

  var rarityImg = cE('img');
  tableSpanCuteMmjKaitoRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (mmjkaitoCuteRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + mmjkaitoCuteRarity + '.png');
    mmjkaitoCute.appendChild(tableSpanCuteMmjKaitoRarity);
  }

  tableSpanCuteMmjKaito.textContent = mmjkaitoCuteVal + "%";
  mmjkaitoCute.appendChild(tableSpanCuteMmjKaito);

  var rarityImg = cE('img');
  tableSpanHappyMmjKaitoRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (mmjkaitoHappyRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + mmjkaitoHappyRarity + '.png');
    mmjkaitoHappy.appendChild(tableSpanHappyMmjKaitoRarity);
  }

  tableSpanHappyMmjKaito.textContent = mmjkaitoHappyVal + "%";
  mmjkaitoHappy.appendChild(tableSpanHappyMmjKaito);

  var rarityImg = cE('img');
  tableSpanMystMmjKaitoRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (mmjkaitoMystRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + mmjkaitoMystRarity + '.png');
    mmjkaitoMyst.appendChild(tableSpanMystMmjKaitoRarity);
  }

  tableSpanMystMmjKaito.textContent = mmjkaitoMystVal + "%";
  mmjkaitoMyst.appendChild(tableSpanMystMmjKaito);

  var rarityImg = cE('img');
  tableSpanPureMmjKaitoRarity.appendChild(rarityImg);
  rarityImg.className = 'rarity-img';
  if (mmjkaitoPureRarity) {
    rarityImg.setAttribute('src', '../i/icon/' + mmjkaitoPureRarity + '.png');
    mmjkaitoPure.appendChild(tableSpanPureMmjKaitoRarity);
  }

  tableSpanPureMmjKaito.textContent = mmjkaitoPureVal + "%";
  mmjkaitoPure.appendChild(tableSpanPureMmjKaito);

  mmjkaitoCards.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "26" || card.dataset.support !== "idol") {
          card.style.display = 'none';
        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  mmjkaitoCool.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "26" || card.dataset.support !== "idol" || card.dataset.attr !== "cool") {
          card.style.display = 'none';
        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  mmjkaitoCute.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "26" || card.dataset.support !== "idol" || card.dataset.attr !== "cute") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  mmjkaitoHappy.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "26" || card.dataset.support !== "idol" || card.dataset.attr !== "happy") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  mmjkaitoMyst.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "26" || card.dataset.support !== "idol" || card.dataset.attr !== "mysterious") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  mmjkaitoPure.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "26" || card.dataset.support !== "idol" || card.dataset.attr !== "pure") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  // all vbs cards
  var vbsCards = gID("vbs");

  vbsCards.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "9" && card.dataset.char !== "10" && card.dataset.char !== "11" && card.dataset.char !== "12") {
          card.style.display = 'none';
        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  // cool vbs cards
  var coolVbsCards = gID("vbs-cool");

  coolVbsCards.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "9" && card.dataset.char !== "10" && card.dataset.char !== "11" && card.dataset.char !== "12" || card.dataset.attr !== "cool") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  // cute vbs cards
  var cuteVbsCards = gID("vbs-cute");

  cuteVbsCards.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "9" && card.dataset.char !== "10" && card.dataset.char !== "11" && card.dataset.char !== "12" || card.dataset.attr !== "cute") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  // happy vbs cards
  var happyVbsCards = gID("vbs-happy");

  happyVbsCards.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "9" && card.dataset.char !== "10" && card.dataset.char !== "11" && card.dataset.char !== "12" || card.dataset.attr !== "happy") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  // mysterious vbs cards
  var mystVbsCards = gID("vbs-mysterious");

  mystVbsCards.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "9" && card.dataset.char !== "10" && card.dataset.char !== "11" && card.dataset.char !== "12" || card.dataset.attr !== "mysterious") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  // pure vbs cards
  var pureVbsCards = gID("vbs-pure");

  pureVbsCards.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "9" && card.dataset.char !== "10" && card.dataset.char !== "11" && card.dataset.char !== "12" || card.dataset.attr !== "pure") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  // all vbs vs cards
  var vbsVsCards = gID("vbs-vs");

  vbsVsCards.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "21" && card.dataset.char !== "22" && card.dataset.char !== "23" && card.dataset.char !== "24" && card.dataset.char !== "25" && card.dataset.char !== "26" || card.dataset.support !== "street") {
          card.style.display = 'none';
        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  // cool vbs vs cards
  var coolVbsVsCards = gID("vbs-vs-cool");

  coolVbsVsCards.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "21" && card.dataset.char !== "22" && card.dataset.char !== "23" && card.dataset.char !== "24" && card.dataset.char !== "25" && card.dataset.char !== "26" || card.dataset.support !== "street" || card.dataset.attr !== "cool") {
          card.style.display = 'none';
        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  // cute vbs vs cards
  var cuteVbsVsCards = gID("vbs-vs-cute");

  cuteVbsVsCards.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "21" && card.dataset.char !== "22" && card.dataset.char !== "23" && card.dataset.char !== "24" && card.dataset.char !== "25" && card.dataset.char !== "26" || card.dataset.support !== "street" || card.dataset.attr !== "cute") {
          card.style.display = 'none';
        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  // happy vbs vs cards
  var happyVbsVsCards = gID("vbs-vs-happy");

  happyVbsVsCards.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "21" && card.dataset.char !== "22" && card.dataset.char !== "23" && card.dataset.char !== "24" && card.dataset.char !== "25" && card.dataset.char !== "26" || card.dataset.attr !== "happy" || card.dataset.support !== "street") {
          card.style.display = 'none';

        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  // mysterious vbs vs cards
  var mystVbsVsCards = gID("vbs-vs-mysterious");

  mystVbsVsCards.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "21" && card.dataset.char !== "22" && card.dataset.char !== "23" && card.dataset.char !== "24" && card.dataset.char !== "25" && card.dataset.char !== "26" || card.dataset.attr !== "mysterious" || card.dataset.support !== "street") {
          card.style.display = 'none';
        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  // pure vbs vs cards
  var pureVbsVsCards = gID("vbs-vs-pure");

  pureVbsVsCards.addEventListener('click', function(event) {
    var cardIcons = document.getElementsByClassName("card-prsk");

    for (const card of cardIcons) {
      var classes = card.classList;

      if (classes.contains("active-card")) {
        if (card.dataset.char !== "21" && card.dataset.char !== "22" && card.dataset.char !== "23" && card.dataset.char !== "24" && card.dataset.char !== "25" && card.dataset.char !== "26" || card.dataset.attr !== "pure" || card.dataset.support !== "street") {
          card.style.display = 'none';
        }
        classes.toggle("active-card");
      } else {
        card.style.display = "inline-block";
        classes.toggle("active-card");
      }
    }
  });

  // Kohane
const tableSpanCoolKohane = cE("span");
tableSpanCoolKohane.className = "score-span";
const tableSpanCoolKohaneRarity = cE("span");
tableSpanCoolKohaneRarity.className = "score-rarity-span";
const tableSpanCuteKohane = cE("span");
tableSpanCuteKohane.className = "score-span";
const tableSpanCuteKohaneRarity = cE("span");
tableSpanCoolKohaneRarity.className = "score-rarity-span";
const tableSpanHappyKohane = cE("span");
tableSpanHappyKohane.className = "score-span";
const tableSpanHappyKohaneRarity = cE("span");
tableSpanCoolKohaneRarity.className = "score-rarity-span";
const tableSpanMystKohane = cE("span");
tableSpanMystKohane.className = "score-span";
const tableSpanMystKohaneRarity = cE("span");
tableSpanCoolKohaneRarity.className = "score-rarity-span";
const tableSpanPureKohane = cE("span");
tableSpanPureKohane.className = "score-span";
const tableSpanPureKohaneRarity = cE("span");
tableSpanCoolKohaneRarity.className = "score-rarity-span";

var kohaneTemp = [];
var kohaneCards = gID("kohane");
var kohaneCool = gID("cool-kohane");
var kohaneCoolVal = 0;
var kohaneCoolRarity = "";
var kohaneCute = gID("cute-kohane");
var kohaneCuteVal = 0;
var kohaneCuteRarity = "";
var kohaneHappy = gID("happy-kohane");
var kohaneHappyVal = 0;
var kohaneHappyRarity = "";
var kohaneMyst = gID("mysterious-kohane");
var kohaneMystVal = 0;
var kohaneMystRarity = "";
var kohanePure = gID("pure-kohane");
var kohanePureVal = 0;
var kohanePureRarity = "";

for (var i = 0; i < kohane.length; i++) {
  if (cardsMatch.includes(kohane[i][0][0][0])) {
    kohaneTemp.push(kohane[i]);
  }
}

kohaneTemp.sort((a, b) => a[0][1] - b[0][1]);

for (var i = 0; i < kohaneTemp.length; i++) {
  var attr = kohaneTemp[i][0][0][3];
  var kohaneVal = kohaneTemp[i][0][1];
  var rarity = kohaneTemp[i][0][0][2];

  if (attr === "cool" && kohaneVal > kohaneCoolVal) {
    kohaneCoolVal = kohaneVal;
    kohaneCoolRarity = rarity;
    //console.log(kohaneCoolRarity);
  } else if (attr === "cute" && kohaneVal > kohaneCuteVal) {
    kohaneCuteVal = kohaneVal;
    kohaneCuteRarity = rarity;
  } else if (attr === "happy" && kohaneVal > kohaneHappyVal) {
    kohaneHappyVal = kohaneVal;
    kohaneHappyRarity = rarity;
  } else if (attr === "mysterious" && kohaneVal > kohaneMystVal) {
    kohaneMystVal = kohaneVal;
    kohaneMystRarity = rarity;
  } else if (attr === "pure" && kohaneVal > kohanePureVal) {
    kohanePureVal = kohaneVal;
    kohanePureRarity = rarity;
  }
}

removeAllChildNodes(kohaneCool);
removeAllChildNodes(kohaneCute);
removeAllChildNodes(kohaneHappy);
removeAllChildNodes(kohaneMyst);
removeAllChildNodes(kohanePure);

var rarityImg = cE('img');
tableSpanCoolKohaneRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (kohaneCoolRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + kohaneCoolRarity + '.png');
  kohaneCool.appendChild(tableSpanCoolKohaneRarity);
}

tableSpanCoolKohane.textContent = kohaneCoolVal + "%";
kohaneCool.appendChild(tableSpanCoolKohane);

var rarityImg = cE('img');
tableSpanCuteKohaneRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (kohaneCuteRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + kohaneCuteRarity + '.png');
  kohaneCute.appendChild(tableSpanCuteKohaneRarity);
}

tableSpanCuteKohane.textContent = kohaneCuteVal + "%";
kohaneCute.appendChild(tableSpanCuteKohane);

var rarityImg = cE('img');
tableSpanHappyKohaneRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (kohaneHappyRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + kohaneHappyRarity + '.png');
  kohaneHappy.appendChild(tableSpanHappyKohaneRarity);
}

tableSpanHappyKohane.textContent = kohaneHappyVal + "%";
kohaneHappy.appendChild(tableSpanHappyKohane);

var rarityImg = cE('img');
tableSpanMystKohaneRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (kohaneMystRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + kohaneMystRarity + '.png');
  kohaneMyst.appendChild(tableSpanMystKohaneRarity);
}

tableSpanMystKohane.textContent = kohaneMystVal + "%";
kohaneMyst.appendChild(tableSpanMystKohane);

var rarityImg = cE('img');
tableSpanPureKohaneRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (kohanePureRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + kohanePureRarity + '.png');
  kohanePure.appendChild(tableSpanPureKohaneRarity);
}

  tableSpanPureKohane.textContent = kohanePureVal + "%";
kohanePure.appendChild(tableSpanPureKohane);

kohaneCards.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "9") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

kohaneCool.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "9" || card.dataset.attr !== "cool") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

kohaneCute.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "9" || card.dataset.attr !== "cute") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

kohaneHappy.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "9" || card.dataset.attr !== "happy") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

kohaneMyst.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "9" || card.dataset.attr !== "mysterious") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

kohanePure.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "9" || card.dataset.attr !== "pure") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

// An
const tableSpanCoolAn = cE("span");
tableSpanCoolAn.className = "score-span";
const tableSpanCoolAnRarity = cE("span");
tableSpanCoolAnRarity.className = "score-rarity-span";
const tableSpanCuteAn = cE("span");
tableSpanCuteAn.className = "score-span";
const tableSpanCuteAnRarity = cE("span");
tableSpanCoolAnRarity.className = "score-rarity-span";
const tableSpanHappyAn = cE("span");
tableSpanHappyAn.className = "score-span";
const tableSpanHappyAnRarity = cE("span");
tableSpanCoolAnRarity.className = "score-rarity-span";
const tableSpanMystAn = cE("span");
tableSpanMystAn.className = "score-span";
const tableSpanMystAnRarity = cE("span");
tableSpanCoolAnRarity.className = "score-rarity-span";
const tableSpanPureAn = cE("span");
tableSpanPureAn.className = "score-span";
const tableSpanPureAnRarity = cE("span");
tableSpanCoolAnRarity.className = "score-rarity-span";

var anTemp = [];
var anCards = gID("an");
var anCool = gID("cool-an");
var anCoolVal = 0;
var anCoolRarity = "";
var anCute = gID("cute-an");
var anCuteVal = 0;
var anCuteRarity = "";
var anHappy = gID("happy-an");
var anHappyVal = 0;
var anHappyRarity = "";
var anMyst = gID("mysterious-an");
var anMystVal = 0;
var anMystRarity = "";
var anPure = gID("pure-an");
var anPureVal = 0;
var anPureRarity = "";

for (var i = 0; i < an.length; i++) {
  if (cardsMatch.includes(an[i][0][0][0])) {
    anTemp.push(an[i]);
  }
}

anTemp.sort((a, b) => a[0][1] - b[0][1]);

for (var i = 0; i < anTemp.length; i++) {
  var attr = anTemp[i][0][0][3];
  var anVal = anTemp[i][0][1];
  var rarity = anTemp[i][0][0][2];

  if (attr === "cool" && anVal > anCoolVal) {
    anCoolVal = anVal;
    anCoolRarity = rarity;
    //console.log(anCoolRarity);
  } else if (attr === "cute" && anVal > anCuteVal) {
    anCuteVal = anVal;
    anCuteRarity = rarity;
  } else if (attr === "happy" && anVal > anHappyVal) {
    anHappyVal = anVal;
    anHappyRarity = rarity;
  } else if (attr === "mysterious" && anVal > anMystVal) {
    anMystVal = anVal;
    anMystRarity = rarity;
  } else if (attr === "pure" && anVal > anPureVal) {
    anPureVal = anVal;
    anPureRarity = rarity;
  }
}

removeAllChildNodes(anCool);
removeAllChildNodes(anCute);
removeAllChildNodes(anHappy);
removeAllChildNodes(anMyst);
removeAllChildNodes(anPure);

var rarityImg = cE('img');
tableSpanCoolAnRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (anCoolRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + anCoolRarity + '.png');
  anCool.appendChild(tableSpanCoolAnRarity);
}

tableSpanCoolAn.textContent = anCoolVal + "%";
anCool.appendChild(tableSpanCoolAn);

var rarityImg = cE('img');
tableSpanCuteAnRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (anCuteRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + anCuteRarity + '.png');
  anCute.appendChild(tableSpanCuteAnRarity);
}

tableSpanCuteAn.textContent = anCuteVal + "%";
anCute.appendChild(tableSpanCuteAn);

var rarityImg = cE('img');
tableSpanHappyAnRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (anHappyRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + anHappyRarity + '.png');
  anHappy.appendChild(tableSpanHappyAnRarity);
}

tableSpanHappyAn.textContent = anHappyVal + "%";
anHappy.appendChild(tableSpanHappyAn);

var rarityImg = cE('img');
tableSpanMystAnRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (anMystRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + anMystRarity + '.png');
  anMyst.appendChild(tableSpanMystAnRarity);
}

tableSpanMystAn.textContent = anMystVal + "%";
anMyst.appendChild(tableSpanMystAn);

var rarityImg = cE('img');
tableSpanPureAnRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (anPureRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + anPureRarity + '.png');
  anPure.appendChild(tableSpanPureAnRarity);
}

  tableSpanPureAn.textContent = anPureVal + "%";
anPure.appendChild(tableSpanPureAn);

anCards.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "10") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

anCool.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "10" || card.dataset.attr !== "cool") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

anCute.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "10" || card.dataset.attr !== "cute") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

anHappy.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "10" || card.dataset.attr !== "happy") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

anMyst.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "10" || card.dataset.attr !== "mysterious") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

anPure.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "10" || card.dataset.attr !== "pure") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

// Akito
const tableSpanCoolAkito = cE("span");
tableSpanCoolAkito.className = "score-span";
const tableSpanCoolAkitoRarity = cE("span");
tableSpanCoolAkitoRarity.className = "score-rarity-span";
const tableSpanCuteAkito = cE("span");
tableSpanCuteAkito.className = "score-span";
const tableSpanCuteAkitoRarity = cE("span");
tableSpanCoolAkitoRarity.className = "score-rarity-span";
const tableSpanHappyAkito = cE("span");
tableSpanHappyAkito.className = "score-span";
const tableSpanHappyAkitoRarity = cE("span");
tableSpanCoolAkitoRarity.className = "score-rarity-span";
const tableSpanMystAkito = cE("span");
tableSpanMystAkito.className = "score-span";
const tableSpanMystAkitoRarity = cE("span");
tableSpanCoolAkitoRarity.className = "score-rarity-span";
const tableSpanPureAkito = cE("span");
tableSpanPureAkito.className = "score-span";
const tableSpanPureAkitoRarity = cE("span");
tableSpanCoolAkitoRarity.className = "score-rarity-span";

var akitoTemp = [];
var akitoCards = gID("akito");
var akitoCool = gID("cool-akito");
var akitoCoolVal = 0;
var akitoCoolRarity = "";
var akitoCute = gID("cute-akito");
var akitoCuteVal = 0;
var akitoCuteRarity = "";
var akitoHappy = gID("happy-akito");
var akitoHappyVal = 0;
var akitoHappyRarity = "";
var akitoMyst = gID("mysterious-akito");
var akitoMystVal = 0;
var akitoMystRarity = "";
var akitoPure = gID("pure-akito");
var akitoPureVal = 0;
var akitoPureRarity = "";

for (var i = 0; i < akito.length; i++) {
  if (cardsMatch.includes(akito[i][0][0][0])) {
    akitoTemp.push(akito[i]);
  }
}

akitoTemp.sort((a, b) => a[0][1] - b[0][1]);

for (var i = 0; i < akitoTemp.length; i++) {
  var attr = akitoTemp[i][0][0][3];
  var akitoVal = akitoTemp[i][0][1];
  var rarity = akitoTemp[i][0][0][2];

  if (attr === "cool" && akitoVal > akitoCoolVal) {
    akitoCoolVal = akitoVal;
    akitoCoolRarity = rarity;
    //console.log(akitoCoolRarity);
  } else if (attr === "cute" && akitoVal > akitoCuteVal) {
    akitoCuteVal = akitoVal;
    akitoCuteRarity = rarity;
  } else if (attr === "happy" && akitoVal > akitoHappyVal) {
    akitoHappyVal = akitoVal;
    akitoHappyRarity = rarity;
  } else if (attr === "mysterious" && akitoVal > akitoMystVal) {
    akitoMystVal = akitoVal;
    akitoMystRarity = rarity;
  } else if (attr === "pure" && akitoVal > akitoPureVal) {
    akitoPureVal = akitoVal;
    akitoPureRarity = rarity;
  }
}

removeAllChildNodes(akitoCool);
removeAllChildNodes(akitoCute);
removeAllChildNodes(akitoHappy);
removeAllChildNodes(akitoMyst);
removeAllChildNodes(akitoPure);

var rarityImg = cE('img');
tableSpanCoolAkitoRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (akitoCoolRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + akitoCoolRarity + '.png');
  akitoCool.appendChild(tableSpanCoolAkitoRarity);
}

tableSpanCoolAkito.textContent = akitoCoolVal + "%";
akitoCool.appendChild(tableSpanCoolAkito);

var rarityImg = cE('img');
tableSpanCuteAkitoRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (akitoCuteRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + akitoCuteRarity + '.png');
  akitoCute.appendChild(tableSpanCuteAkitoRarity);
}

tableSpanCuteAkito.textContent = akitoCuteVal + "%";
akitoCute.appendChild(tableSpanCuteAkito);

var rarityImg = cE('img');
tableSpanHappyAkitoRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (akitoHappyRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + akitoHappyRarity + '.png');
  akitoHappy.appendChild(tableSpanHappyAkitoRarity);
}

tableSpanHappyAkito.textContent = akitoHappyVal + "%";
akitoHappy.appendChild(tableSpanHappyAkito);

var rarityImg = cE('img');
tableSpanMystAkitoRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (akitoMystRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + akitoMystRarity + '.png');
  akitoMyst.appendChild(tableSpanMystAkitoRarity);
}

tableSpanMystAkito.textContent = akitoMystVal + "%";
akitoMyst.appendChild(tableSpanMystAkito);

var rarityImg = cE('img');
tableSpanPureAkitoRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (akitoPureRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + akitoPureRarity + '.png');
  akitoPure.appendChild(tableSpanPureAkitoRarity);
}

  tableSpanPureAkito.textContent = akitoPureVal + "%";
akitoPure.appendChild(tableSpanPureAkito);

akitoCards.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "11") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

akitoCool.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "11" || card.dataset.attr !== "cool") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

akitoCute.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "11" || card.dataset.attr !== "cute") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

akitoHappy.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "11" || card.dataset.attr !== "happy") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

akitoMyst.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "11" || card.dataset.attr !== "mysterious") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

akitoPure.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "11" || card.dataset.attr !== "pure") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

// Toya
const tableSpanCoolToya = cE("span");
tableSpanCoolToya.className = "score-span";
const tableSpanCoolToyaRarity = cE("span");
tableSpanCoolToyaRarity.className = "score-rarity-span";
const tableSpanCuteToya = cE("span");
tableSpanCuteToya.className = "score-span";
const tableSpanCuteToyaRarity = cE("span");
tableSpanCoolToyaRarity.className = "score-rarity-span";
const tableSpanHappyToya = cE("span");
tableSpanHappyToya.className = "score-span";
const tableSpanHappyToyaRarity = cE("span");
tableSpanCoolToyaRarity.className = "score-rarity-span";
const tableSpanMystToya = cE("span");
tableSpanMystToya.className = "score-span";
const tableSpanMystToyaRarity = cE("span");
tableSpanCoolToyaRarity.className = "score-rarity-span";
const tableSpanPureToya = cE("span");
tableSpanPureToya.className = "score-span";
const tableSpanPureToyaRarity = cE("span");
tableSpanCoolToyaRarity.className = "score-rarity-span";

var toyaTemp = [];
var toyaCards = gID("toya");
var toyaCool = gID("cool-toya");
var toyaCoolVal = 0;
var toyaCoolRarity = "";
var toyaCute = gID("cute-toya");
var toyaCuteVal = 0;
var toyaCuteRarity = "";
var toyaHappy = gID("happy-toya");
var toyaHappyVal = 0;
var toyaHappyRarity = "";
var toyaMyst = gID("mysterious-toya");
var toyaMystVal = 0;
var toyaMystRarity = "";
var toyaPure = gID("pure-toya");
var toyaPureVal = 0;
var toyaPureRarity = "";

for (var i = 0; i < toya.length; i++) {
  if (cardsMatch.includes(toya[i][0][0][0])) {
    toyaTemp.push(toya[i]);
  }
}

toyaTemp.sort((a, b) => a[0][1] - b[0][1]);

for (var i = 0; i < toyaTemp.length; i++) {
  var attr = toyaTemp[i][0][0][3];
  var toyaVal = toyaTemp[i][0][1];
  var rarity = toyaTemp[i][0][0][2];

  if (attr === "cool" && toyaVal > toyaCoolVal) {
    toyaCoolVal = toyaVal;
    toyaCoolRarity = rarity;
    //console.log(toyaCoolRarity);
  } else if (attr === "cute" && toyaVal > toyaCuteVal) {
    toyaCuteVal = toyaVal;
    toyaCuteRarity = rarity;
  } else if (attr === "happy" && toyaVal > toyaHappyVal) {
    toyaHappyVal = toyaVal;
    toyaHappyRarity = rarity;
  } else if (attr === "mysterious" && toyaVal > toyaMystVal) {
    toyaMystVal = toyaVal;
    toyaMystRarity = rarity;
  } else if (attr === "pure" && toyaVal > toyaPureVal) {
    toyaPureVal = toyaVal;
    toyaPureRarity = rarity;
  }
}

removeAllChildNodes(toyaCool);
removeAllChildNodes(toyaCute);
removeAllChildNodes(toyaHappy);
removeAllChildNodes(toyaMyst);
removeAllChildNodes(toyaPure);

var rarityImg = cE('img');
tableSpanCoolToyaRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (toyaCoolRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + toyaCoolRarity + '.png');
  toyaCool.appendChild(tableSpanCoolToyaRarity);
}

tableSpanCoolToya.textContent = toyaCoolVal + "%";
toyaCool.appendChild(tableSpanCoolToya);

var rarityImg = cE('img');
tableSpanCuteToyaRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (toyaCuteRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + toyaCuteRarity + '.png');
  toyaCute.appendChild(tableSpanCuteToyaRarity);
}

tableSpanCuteToya.textContent = toyaCuteVal + "%";
toyaCute.appendChild(tableSpanCuteToya);

var rarityImg = cE('img');
tableSpanHappyToyaRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (toyaHappyRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + toyaHappyRarity + '.png');
  toyaHappy.appendChild(tableSpanHappyToyaRarity);
}

tableSpanHappyToya.textContent = toyaHappyVal + "%";
toyaHappy.appendChild(tableSpanHappyToya);

var rarityImg = cE('img');
tableSpanMystToyaRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (toyaMystRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + toyaMystRarity + '.png');
  toyaMyst.appendChild(tableSpanMystToyaRarity);
}

tableSpanMystToya.textContent = toyaMystVal + "%";
toyaMyst.appendChild(tableSpanMystToya);

var rarityImg = cE('img');
tableSpanPureToyaRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (toyaPureRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + toyaPureRarity + '.png');
  toyaPure.appendChild(tableSpanPureToyaRarity);
}

  tableSpanPureToya.textContent = toyaPureVal + "%";
toyaPure.appendChild(tableSpanPureToya);

toyaCards.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "12") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

toyaCool.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "12" || card.dataset.attr !== "cool") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

toyaCute.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "12" || card.dataset.attr !== "cute") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

toyaHappy.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "12" || card.dataset.attr !== "happy") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

toyaMyst.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "12" || card.dataset.attr !== "mysterious") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

toyaPure.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "12" || card.dataset.attr !== "pure") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

// VbsMiku
const tableSpanCoolVbsMiku = cE("span");
tableSpanCoolVbsMiku.className = "score-span";
const tableSpanCoolVbsMikuRarity = cE("span");
tableSpanCoolVbsMikuRarity.className = "score-rarity-span";
const tableSpanCuteVbsMiku = cE("span");
tableSpanCuteVbsMiku.className = "score-span";
const tableSpanCuteVbsMikuRarity = cE("span");
tableSpanCoolVbsMikuRarity.className = "score-rarity-span";
const tableSpanHappyVbsMiku = cE("span");
tableSpanHappyVbsMiku.className = "score-span";
const tableSpanHappyVbsMikuRarity = cE("span");
tableSpanCoolVbsMikuRarity.className = "score-rarity-span";
const tableSpanMystVbsMiku = cE("span");
tableSpanMystVbsMiku.className = "score-span";
const tableSpanMystVbsMikuRarity = cE("span");
tableSpanCoolVbsMikuRarity.className = "score-rarity-span";
const tableSpanPureVbsMiku = cE("span");
tableSpanPureVbsMiku.className = "score-span";
const tableSpanPureVbsMikuRarity = cE("span");
tableSpanCoolVbsMikuRarity.className = "score-rarity-span";

var vbsmikuTemp = [];
var vbsmikuCards = gID("vbs-miku");
var vbsmikuCool = gID("cool-vbs-miku");
var vbsmikuCoolVal = 0;
var vbsmikuCoolRarity = "";
var vbsmikuCute = gID("cute-vbs-miku");
var vbsmikuCuteVal = 0;
var vbsmikuCuteRarity = "";
var vbsmikuHappy = gID("happy-vbs-miku");
var vbsmikuHappyVal = 0;
var vbsmikuHappyRarity = "";
var vbsmikuMyst = gID("mysterious-vbs-miku");
var vbsmikuMystVal = 0;
var vbsmikuMystRarity = "";
var vbsmikuPure = gID("pure-vbs-miku");
var vbsmikuPureVal = 0;
var vbsmikuPureRarity = "";

for (var i = 0; i < vbsmiku.length; i++) {
  if (cardsMatch.includes(vbsmiku[i][0][0][0])) {
    vbsmikuTemp.push(vbsmiku[i]);
  }
}

vbsmikuTemp.sort((a, b) => a[0][1] - b[0][1]);

for (var i = 0; i < vbsmikuTemp.length; i++) {
  var attr = vbsmikuTemp[i][0][0][3];
  var vbsmikuVal = vbsmikuTemp[i][0][1];
  var rarity = vbsmikuTemp[i][0][0][2];

  if (attr === "cool" && vbsmikuVal > vbsmikuCoolVal) {
    vbsmikuCoolVal = vbsmikuVal;
    vbsmikuCoolRarity = rarity;
    //console.log(vbsmikuCoolRarity);
  } else if (attr === "cute" && vbsmikuVal > vbsmikuCuteVal) {
    vbsmikuCuteVal = vbsmikuVal;
    vbsmikuCuteRarity = rarity;
  } else if (attr === "happy" && vbsmikuVal > vbsmikuHappyVal) {
    vbsmikuHappyVal = vbsmikuVal;
    vbsmikuHappyRarity = rarity;
  } else if (attr === "mysterious" && vbsmikuVal > vbsmikuMystVal) {
    vbsmikuMystVal = vbsmikuVal;
    vbsmikuMystRarity = rarity;
  } else if (attr === "pure" && vbsmikuVal > vbsmikuPureVal) {
    vbsmikuPureVal = vbsmikuVal;
    vbsmikuPureRarity = rarity;
  }
}

removeAllChildNodes(vbsmikuCool);
removeAllChildNodes(vbsmikuCute);
removeAllChildNodes(vbsmikuHappy);
removeAllChildNodes(vbsmikuMyst);
removeAllChildNodes(vbsmikuPure);

var rarityImg = cE('img');
tableSpanCoolVbsMikuRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (vbsmikuCoolRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + vbsmikuCoolRarity + '.png');
  vbsmikuCool.appendChild(tableSpanCoolVbsMikuRarity);
}

tableSpanCoolVbsMiku.textContent = vbsmikuCoolVal + "%";
vbsmikuCool.appendChild(tableSpanCoolVbsMiku);

var rarityImg = cE('img');
tableSpanCuteVbsMikuRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (vbsmikuCuteRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + vbsmikuCuteRarity + '.png');
  vbsmikuCute.appendChild(tableSpanCuteVbsMikuRarity);
}

tableSpanCuteVbsMiku.textContent = vbsmikuCuteVal + "%";
vbsmikuCute.appendChild(tableSpanCuteVbsMiku);

var rarityImg = cE('img');
tableSpanHappyVbsMikuRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (vbsmikuHappyRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + vbsmikuHappyRarity + '.png');
  vbsmikuHappy.appendChild(tableSpanHappyVbsMikuRarity);
}

tableSpanHappyVbsMiku.textContent = vbsmikuHappyVal + "%";
vbsmikuHappy.appendChild(tableSpanHappyVbsMiku);

var rarityImg = cE('img');
tableSpanMystVbsMikuRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (vbsmikuMystRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + vbsmikuMystRarity + '.png');
  vbsmikuMyst.appendChild(tableSpanMystVbsMikuRarity);
}

tableSpanMystVbsMiku.textContent = vbsmikuMystVal + "%";
vbsmikuMyst.appendChild(tableSpanMystVbsMiku);

var rarityImg = cE('img');
tableSpanPureVbsMikuRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (vbsmikuPureRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + vbsmikuPureRarity + '.png');
  vbsmikuPure.appendChild(tableSpanPureVbsMikuRarity);
}

  tableSpanPureVbsMiku.textContent = vbsmikuPureVal + "%";
vbsmikuPure.appendChild(tableSpanPureVbsMiku);

vbsmikuCards.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "21" || card.dataset.support !== "street") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

vbsmikuCool.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "21" || card.dataset.support !== "street" || card.dataset.attr !== "cool") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

vbsmikuCute.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "21" || card.dataset.support !== "street" || card.dataset.attr !== "cute") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

vbsmikuHappy.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "21" || card.dataset.support !== "street" || card.dataset.attr !== "happy") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

vbsmikuMyst.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "21" || card.dataset.support !== "street" || card.dataset.attr !== "mysterious") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

vbsmikuPure.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "21" || card.dataset.support !== "street" || card.dataset.attr !== "pure") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

// VbsRin
const tableSpanCoolVbsRin = cE("span");
tableSpanCoolVbsRin.className = "score-span";
const tableSpanCoolVbsRinRarity = cE("span");
tableSpanCoolVbsRinRarity.className = "score-rarity-span";
const tableSpanCuteVbsRin = cE("span");
tableSpanCuteVbsRin.className = "score-span";
const tableSpanCuteVbsRinRarity = cE("span");
tableSpanCoolVbsRinRarity.className = "score-rarity-span";
const tableSpanHappyVbsRin = cE("span");
tableSpanHappyVbsRin.className = "score-span";
const tableSpanHappyVbsRinRarity = cE("span");
tableSpanCoolVbsRinRarity.className = "score-rarity-span";
const tableSpanMystVbsRin = cE("span");
tableSpanMystVbsRin.className = "score-span";
const tableSpanMystVbsRinRarity = cE("span");
tableSpanCoolVbsRinRarity.className = "score-rarity-span";
const tableSpanPureVbsRin = cE("span");
tableSpanPureVbsRin.className = "score-span";
const tableSpanPureVbsRinRarity = cE("span");
tableSpanCoolVbsRinRarity.className = "score-rarity-span";

var vbsrinTemp = [];
var vbsrinCards = gID("vbs-rin");
var vbsrinCool = gID("cool-vbs-rin");
var vbsrinCoolVal = 0;
var vbsrinCoolRarity = "";
var vbsrinCute = gID("cute-vbs-rin");
var vbsrinCuteVal = 0;
var vbsrinCuteRarity = "";
var vbsrinHappy = gID("happy-vbs-rin");
var vbsrinHappyVal = 0;
var vbsrinHappyRarity = "";
var vbsrinMyst = gID("mysterious-vbs-rin");
var vbsrinMystVal = 0;
var vbsrinMystRarity = "";
var vbsrinPure = gID("pure-vbs-rin");
var vbsrinPureVal = 0;
var vbsrinPureRarity = "";

for (var i = 0; i < vbsrin.length; i++) {
  if (cardsMatch.includes(vbsrin[i][0][0][0])) {
    vbsrinTemp.push(vbsrin[i]);
  }
}

vbsrinTemp.sort((a, b) => a[0][1] - b[0][1]);

for (var i = 0; i < vbsrinTemp.length; i++) {
  var attr = vbsrinTemp[i][0][0][3];
  var vbsrinVal = vbsrinTemp[i][0][1];
  var rarity = vbsrinTemp[i][0][0][2];

  if (attr === "cool" && vbsrinVal > vbsrinCoolVal) {
    vbsrinCoolVal = vbsrinVal;
    vbsrinCoolRarity = rarity;
    //console.log(vbsrinCoolRarity);
  } else if (attr === "cute" && vbsrinVal > vbsrinCuteVal) {
    vbsrinCuteVal = vbsrinVal;
    vbsrinCuteRarity = rarity;
  } else if (attr === "happy" && vbsrinVal > vbsrinHappyVal) {
    vbsrinHappyVal = vbsrinVal;
    vbsrinHappyRarity = rarity;
  } else if (attr === "mysterious" && vbsrinVal > vbsrinMystVal) {
    vbsrinMystVal = vbsrinVal;
    vbsrinMystRarity = rarity;
  } else if (attr === "pure" && vbsrinVal > vbsrinPureVal) {
    vbsrinPureVal = vbsrinVal;
    vbsrinPureRarity = rarity;
  }
}

removeAllChildNodes(vbsrinCool);
removeAllChildNodes(vbsrinCute);
removeAllChildNodes(vbsrinHappy);
removeAllChildNodes(vbsrinMyst);
removeAllChildNodes(vbsrinPure);

var rarityImg = cE('img');
tableSpanCoolVbsRinRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (vbsrinCoolRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + vbsrinCoolRarity + '.png');
  vbsrinCool.appendChild(tableSpanCoolVbsRinRarity);
}

tableSpanCoolVbsRin.textContent = vbsrinCoolVal + "%";
vbsrinCool.appendChild(tableSpanCoolVbsRin);

var rarityImg = cE('img');
tableSpanCuteVbsRinRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (vbsrinCuteRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + vbsrinCuteRarity + '.png');
  vbsrinCute.appendChild(tableSpanCuteVbsRinRarity);
}

tableSpanCuteVbsRin.textContent = vbsrinCuteVal + "%";
vbsrinCute.appendChild(tableSpanCuteVbsRin);

var rarityImg = cE('img');
tableSpanHappyVbsRinRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (vbsrinHappyRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + vbsrinHappyRarity + '.png');
  vbsrinHappy.appendChild(tableSpanHappyVbsRinRarity);
}

tableSpanHappyVbsRin.textContent = vbsrinHappyVal + "%";
vbsrinHappy.appendChild(tableSpanHappyVbsRin);

var rarityImg = cE('img');
tableSpanMystVbsRinRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (vbsrinMystRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + vbsrinMystRarity + '.png');
  vbsrinMyst.appendChild(tableSpanMystVbsRinRarity);
}

tableSpanMystVbsRin.textContent = vbsrinMystVal + "%";
vbsrinMyst.appendChild(tableSpanMystVbsRin);

var rarityImg = cE('img');
tableSpanPureVbsRinRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (vbsrinPureRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + vbsrinPureRarity + '.png');
  vbsrinPure.appendChild(tableSpanPureVbsRinRarity);
}

  tableSpanPureVbsRin.textContent = vbsrinPureVal + "%";
vbsrinPure.appendChild(tableSpanPureVbsRin);

vbsrinCards.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "22" || card.dataset.support !== "street") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

vbsrinCool.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "22" || card.dataset.support !== "street" || card.dataset.attr !== "cool") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

vbsrinCute.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "22" || card.dataset.support !== "street" || card.dataset.attr !== "cute") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

vbsrinHappy.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "22" || card.dataset.support !== "street" || card.dataset.attr !== "happy") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

vbsrinMyst.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "22" || card.dataset.support !== "street" || card.dataset.attr !== "mysterious") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

vbsrinPure.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "22" || card.dataset.support !== "street" || card.dataset.attr !== "pure") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

// VbsLen
const tableSpanCoolVbsLen = cE("span");
tableSpanCoolVbsLen.className = "score-span";
const tableSpanCoolVbsLenRarity = cE("span");
tableSpanCoolVbsLenRarity.className = "score-rarity-span";
const tableSpanCuteVbsLen = cE("span");
tableSpanCuteVbsLen.className = "score-span";
const tableSpanCuteVbsLenRarity = cE("span");
tableSpanCoolVbsLenRarity.className = "score-rarity-span";
const tableSpanHappyVbsLen = cE("span");
tableSpanHappyVbsLen.className = "score-span";
const tableSpanHappyVbsLenRarity = cE("span");
tableSpanCoolVbsLenRarity.className = "score-rarity-span";
const tableSpanMystVbsLen = cE("span");
tableSpanMystVbsLen.className = "score-span";
const tableSpanMystVbsLenRarity = cE("span");
tableSpanCoolVbsLenRarity.className = "score-rarity-span";
const tableSpanPureVbsLen = cE("span");
tableSpanPureVbsLen.className = "score-span";
const tableSpanPureVbsLenRarity = cE("span");
tableSpanCoolVbsLenRarity.className = "score-rarity-span";

var vbslenTemp = [];
var vbslenCards = gID("vbs-len");
var vbslenCool = gID("cool-vbs-len");
var vbslenCoolVal = 0;
var vbslenCoolRarity = "";
var vbslenCute = gID("cute-vbs-len");
var vbslenCuteVal = 0;
var vbslenCuteRarity = "";
var vbslenHappy = gID("happy-vbs-len");
var vbslenHappyVal = 0;
var vbslenHappyRarity = "";
var vbslenMyst = gID("mysterious-vbs-len");
var vbslenMystVal = 0;
var vbslenMystRarity = "";
var vbslenPure = gID("pure-vbs-len");
var vbslenPureVal = 0;
var vbslenPureRarity = "";

for (var i = 0; i < vbslen.length; i++) {
  if (cardsMatch.includes(vbslen[i][0][0][0])) {
    vbslenTemp.push(vbslen[i]);
  }
}

vbslenTemp.sort((a, b) => a[0][1] - b[0][1]);

for (var i = 0; i < vbslenTemp.length; i++) {
  var attr = vbslenTemp[i][0][0][3];
  var vbslenVal = vbslenTemp[i][0][1];
  var rarity = vbslenTemp[i][0][0][2];

  if (attr === "cool" && vbslenVal > vbslenCoolVal) {
    vbslenCoolVal = vbslenVal;
    vbslenCoolRarity = rarity;
    //console.log(vbslenCoolRarity);
  } else if (attr === "cute" && vbslenVal > vbslenCuteVal) {
    vbslenCuteVal = vbslenVal;
    vbslenCuteRarity = rarity;
  } else if (attr === "happy" && vbslenVal > vbslenHappyVal) {
    vbslenHappyVal = vbslenVal;
    vbslenHappyRarity = rarity;
  } else if (attr === "mysterious" && vbslenVal > vbslenMystVal) {
    vbslenMystVal = vbslenVal;
    vbslenMystRarity = rarity;
  } else if (attr === "pure" && vbslenVal > vbslenPureVal) {
    vbslenPureVal = vbslenVal;
    vbslenPureRarity = rarity;
  }
}

removeAllChildNodes(vbslenCool);
removeAllChildNodes(vbslenCute);
removeAllChildNodes(vbslenHappy);
removeAllChildNodes(vbslenMyst);
removeAllChildNodes(vbslenPure);

var rarityImg = cE('img');
tableSpanCoolVbsLenRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (vbslenCoolRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + vbslenCoolRarity + '.png');
  vbslenCool.appendChild(tableSpanCoolVbsLenRarity);
}

tableSpanCoolVbsLen.textContent = vbslenCoolVal + "%";
vbslenCool.appendChild(tableSpanCoolVbsLen);

var rarityImg = cE('img');
tableSpanCuteVbsLenRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (vbslenCuteRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + vbslenCuteRarity + '.png');
  vbslenCute.appendChild(tableSpanCuteVbsLenRarity);
}

tableSpanCuteVbsLen.textContent = vbslenCuteVal + "%";
vbslenCute.appendChild(tableSpanCuteVbsLen);

var rarityImg = cE('img');
tableSpanHappyVbsLenRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (vbslenHappyRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + vbslenHappyRarity + '.png');
  vbslenHappy.appendChild(tableSpanHappyVbsLenRarity);
}

tableSpanHappyVbsLen.textContent = vbslenHappyVal + "%";
vbslenHappy.appendChild(tableSpanHappyVbsLen);

var rarityImg = cE('img');
tableSpanMystVbsLenRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (vbslenMystRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + vbslenMystRarity + '.png');
  vbslenMyst.appendChild(tableSpanMystVbsLenRarity);
}

tableSpanMystVbsLen.textContent = vbslenMystVal + "%";
vbslenMyst.appendChild(tableSpanMystVbsLen);

var rarityImg = cE('img');
tableSpanPureVbsLenRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (vbslenPureRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + vbslenPureRarity + '.png');
  vbslenPure.appendChild(tableSpanPureVbsLenRarity);
}

  tableSpanPureVbsLen.textContent = vbslenPureVal + "%";
vbslenPure.appendChild(tableSpanPureVbsLen);

vbslenCards.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "23" || card.dataset.support !== "street") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

vbslenCool.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "23" || card.dataset.support !== "street" || card.dataset.attr !== "cool") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

vbslenCute.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "23" || card.dataset.support !== "street" || card.dataset.attr !== "cute") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

vbslenHappy.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "23" || card.dataset.support !== "street" || card.dataset.attr !== "happy") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

vbslenMyst.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "23" || card.dataset.support !== "street" || card.dataset.attr !== "mysterious") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

vbslenPure.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "23" || card.dataset.support !== "street" || card.dataset.attr !== "pure") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

// VbsLuka
const tableSpanCoolVbsLuka = cE("span");
tableSpanCoolVbsLuka.className = "score-span";
const tableSpanCoolVbsLukaRarity = cE("span");
tableSpanCoolVbsLukaRarity.className = "score-rarity-span";
const tableSpanCuteVbsLuka = cE("span");
tableSpanCuteVbsLuka.className = "score-span";
const tableSpanCuteVbsLukaRarity = cE("span");
tableSpanCoolVbsLukaRarity.className = "score-rarity-span";
const tableSpanHappyVbsLuka = cE("span");
tableSpanHappyVbsLuka.className = "score-span";
const tableSpanHappyVbsLukaRarity = cE("span");
tableSpanCoolVbsLukaRarity.className = "score-rarity-span";
const tableSpanMystVbsLuka = cE("span");
tableSpanMystVbsLuka.className = "score-span";
const tableSpanMystVbsLukaRarity = cE("span");
tableSpanCoolVbsLukaRarity.className = "score-rarity-span";
const tableSpanPureVbsLuka = cE("span");
tableSpanPureVbsLuka.className = "score-span";
const tableSpanPureVbsLukaRarity = cE("span");
tableSpanCoolVbsLukaRarity.className = "score-rarity-span";

var vbslukaTemp = [];
var vbslukaCards = gID("vbs-luka");
var vbslukaCool = gID("cool-vbs-luka");
var vbslukaCoolVal = 0;
var vbslukaCoolRarity = "";
var vbslukaCute = gID("cute-vbs-luka");
var vbslukaCuteVal = 0;
var vbslukaCuteRarity = "";
var vbslukaHappy = gID("happy-vbs-luka");
var vbslukaHappyVal = 0;
var vbslukaHappyRarity = "";
var vbslukaMyst = gID("mysterious-vbs-luka");
var vbslukaMystVal = 0;
var vbslukaMystRarity = "";
var vbslukaPure = gID("pure-vbs-luka");
var vbslukaPureVal = 0;
var vbslukaPureRarity = "";

for (var i = 0; i < vbsluka.length; i++) {
  if (cardsMatch.includes(vbsluka[i][0][0][0])) {
    vbslukaTemp.push(vbsluka[i]);
  }
}

vbslukaTemp.sort((a, b) => a[0][1] - b[0][1]);

for (var i = 0; i < vbslukaTemp.length; i++) {
  var attr = vbslukaTemp[i][0][0][3];
  var vbslukaVal = vbslukaTemp[i][0][1];
  var rarity = vbslukaTemp[i][0][0][2];

  if (attr === "cool" && vbslukaVal > vbslukaCoolVal) {
    vbslukaCoolVal = vbslukaVal;
    vbslukaCoolRarity = rarity;
    //console.log(vbslukaCoolRarity);
  } else if (attr === "cute" && vbslukaVal > vbslukaCuteVal) {
    vbslukaCuteVal = vbslukaVal;
    vbslukaCuteRarity = rarity;
  } else if (attr === "happy" && vbslukaVal > vbslukaHappyVal) {
    vbslukaHappyVal = vbslukaVal;
    vbslukaHappyRarity = rarity;
  } else if (attr === "mysterious" && vbslukaVal > vbslukaMystVal) {
    vbslukaMystVal = vbslukaVal;
    vbslukaMystRarity = rarity;
  } else if (attr === "pure" && vbslukaVal > vbslukaPureVal) {
    vbslukaPureVal = vbslukaVal;
    vbslukaPureRarity = rarity;
  }
}

removeAllChildNodes(vbslukaCool);
removeAllChildNodes(vbslukaCute);
removeAllChildNodes(vbslukaHappy);
removeAllChildNodes(vbslukaMyst);
removeAllChildNodes(vbslukaPure);

var rarityImg = cE('img');
tableSpanCoolVbsLukaRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (vbslukaCoolRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + vbslukaCoolRarity + '.png');
  vbslukaCool.appendChild(tableSpanCoolVbsLukaRarity);
}

tableSpanCoolVbsLuka.textContent = vbslukaCoolVal + "%";
vbslukaCool.appendChild(tableSpanCoolVbsLuka);

var rarityImg = cE('img');
tableSpanCuteVbsLukaRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (vbslukaCuteRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + vbslukaCuteRarity + '.png');
  vbslukaCute.appendChild(tableSpanCuteVbsLukaRarity);
}

tableSpanCuteVbsLuka.textContent = vbslukaCuteVal + "%";
vbslukaCute.appendChild(tableSpanCuteVbsLuka);

var rarityImg = cE('img');
tableSpanHappyVbsLukaRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (vbslukaHappyRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + vbslukaHappyRarity + '.png');
  vbslukaHappy.appendChild(tableSpanHappyVbsLukaRarity);
}

tableSpanHappyVbsLuka.textContent = vbslukaHappyVal + "%";
vbslukaHappy.appendChild(tableSpanHappyVbsLuka);

var rarityImg = cE('img');
tableSpanMystVbsLukaRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (vbslukaMystRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + vbslukaMystRarity + '.png');
  vbslukaMyst.appendChild(tableSpanMystVbsLukaRarity);
}

tableSpanMystVbsLuka.textContent = vbslukaMystVal + "%";
vbslukaMyst.appendChild(tableSpanMystVbsLuka);

var rarityImg = cE('img');
tableSpanPureVbsLukaRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (vbslukaPureRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + vbslukaPureRarity + '.png');
  vbslukaPure.appendChild(tableSpanPureVbsLukaRarity);
}

  tableSpanPureVbsLuka.textContent = vbslukaPureVal + "%";
vbslukaPure.appendChild(tableSpanPureVbsLuka);

vbslukaCards.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "24" || card.dataset.support !== "street") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

vbslukaCool.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "24" || card.dataset.support !== "street" || card.dataset.attr !== "cool") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

vbslukaCute.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "24" || card.dataset.support !== "street" || card.dataset.attr !== "cute") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

vbslukaHappy.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "24" || card.dataset.support !== "street" || card.dataset.attr !== "happy") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

vbslukaMyst.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "24" || card.dataset.support !== "street" || card.dataset.attr !== "mysterious") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

vbslukaPure.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "24" || card.dataset.support !== "street" || card.dataset.attr !== "pure") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

// VbsMeiko
const tableSpanCoolVbsMeiko = cE("span");
tableSpanCoolVbsMeiko.className = "score-span";
const tableSpanCoolVbsMeikoRarity = cE("span");
tableSpanCoolVbsMeikoRarity.className = "score-rarity-span";
const tableSpanCuteVbsMeiko = cE("span");
tableSpanCuteVbsMeiko.className = "score-span";
const tableSpanCuteVbsMeikoRarity = cE("span");
tableSpanCoolVbsMeikoRarity.className = "score-rarity-span";
const tableSpanHappyVbsMeiko = cE("span");
tableSpanHappyVbsMeiko.className = "score-span";
const tableSpanHappyVbsMeikoRarity = cE("span");
tableSpanCoolVbsMeikoRarity.className = "score-rarity-span";
const tableSpanMystVbsMeiko = cE("span");
tableSpanMystVbsMeiko.className = "score-span";
const tableSpanMystVbsMeikoRarity = cE("span");
tableSpanCoolVbsMeikoRarity.className = "score-rarity-span";
const tableSpanPureVbsMeiko = cE("span");
tableSpanPureVbsMeiko.className = "score-span";
const tableSpanPureVbsMeikoRarity = cE("span");
tableSpanCoolVbsMeikoRarity.className = "score-rarity-span";

var vbsmeikoTemp = [];
var vbsmeikoCards = gID("vbs-meiko");
var vbsmeikoCool = gID("cool-vbs-meiko");
var vbsmeikoCoolVal = 0;
var vbsmeikoCoolRarity = "";
var vbsmeikoCute = gID("cute-vbs-meiko");
var vbsmeikoCuteVal = 0;
var vbsmeikoCuteRarity = "";
var vbsmeikoHappy = gID("happy-vbs-meiko");
var vbsmeikoHappyVal = 0;
var vbsmeikoHappyRarity = "";
var vbsmeikoMyst = gID("mysterious-vbs-meiko");
var vbsmeikoMystVal = 0;
var vbsmeikoMystRarity = "";
var vbsmeikoPure = gID("pure-vbs-meiko");
var vbsmeikoPureVal = 0;
var vbsmeikoPureRarity = "";

for (var i = 0; i < vbsmeiko.length; i++) {
  if (cardsMatch.includes(vbsmeiko[i][0][0][0])) {
    vbsmeikoTemp.push(vbsmeiko[i]);
  }
}

vbsmeikoTemp.sort((a, b) => a[0][1] - b[0][1]);

for (var i = 0; i < vbsmeikoTemp.length; i++) {
  var attr = vbsmeikoTemp[i][0][0][3];
  var vbsmeikoVal = vbsmeikoTemp[i][0][1];
  var rarity = vbsmeikoTemp[i][0][0][2];

  if (attr === "cool" && vbsmeikoVal > vbsmeikoCoolVal) {
    vbsmeikoCoolVal = vbsmeikoVal;
    vbsmeikoCoolRarity = rarity;
    //console.log(vbsmeikoCoolRarity);
  } else if (attr === "cute" && vbsmeikoVal > vbsmeikoCuteVal) {
    vbsmeikoCuteVal = vbsmeikoVal;
    vbsmeikoCuteRarity = rarity;
  } else if (attr === "happy" && vbsmeikoVal > vbsmeikoHappyVal) {
    vbsmeikoHappyVal = vbsmeikoVal;
    vbsmeikoHappyRarity = rarity;
  } else if (attr === "mysterious" && vbsmeikoVal > vbsmeikoMystVal) {
    vbsmeikoMystVal = vbsmeikoVal;
    vbsmeikoMystRarity = rarity;
  } else if (attr === "pure" && vbsmeikoVal > vbsmeikoPureVal) {
    vbsmeikoPureVal = vbsmeikoVal;
    vbsmeikoPureRarity = rarity;
  }
}

removeAllChildNodes(vbsmeikoCool);
removeAllChildNodes(vbsmeikoCute);
removeAllChildNodes(vbsmeikoHappy);
removeAllChildNodes(vbsmeikoMyst);
removeAllChildNodes(vbsmeikoPure);

var rarityImg = cE('img');
tableSpanCoolVbsMeikoRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (vbsmeikoCoolRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + vbsmeikoCoolRarity + '.png');
  vbsmeikoCool.appendChild(tableSpanCoolVbsMeikoRarity);
}

tableSpanCoolVbsMeiko.textContent = vbsmeikoCoolVal + "%";
vbsmeikoCool.appendChild(tableSpanCoolVbsMeiko);

var rarityImg = cE('img');
tableSpanCuteVbsMeikoRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (vbsmeikoCuteRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + vbsmeikoCuteRarity + '.png');
  vbsmeikoCute.appendChild(tableSpanCuteVbsMeikoRarity);
}

tableSpanCuteVbsMeiko.textContent = vbsmeikoCuteVal + "%";
vbsmeikoCute.appendChild(tableSpanCuteVbsMeiko);

var rarityImg = cE('img');
tableSpanHappyVbsMeikoRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (vbsmeikoHappyRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + vbsmeikoHappyRarity + '.png');
  vbsmeikoHappy.appendChild(tableSpanHappyVbsMeikoRarity);
}

tableSpanHappyVbsMeiko.textContent = vbsmeikoHappyVal + "%";
vbsmeikoHappy.appendChild(tableSpanHappyVbsMeiko);

var rarityImg = cE('img');
tableSpanMystVbsMeikoRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (vbsmeikoMystRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + vbsmeikoMystRarity + '.png');
  vbsmeikoMyst.appendChild(tableSpanMystVbsMeikoRarity);
}

tableSpanMystVbsMeiko.textContent = vbsmeikoMystVal + "%";
vbsmeikoMyst.appendChild(tableSpanMystVbsMeiko);

var rarityImg = cE('img');
tableSpanPureVbsMeikoRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (vbsmeikoPureRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + vbsmeikoPureRarity + '.png');
  vbsmeikoPure.appendChild(tableSpanPureVbsMeikoRarity);
}

  tableSpanPureVbsMeiko.textContent = vbsmeikoPureVal + "%";
vbsmeikoPure.appendChild(tableSpanPureVbsMeiko);

vbsmeikoCards.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "25" || card.dataset.support !== "street") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

vbsmeikoCool.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "25" || card.dataset.support !== "street" || card.dataset.attr !== "cool") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

vbsmeikoCute.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "25" || card.dataset.support !== "street" || card.dataset.attr !== "cute") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

vbsmeikoHappy.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "25" || card.dataset.support !== "street" || card.dataset.attr !== "happy") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

vbsmeikoMyst.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "25" || card.dataset.support !== "street" || card.dataset.attr !== "mysterious") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

vbsmeikoPure.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "25" || card.dataset.support !== "street" || card.dataset.attr !== "pure") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

// VbsKaito
const tableSpanCoolVbsKaito = cE("span");
tableSpanCoolVbsKaito.className = "score-span";
const tableSpanCoolVbsKaitoRarity = cE("span");
tableSpanCoolVbsKaitoRarity.className = "score-rarity-span";
const tableSpanCuteVbsKaito = cE("span");
tableSpanCuteVbsKaito.className = "score-span";
const tableSpanCuteVbsKaitoRarity = cE("span");
tableSpanCoolVbsKaitoRarity.className = "score-rarity-span";
const tableSpanHappyVbsKaito = cE("span");
tableSpanHappyVbsKaito.className = "score-span";
const tableSpanHappyVbsKaitoRarity = cE("span");
tableSpanCoolVbsKaitoRarity.className = "score-rarity-span";
const tableSpanMystVbsKaito = cE("span");
tableSpanMystVbsKaito.className = "score-span";
const tableSpanMystVbsKaitoRarity = cE("span");
tableSpanCoolVbsKaitoRarity.className = "score-rarity-span";
const tableSpanPureVbsKaito = cE("span");
tableSpanPureVbsKaito.className = "score-span";
const tableSpanPureVbsKaitoRarity = cE("span");
tableSpanCoolVbsKaitoRarity.className = "score-rarity-span";

var vbskaitoTemp = [];
var vbskaitoCards = gID("vbs-kaito");
var vbskaitoCool = gID("cool-vbs-kaito");
var vbskaitoCoolVal = 0;
var vbskaitoCoolRarity = "";
var vbskaitoCute = gID("cute-vbs-kaito");
var vbskaitoCuteVal = 0;
var vbskaitoCuteRarity = "";
var vbskaitoHappy = gID("happy-vbs-kaito");
var vbskaitoHappyVal = 0;
var vbskaitoHappyRarity = "";
var vbskaitoMyst = gID("mysterious-vbs-kaito");
var vbskaitoMystVal = 0;
var vbskaitoMystRarity = "";
var vbskaitoPure = gID("pure-vbs-kaito");
var vbskaitoPureVal = 0;
var vbskaitoPureRarity = "";

for (var i = 0; i < vbskaito.length; i++) {
  if (cardsMatch.includes(vbskaito[i][0][0][0])) {
    vbskaitoTemp.push(vbskaito[i]);
  }
}

vbskaitoTemp.sort((a, b) => a[0][1] - b[0][1]);

for (var i = 0; i < vbskaitoTemp.length; i++) {
  var attr = vbskaitoTemp[i][0][0][3];
  var vbskaitoVal = vbskaitoTemp[i][0][1];
  var rarity = vbskaitoTemp[i][0][0][2];

  if (attr === "cool" && vbskaitoVal > vbskaitoCoolVal) {
    vbskaitoCoolVal = vbskaitoVal;
    vbskaitoCoolRarity = rarity;
    //console.log(vbskaitoCoolRarity);
  } else if (attr === "cute" && vbskaitoVal > vbskaitoCuteVal) {
    vbskaitoCuteVal = vbskaitoVal;
    vbskaitoCuteRarity = rarity;
  } else if (attr === "happy" && vbskaitoVal > vbskaitoHappyVal) {
    vbskaitoHappyVal = vbskaitoVal;
    vbskaitoHappyRarity = rarity;
  } else if (attr === "mysterious" && vbskaitoVal > vbskaitoMystVal) {
    vbskaitoMystVal = vbskaitoVal;
    vbskaitoMystRarity = rarity;
  } else if (attr === "pure" && vbskaitoVal > vbskaitoPureVal) {
    vbskaitoPureVal = vbskaitoVal;
    vbskaitoPureRarity = rarity;
  }
}

removeAllChildNodes(vbskaitoCool);
removeAllChildNodes(vbskaitoCute);
removeAllChildNodes(vbskaitoHappy);
removeAllChildNodes(vbskaitoMyst);
removeAllChildNodes(vbskaitoPure);

var rarityImg = cE('img');
tableSpanCoolVbsKaitoRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (vbskaitoCoolRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + vbskaitoCoolRarity + '.png');
  vbskaitoCool.appendChild(tableSpanCoolVbsKaitoRarity);
}

tableSpanCoolVbsKaito.textContent = vbskaitoCoolVal + "%";
vbskaitoCool.appendChild(tableSpanCoolVbsKaito);

var rarityImg = cE('img');
tableSpanCuteVbsKaitoRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (vbskaitoCuteRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + vbskaitoCuteRarity + '.png');
  vbskaitoCute.appendChild(tableSpanCuteVbsKaitoRarity);
}

tableSpanCuteVbsKaito.textContent = vbskaitoCuteVal + "%";
vbskaitoCute.appendChild(tableSpanCuteVbsKaito);

var rarityImg = cE('img');
tableSpanHappyVbsKaitoRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (vbskaitoHappyRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + vbskaitoHappyRarity + '.png');
  vbskaitoHappy.appendChild(tableSpanHappyVbsKaitoRarity);
}

tableSpanHappyVbsKaito.textContent = vbskaitoHappyVal + "%";
vbskaitoHappy.appendChild(tableSpanHappyVbsKaito);

var rarityImg = cE('img');
tableSpanMystVbsKaitoRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (vbskaitoMystRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + vbskaitoMystRarity + '.png');
  vbskaitoMyst.appendChild(tableSpanMystVbsKaitoRarity);
}

tableSpanMystVbsKaito.textContent = vbskaitoMystVal + "%";
vbskaitoMyst.appendChild(tableSpanMystVbsKaito);

var rarityImg = cE('img');
tableSpanPureVbsKaitoRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (vbskaitoPureRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + vbskaitoPureRarity + '.png');
  vbskaitoPure.appendChild(tableSpanPureVbsKaitoRarity);
}

  tableSpanPureVbsKaito.textContent = vbskaitoPureVal + "%";
vbskaitoPure.appendChild(tableSpanPureVbsKaito);

vbskaitoCards.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "26" || card.dataset.support !== "street") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

vbskaitoCool.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "26" || card.dataset.support !== "street" || card.dataset.attr !== "cool") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

vbskaitoCute.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "26" || card.dataset.support !== "street" || card.dataset.attr !== "cute") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

vbskaitoHappy.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "26" || card.dataset.support !== "street" || card.dataset.attr !== "happy") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

vbskaitoMyst.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "26" || card.dataset.support !== "street" || card.dataset.attr !== "mysterious") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

vbskaitoPure.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "26" || card.dataset.support !== "street" || card.dataset.attr !== "pure") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

// all wxs cards
    var wxsCards = gID("wxs");

    wxsCards.addEventListener('click', function(event) {
      var cardIcons = document.getElementsByClassName("card-prsk");

      for (const card of cardIcons) {
        var classes = card.classList;

        if (classes.contains("active-card")) {
          if (card.dataset.char !== "13" && card.dataset.char !== "14" && card.dataset.char !== "15" && card.dataset.char !== "16") {
            card.style.display = 'none';
          }
          classes.toggle("active-card");
        } else {
          card.style.display = "inline-block";
          classes.toggle("active-card");
        }
      }
    });

    // cool wxs cards
    var coolWxsCards = gID("wxs-cool");

    coolWxsCards.addEventListener('click', function(event) {
      var cardIcons = document.getElementsByClassName("card-prsk");

      for (const card of cardIcons) {
        var classes = card.classList;

        if (classes.contains("active-card")) {
          if (card.dataset.char !== "13" && card.dataset.char !== "14" && card.dataset.char !== "15" && card.dataset.char !== "16" || card.dataset.attr !== "cool") {
            card.style.display = 'none';

          }
          classes.toggle("active-card");
        } else {
          card.style.display = "inline-block";
          classes.toggle("active-card");
        }
      }
    });

    // cute wxs cards
    var cuteWxsCards = gID("wxs-cute");

    cuteWxsCards.addEventListener('click', function(event) {
      var cardIcons = document.getElementsByClassName("card-prsk");

      for (const card of cardIcons) {
        var classes = card.classList;

        if (classes.contains("active-card")) {
          if (card.dataset.char !== "13" && card.dataset.char !== "14" && card.dataset.char !== "15" && card.dataset.char !== "16" || card.dataset.attr !== "cute") {
            card.style.display = 'none';

          }
          classes.toggle("active-card");
        } else {
          card.style.display = "inline-block";
          classes.toggle("active-card");
        }
      }
    });

    // happy wxs cards
    var happyWxsCards = gID("wxs-happy");

    happyWxsCards.addEventListener('click', function(event) {
      var cardIcons = document.getElementsByClassName("card-prsk");

      for (const card of cardIcons) {
        var classes = card.classList;

        if (classes.contains("active-card")) {
          if (card.dataset.char !== "13" && card.dataset.char !== "14" && card.dataset.char !== "15" && card.dataset.char !== "16" || card.dataset.attr !== "happy") {
            card.style.display = 'none';

          }
          classes.toggle("active-card");
        } else {
          card.style.display = "inline-block";
          classes.toggle("active-card");
        }
      }
    });

    // mysterious wxs cards
    var mystWxsCards = gID("wxs-mysterious");

    mystWxsCards.addEventListener('click', function(event) {
      var cardIcons = document.getElementsByClassName("card-prsk");

      for (const card of cardIcons) {
        var classes = card.classList;

        if (classes.contains("active-card")) {
          if (card.dataset.char !== "13" && card.dataset.char !== "14" && card.dataset.char !== "15" && card.dataset.char !== "16" || card.dataset.attr !== "mysterious") {
            card.style.display = 'none';

          }
          classes.toggle("active-card");
        } else {
          card.style.display = "inline-block";
          classes.toggle("active-card");
        }
      }
    });

    // pure wxs cards
    var pureWxsCards = gID("wxs-pure");

    pureWxsCards.addEventListener('click', function(event) {
      var cardIcons = document.getElementsByClassName("card-prsk");

      for (const card of cardIcons) {
        var classes = card.classList;

        if (classes.contains("active-card")) {
          if (card.dataset.char !== "13" && card.dataset.char !== "14" && card.dataset.char !== "15" && card.dataset.char !== "16" || card.dataset.attr !== "pure") {
            card.style.display = 'none';

          }
          classes.toggle("active-card");
        } else {
          card.style.display = "inline-block";
          classes.toggle("active-card");
        }
      }
    });

    // all wxs vs cards
    var wxsVsCards = gID("wxs-vs");

    wxsVsCards.addEventListener('click', function(event) {
      var cardIcons = document.getElementsByClassName("card-prsk");

      for (const card of cardIcons) {
        var classes = card.classList;

        if (classes.contains("active-card")) {
          if (card.dataset.char !== "21" && card.dataset.char !== "22" && card.dataset.char !== "23" && card.dataset.char !== "24" && card.dataset.char !== "25" && card.dataset.char !== "26" || card.dataset.support !== "theme_park") {
            card.style.display = 'none';
          }
          classes.toggle("active-card");
        } else {
          card.style.display = "inline-block";
          classes.toggle("active-card");
        }
      }
    });

    // cool wxs vs cards
    var coolWxsVsCards = gID("wxs-vs-cool");

    coolWxsVsCards.addEventListener('click', function(event) {
      var cardIcons = document.getElementsByClassName("card-prsk");

      for (const card of cardIcons) {
        var classes = card.classList;

        if (classes.contains("active-card")) {
          if (card.dataset.char !== "21" && card.dataset.char !== "22" && card.dataset.char !== "23" && card.dataset.char !== "24" && card.dataset.char !== "25" && card.dataset.char !== "26" || card.dataset.support !== "theme_park" || card.dataset.attr !== "cool") {
            card.style.display = 'none';
          }
          classes.toggle("active-card");
        } else {
          card.style.display = "inline-block";
          classes.toggle("active-card");
        }
      }
    });

    // cute wxs vs cards
    var cuteWxsVsCards = gID("wxs-vs-cute");

    cuteWxsVsCards.addEventListener('click', function(event) {
      var cardIcons = document.getElementsByClassName("card-prsk");

      for (const card of cardIcons) {
        var classes = card.classList;

        if (classes.contains("active-card")) {
          if (card.dataset.char !== "21" && card.dataset.char !== "22" && card.dataset.char !== "23" && card.dataset.char !== "24" && card.dataset.char !== "25" && card.dataset.char !== "26" || card.dataset.support !== "theme_park" || card.dataset.attr !== "cute") {
            card.style.display = 'none';
          }
          classes.toggle("active-card");
        } else {
          card.style.display = "inline-block";
          classes.toggle("active-card");
        }
      }
    });

    // happy wxs vs cards
    var happyWxsVsCards = gID("wxs-vs-happy");

    happyWxsVsCards.addEventListener('click', function(event) {
      var cardIcons = document.getElementsByClassName("card-prsk");

      for (const card of cardIcons) {
        var classes = card.classList;

        if (classes.contains("active-card")) {
          if (card.dataset.char !== "21" && card.dataset.char !== "22" && card.dataset.char !== "23" && card.dataset.char !== "24" && card.dataset.char !== "25" && card.dataset.char !== "26" || card.dataset.attr !== "happy" || card.dataset.support !== "theme_park") {
            card.style.display = 'none';

          }
          classes.toggle("active-card");
        } else {
          card.style.display = "inline-block";
          classes.toggle("active-card");
        }
      }
    });

    // mysterious wxs vs cards
    var mystWxsVsCards = gID("wxs-vs-mysterious");

    mystWxsVsCards.addEventListener('click', function(event) {
      var cardIcons = document.getElementsByClassName("card-prsk");

      for (const card of cardIcons) {
        var classes = card.classList;

        if (classes.contains("active-card")) {
          if (card.dataset.char !== "21" && card.dataset.char !== "22" && card.dataset.char !== "23" && card.dataset.char !== "24" && card.dataset.char !== "25" && card.dataset.char !== "26" || card.dataset.attr !== "mysterious" || card.dataset.support !== "theme_park") {
            card.style.display = 'none';
          }
          classes.toggle("active-card");
        } else {
          card.style.display = "inline-block";
          classes.toggle("active-card");
        }
      }
    });

    // pure wxs vs cards
    var pureWxsVsCards = gID("wxs-vs-pure");

    pureWxsVsCards.addEventListener('click', function(event) {
      var cardIcons = document.getElementsByClassName("card-prsk");

      for (const card of cardIcons) {
        var classes = card.classList;

        if (classes.contains("active-card")) {
          if (card.dataset.char !== "21" && card.dataset.char !== "22" && card.dataset.char !== "23" && card.dataset.char !== "24" && card.dataset.char !== "25" && card.dataset.char !== "26" || card.dataset.attr !== "pure" || card.dataset.support !== "theme_park") {
            card.style.display = 'none';
          }
          classes.toggle("active-card");
        } else {
          card.style.display = "inline-block";
          classes.toggle("active-card");
        }
      }
    });

    // Tsukasa
const tableSpanCoolTsukasa = cE("span");
tableSpanCoolTsukasa.className = "score-span";
const tableSpanCoolTsukasaRarity = cE("span");
tableSpanCoolTsukasaRarity.className = "score-rarity-span";
const tableSpanCuteTsukasa = cE("span");
tableSpanCuteTsukasa.className = "score-span";
const tableSpanCuteTsukasaRarity = cE("span");
tableSpanCoolTsukasaRarity.className = "score-rarity-span";
const tableSpanHappyTsukasa = cE("span");
tableSpanHappyTsukasa.className = "score-span";
const tableSpanHappyTsukasaRarity = cE("span");
tableSpanCoolTsukasaRarity.className = "score-rarity-span";
const tableSpanMystTsukasa = cE("span");
tableSpanMystTsukasa.className = "score-span";
const tableSpanMystTsukasaRarity = cE("span");
tableSpanCoolTsukasaRarity.className = "score-rarity-span";
const tableSpanPureTsukasa = cE("span");
tableSpanPureTsukasa.className = "score-span";
const tableSpanPureTsukasaRarity = cE("span");
tableSpanCoolTsukasaRarity.className = "score-rarity-span";

var tsukasaTemp = [];
var tsukasaCards = gID("tsukasa");
var tsukasaCool = gID("cool-tsukasa");
var tsukasaCoolVal = 0;
var tsukasaCoolRarity = "";
var tsukasaCute = gID("cute-tsukasa");
var tsukasaCuteVal = 0;
var tsukasaCuteRarity = "";
var tsukasaHappy = gID("happy-tsukasa");
var tsukasaHappyVal = 0;
var tsukasaHappyRarity = "";
var tsukasaMyst = gID("mysterious-tsukasa");
var tsukasaMystVal = 0;
var tsukasaMystRarity = "";
var tsukasaPure = gID("pure-tsukasa");
var tsukasaPureVal = 0;
var tsukasaPureRarity = "";

for (var i = 0; i < tsukasa.length; i++) {
  if (cardsMatch.includes(tsukasa[i][0][0][0])) {
    tsukasaTemp.push(tsukasa[i]);
  }
}

tsukasaTemp.sort((a, b) => a[0][1] - b[0][1]);

for (var i = 0; i < tsukasaTemp.length; i++) {
  var attr = tsukasaTemp[i][0][0][3];
  var tsukasaVal = tsukasaTemp[i][0][1];
  var rarity = tsukasaTemp[i][0][0][2];

  if (attr === "cool" && tsukasaVal > tsukasaCoolVal) {
    tsukasaCoolVal = tsukasaVal;
    tsukasaCoolRarity = rarity;
    //console.log(tsukasaCoolRarity);
  } else if (attr === "cute" && tsukasaVal > tsukasaCuteVal) {
    tsukasaCuteVal = tsukasaVal;
    tsukasaCuteRarity = rarity;
  } else if (attr === "happy" && tsukasaVal > tsukasaHappyVal) {
    tsukasaHappyVal = tsukasaVal;
    tsukasaHappyRarity = rarity;
  } else if (attr === "mysterious" && tsukasaVal > tsukasaMystVal) {
    tsukasaMystVal = tsukasaVal;
    tsukasaMystRarity = rarity;
  } else if (attr === "pure" && tsukasaVal > tsukasaPureVal) {
    tsukasaPureVal = tsukasaVal;
    tsukasaPureRarity = rarity;
  }
}

removeAllChildNodes(tsukasaCool);
removeAllChildNodes(tsukasaCute);
removeAllChildNodes(tsukasaHappy);
removeAllChildNodes(tsukasaMyst);
removeAllChildNodes(tsukasaPure);

var rarityImg = cE('img');
tableSpanCoolTsukasaRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (tsukasaCoolRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + tsukasaCoolRarity + '.png');
  tsukasaCool.appendChild(tableSpanCoolTsukasaRarity);
}

tableSpanCoolTsukasa.textContent = tsukasaCoolVal + "%";
tsukasaCool.appendChild(tableSpanCoolTsukasa);

var rarityImg = cE('img');
tableSpanCuteTsukasaRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (tsukasaCuteRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + tsukasaCuteRarity + '.png');
  tsukasaCute.appendChild(tableSpanCuteTsukasaRarity);
}

tableSpanCuteTsukasa.textContent = tsukasaCuteVal + "%";
tsukasaCute.appendChild(tableSpanCuteTsukasa);

var rarityImg = cE('img');
tableSpanHappyTsukasaRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (tsukasaHappyRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + tsukasaHappyRarity + '.png');
  tsukasaHappy.appendChild(tableSpanHappyTsukasaRarity);
}

tableSpanHappyTsukasa.textContent = tsukasaHappyVal + "%";
tsukasaHappy.appendChild(tableSpanHappyTsukasa);

var rarityImg = cE('img');
tableSpanMystTsukasaRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (tsukasaMystRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + tsukasaMystRarity + '.png');
  tsukasaMyst.appendChild(tableSpanMystTsukasaRarity);
}

tableSpanMystTsukasa.textContent = tsukasaMystVal + "%";
tsukasaMyst.appendChild(tableSpanMystTsukasa);

var rarityImg = cE('img');
tableSpanPureTsukasaRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (tsukasaPureRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + tsukasaPureRarity + '.png');
  tsukasaPure.appendChild(tableSpanPureTsukasaRarity);
}

  tableSpanPureTsukasa.textContent = tsukasaPureVal + "%";
tsukasaPure.appendChild(tableSpanPureTsukasa);

tsukasaCards.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "13") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

tsukasaCool.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "13" || card.dataset.attr !== "cool") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

tsukasaCute.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "13" || card.dataset.attr !== "cute") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

tsukasaHappy.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "13" || card.dataset.attr !== "happy") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

tsukasaMyst.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "13" || card.dataset.attr !== "mysterious") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

tsukasaPure.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "13" || card.dataset.attr !== "pure") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

// Emu
const tableSpanCoolEmu = cE("span");
tableSpanCoolEmu.className = "score-span";
const tableSpanCoolEmuRarity = cE("span");
tableSpanCoolEmuRarity.className = "score-rarity-span";
const tableSpanCuteEmu = cE("span");
tableSpanCuteEmu.className = "score-span";
const tableSpanCuteEmuRarity = cE("span");
tableSpanCoolEmuRarity.className = "score-rarity-span";
const tableSpanHappyEmu = cE("span");
tableSpanHappyEmu.className = "score-span";
const tableSpanHappyEmuRarity = cE("span");
tableSpanCoolEmuRarity.className = "score-rarity-span";
const tableSpanMystEmu = cE("span");
tableSpanMystEmu.className = "score-span";
const tableSpanMystEmuRarity = cE("span");
tableSpanCoolEmuRarity.className = "score-rarity-span";
const tableSpanPureEmu = cE("span");
tableSpanPureEmu.className = "score-span";
const tableSpanPureEmuRarity = cE("span");
tableSpanCoolEmuRarity.className = "score-rarity-span";

var emuTemp = [];
var emuCards = gID("emu");
var emuCool = gID("cool-emu");
var emuCoolVal = 0;
var emuCoolRarity = "";
var emuCute = gID("cute-emu");
var emuCuteVal = 0;
var emuCuteRarity = "";
var emuHappy = gID("happy-emu");
var emuHappyVal = 0;
var emuHappyRarity = "";
var emuMyst = gID("mysterious-emu");
var emuMystVal = 0;
var emuMystRarity = "";
var emuPure = gID("pure-emu");
var emuPureVal = 0;
var emuPureRarity = "";

for (var i = 0; i < emu.length; i++) {
  if (cardsMatch.includes(emu[i][0][0][0])) {
    emuTemp.push(emu[i]);
  }
}

emuTemp.sort((a, b) => a[0][1] - b[0][1]);

for (var i = 0; i < emuTemp.length; i++) {
  var attr = emuTemp[i][0][0][3];
  var emuVal = emuTemp[i][0][1];
  var rarity = emuTemp[i][0][0][2];

  if (attr === "cool" && emuVal > emuCoolVal) {
    emuCoolVal = emuVal;
    emuCoolRarity = rarity;
    //console.log(emuCoolRarity);
  } else if (attr === "cute" && emuVal > emuCuteVal) {
    emuCuteVal = emuVal;
    emuCuteRarity = rarity;
  } else if (attr === "happy" && emuVal > emuHappyVal) {
    emuHappyVal = emuVal;
    emuHappyRarity = rarity;
  } else if (attr === "mysterious" && emuVal > emuMystVal) {
    emuMystVal = emuVal;
    emuMystRarity = rarity;
  } else if (attr === "pure" && emuVal > emuPureVal) {
    emuPureVal = emuVal;
    emuPureRarity = rarity;
  }
}

removeAllChildNodes(emuCool);
removeAllChildNodes(emuCute);
removeAllChildNodes(emuHappy);
removeAllChildNodes(emuMyst);
removeAllChildNodes(emuPure);

var rarityImg = cE('img');
tableSpanCoolEmuRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (emuCoolRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + emuCoolRarity + '.png');
  emuCool.appendChild(tableSpanCoolEmuRarity);
}

tableSpanCoolEmu.textContent = emuCoolVal + "%";
emuCool.appendChild(tableSpanCoolEmu);

var rarityImg = cE('img');
tableSpanCuteEmuRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (emuCuteRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + emuCuteRarity + '.png');
  emuCute.appendChild(tableSpanCuteEmuRarity);
}

tableSpanCuteEmu.textContent = emuCuteVal + "%";
emuCute.appendChild(tableSpanCuteEmu);

var rarityImg = cE('img');
tableSpanHappyEmuRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (emuHappyRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + emuHappyRarity + '.png');
  emuHappy.appendChild(tableSpanHappyEmuRarity);
}

tableSpanHappyEmu.textContent = emuHappyVal + "%";
emuHappy.appendChild(tableSpanHappyEmu);

var rarityImg = cE('img');
tableSpanMystEmuRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (emuMystRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + emuMystRarity + '.png');
  emuMyst.appendChild(tableSpanMystEmuRarity);
}

tableSpanMystEmu.textContent = emuMystVal + "%";
emuMyst.appendChild(tableSpanMystEmu);

var rarityImg = cE('img');
tableSpanPureEmuRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (emuPureRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + emuPureRarity + '.png');
  emuPure.appendChild(tableSpanPureEmuRarity);
}

  tableSpanPureEmu.textContent = emuPureVal + "%";
emuPure.appendChild(tableSpanPureEmu);

emuCards.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "14") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

emuCool.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "14" || card.dataset.attr !== "cool") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

emuCute.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "14" || card.dataset.attr !== "cute") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

emuHappy.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "14" || card.dataset.attr !== "happy") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

emuMyst.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "14" || card.dataset.attr !== "mysterious") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

emuPure.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "14" || card.dataset.attr !== "pure") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

// Nene
const tableSpanCoolNene = cE("span");
tableSpanCoolNene.className = "score-span";
const tableSpanCoolNeneRarity = cE("span");
tableSpanCoolNeneRarity.className = "score-rarity-span";
const tableSpanCuteNene = cE("span");
tableSpanCuteNene.className = "score-span";
const tableSpanCuteNeneRarity = cE("span");
tableSpanCoolNeneRarity.className = "score-rarity-span";
const tableSpanHappyNene = cE("span");
tableSpanHappyNene.className = "score-span";
const tableSpanHappyNeneRarity = cE("span");
tableSpanCoolNeneRarity.className = "score-rarity-span";
const tableSpanMystNene = cE("span");
tableSpanMystNene.className = "score-span";
const tableSpanMystNeneRarity = cE("span");
tableSpanCoolNeneRarity.className = "score-rarity-span";
const tableSpanPureNene = cE("span");
tableSpanPureNene.className = "score-span";
const tableSpanPureNeneRarity = cE("span");
tableSpanCoolNeneRarity.className = "score-rarity-span";

var neneTemp = [];
var neneCards = gID("nene");
var neneCool = gID("cool-nene");
var neneCoolVal = 0;
var neneCoolRarity = "";
var neneCute = gID("cute-nene");
var neneCuteVal = 0;
var neneCuteRarity = "";
var neneHappy = gID("happy-nene");
var neneHappyVal = 0;
var neneHappyRarity = "";
var neneMyst = gID("mysterious-nene");
var neneMystVal = 0;
var neneMystRarity = "";
var nenePure = gID("pure-nene");
var nenePureVal = 0;
var nenePureRarity = "";

for (var i = 0; i < nene.length; i++) {
  if (cardsMatch.includes(nene[i][0][0][0])) {
    neneTemp.push(nene[i]);
  }
}

neneTemp.sort((a, b) => a[0][1] - b[0][1]);

for (var i = 0; i < neneTemp.length; i++) {
  var attr = neneTemp[i][0][0][3];
  var neneVal = neneTemp[i][0][1];
  var rarity = neneTemp[i][0][0][2];

  if (attr === "cool" && neneVal > neneCoolVal) {
    neneCoolVal = neneVal;
    neneCoolRarity = rarity;
    //console.log(neneCoolRarity);
  } else if (attr === "cute" && neneVal > neneCuteVal) {
    neneCuteVal = neneVal;
    neneCuteRarity = rarity;
  } else if (attr === "happy" && neneVal > neneHappyVal) {
    neneHappyVal = neneVal;
    neneHappyRarity = rarity;
  } else if (attr === "mysterious" && neneVal > neneMystVal) {
    neneMystVal = neneVal;
    neneMystRarity = rarity;
  } else if (attr === "pure" && neneVal > nenePureVal) {
    nenePureVal = neneVal;
    nenePureRarity = rarity;
  }
}

removeAllChildNodes(neneCool);
removeAllChildNodes(neneCute);
removeAllChildNodes(neneHappy);
removeAllChildNodes(neneMyst);
removeAllChildNodes(nenePure);

var rarityImg = cE('img');
tableSpanCoolNeneRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (neneCoolRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + neneCoolRarity + '.png');
  neneCool.appendChild(tableSpanCoolNeneRarity);
}

tableSpanCoolNene.textContent = neneCoolVal + "%";
neneCool.appendChild(tableSpanCoolNene);

var rarityImg = cE('img');
tableSpanCuteNeneRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (neneCuteRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + neneCuteRarity + '.png');
  neneCute.appendChild(tableSpanCuteNeneRarity);
}

tableSpanCuteNene.textContent = neneCuteVal + "%";
neneCute.appendChild(tableSpanCuteNene);

var rarityImg = cE('img');
tableSpanHappyNeneRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (neneHappyRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + neneHappyRarity + '.png');
  neneHappy.appendChild(tableSpanHappyNeneRarity);
}

tableSpanHappyNene.textContent = neneHappyVal + "%";
neneHappy.appendChild(tableSpanHappyNene);

var rarityImg = cE('img');
tableSpanMystNeneRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (neneMystRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + neneMystRarity + '.png');
  neneMyst.appendChild(tableSpanMystNeneRarity);
}

tableSpanMystNene.textContent = neneMystVal + "%";
neneMyst.appendChild(tableSpanMystNene);

var rarityImg = cE('img');
tableSpanPureNeneRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (nenePureRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + nenePureRarity + '.png');
  nenePure.appendChild(tableSpanPureNeneRarity);
}

  tableSpanPureNene.textContent = nenePureVal + "%";
nenePure.appendChild(tableSpanPureNene);

neneCards.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "15") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

neneCool.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "15" || card.dataset.attr !== "cool") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

neneCute.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "15" || card.dataset.attr !== "cute") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

neneHappy.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "15" || card.dataset.attr !== "happy") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

neneMyst.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "15" || card.dataset.attr !== "mysterious") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

nenePure.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "15" || card.dataset.attr !== "pure") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

// Rui
const tableSpanCoolRui = cE("span");
tableSpanCoolRui.className = "score-span";
const tableSpanCoolRuiRarity = cE("span");
tableSpanCoolRuiRarity.className = "score-rarity-span";
const tableSpanCuteRui = cE("span");
tableSpanCuteRui.className = "score-span";
const tableSpanCuteRuiRarity = cE("span");
tableSpanCoolRuiRarity.className = "score-rarity-span";
const tableSpanHappyRui = cE("span");
tableSpanHappyRui.className = "score-span";
const tableSpanHappyRuiRarity = cE("span");
tableSpanCoolRuiRarity.className = "score-rarity-span";
const tableSpanMystRui = cE("span");
tableSpanMystRui.className = "score-span";
const tableSpanMystRuiRarity = cE("span");
tableSpanCoolRuiRarity.className = "score-rarity-span";
const tableSpanPureRui = cE("span");
tableSpanPureRui.className = "score-span";
const tableSpanPureRuiRarity = cE("span");
tableSpanCoolRuiRarity.className = "score-rarity-span";

var ruiTemp = [];
var ruiCards = gID("rui");
var ruiCool = gID("cool-rui");
var ruiCoolVal = 0;
var ruiCoolRarity = "";
var ruiCute = gID("cute-rui");
var ruiCuteVal = 0;
var ruiCuteRarity = "";
var ruiHappy = gID("happy-rui");
var ruiHappyVal = 0;
var ruiHappyRarity = "";
var ruiMyst = gID("mysterious-rui");
var ruiMystVal = 0;
var ruiMystRarity = "";
var ruiPure = gID("pure-rui");
var ruiPureVal = 0;
var ruiPureRarity = "";

for (var i = 0; i < rui.length; i++) {
  if (cardsMatch.includes(rui[i][0][0][0])) {
    ruiTemp.push(rui[i]);
  }
}

ruiTemp.sort((a, b) => a[0][1] - b[0][1]);

for (var i = 0; i < ruiTemp.length; i++) {
  var attr = ruiTemp[i][0][0][3];
  var ruiVal = ruiTemp[i][0][1];
  var rarity = ruiTemp[i][0][0][2];

  if (attr === "cool" && ruiVal > ruiCoolVal) {
    ruiCoolVal = ruiVal;
    ruiCoolRarity = rarity;
    //console.log(ruiCoolRarity);
  } else if (attr === "cute" && ruiVal > ruiCuteVal) {
    ruiCuteVal = ruiVal;
    ruiCuteRarity = rarity;
  } else if (attr === "happy" && ruiVal > ruiHappyVal) {
    ruiHappyVal = ruiVal;
    ruiHappyRarity = rarity;
  } else if (attr === "mysterious" && ruiVal > ruiMystVal) {
    ruiMystVal = ruiVal;
    ruiMystRarity = rarity;
  } else if (attr === "pure" && ruiVal > ruiPureVal) {
    ruiPureVal = ruiVal;
    ruiPureRarity = rarity;
  }
}

removeAllChildNodes(ruiCool);
removeAllChildNodes(ruiCute);
removeAllChildNodes(ruiHappy);
removeAllChildNodes(ruiMyst);
removeAllChildNodes(ruiPure);

var rarityImg = cE('img');
tableSpanCoolRuiRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (ruiCoolRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + ruiCoolRarity + '.png');
  ruiCool.appendChild(tableSpanCoolRuiRarity);
}

tableSpanCoolRui.textContent = ruiCoolVal + "%";
ruiCool.appendChild(tableSpanCoolRui);

var rarityImg = cE('img');
tableSpanCuteRuiRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (ruiCuteRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + ruiCuteRarity + '.png');
  ruiCute.appendChild(tableSpanCuteRuiRarity);
}

tableSpanCuteRui.textContent = ruiCuteVal + "%";
ruiCute.appendChild(tableSpanCuteRui);

var rarityImg = cE('img');
tableSpanHappyRuiRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (ruiHappyRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + ruiHappyRarity + '.png');
  ruiHappy.appendChild(tableSpanHappyRuiRarity);
}

tableSpanHappyRui.textContent = ruiHappyVal + "%";
ruiHappy.appendChild(tableSpanHappyRui);

var rarityImg = cE('img');
tableSpanMystRuiRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (ruiMystRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + ruiMystRarity + '.png');
  ruiMyst.appendChild(tableSpanMystRuiRarity);
}

tableSpanMystRui.textContent = ruiMystVal + "%";
ruiMyst.appendChild(tableSpanMystRui);

var rarityImg = cE('img');
tableSpanPureRuiRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (ruiPureRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + ruiPureRarity + '.png');
  ruiPure.appendChild(tableSpanPureRuiRarity);
}

  tableSpanPureRui.textContent = ruiPureVal + "%";
ruiPure.appendChild(tableSpanPureRui);

ruiCards.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "16") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

ruiCool.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "16" || card.dataset.attr !== "cool") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

ruiCute.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "16" || card.dataset.attr !== "cute") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

ruiHappy.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "16" || card.dataset.attr !== "happy") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

ruiMyst.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "16" || card.dataset.attr !== "mysterious") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

ruiPure.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "16" || card.dataset.attr !== "pure") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

// WxsMiku
const tableSpanCoolWxsMiku = cE("span");
tableSpanCoolWxsMiku.className = "score-span";
const tableSpanCoolWxsMikuRarity = cE("span");
tableSpanCoolWxsMikuRarity.className = "score-rarity-span";
const tableSpanCuteWxsMiku = cE("span");
tableSpanCuteWxsMiku.className = "score-span";
const tableSpanCuteWxsMikuRarity = cE("span");
tableSpanCoolWxsMikuRarity.className = "score-rarity-span";
const tableSpanHappyWxsMiku = cE("span");
tableSpanHappyWxsMiku.className = "score-span";
const tableSpanHappyWxsMikuRarity = cE("span");
tableSpanCoolWxsMikuRarity.className = "score-rarity-span";
const tableSpanMystWxsMiku = cE("span");
tableSpanMystWxsMiku.className = "score-span";
const tableSpanMystWxsMikuRarity = cE("span");
tableSpanCoolWxsMikuRarity.className = "score-rarity-span";
const tableSpanPureWxsMiku = cE("span");
tableSpanPureWxsMiku.className = "score-span";
const tableSpanPureWxsMikuRarity = cE("span");
tableSpanCoolWxsMikuRarity.className = "score-rarity-span";

var wxsmikuTemp = [];
var wxsmikuCards = gID("wxs-miku");
var wxsmikuCool = gID("cool-wxs-miku");
var wxsmikuCoolVal = 0;
var wxsmikuCoolRarity = "";
var wxsmikuCute = gID("cute-wxs-miku");
var wxsmikuCuteVal = 0;
var wxsmikuCuteRarity = "";
var wxsmikuHappy = gID("happy-wxs-miku");
var wxsmikuHappyVal = 0;
var wxsmikuHappyRarity = "";
var wxsmikuMyst = gID("mysterious-wxs-miku");
var wxsmikuMystVal = 0;
var wxsmikuMystRarity = "";
var wxsmikuPure = gID("pure-wxs-miku");
var wxsmikuPureVal = 0;
var wxsmikuPureRarity = "";

for (var i = 0; i < wxsmiku.length; i++) {
  if (cardsMatch.includes(wxsmiku[i][0][0][0])) {
    wxsmikuTemp.push(wxsmiku[i]);
  }
}

wxsmikuTemp.sort((a, b) => a[0][1] - b[0][1]);

for (var i = 0; i < wxsmikuTemp.length; i++) {
  var attr = wxsmikuTemp[i][0][0][3];
  var wxsmikuVal = wxsmikuTemp[i][0][1];
  var rarity = wxsmikuTemp[i][0][0][2];

  if (attr === "cool" && wxsmikuVal > wxsmikuCoolVal) {
    wxsmikuCoolVal = wxsmikuVal;
    wxsmikuCoolRarity = rarity;
    //console.log(wxsmikuCoolRarity);
  } else if (attr === "cute" && wxsmikuVal > wxsmikuCuteVal) {
    wxsmikuCuteVal = wxsmikuVal;
    wxsmikuCuteRarity = rarity;
  } else if (attr === "happy" && wxsmikuVal > wxsmikuHappyVal) {
    wxsmikuHappyVal = wxsmikuVal;
    wxsmikuHappyRarity = rarity;
  } else if (attr === "mysterious" && wxsmikuVal > wxsmikuMystVal) {
    wxsmikuMystVal = wxsmikuVal;
    wxsmikuMystRarity = rarity;
  } else if (attr === "pure" && wxsmikuVal > wxsmikuPureVal) {
    wxsmikuPureVal = wxsmikuVal;
    wxsmikuPureRarity = rarity;
  }
}

removeAllChildNodes(wxsmikuCool);
removeAllChildNodes(wxsmikuCute);
removeAllChildNodes(wxsmikuHappy);
removeAllChildNodes(wxsmikuMyst);
removeAllChildNodes(wxsmikuPure);

var rarityImg = cE('img');
tableSpanCoolWxsMikuRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (wxsmikuCoolRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + wxsmikuCoolRarity + '.png');
  wxsmikuCool.appendChild(tableSpanCoolWxsMikuRarity);
}

tableSpanCoolWxsMiku.textContent = wxsmikuCoolVal + "%";
wxsmikuCool.appendChild(tableSpanCoolWxsMiku);

var rarityImg = cE('img');
tableSpanCuteWxsMikuRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (wxsmikuCuteRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + wxsmikuCuteRarity + '.png');
  wxsmikuCute.appendChild(tableSpanCuteWxsMikuRarity);
}

tableSpanCuteWxsMiku.textContent = wxsmikuCuteVal + "%";
wxsmikuCute.appendChild(tableSpanCuteWxsMiku);

var rarityImg = cE('img');
tableSpanHappyWxsMikuRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (wxsmikuHappyRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + wxsmikuHappyRarity + '.png');
  wxsmikuHappy.appendChild(tableSpanHappyWxsMikuRarity);
}

tableSpanHappyWxsMiku.textContent = wxsmikuHappyVal + "%";
wxsmikuHappy.appendChild(tableSpanHappyWxsMiku);

var rarityImg = cE('img');
tableSpanMystWxsMikuRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (wxsmikuMystRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + wxsmikuMystRarity + '.png');
  wxsmikuMyst.appendChild(tableSpanMystWxsMikuRarity);
}

tableSpanMystWxsMiku.textContent = wxsmikuMystVal + "%";
wxsmikuMyst.appendChild(tableSpanMystWxsMiku);

var rarityImg = cE('img');
tableSpanPureWxsMikuRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (wxsmikuPureRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + wxsmikuPureRarity + '.png');
  wxsmikuPure.appendChild(tableSpanPureWxsMikuRarity);
}

  tableSpanPureWxsMiku.textContent = wxsmikuPureVal + "%";
wxsmikuPure.appendChild(tableSpanPureWxsMiku);

wxsmikuCards.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "21" || card.dataset.support !== "theme_park") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

wxsmikuCool.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "21" || card.dataset.support !== "theme_park" || card.dataset.attr !== "cool") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

wxsmikuCute.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "21" || card.dataset.support !== "theme_park" || card.dataset.attr !== "cute") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

wxsmikuHappy.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "21" || card.dataset.support !== "theme_park" || card.dataset.attr !== "happy") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

wxsmikuMyst.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "21" || card.dataset.support !== "theme_park" || card.dataset.attr !== "mysterious") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

wxsmikuPure.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "21" || card.dataset.support !== "theme_park" || card.dataset.attr !== "pure") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

// WxsRin
const tableSpanCoolWxsRin = cE("span");
tableSpanCoolWxsRin.className = "score-span";
const tableSpanCoolWxsRinRarity = cE("span");
tableSpanCoolWxsRinRarity.className = "score-rarity-span";
const tableSpanCuteWxsRin = cE("span");
tableSpanCuteWxsRin.className = "score-span";
const tableSpanCuteWxsRinRarity = cE("span");
tableSpanCoolWxsRinRarity.className = "score-rarity-span";
const tableSpanHappyWxsRin = cE("span");
tableSpanHappyWxsRin.className = "score-span";
const tableSpanHappyWxsRinRarity = cE("span");
tableSpanCoolWxsRinRarity.className = "score-rarity-span";
const tableSpanMystWxsRin = cE("span");
tableSpanMystWxsRin.className = "score-span";
const tableSpanMystWxsRinRarity = cE("span");
tableSpanCoolWxsRinRarity.className = "score-rarity-span";
const tableSpanPureWxsRin = cE("span");
tableSpanPureWxsRin.className = "score-span";
const tableSpanPureWxsRinRarity = cE("span");
tableSpanCoolWxsRinRarity.className = "score-rarity-span";

var wxsrinTemp = [];
var wxsrinCards = gID("wxs-rin");
var wxsrinCool = gID("cool-wxs-rin");
var wxsrinCoolVal = 0;
var wxsrinCoolRarity = "";
var wxsrinCute = gID("cute-wxs-rin");
var wxsrinCuteVal = 0;
var wxsrinCuteRarity = "";
var wxsrinHappy = gID("happy-wxs-rin");
var wxsrinHappyVal = 0;
var wxsrinHappyRarity = "";
var wxsrinMyst = gID("mysterious-wxs-rin");
var wxsrinMystVal = 0;
var wxsrinMystRarity = "";
var wxsrinPure = gID("pure-wxs-rin");
var wxsrinPureVal = 0;
var wxsrinPureRarity = "";

for (var i = 0; i < wxsrin.length; i++) {
  if (cardsMatch.includes(wxsrin[i][0][0][0])) {
    wxsrinTemp.push(wxsrin[i]);
  }
}

wxsrinTemp.sort((a, b) => a[0][1] - b[0][1]);

for (var i = 0; i < wxsrinTemp.length; i++) {
  var attr = wxsrinTemp[i][0][0][3];
  var wxsrinVal = wxsrinTemp[i][0][1];
  var rarity = wxsrinTemp[i][0][0][2];

  if (attr === "cool" && wxsrinVal > wxsrinCoolVal) {
    wxsrinCoolVal = wxsrinVal;
    wxsrinCoolRarity = rarity;
    //console.log(wxsrinCoolRarity);
  } else if (attr === "cute" && wxsrinVal > wxsrinCuteVal) {
    wxsrinCuteVal = wxsrinVal;
    wxsrinCuteRarity = rarity;
  } else if (attr === "happy" && wxsrinVal > wxsrinHappyVal) {
    wxsrinHappyVal = wxsrinVal;
    wxsrinHappyRarity = rarity;
  } else if (attr === "mysterious" && wxsrinVal > wxsrinMystVal) {
    wxsrinMystVal = wxsrinVal;
    wxsrinMystRarity = rarity;
  } else if (attr === "pure" && wxsrinVal > wxsrinPureVal) {
    wxsrinPureVal = wxsrinVal;
    wxsrinPureRarity = rarity;
  }
}

removeAllChildNodes(wxsrinCool);
removeAllChildNodes(wxsrinCute);
removeAllChildNodes(wxsrinHappy);
removeAllChildNodes(wxsrinMyst);
removeAllChildNodes(wxsrinPure);

var rarityImg = cE('img');
tableSpanCoolWxsRinRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (wxsrinCoolRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + wxsrinCoolRarity + '.png');
  wxsrinCool.appendChild(tableSpanCoolWxsRinRarity);
}

tableSpanCoolWxsRin.textContent = wxsrinCoolVal + "%";
wxsrinCool.appendChild(tableSpanCoolWxsRin);

var rarityImg = cE('img');
tableSpanCuteWxsRinRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (wxsrinCuteRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + wxsrinCuteRarity + '.png');
  wxsrinCute.appendChild(tableSpanCuteWxsRinRarity);
}

tableSpanCuteWxsRin.textContent = wxsrinCuteVal + "%";
wxsrinCute.appendChild(tableSpanCuteWxsRin);

var rarityImg = cE('img');
tableSpanHappyWxsRinRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (wxsrinHappyRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + wxsrinHappyRarity + '.png');
  wxsrinHappy.appendChild(tableSpanHappyWxsRinRarity);
}

tableSpanHappyWxsRin.textContent = wxsrinHappyVal + "%";
wxsrinHappy.appendChild(tableSpanHappyWxsRin);

var rarityImg = cE('img');
tableSpanMystWxsRinRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (wxsrinMystRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + wxsrinMystRarity + '.png');
  wxsrinMyst.appendChild(tableSpanMystWxsRinRarity);
}

tableSpanMystWxsRin.textContent = wxsrinMystVal + "%";
wxsrinMyst.appendChild(tableSpanMystWxsRin);

var rarityImg = cE('img');
tableSpanPureWxsRinRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (wxsrinPureRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + wxsrinPureRarity + '.png');
  wxsrinPure.appendChild(tableSpanPureWxsRinRarity);
}

  tableSpanPureWxsRin.textContent = wxsrinPureVal + "%";
wxsrinPure.appendChild(tableSpanPureWxsRin);

wxsrinCards.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "22" || card.dataset.support !== "theme_park") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

wxsrinCool.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "22" || card.dataset.support !== "theme_park" || card.dataset.attr !== "cool") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

wxsrinCute.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "22" || card.dataset.support !== "theme_park" || card.dataset.attr !== "cute") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

wxsrinHappy.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "22" || card.dataset.support !== "theme_park" || card.dataset.attr !== "happy") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

wxsrinMyst.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "22" || card.dataset.support !== "theme_park" || card.dataset.attr !== "mysterious") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

wxsrinPure.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "22" || card.dataset.support !== "theme_park" || card.dataset.attr !== "pure") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

// WxsLen
const tableSpanCoolWxsLen = cE("span");
tableSpanCoolWxsLen.className = "score-span";
const tableSpanCoolWxsLenRarity = cE("span");
tableSpanCoolWxsLenRarity.className = "score-rarity-span";
const tableSpanCuteWxsLen = cE("span");
tableSpanCuteWxsLen.className = "score-span";
const tableSpanCuteWxsLenRarity = cE("span");
tableSpanCoolWxsLenRarity.className = "score-rarity-span";
const tableSpanHappyWxsLen = cE("span");
tableSpanHappyWxsLen.className = "score-span";
const tableSpanHappyWxsLenRarity = cE("span");
tableSpanCoolWxsLenRarity.className = "score-rarity-span";
const tableSpanMystWxsLen = cE("span");
tableSpanMystWxsLen.className = "score-span";
const tableSpanMystWxsLenRarity = cE("span");
tableSpanCoolWxsLenRarity.className = "score-rarity-span";
const tableSpanPureWxsLen = cE("span");
tableSpanPureWxsLen.className = "score-span";
const tableSpanPureWxsLenRarity = cE("span");
tableSpanCoolWxsLenRarity.className = "score-rarity-span";

var wxslenTemp = [];
var wxslenCards = gID("wxs-len");
var wxslenCool = gID("cool-wxs-len");
var wxslenCoolVal = 0;
var wxslenCoolRarity = "";
var wxslenCute = gID("cute-wxs-len");
var wxslenCuteVal = 0;
var wxslenCuteRarity = "";
var wxslenHappy = gID("happy-wxs-len");
var wxslenHappyVal = 0;
var wxslenHappyRarity = "";
var wxslenMyst = gID("mysterious-wxs-len");
var wxslenMystVal = 0;
var wxslenMystRarity = "";
var wxslenPure = gID("pure-wxs-len");
var wxslenPureVal = 0;
var wxslenPureRarity = "";

for (var i = 0; i < wxslen.length; i++) {
  if (cardsMatch.includes(wxslen[i][0][0][0])) {
    wxslenTemp.push(wxslen[i]);
  }
}

wxslenTemp.sort((a, b) => a[0][1] - b[0][1]);

for (var i = 0; i < wxslenTemp.length; i++) {
  var attr = wxslenTemp[i][0][0][3];
  var wxslenVal = wxslenTemp[i][0][1];
  var rarity = wxslenTemp[i][0][0][2];

  if (attr === "cool" && wxslenVal > wxslenCoolVal) {
    wxslenCoolVal = wxslenVal;
    wxslenCoolRarity = rarity;
    //console.log(wxslenCoolRarity);
  } else if (attr === "cute" && wxslenVal > wxslenCuteVal) {
    wxslenCuteVal = wxslenVal;
    wxslenCuteRarity = rarity;
  } else if (attr === "happy" && wxslenVal > wxslenHappyVal) {
    wxslenHappyVal = wxslenVal;
    wxslenHappyRarity = rarity;
  } else if (attr === "mysterious" && wxslenVal > wxslenMystVal) {
    wxslenMystVal = wxslenVal;
    wxslenMystRarity = rarity;
  } else if (attr === "pure" && wxslenVal > wxslenPureVal) {
    wxslenPureVal = wxslenVal;
    wxslenPureRarity = rarity;
  }
}

removeAllChildNodes(wxslenCool);
removeAllChildNodes(wxslenCute);
removeAllChildNodes(wxslenHappy);
removeAllChildNodes(wxslenMyst);
removeAllChildNodes(wxslenPure);

var rarityImg = cE('img');
tableSpanCoolWxsLenRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (wxslenCoolRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + wxslenCoolRarity + '.png');
  wxslenCool.appendChild(tableSpanCoolWxsLenRarity);
}

tableSpanCoolWxsLen.textContent = wxslenCoolVal + "%";
wxslenCool.appendChild(tableSpanCoolWxsLen);

var rarityImg = cE('img');
tableSpanCuteWxsLenRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (wxslenCuteRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + wxslenCuteRarity + '.png');
  wxslenCute.appendChild(tableSpanCuteWxsLenRarity);
}

tableSpanCuteWxsLen.textContent = wxslenCuteVal + "%";
wxslenCute.appendChild(tableSpanCuteWxsLen);

var rarityImg = cE('img');
tableSpanHappyWxsLenRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (wxslenHappyRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + wxslenHappyRarity + '.png');
  wxslenHappy.appendChild(tableSpanHappyWxsLenRarity);
}

tableSpanHappyWxsLen.textContent = wxslenHappyVal + "%";
wxslenHappy.appendChild(tableSpanHappyWxsLen);

var rarityImg = cE('img');
tableSpanMystWxsLenRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (wxslenMystRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + wxslenMystRarity + '.png');
  wxslenMyst.appendChild(tableSpanMystWxsLenRarity);
}

tableSpanMystWxsLen.textContent = wxslenMystVal + "%";
wxslenMyst.appendChild(tableSpanMystWxsLen);

var rarityImg = cE('img');
tableSpanPureWxsLenRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (wxslenPureRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + wxslenPureRarity + '.png');
  wxslenPure.appendChild(tableSpanPureWxsLenRarity);
}

  tableSpanPureWxsLen.textContent = wxslenPureVal + "%";
wxslenPure.appendChild(tableSpanPureWxsLen);

wxslenCards.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "23" || card.dataset.support !== "theme_park") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

wxslenCool.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "23" || card.dataset.support !== "theme_park" || card.dataset.attr !== "cool") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

wxslenCute.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "23" || card.dataset.support !== "theme_park" || card.dataset.attr !== "cute") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

wxslenHappy.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "23" || card.dataset.support !== "theme_park" || card.dataset.attr !== "happy") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

wxslenMyst.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "23" || card.dataset.support !== "theme_park" || card.dataset.attr !== "mysterious") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

wxslenPure.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "23" || card.dataset.support !== "theme_park" || card.dataset.attr !== "pure") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

// WxsLuka
const tableSpanCoolWxsLuka = cE("span");
tableSpanCoolWxsLuka.className = "score-span";
const tableSpanCoolWxsLukaRarity = cE("span");
tableSpanCoolWxsLukaRarity.className = "score-rarity-span";
const tableSpanCuteWxsLuka = cE("span");
tableSpanCuteWxsLuka.className = "score-span";
const tableSpanCuteWxsLukaRarity = cE("span");
tableSpanCoolWxsLukaRarity.className = "score-rarity-span";
const tableSpanHappyWxsLuka = cE("span");
tableSpanHappyWxsLuka.className = "score-span";
const tableSpanHappyWxsLukaRarity = cE("span");
tableSpanCoolWxsLukaRarity.className = "score-rarity-span";
const tableSpanMystWxsLuka = cE("span");
tableSpanMystWxsLuka.className = "score-span";
const tableSpanMystWxsLukaRarity = cE("span");
tableSpanCoolWxsLukaRarity.className = "score-rarity-span";
const tableSpanPureWxsLuka = cE("span");
tableSpanPureWxsLuka.className = "score-span";
const tableSpanPureWxsLukaRarity = cE("span");
tableSpanCoolWxsLukaRarity.className = "score-rarity-span";

var wxslukaTemp = [];
var wxslukaCards = gID("wxs-luka");
var wxslukaCool = gID("cool-wxs-luka");
var wxslukaCoolVal = 0;
var wxslukaCoolRarity = "";
var wxslukaCute = gID("cute-wxs-luka");
var wxslukaCuteVal = 0;
var wxslukaCuteRarity = "";
var wxslukaHappy = gID("happy-wxs-luka");
var wxslukaHappyVal = 0;
var wxslukaHappyRarity = "";
var wxslukaMyst = gID("mysterious-wxs-luka");
var wxslukaMystVal = 0;
var wxslukaMystRarity = "";
var wxslukaPure = gID("pure-wxs-luka");
var wxslukaPureVal = 0;
var wxslukaPureRarity = "";

for (var i = 0; i < wxsluka.length; i++) {
  if (cardsMatch.includes(wxsluka[i][0][0][0])) {
    wxslukaTemp.push(wxsluka[i]);
  }
}

wxslukaTemp.sort((a, b) => a[0][1] - b[0][1]);

for (var i = 0; i < wxslukaTemp.length; i++) {
  var attr = wxslukaTemp[i][0][0][3];
  var wxslukaVal = wxslukaTemp[i][0][1];
  var rarity = wxslukaTemp[i][0][0][2];

  if (attr === "cool" && wxslukaVal > wxslukaCoolVal) {
    wxslukaCoolVal = wxslukaVal;
    wxslukaCoolRarity = rarity;
    //console.log(wxslukaCoolRarity);
  } else if (attr === "cute" && wxslukaVal > wxslukaCuteVal) {
    wxslukaCuteVal = wxslukaVal;
    wxslukaCuteRarity = rarity;
  } else if (attr === "happy" && wxslukaVal > wxslukaHappyVal) {
    wxslukaHappyVal = wxslukaVal;
    wxslukaHappyRarity = rarity;
  } else if (attr === "mysterious" && wxslukaVal > wxslukaMystVal) {
    wxslukaMystVal = wxslukaVal;
    wxslukaMystRarity = rarity;
  } else if (attr === "pure" && wxslukaVal > wxslukaPureVal) {
    wxslukaPureVal = wxslukaVal;
    wxslukaPureRarity = rarity;
  }
}

removeAllChildNodes(wxslukaCool);
removeAllChildNodes(wxslukaCute);
removeAllChildNodes(wxslukaHappy);
removeAllChildNodes(wxslukaMyst);
removeAllChildNodes(wxslukaPure);

var rarityImg = cE('img');
tableSpanCoolWxsLukaRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (wxslukaCoolRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + wxslukaCoolRarity + '.png');
  wxslukaCool.appendChild(tableSpanCoolWxsLukaRarity);
}

tableSpanCoolWxsLuka.textContent = wxslukaCoolVal + "%";
wxslukaCool.appendChild(tableSpanCoolWxsLuka);

var rarityImg = cE('img');
tableSpanCuteWxsLukaRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (wxslukaCuteRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + wxslukaCuteRarity + '.png');
  wxslukaCute.appendChild(tableSpanCuteWxsLukaRarity);
}

tableSpanCuteWxsLuka.textContent = wxslukaCuteVal + "%";
wxslukaCute.appendChild(tableSpanCuteWxsLuka);

var rarityImg = cE('img');
tableSpanHappyWxsLukaRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (wxslukaHappyRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + wxslukaHappyRarity + '.png');
  wxslukaHappy.appendChild(tableSpanHappyWxsLukaRarity);
}

tableSpanHappyWxsLuka.textContent = wxslukaHappyVal + "%";
wxslukaHappy.appendChild(tableSpanHappyWxsLuka);

var rarityImg = cE('img');
tableSpanMystWxsLukaRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (wxslukaMystRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + wxslukaMystRarity + '.png');
  wxslukaMyst.appendChild(tableSpanMystWxsLukaRarity);
}

tableSpanMystWxsLuka.textContent = wxslukaMystVal + "%";
wxslukaMyst.appendChild(tableSpanMystWxsLuka);

var rarityImg = cE('img');
tableSpanPureWxsLukaRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (wxslukaPureRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + wxslukaPureRarity + '.png');
  wxslukaPure.appendChild(tableSpanPureWxsLukaRarity);
}

  tableSpanPureWxsLuka.textContent = wxslukaPureVal + "%";
wxslukaPure.appendChild(tableSpanPureWxsLuka);

wxslukaCards.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "24" || card.dataset.support !== "theme_park") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

wxslukaCool.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "24" || card.dataset.support !== "theme_park" || card.dataset.attr !== "cool") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

wxslukaCute.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "24" || card.dataset.support !== "theme_park" || card.dataset.attr !== "cute") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

wxslukaHappy.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "24" || card.dataset.support !== "theme_park" || card.dataset.attr !== "happy") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

wxslukaMyst.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "24" || card.dataset.support !== "theme_park" || card.dataset.attr !== "mysterious") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

wxslukaPure.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "24" || card.dataset.support !== "theme_park" || card.dataset.attr !== "pure") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

// WxsMeiko
const tableSpanCoolWxsMeiko = cE("span");
tableSpanCoolWxsMeiko.className = "score-span";
const tableSpanCoolWxsMeikoRarity = cE("span");
tableSpanCoolWxsMeikoRarity.className = "score-rarity-span";
const tableSpanCuteWxsMeiko = cE("span");
tableSpanCuteWxsMeiko.className = "score-span";
const tableSpanCuteWxsMeikoRarity = cE("span");
tableSpanCoolWxsMeikoRarity.className = "score-rarity-span";
const tableSpanHappyWxsMeiko = cE("span");
tableSpanHappyWxsMeiko.className = "score-span";
const tableSpanHappyWxsMeikoRarity = cE("span");
tableSpanCoolWxsMeikoRarity.className = "score-rarity-span";
const tableSpanMystWxsMeiko = cE("span");
tableSpanMystWxsMeiko.className = "score-span";
const tableSpanMystWxsMeikoRarity = cE("span");
tableSpanCoolWxsMeikoRarity.className = "score-rarity-span";
const tableSpanPureWxsMeiko = cE("span");
tableSpanPureWxsMeiko.className = "score-span";
const tableSpanPureWxsMeikoRarity = cE("span");
tableSpanCoolWxsMeikoRarity.className = "score-rarity-span";

var wxsmeikoTemp = [];
var wxsmeikoCards = gID("wxs-meiko");
var wxsmeikoCool = gID("cool-wxs-meiko");
var wxsmeikoCoolVal = 0;
var wxsmeikoCoolRarity = "";
var wxsmeikoCute = gID("cute-wxs-meiko");
var wxsmeikoCuteVal = 0;
var wxsmeikoCuteRarity = "";
var wxsmeikoHappy = gID("happy-wxs-meiko");
var wxsmeikoHappyVal = 0;
var wxsmeikoHappyRarity = "";
var wxsmeikoMyst = gID("mysterious-wxs-meiko");
var wxsmeikoMystVal = 0;
var wxsmeikoMystRarity = "";
var wxsmeikoPure = gID("pure-wxs-meiko");
var wxsmeikoPureVal = 0;
var wxsmeikoPureRarity = "";

for (var i = 0; i < wxsmeiko.length; i++) {
  if (cardsMatch.includes(wxsmeiko[i][0][0][0])) {
    wxsmeikoTemp.push(wxsmeiko[i]);
  }
}

wxsmeikoTemp.sort((a, b) => a[0][1] - b[0][1]);

for (var i = 0; i < wxsmeikoTemp.length; i++) {
  var attr = wxsmeikoTemp[i][0][0][3];
  var wxsmeikoVal = wxsmeikoTemp[i][0][1];
  var rarity = wxsmeikoTemp[i][0][0][2];

  if (attr === "cool" && wxsmeikoVal > wxsmeikoCoolVal) {
    wxsmeikoCoolVal = wxsmeikoVal;
    wxsmeikoCoolRarity = rarity;
    //console.log(wxsmeikoCoolRarity);
  } else if (attr === "cute" && wxsmeikoVal > wxsmeikoCuteVal) {
    wxsmeikoCuteVal = wxsmeikoVal;
    wxsmeikoCuteRarity = rarity;
  } else if (attr === "happy" && wxsmeikoVal > wxsmeikoHappyVal) {
    wxsmeikoHappyVal = wxsmeikoVal;
    wxsmeikoHappyRarity = rarity;
  } else if (attr === "mysterious" && wxsmeikoVal > wxsmeikoMystVal) {
    wxsmeikoMystVal = wxsmeikoVal;
    wxsmeikoMystRarity = rarity;
  } else if (attr === "pure" && wxsmeikoVal > wxsmeikoPureVal) {
    wxsmeikoPureVal = wxsmeikoVal;
    wxsmeikoPureRarity = rarity;
  }
}

removeAllChildNodes(wxsmeikoCool);
removeAllChildNodes(wxsmeikoCute);
removeAllChildNodes(wxsmeikoHappy);
removeAllChildNodes(wxsmeikoMyst);
removeAllChildNodes(wxsmeikoPure);

var rarityImg = cE('img');
tableSpanCoolWxsMeikoRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (wxsmeikoCoolRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + wxsmeikoCoolRarity + '.png');
  wxsmeikoCool.appendChild(tableSpanCoolWxsMeikoRarity);
}

tableSpanCoolWxsMeiko.textContent = wxsmeikoCoolVal + "%";
wxsmeikoCool.appendChild(tableSpanCoolWxsMeiko);

var rarityImg = cE('img');
tableSpanCuteWxsMeikoRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (wxsmeikoCuteRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + wxsmeikoCuteRarity + '.png');
  wxsmeikoCute.appendChild(tableSpanCuteWxsMeikoRarity);
}

tableSpanCuteWxsMeiko.textContent = wxsmeikoCuteVal + "%";
wxsmeikoCute.appendChild(tableSpanCuteWxsMeiko);

var rarityImg = cE('img');
tableSpanHappyWxsMeikoRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (wxsmeikoHappyRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + wxsmeikoHappyRarity + '.png');
  wxsmeikoHappy.appendChild(tableSpanHappyWxsMeikoRarity);
}

tableSpanHappyWxsMeiko.textContent = wxsmeikoHappyVal + "%";
wxsmeikoHappy.appendChild(tableSpanHappyWxsMeiko);

var rarityImg = cE('img');
tableSpanMystWxsMeikoRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (wxsmeikoMystRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + wxsmeikoMystRarity + '.png');
  wxsmeikoMyst.appendChild(tableSpanMystWxsMeikoRarity);
}

tableSpanMystWxsMeiko.textContent = wxsmeikoMystVal + "%";
wxsmeikoMyst.appendChild(tableSpanMystWxsMeiko);

var rarityImg = cE('img');
tableSpanPureWxsMeikoRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (wxsmeikoPureRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + wxsmeikoPureRarity + '.png');
  wxsmeikoPure.appendChild(tableSpanPureWxsMeikoRarity);
}

  tableSpanPureWxsMeiko.textContent = wxsmeikoPureVal + "%";
wxsmeikoPure.appendChild(tableSpanPureWxsMeiko);

wxsmeikoCards.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "25" || card.dataset.support !== "theme_park") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

wxsmeikoCool.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "25" || card.dataset.support !== "theme_park" || card.dataset.attr !== "cool") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

wxsmeikoCute.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "25" || card.dataset.support !== "theme_park" || card.dataset.attr !== "cute") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

wxsmeikoHappy.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "25" || card.dataset.support !== "theme_park" || card.dataset.attr !== "happy") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

wxsmeikoMyst.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "25" || card.dataset.support !== "theme_park" || card.dataset.attr !== "mysterious") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

wxsmeikoPure.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "25" || card.dataset.support !== "theme_park" || card.dataset.attr !== "pure") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

// WxsKaito
const tableSpanCoolWxsKaito = cE("span");
tableSpanCoolWxsKaito.className = "score-span";
const tableSpanCoolWxsKaitoRarity = cE("span");
tableSpanCoolWxsKaitoRarity.className = "score-rarity-span";
const tableSpanCuteWxsKaito = cE("span");
tableSpanCuteWxsKaito.className = "score-span";
const tableSpanCuteWxsKaitoRarity = cE("span");
tableSpanCoolWxsKaitoRarity.className = "score-rarity-span";
const tableSpanHappyWxsKaito = cE("span");
tableSpanHappyWxsKaito.className = "score-span";
const tableSpanHappyWxsKaitoRarity = cE("span");
tableSpanCoolWxsKaitoRarity.className = "score-rarity-span";
const tableSpanMystWxsKaito = cE("span");
tableSpanMystWxsKaito.className = "score-span";
const tableSpanMystWxsKaitoRarity = cE("span");
tableSpanCoolWxsKaitoRarity.className = "score-rarity-span";
const tableSpanPureWxsKaito = cE("span");
tableSpanPureWxsKaito.className = "score-span";
const tableSpanPureWxsKaitoRarity = cE("span");
tableSpanCoolWxsKaitoRarity.className = "score-rarity-span";

var wxskaitoTemp = [];
var wxskaitoCards = gID("wxs-kaito");
var wxskaitoCool = gID("cool-wxs-kaito");
var wxskaitoCoolVal = 0;
var wxskaitoCoolRarity = "";
var wxskaitoCute = gID("cute-wxs-kaito");
var wxskaitoCuteVal = 0;
var wxskaitoCuteRarity = "";
var wxskaitoHappy = gID("happy-wxs-kaito");
var wxskaitoHappyVal = 0;
var wxskaitoHappyRarity = "";
var wxskaitoMyst = gID("mysterious-wxs-kaito");
var wxskaitoMystVal = 0;
var wxskaitoMystRarity = "";
var wxskaitoPure = gID("pure-wxs-kaito");
var wxskaitoPureVal = 0;
var wxskaitoPureRarity = "";

for (var i = 0; i < wxskaito.length; i++) {
  if (cardsMatch.includes(wxskaito[i][0][0][0])) {
    wxskaitoTemp.push(wxskaito[i]);
  }
}

wxskaitoTemp.sort((a, b) => a[0][1] - b[0][1]);

for (var i = 0; i < wxskaitoTemp.length; i++) {
  var attr = wxskaitoTemp[i][0][0][3];
  var wxskaitoVal = wxskaitoTemp[i][0][1];
  var rarity = wxskaitoTemp[i][0][0][2];

  if (attr === "cool" && wxskaitoVal > wxskaitoCoolVal) {
    wxskaitoCoolVal = wxskaitoVal;
    wxskaitoCoolRarity = rarity;
    //console.log(wxskaitoCoolRarity);
  } else if (attr === "cute" && wxskaitoVal > wxskaitoCuteVal) {
    wxskaitoCuteVal = wxskaitoVal;
    wxskaitoCuteRarity = rarity;
  } else if (attr === "happy" && wxskaitoVal > wxskaitoHappyVal) {
    wxskaitoHappyVal = wxskaitoVal;
    wxskaitoHappyRarity = rarity;
  } else if (attr === "mysterious" && wxskaitoVal > wxskaitoMystVal) {
    wxskaitoMystVal = wxskaitoVal;
    wxskaitoMystRarity = rarity;
  } else if (attr === "pure" && wxskaitoVal > wxskaitoPureVal) {
    wxskaitoPureVal = wxskaitoVal;
    wxskaitoPureRarity = rarity;
  }
}

removeAllChildNodes(wxskaitoCool);
removeAllChildNodes(wxskaitoCute);
removeAllChildNodes(wxskaitoHappy);
removeAllChildNodes(wxskaitoMyst);
removeAllChildNodes(wxskaitoPure);

var rarityImg = cE('img');
tableSpanCoolWxsKaitoRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (wxskaitoCoolRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + wxskaitoCoolRarity + '.png');
  wxskaitoCool.appendChild(tableSpanCoolWxsKaitoRarity);
}

tableSpanCoolWxsKaito.textContent = wxskaitoCoolVal + "%";
wxskaitoCool.appendChild(tableSpanCoolWxsKaito);

var rarityImg = cE('img');
tableSpanCuteWxsKaitoRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (wxskaitoCuteRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + wxskaitoCuteRarity + '.png');
  wxskaitoCute.appendChild(tableSpanCuteWxsKaitoRarity);
}

tableSpanCuteWxsKaito.textContent = wxskaitoCuteVal + "%";
wxskaitoCute.appendChild(tableSpanCuteWxsKaito);

var rarityImg = cE('img');
tableSpanHappyWxsKaitoRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (wxskaitoHappyRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + wxskaitoHappyRarity + '.png');
  wxskaitoHappy.appendChild(tableSpanHappyWxsKaitoRarity);
}

tableSpanHappyWxsKaito.textContent = wxskaitoHappyVal + "%";
wxskaitoHappy.appendChild(tableSpanHappyWxsKaito);

var rarityImg = cE('img');
tableSpanMystWxsKaitoRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (wxskaitoMystRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + wxskaitoMystRarity + '.png');
  wxskaitoMyst.appendChild(tableSpanMystWxsKaitoRarity);
}

tableSpanMystWxsKaito.textContent = wxskaitoMystVal + "%";
wxskaitoMyst.appendChild(tableSpanMystWxsKaito);

var rarityImg = cE('img');
tableSpanPureWxsKaitoRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (wxskaitoPureRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + wxskaitoPureRarity + '.png');
  wxskaitoPure.appendChild(tableSpanPureWxsKaitoRarity);
}

  tableSpanPureWxsKaito.textContent = wxskaitoPureVal + "%";
wxskaitoPure.appendChild(tableSpanPureWxsKaito);

wxskaitoCards.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "26" || card.dataset.support !== "theme_park") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

wxskaitoCool.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "26" || card.dataset.support !== "theme_park" || card.dataset.attr !== "cool") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

wxskaitoCute.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "26" || card.dataset.support !== "theme_park" || card.dataset.attr !== "cute") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

wxskaitoHappy.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "26" || card.dataset.support !== "theme_park" || card.dataset.attr !== "happy") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

wxskaitoMyst.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "26" || card.dataset.support !== "theme_park" || card.dataset.attr !== "mysterious") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

wxskaitoPure.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "26" || card.dataset.support !== "theme_park" || card.dataset.attr !== "pure") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

// all niigo cards
    var niigoCards = gID("niigo");

    niigoCards.addEventListener('click', function(event) {
      var cardIcons = document.getElementsByClassName("card-prsk");

      for (const card of cardIcons) {
        var classes = card.classList;

        if (classes.contains("active-card")) {
          if (card.dataset.char !== "17" && card.dataset.char !== "18" && card.dataset.char !== "19" && card.dataset.char !== "20") {
            card.style.display = 'none';
          }
          classes.toggle("active-card");
        } else {
          card.style.display = "inline-block";
          classes.toggle("active-card");
        }
      }
    });

    // cool niigo cards
    var coolNiigoCards = gID("niigo-cool");

    coolNiigoCards.addEventListener('click', function(event) {
      var cardIcons = document.getElementsByClassName("card-prsk");

      for (const card of cardIcons) {
        var classes = card.classList;

        if (classes.contains("active-card")) {
          if (card.dataset.char !== "17" && card.dataset.char !== "18" && card.dataset.char !== "19" && card.dataset.char !== "20" || card.dataset.attr !== "cool") {
            card.style.display = 'none';

          }
          classes.toggle("active-card");
        } else {
          card.style.display = "inline-block";
          classes.toggle("active-card");
        }
      }
    });

    // cute niigo cards
    var cuteNiigoCards = gID("niigo-cute");

    cuteNiigoCards.addEventListener('click', function(event) {
      var cardIcons = document.getElementsByClassName("card-prsk");

      for (const card of cardIcons) {
        var classes = card.classList;

        if (classes.contains("active-card")) {
          if (card.dataset.char !== "17" && card.dataset.char !== "18" && card.dataset.char !== "19" && card.dataset.char !== "20" || card.dataset.attr !== "cute") {
            card.style.display = 'none';

          }
          classes.toggle("active-card");
        } else {
          card.style.display = "inline-block";
          classes.toggle("active-card");
        }
      }
    });

    // happy niigo cards
    var happyNiigoCards = gID("niigo-happy");

    happyNiigoCards.addEventListener('click', function(event) {
      var cardIcons = document.getElementsByClassName("card-prsk");

      for (const card of cardIcons) {
        var classes = card.classList;

        if (classes.contains("active-card")) {
          if (card.dataset.char !== "17" && card.dataset.char !== "18" && card.dataset.char !== "19" && card.dataset.char !== "20" || card.dataset.attr !== "happy") {
            card.style.display = 'none';

          }
          classes.toggle("active-card");
        } else {
          card.style.display = "inline-block";
          classes.toggle("active-card");
        }
      }
    });

    // mysterious niigo cards
    var mystNiigoCards = gID("niigo-mysterious");

    mystNiigoCards.addEventListener('click', function(event) {
      var cardIcons = document.getElementsByClassName("card-prsk");

      for (const card of cardIcons) {
        var classes = card.classList;

        if (classes.contains("active-card")) {
          if (card.dataset.char !== "17" && card.dataset.char !== "18" && card.dataset.char !== "19" && card.dataset.char !== "20" || card.dataset.attr !== "mysterious") {
            card.style.display = 'none';

          }
          classes.toggle("active-card");
        } else {
          card.style.display = "inline-block";
          classes.toggle("active-card");
        }
      }
    });

    // pure niigo cards
    var pureNiigoCards = gID("niigo-pure");

    pureNiigoCards.addEventListener('click', function(event) {
      var cardIcons = document.getElementsByClassName("card-prsk");

      for (const card of cardIcons) {
        var classes = card.classList;

        if (classes.contains("active-card")) {
          if (card.dataset.char !== "17" && card.dataset.char !== "18" && card.dataset.char !== "19" && card.dataset.char !== "20" || card.dataset.attr !== "pure") {
            card.style.display = 'none';

          }
          classes.toggle("active-card");
        } else {
          card.style.display = "inline-block";
          classes.toggle("active-card");
        }
      }
    });

    // all niigo vs cards
    var niigoVsCards = gID("niigo-vs");

    niigoVsCards.addEventListener('click', function(event) {
      var cardIcons = document.getElementsByClassName("card-prsk");

      for (const card of cardIcons) {
        var classes = card.classList;

        if (classes.contains("active-card")) {
          if (card.dataset.char !== "21" && card.dataset.char !== "22" && card.dataset.char !== "23" && card.dataset.char !== "24" && card.dataset.char !== "25" && card.dataset.char !== "26" || card.dataset.support !== "school_refusal") {
            card.style.display = 'none';
          }
          classes.toggle("active-card");
        } else {
          card.style.display = "inline-block";
          classes.toggle("active-card");
        }
      }
    });

    // cool niigo vs cards
    var coolNiigoVsCards = gID("niigo-vs-cool");

    coolNiigoVsCards.addEventListener('click', function(event) {
      var cardIcons = document.getElementsByClassName("card-prsk");

      for (const card of cardIcons) {
        var classes = card.classList;

        if (classes.contains("active-card")) {
          if (card.dataset.char !== "21" && card.dataset.char !== "22" && card.dataset.char !== "23" && card.dataset.char !== "24" && card.dataset.char !== "25" && card.dataset.char !== "26" || card.dataset.support !== "school_refusal" || card.dataset.attr !== "cool") {
            card.style.display = 'none';
          }
          classes.toggle("active-card");
        } else {
          card.style.display = "inline-block";
          classes.toggle("active-card");
        }
      }
    });

    // cute niigo vs cards
    var cuteNiigoVsCards = gID("niigo-vs-cute");

    cuteNiigoVsCards.addEventListener('click', function(event) {
      var cardIcons = document.getElementsByClassName("card-prsk");

      for (const card of cardIcons) {
        var classes = card.classList;

        if (classes.contains("active-card")) {
          if (card.dataset.char !== "21" && card.dataset.char !== "22" && card.dataset.char !== "23" && card.dataset.char !== "24" && card.dataset.char !== "25" && card.dataset.char !== "26" || card.dataset.support !== "school_refusal" || card.dataset.attr !== "cute") {
            card.style.display = 'none';
          }
          classes.toggle("active-card");
        } else {
          card.style.display = "inline-block";
          classes.toggle("active-card");
        }
      }
    });

    // happy niigo vs cards
    var happyNiigoVsCards = gID("niigo-vs-happy");

    happyNiigoVsCards.addEventListener('click', function(event) {
      var cardIcons = document.getElementsByClassName("card-prsk");

      for (const card of cardIcons) {
        var classes = card.classList;

        if (classes.contains("active-card")) {
          if (card.dataset.char !== "21" && card.dataset.char !== "22" && card.dataset.char !== "23" && card.dataset.char !== "24" && card.dataset.char !== "25" && card.dataset.char !== "26" || card.dataset.attr !== "happy" || card.dataset.support !== "school_refusal") {
            card.style.display = 'none';

          }
          classes.toggle("active-card");
        } else {
          card.style.display = "inline-block";
          classes.toggle("active-card");
        }
      }
    });

    // mysterious niigo vs cards
    var mystNiigoVsCards = gID("niigo-vs-mysterious");

    mystNiigoVsCards.addEventListener('click', function(event) {
      var cardIcons = document.getElementsByClassName("card-prsk");

      for (const card of cardIcons) {
        var classes = card.classList;

        if (classes.contains("active-card")) {
          if (card.dataset.char !== "21" && card.dataset.char !== "22" && card.dataset.char !== "23" && card.dataset.char !== "24" && card.dataset.char !== "25" && card.dataset.char !== "26" || card.dataset.attr !== "mysterious" || card.dataset.support !== "school_refusal") {
            card.style.display = 'none';
          }
          classes.toggle("active-card");
        } else {
          card.style.display = "inline-block";
          classes.toggle("active-card");
        }
      }
    });

    // pure niigo vs cards
    var pureNiigoVsCards = gID("niigo-vs-pure");

    pureNiigoVsCards.addEventListener('click', function(event) {
      var cardIcons = document.getElementsByClassName("card-prsk");

      for (const card of cardIcons) {
        var classes = card.classList;

        if (classes.contains("active-card")) {
          if (card.dataset.char !== "21" && card.dataset.char !== "22" && card.dataset.char !== "23" && card.dataset.char !== "24" && card.dataset.char !== "25" && card.dataset.char !== "26" || card.dataset.attr !== "pure" || card.dataset.support !== "school_refusal") {
            card.style.display = 'none';
          }
          classes.toggle("active-card");
        } else {
          card.style.display = "inline-block";
          classes.toggle("active-card");
        }
      }
    });

    // Kanade
const tableSpanCoolKanade = cE("span");
tableSpanCoolKanade.className = "score-span";
const tableSpanCoolKanadeRarity = cE("span");
tableSpanCoolKanadeRarity.className = "score-rarity-span";
const tableSpanCuteKanade = cE("span");
tableSpanCuteKanade.className = "score-span";
const tableSpanCuteKanadeRarity = cE("span");
tableSpanCoolKanadeRarity.className = "score-rarity-span";
const tableSpanHappyKanade = cE("span");
tableSpanHappyKanade.className = "score-span";
const tableSpanHappyKanadeRarity = cE("span");
tableSpanCoolKanadeRarity.className = "score-rarity-span";
const tableSpanMystKanade = cE("span");
tableSpanMystKanade.className = "score-span";
const tableSpanMystKanadeRarity = cE("span");
tableSpanCoolKanadeRarity.className = "score-rarity-span";
const tableSpanPureKanade = cE("span");
tableSpanPureKanade.className = "score-span";
const tableSpanPureKanadeRarity = cE("span");
tableSpanCoolKanadeRarity.className = "score-rarity-span";

var kanadeTemp = [];
var kanadeCards = gID("kanade");
var kanadeCool = gID("cool-kanade");
var kanadeCoolVal = 0;
var kanadeCoolRarity = "";
var kanadeCute = gID("cute-kanade");
var kanadeCuteVal = 0;
var kanadeCuteRarity = "";
var kanadeHappy = gID("happy-kanade");
var kanadeHappyVal = 0;
var kanadeHappyRarity = "";
var kanadeMyst = gID("mysterious-kanade");
var kanadeMystVal = 0;
var kanadeMystRarity = "";
var kanadePure = gID("pure-kanade");
var kanadePureVal = 0;
var kanadePureRarity = "";

for (var i = 0; i < kanade.length; i++) {
  if (cardsMatch.includes(kanade[i][0][0][0])) {
    kanadeTemp.push(kanade[i]);
  }
}

kanadeTemp.sort((a, b) => a[0][1] - b[0][1]);

for (var i = 0; i < kanadeTemp.length; i++) {
  var attr = kanadeTemp[i][0][0][3];
  var kanadeVal = kanadeTemp[i][0][1];
  var rarity = kanadeTemp[i][0][0][2];

  if (attr === "cool" && kanadeVal > kanadeCoolVal) {
    kanadeCoolVal = kanadeVal;
    kanadeCoolRarity = rarity;
    //console.log(kanadeCoolRarity);
  } else if (attr === "cute" && kanadeVal > kanadeCuteVal) {
    kanadeCuteVal = kanadeVal;
    kanadeCuteRarity = rarity;
  } else if (attr === "happy" && kanadeVal > kanadeHappyVal) {
    kanadeHappyVal = kanadeVal;
    kanadeHappyRarity = rarity;
  } else if (attr === "mysterious" && kanadeVal > kanadeMystVal) {
    kanadeMystVal = kanadeVal;
    kanadeMystRarity = rarity;
  } else if (attr === "pure" && kanadeVal > kanadePureVal) {
    kanadePureVal = kanadeVal;
    kanadePureRarity = rarity;
  }
}

removeAllChildNodes(kanadeCool);
removeAllChildNodes(kanadeCute);
removeAllChildNodes(kanadeHappy);
removeAllChildNodes(kanadeMyst);
removeAllChildNodes(kanadePure);

var rarityImg = cE('img');
tableSpanCoolKanadeRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (kanadeCoolRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + kanadeCoolRarity + '.png');
  kanadeCool.appendChild(tableSpanCoolKanadeRarity);
}

tableSpanCoolKanade.textContent = kanadeCoolVal + "%";
kanadeCool.appendChild(tableSpanCoolKanade);

var rarityImg = cE('img');
tableSpanCuteKanadeRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (kanadeCuteRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + kanadeCuteRarity + '.png');
  kanadeCute.appendChild(tableSpanCuteKanadeRarity);
}

tableSpanCuteKanade.textContent = kanadeCuteVal + "%";
kanadeCute.appendChild(tableSpanCuteKanade);

var rarityImg = cE('img');
tableSpanHappyKanadeRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (kanadeHappyRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + kanadeHappyRarity + '.png');
  kanadeHappy.appendChild(tableSpanHappyKanadeRarity);
}

tableSpanHappyKanade.textContent = kanadeHappyVal + "%";
kanadeHappy.appendChild(tableSpanHappyKanade);

var rarityImg = cE('img');
tableSpanMystKanadeRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (kanadeMystRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + kanadeMystRarity + '.png');
  kanadeMyst.appendChild(tableSpanMystKanadeRarity);
}

tableSpanMystKanade.textContent = kanadeMystVal + "%";
kanadeMyst.appendChild(tableSpanMystKanade);

var rarityImg = cE('img');
tableSpanPureKanadeRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (kanadePureRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + kanadePureRarity + '.png');
  kanadePure.appendChild(tableSpanPureKanadeRarity);
}

  tableSpanPureKanade.textContent = kanadePureVal + "%";
kanadePure.appendChild(tableSpanPureKanade);

kanadeCards.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "17") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

kanadeCool.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "17" || card.dataset.attr !== "cool") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

kanadeCute.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "17" || card.dataset.attr !== "cute") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

kanadeHappy.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "17" || card.dataset.attr !== "happy") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

kanadeMyst.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "17" || card.dataset.attr !== "mysterious") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

kanadePure.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "17" || card.dataset.attr !== "pure") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

// Mafuyu
const tableSpanCoolMafuyu = cE("span");
tableSpanCoolMafuyu.className = "score-span";
const tableSpanCoolMafuyuRarity = cE("span");
tableSpanCoolMafuyuRarity.className = "score-rarity-span";
const tableSpanCuteMafuyu = cE("span");
tableSpanCuteMafuyu.className = "score-span";
const tableSpanCuteMafuyuRarity = cE("span");
tableSpanCoolMafuyuRarity.className = "score-rarity-span";
const tableSpanHappyMafuyu = cE("span");
tableSpanHappyMafuyu.className = "score-span";
const tableSpanHappyMafuyuRarity = cE("span");
tableSpanCoolMafuyuRarity.className = "score-rarity-span";
const tableSpanMystMafuyu = cE("span");
tableSpanMystMafuyu.className = "score-span";
const tableSpanMystMafuyuRarity = cE("span");
tableSpanCoolMafuyuRarity.className = "score-rarity-span";
const tableSpanPureMafuyu = cE("span");
tableSpanPureMafuyu.className = "score-span";
const tableSpanPureMafuyuRarity = cE("span");
tableSpanCoolMafuyuRarity.className = "score-rarity-span";

var mafuyuTemp = [];
var mafuyuCards = gID("mafuyu");
var mafuyuCool = gID("cool-mafuyu");
var mafuyuCoolVal = 0;
var mafuyuCoolRarity = "";
var mafuyuCute = gID("cute-mafuyu");
var mafuyuCuteVal = 0;
var mafuyuCuteRarity = "";
var mafuyuHappy = gID("happy-mafuyu");
var mafuyuHappyVal = 0;
var mafuyuHappyRarity = "";
var mafuyuMyst = gID("mysterious-mafuyu");
var mafuyuMystVal = 0;
var mafuyuMystRarity = "";
var mafuyuPure = gID("pure-mafuyu");
var mafuyuPureVal = 0;
var mafuyuPureRarity = "";

for (var i = 0; i < mafuyu.length; i++) {
  if (cardsMatch.includes(mafuyu[i][0][0][0])) {
    mafuyuTemp.push(mafuyu[i]);
  }
}

mafuyuTemp.sort((a, b) => a[0][1] - b[0][1]);

for (var i = 0; i < mafuyuTemp.length; i++) {
  var attr = mafuyuTemp[i][0][0][3];
  var mafuyuVal = mafuyuTemp[i][0][1];
  var rarity = mafuyuTemp[i][0][0][2];

  if (attr === "cool" && mafuyuVal > mafuyuCoolVal) {
    mafuyuCoolVal = mafuyuVal;
    mafuyuCoolRarity = rarity;
    //console.log(mafuyuCoolRarity);
  } else if (attr === "cute" && mafuyuVal > mafuyuCuteVal) {
    mafuyuCuteVal = mafuyuVal;
    mafuyuCuteRarity = rarity;
  } else if (attr === "happy" && mafuyuVal > mafuyuHappyVal) {
    mafuyuHappyVal = mafuyuVal;
    mafuyuHappyRarity = rarity;
  } else if (attr === "mysterious" && mafuyuVal > mafuyuMystVal) {
    mafuyuMystVal = mafuyuVal;
    mafuyuMystRarity = rarity;
  } else if (attr === "pure" && mafuyuVal > mafuyuPureVal) {
    mafuyuPureVal = mafuyuVal;
    mafuyuPureRarity = rarity;
  }
}

removeAllChildNodes(mafuyuCool);
removeAllChildNodes(mafuyuCute);
removeAllChildNodes(mafuyuHappy);
removeAllChildNodes(mafuyuMyst);
removeAllChildNodes(mafuyuPure);

var rarityImg = cE('img');
tableSpanCoolMafuyuRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (mafuyuCoolRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + mafuyuCoolRarity + '.png');
  mafuyuCool.appendChild(tableSpanCoolMafuyuRarity);
}

tableSpanCoolMafuyu.textContent = mafuyuCoolVal + "%";
mafuyuCool.appendChild(tableSpanCoolMafuyu);

var rarityImg = cE('img');
tableSpanCuteMafuyuRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (mafuyuCuteRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + mafuyuCuteRarity + '.png');
  mafuyuCute.appendChild(tableSpanCuteMafuyuRarity);
}

tableSpanCuteMafuyu.textContent = mafuyuCuteVal + "%";
mafuyuCute.appendChild(tableSpanCuteMafuyu);

var rarityImg = cE('img');
tableSpanHappyMafuyuRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (mafuyuHappyRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + mafuyuHappyRarity + '.png');
  mafuyuHappy.appendChild(tableSpanHappyMafuyuRarity);
}

tableSpanHappyMafuyu.textContent = mafuyuHappyVal + "%";
mafuyuHappy.appendChild(tableSpanHappyMafuyu);

var rarityImg = cE('img');
tableSpanMystMafuyuRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (mafuyuMystRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + mafuyuMystRarity + '.png');
  mafuyuMyst.appendChild(tableSpanMystMafuyuRarity);
}

tableSpanMystMafuyu.textContent = mafuyuMystVal + "%";
mafuyuMyst.appendChild(tableSpanMystMafuyu);

var rarityImg = cE('img');
tableSpanPureMafuyuRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (mafuyuPureRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + mafuyuPureRarity + '.png');
  mafuyuPure.appendChild(tableSpanPureMafuyuRarity);
}

  tableSpanPureMafuyu.textContent = mafuyuPureVal + "%";
mafuyuPure.appendChild(tableSpanPureMafuyu);

mafuyuCards.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "18") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

mafuyuCool.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "18" || card.dataset.attr !== "cool") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

mafuyuCute.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "18" || card.dataset.attr !== "cute") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

mafuyuHappy.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "18" || card.dataset.attr !== "happy") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

mafuyuMyst.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "18" || card.dataset.attr !== "mysterious") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

mafuyuPure.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "18" || card.dataset.attr !== "pure") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

// Ena
const tableSpanCoolEna = cE("span");
tableSpanCoolEna.className = "score-span";
const tableSpanCoolEnaRarity = cE("span");
tableSpanCoolEnaRarity.className = "score-rarity-span";
const tableSpanCuteEna = cE("span");
tableSpanCuteEna.className = "score-span";
const tableSpanCuteEnaRarity = cE("span");
tableSpanCoolEnaRarity.className = "score-rarity-span";
const tableSpanHappyEna = cE("span");
tableSpanHappyEna.className = "score-span";
const tableSpanHappyEnaRarity = cE("span");
tableSpanCoolEnaRarity.className = "score-rarity-span";
const tableSpanMystEna = cE("span");
tableSpanMystEna.className = "score-span";
const tableSpanMystEnaRarity = cE("span");
tableSpanCoolEnaRarity.className = "score-rarity-span";
const tableSpanPureEna = cE("span");
tableSpanPureEna.className = "score-span";
const tableSpanPureEnaRarity = cE("span");
tableSpanCoolEnaRarity.className = "score-rarity-span";

var enaTemp = [];
var enaCards = gID("ena");
var enaCool = gID("cool-ena");
var enaCoolVal = 0;
var enaCoolRarity = "";
var enaCute = gID("cute-ena");
var enaCuteVal = 0;
var enaCuteRarity = "";
var enaHappy = gID("happy-ena");
var enaHappyVal = 0;
var enaHappyRarity = "";
var enaMyst = gID("mysterious-ena");
var enaMystVal = 0;
var enaMystRarity = "";
var enaPure = gID("pure-ena");
var enaPureVal = 0;
var enaPureRarity = "";

for (var i = 0; i < ena.length; i++) {
  if (cardsMatch.includes(ena[i][0][0][0])) {
    enaTemp.push(ena[i]);
  }
}

enaTemp.sort((a, b) => a[0][1] - b[0][1]);

for (var i = 0; i < enaTemp.length; i++) {
  var attr = enaTemp[i][0][0][3];
  var enaVal = enaTemp[i][0][1];
  var rarity = enaTemp[i][0][0][2];

  if (attr === "cool" && enaVal > enaCoolVal) {
    enaCoolVal = enaVal;
    enaCoolRarity = rarity;
    //console.log(enaCoolRarity);
  } else if (attr === "cute" && enaVal > enaCuteVal) {
    enaCuteVal = enaVal;
    enaCuteRarity = rarity;
  } else if (attr === "happy" && enaVal > enaHappyVal) {
    enaHappyVal = enaVal;
    enaHappyRarity = rarity;
  } else if (attr === "mysterious" && enaVal > enaMystVal) {
    enaMystVal = enaVal;
    enaMystRarity = rarity;
  } else if (attr === "pure" && enaVal > enaPureVal) {
    enaPureVal = enaVal;
    enaPureRarity = rarity;
  }
}

removeAllChildNodes(enaCool);
removeAllChildNodes(enaCute);
removeAllChildNodes(enaHappy);
removeAllChildNodes(enaMyst);
removeAllChildNodes(enaPure);

var rarityImg = cE('img');
tableSpanCoolEnaRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (enaCoolRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + enaCoolRarity + '.png');
  enaCool.appendChild(tableSpanCoolEnaRarity);
}

tableSpanCoolEna.textContent = enaCoolVal + "%";
enaCool.appendChild(tableSpanCoolEna);

var rarityImg = cE('img');
tableSpanCuteEnaRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (enaCuteRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + enaCuteRarity + '.png');
  enaCute.appendChild(tableSpanCuteEnaRarity);
}

tableSpanCuteEna.textContent = enaCuteVal + "%";
enaCute.appendChild(tableSpanCuteEna);

var rarityImg = cE('img');
tableSpanHappyEnaRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (enaHappyRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + enaHappyRarity + '.png');
  enaHappy.appendChild(tableSpanHappyEnaRarity);
}

tableSpanHappyEna.textContent = enaHappyVal + "%";
enaHappy.appendChild(tableSpanHappyEna);

var rarityImg = cE('img');
tableSpanMystEnaRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (enaMystRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + enaMystRarity + '.png');
  enaMyst.appendChild(tableSpanMystEnaRarity);
}

tableSpanMystEna.textContent = enaMystVal + "%";
enaMyst.appendChild(tableSpanMystEna);

var rarityImg = cE('img');
tableSpanPureEnaRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (enaPureRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + enaPureRarity + '.png');
  enaPure.appendChild(tableSpanPureEnaRarity);
}

  tableSpanPureEna.textContent = enaPureVal + "%";
enaPure.appendChild(tableSpanPureEna);

enaCards.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "19") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

enaCool.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "19" || card.dataset.attr !== "cool") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

enaCute.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "19" || card.dataset.attr !== "cute") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

enaHappy.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "19" || card.dataset.attr !== "happy") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

enaMyst.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "19" || card.dataset.attr !== "mysterious") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

enaPure.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "19" || card.dataset.attr !== "pure") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

// Mizuki
const tableSpanCoolMizuki = cE("span");
tableSpanCoolMizuki.className = "score-span";
const tableSpanCoolMizukiRarity = cE("span");
tableSpanCoolMizukiRarity.className = "score-rarity-span";
const tableSpanCuteMizuki = cE("span");
tableSpanCuteMizuki.className = "score-span";
const tableSpanCuteMizukiRarity = cE("span");
tableSpanCoolMizukiRarity.className = "score-rarity-span";
const tableSpanHappyMizuki = cE("span");
tableSpanHappyMizuki.className = "score-span";
const tableSpanHappyMizukiRarity = cE("span");
tableSpanCoolMizukiRarity.className = "score-rarity-span";
const tableSpanMystMizuki = cE("span");
tableSpanMystMizuki.className = "score-span";
const tableSpanMystMizukiRarity = cE("span");
tableSpanCoolMizukiRarity.className = "score-rarity-span";
const tableSpanPureMizuki = cE("span");
tableSpanPureMizuki.className = "score-span";
const tableSpanPureMizukiRarity = cE("span");
tableSpanCoolMizukiRarity.className = "score-rarity-span";

var mizukiTemp = [];
var mizukiCards = gID("mizuki");
var mizukiCool = gID("cool-mizuki");
var mizukiCoolVal = 0;
var mizukiCoolRarity = "";
var mizukiCute = gID("cute-mizuki");
var mizukiCuteVal = 0;
var mizukiCuteRarity = "";
var mizukiHappy = gID("happy-mizuki");
var mizukiHappyVal = 0;
var mizukiHappyRarity = "";
var mizukiMyst = gID("mysterious-mizuki");
var mizukiMystVal = 0;
var mizukiMystRarity = "";
var mizukiPure = gID("pure-mizuki");
var mizukiPureVal = 0;
var mizukiPureRarity = "";

for (var i = 0; i < mizuki.length; i++) {
  if (cardsMatch.includes(mizuki[i][0][0][0])) {
    mizukiTemp.push(mizuki[i]);
  }
}

mizukiTemp.sort((a, b) => a[0][1] - b[0][1]);

for (var i = 0; i < mizukiTemp.length; i++) {
  var attr = mizukiTemp[i][0][0][3];
  var mizukiVal = mizukiTemp[i][0][1];
  var rarity = mizukiTemp[i][0][0][2];

  if (attr === "cool" && mizukiVal > mizukiCoolVal) {
    mizukiCoolVal = mizukiVal;
    mizukiCoolRarity = rarity;
    //console.log(mizukiCoolRarity);
  } else if (attr === "cute" && mizukiVal > mizukiCuteVal) {
    mizukiCuteVal = mizukiVal;
    mizukiCuteRarity = rarity;
  } else if (attr === "happy" && mizukiVal > mizukiHappyVal) {
    mizukiHappyVal = mizukiVal;
    mizukiHappyRarity = rarity;
  } else if (attr === "mysterious" && mizukiVal > mizukiMystVal) {
    mizukiMystVal = mizukiVal;
    mizukiMystRarity = rarity;
  } else if (attr === "pure" && mizukiVal > mizukiPureVal) {
    mizukiPureVal = mizukiVal;
    mizukiPureRarity = rarity;
  }
}

removeAllChildNodes(mizukiCool);
removeAllChildNodes(mizukiCute);
removeAllChildNodes(mizukiHappy);
removeAllChildNodes(mizukiMyst);
removeAllChildNodes(mizukiPure);

var rarityImg = cE('img');
tableSpanCoolMizukiRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (mizukiCoolRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + mizukiCoolRarity + '.png');
  mizukiCool.appendChild(tableSpanCoolMizukiRarity);
}

tableSpanCoolMizuki.textContent = mizukiCoolVal + "%";
mizukiCool.appendChild(tableSpanCoolMizuki);

var rarityImg = cE('img');
tableSpanCuteMizukiRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (mizukiCuteRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + mizukiCuteRarity + '.png');
  mizukiCute.appendChild(tableSpanCuteMizukiRarity);
}

tableSpanCuteMizuki.textContent = mizukiCuteVal + "%";
mizukiCute.appendChild(tableSpanCuteMizuki);

var rarityImg = cE('img');
tableSpanHappyMizukiRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (mizukiHappyRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + mizukiHappyRarity + '.png');
  mizukiHappy.appendChild(tableSpanHappyMizukiRarity);
}

tableSpanHappyMizuki.textContent = mizukiHappyVal + "%";
mizukiHappy.appendChild(tableSpanHappyMizuki);

var rarityImg = cE('img');
tableSpanMystMizukiRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (mizukiMystRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + mizukiMystRarity + '.png');
  mizukiMyst.appendChild(tableSpanMystMizukiRarity);
}

tableSpanMystMizuki.textContent = mizukiMystVal + "%";
mizukiMyst.appendChild(tableSpanMystMizuki);

var rarityImg = cE('img');
tableSpanPureMizukiRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (mizukiPureRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + mizukiPureRarity + '.png');
  mizukiPure.appendChild(tableSpanPureMizukiRarity);
}

  tableSpanPureMizuki.textContent = mizukiPureVal + "%";
mizukiPure.appendChild(tableSpanPureMizuki);

mizukiCards.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "20") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

mizukiCool.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "20" || card.dataset.attr !== "cool") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

mizukiCute.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "20" || card.dataset.attr !== "cute") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

mizukiHappy.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "20" || card.dataset.attr !== "happy") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

mizukiMyst.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "20" || card.dataset.attr !== "mysterious") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

mizukiPure.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "20" || card.dataset.attr !== "pure") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

// NiigoMiku
const tableSpanCoolNiigoMiku = cE("span");
tableSpanCoolNiigoMiku.className = "score-span";
const tableSpanCoolNiigoMikuRarity = cE("span");
tableSpanCoolNiigoMikuRarity.className = "score-rarity-span";
const tableSpanCuteNiigoMiku = cE("span");
tableSpanCuteNiigoMiku.className = "score-span";
const tableSpanCuteNiigoMikuRarity = cE("span");
tableSpanCoolNiigoMikuRarity.className = "score-rarity-span";
const tableSpanHappyNiigoMiku = cE("span");
tableSpanHappyNiigoMiku.className = "score-span";
const tableSpanHappyNiigoMikuRarity = cE("span");
tableSpanCoolNiigoMikuRarity.className = "score-rarity-span";
const tableSpanMystNiigoMiku = cE("span");
tableSpanMystNiigoMiku.className = "score-span";
const tableSpanMystNiigoMikuRarity = cE("span");
tableSpanCoolNiigoMikuRarity.className = "score-rarity-span";
const tableSpanPureNiigoMiku = cE("span");
tableSpanPureNiigoMiku.className = "score-span";
const tableSpanPureNiigoMikuRarity = cE("span");
tableSpanCoolNiigoMikuRarity.className = "score-rarity-span";

var niigomikuTemp = [];
var niigomikuCards = gID("niigo-miku");
var niigomikuCool = gID("cool-niigo-miku");
var niigomikuCoolVal = 0;
var niigomikuCoolRarity = "";
var niigomikuCute = gID("cute-niigo-miku");
var niigomikuCuteVal = 0;
var niigomikuCuteRarity = "";
var niigomikuHappy = gID("happy-niigo-miku");
var niigomikuHappyVal = 0;
var niigomikuHappyRarity = "";
var niigomikuMyst = gID("mysterious-niigo-miku");
var niigomikuMystVal = 0;
var niigomikuMystRarity = "";
var niigomikuPure = gID("pure-niigo-miku");
var niigomikuPureVal = 0;
var niigomikuPureRarity = "";

for (var i = 0; i < niigomiku.length; i++) {
  if (cardsMatch.includes(niigomiku[i][0][0][0])) {
    niigomikuTemp.push(niigomiku[i]);
  }
}

niigomikuTemp.sort((a, b) => a[0][1] - b[0][1]);

for (var i = 0; i < niigomikuTemp.length; i++) {
  var attr = niigomikuTemp[i][0][0][3];
  var niigomikuVal = niigomikuTemp[i][0][1];
  var rarity = niigomikuTemp[i][0][0][2];

  if (attr === "cool" && niigomikuVal > niigomikuCoolVal) {
    niigomikuCoolVal = niigomikuVal;
    niigomikuCoolRarity = rarity;
    //console.log(niigomikuCoolRarity);
  } else if (attr === "cute" && niigomikuVal > niigomikuCuteVal) {
    niigomikuCuteVal = niigomikuVal;
    niigomikuCuteRarity = rarity;
  } else if (attr === "happy" && niigomikuVal > niigomikuHappyVal) {
    niigomikuHappyVal = niigomikuVal;
    niigomikuHappyRarity = rarity;
  } else if (attr === "mysterious" && niigomikuVal > niigomikuMystVal) {
    niigomikuMystVal = niigomikuVal;
    niigomikuMystRarity = rarity;
  } else if (attr === "pure" && niigomikuVal > niigomikuPureVal) {
    niigomikuPureVal = niigomikuVal;
    niigomikuPureRarity = rarity;
  }
}

removeAllChildNodes(niigomikuCool);
removeAllChildNodes(niigomikuCute);
removeAllChildNodes(niigomikuHappy);
removeAllChildNodes(niigomikuMyst);
removeAllChildNodes(niigomikuPure);

var rarityImg = cE('img');
tableSpanCoolNiigoMikuRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (niigomikuCoolRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + niigomikuCoolRarity + '.png');
  niigomikuCool.appendChild(tableSpanCoolNiigoMikuRarity);
}

tableSpanCoolNiigoMiku.textContent = niigomikuCoolVal + "%";
niigomikuCool.appendChild(tableSpanCoolNiigoMiku);

var rarityImg = cE('img');
tableSpanCuteNiigoMikuRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (niigomikuCuteRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + niigomikuCuteRarity + '.png');
  niigomikuCute.appendChild(tableSpanCuteNiigoMikuRarity);
}

tableSpanCuteNiigoMiku.textContent = niigomikuCuteVal + "%";
niigomikuCute.appendChild(tableSpanCuteNiigoMiku);

var rarityImg = cE('img');
tableSpanHappyNiigoMikuRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (niigomikuHappyRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + niigomikuHappyRarity + '.png');
  niigomikuHappy.appendChild(tableSpanHappyNiigoMikuRarity);
}

tableSpanHappyNiigoMiku.textContent = niigomikuHappyVal + "%";
niigomikuHappy.appendChild(tableSpanHappyNiigoMiku);

var rarityImg = cE('img');
tableSpanMystNiigoMikuRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (niigomikuMystRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + niigomikuMystRarity + '.png');
  niigomikuMyst.appendChild(tableSpanMystNiigoMikuRarity);
}

tableSpanMystNiigoMiku.textContent = niigomikuMystVal + "%";
niigomikuMyst.appendChild(tableSpanMystNiigoMiku);

var rarityImg = cE('img');
tableSpanPureNiigoMikuRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (niigomikuPureRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + niigomikuPureRarity + '.png');
  niigomikuPure.appendChild(tableSpanPureNiigoMikuRarity);
}

  tableSpanPureNiigoMiku.textContent = niigomikuPureVal + "%";
niigomikuPure.appendChild(tableSpanPureNiigoMiku);

niigomikuCards.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "21" || card.dataset.support !== "school_refusal") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

niigomikuCool.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "21" || card.dataset.support !== "school_refusal" || card.dataset.attr !== "cool") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

niigomikuCute.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "21" || card.dataset.support !== "school_refusal" || card.dataset.attr !== "cute") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

niigomikuHappy.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "21" || card.dataset.support !== "school_refusal" || card.dataset.attr !== "happy") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

niigomikuMyst.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "21" || card.dataset.support !== "school_refusal" || card.dataset.attr !== "mysterious") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

niigomikuPure.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "21" || card.dataset.support !== "school_refusal" || card.dataset.attr !== "pure") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

// NiigoRin
const tableSpanCoolNiigoRin = cE("span");
tableSpanCoolNiigoRin.className = "score-span";
const tableSpanCoolNiigoRinRarity = cE("span");
tableSpanCoolNiigoRinRarity.className = "score-rarity-span";
const tableSpanCuteNiigoRin = cE("span");
tableSpanCuteNiigoRin.className = "score-span";
const tableSpanCuteNiigoRinRarity = cE("span");
tableSpanCoolNiigoRinRarity.className = "score-rarity-span";
const tableSpanHappyNiigoRin = cE("span");
tableSpanHappyNiigoRin.className = "score-span";
const tableSpanHappyNiigoRinRarity = cE("span");
tableSpanCoolNiigoRinRarity.className = "score-rarity-span";
const tableSpanMystNiigoRin = cE("span");
tableSpanMystNiigoRin.className = "score-span";
const tableSpanMystNiigoRinRarity = cE("span");
tableSpanCoolNiigoRinRarity.className = "score-rarity-span";
const tableSpanPureNiigoRin = cE("span");
tableSpanPureNiigoRin.className = "score-span";
const tableSpanPureNiigoRinRarity = cE("span");
tableSpanCoolNiigoRinRarity.className = "score-rarity-span";

var niigorinTemp = [];
var niigorinCards = gID("niigo-rin");
var niigorinCool = gID("cool-niigo-rin");
var niigorinCoolVal = 0;
var niigorinCoolRarity = "";
var niigorinCute = gID("cute-niigo-rin");
var niigorinCuteVal = 0;
var niigorinCuteRarity = "";
var niigorinHappy = gID("happy-niigo-rin");
var niigorinHappyVal = 0;
var niigorinHappyRarity = "";
var niigorinMyst = gID("mysterious-niigo-rin");
var niigorinMystVal = 0;
var niigorinMystRarity = "";
var niigorinPure = gID("pure-niigo-rin");
var niigorinPureVal = 0;
var niigorinPureRarity = "";

for (var i = 0; i < niigorin.length; i++) {
  if (cardsMatch.includes(niigorin[i][0][0][0])) {
    niigorinTemp.push(niigorin[i]);
  }
}

niigorinTemp.sort((a, b) => a[0][1] - b[0][1]);

for (var i = 0; i < niigorinTemp.length; i++) {
  var attr = niigorinTemp[i][0][0][3];
  var niigorinVal = niigorinTemp[i][0][1];
  var rarity = niigorinTemp[i][0][0][2];

  if (attr === "cool" && niigorinVal > niigorinCoolVal) {
    niigorinCoolVal = niigorinVal;
    niigorinCoolRarity = rarity;
    //console.log(niigorinCoolRarity);
  } else if (attr === "cute" && niigorinVal > niigorinCuteVal) {
    niigorinCuteVal = niigorinVal;
    niigorinCuteRarity = rarity;
  } else if (attr === "happy" && niigorinVal > niigorinHappyVal) {
    niigorinHappyVal = niigorinVal;
    niigorinHappyRarity = rarity;
  } else if (attr === "mysterious" && niigorinVal > niigorinMystVal) {
    niigorinMystVal = niigorinVal;
    niigorinMystRarity = rarity;
  } else if (attr === "pure" && niigorinVal > niigorinPureVal) {
    niigorinPureVal = niigorinVal;
    niigorinPureRarity = rarity;
  }
}

removeAllChildNodes(niigorinCool);
removeAllChildNodes(niigorinCute);
removeAllChildNodes(niigorinHappy);
removeAllChildNodes(niigorinMyst);
removeAllChildNodes(niigorinPure);

var rarityImg = cE('img');
tableSpanCoolNiigoRinRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (niigorinCoolRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + niigorinCoolRarity + '.png');
  niigorinCool.appendChild(tableSpanCoolNiigoRinRarity);
}

tableSpanCoolNiigoRin.textContent = niigorinCoolVal + "%";
niigorinCool.appendChild(tableSpanCoolNiigoRin);

var rarityImg = cE('img');
tableSpanCuteNiigoRinRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (niigorinCuteRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + niigorinCuteRarity + '.png');
  niigorinCute.appendChild(tableSpanCuteNiigoRinRarity);
}

tableSpanCuteNiigoRin.textContent = niigorinCuteVal + "%";
niigorinCute.appendChild(tableSpanCuteNiigoRin);

var rarityImg = cE('img');
tableSpanHappyNiigoRinRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (niigorinHappyRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + niigorinHappyRarity + '.png');
  niigorinHappy.appendChild(tableSpanHappyNiigoRinRarity);
}

tableSpanHappyNiigoRin.textContent = niigorinHappyVal + "%";
niigorinHappy.appendChild(tableSpanHappyNiigoRin);

var rarityImg = cE('img');
tableSpanMystNiigoRinRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (niigorinMystRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + niigorinMystRarity + '.png');
  niigorinMyst.appendChild(tableSpanMystNiigoRinRarity);
}

tableSpanMystNiigoRin.textContent = niigorinMystVal + "%";
niigorinMyst.appendChild(tableSpanMystNiigoRin);

var rarityImg = cE('img');
tableSpanPureNiigoRinRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (niigorinPureRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + niigorinPureRarity + '.png');
  niigorinPure.appendChild(tableSpanPureNiigoRinRarity);
}

  tableSpanPureNiigoRin.textContent = niigorinPureVal + "%";
niigorinPure.appendChild(tableSpanPureNiigoRin);

niigorinCards.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "22" || card.dataset.support !== "school_refusal") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

niigorinCool.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "22" || card.dataset.support !== "school_refusal" || card.dataset.attr !== "cool") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

niigorinCute.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "22" || card.dataset.support !== "school_refusal" || card.dataset.attr !== "cute") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

niigorinHappy.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "22" || card.dataset.support !== "school_refusal" || card.dataset.attr !== "happy") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

niigorinMyst.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "22" || card.dataset.support !== "school_refusal" || card.dataset.attr !== "mysterious") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

niigorinPure.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "22" || card.dataset.support !== "school_refusal" || card.dataset.attr !== "pure") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

// NiigoLen
const tableSpanCoolNiigoLen = cE("span");
tableSpanCoolNiigoLen.className = "score-span";
const tableSpanCoolNiigoLenRarity = cE("span");
tableSpanCoolNiigoLenRarity.className = "score-rarity-span";
const tableSpanCuteNiigoLen = cE("span");
tableSpanCuteNiigoLen.className = "score-span";
const tableSpanCuteNiigoLenRarity = cE("span");
tableSpanCoolNiigoLenRarity.className = "score-rarity-span";
const tableSpanHappyNiigoLen = cE("span");
tableSpanHappyNiigoLen.className = "score-span";
const tableSpanHappyNiigoLenRarity = cE("span");
tableSpanCoolNiigoLenRarity.className = "score-rarity-span";
const tableSpanMystNiigoLen = cE("span");
tableSpanMystNiigoLen.className = "score-span";
const tableSpanMystNiigoLenRarity = cE("span");
tableSpanCoolNiigoLenRarity.className = "score-rarity-span";
const tableSpanPureNiigoLen = cE("span");
tableSpanPureNiigoLen.className = "score-span";
const tableSpanPureNiigoLenRarity = cE("span");
tableSpanCoolNiigoLenRarity.className = "score-rarity-span";

var niigolenTemp = [];
var niigolenCards = gID("niigo-len");
var niigolenCool = gID("cool-niigo-len");
var niigolenCoolVal = 0;
var niigolenCoolRarity = "";
var niigolenCute = gID("cute-niigo-len");
var niigolenCuteVal = 0;
var niigolenCuteRarity = "";
var niigolenHappy = gID("happy-niigo-len");
var niigolenHappyVal = 0;
var niigolenHappyRarity = "";
var niigolenMyst = gID("mysterious-niigo-len");
var niigolenMystVal = 0;
var niigolenMystRarity = "";
var niigolenPure = gID("pure-niigo-len");
var niigolenPureVal = 0;
var niigolenPureRarity = "";

for (var i = 0; i < niigolen.length; i++) {
  if (cardsMatch.includes(niigolen[i][0][0][0])) {
    niigolenTemp.push(niigolen[i]);
  }
}

niigolenTemp.sort((a, b) => a[0][1] - b[0][1]);

for (var i = 0; i < niigolenTemp.length; i++) {
  var attr = niigolenTemp[i][0][0][3];
  var niigolenVal = niigolenTemp[i][0][1];
  var rarity = niigolenTemp[i][0][0][2];

  if (attr === "cool" && niigolenVal > niigolenCoolVal) {
    niigolenCoolVal = niigolenVal;
    niigolenCoolRarity = rarity;
    //console.log(niigolenCoolRarity);
  } else if (attr === "cute" && niigolenVal > niigolenCuteVal) {
    niigolenCuteVal = niigolenVal;
    niigolenCuteRarity = rarity;
  } else if (attr === "happy" && niigolenVal > niigolenHappyVal) {
    niigolenHappyVal = niigolenVal;
    niigolenHappyRarity = rarity;
  } else if (attr === "mysterious" && niigolenVal > niigolenMystVal) {
    niigolenMystVal = niigolenVal;
    niigolenMystRarity = rarity;
  } else if (attr === "pure" && niigolenVal > niigolenPureVal) {
    niigolenPureVal = niigolenVal;
    niigolenPureRarity = rarity;
  }
}

removeAllChildNodes(niigolenCool);
removeAllChildNodes(niigolenCute);
removeAllChildNodes(niigolenHappy);
removeAllChildNodes(niigolenMyst);
removeAllChildNodes(niigolenPure);

var rarityImg = cE('img');
tableSpanCoolNiigoLenRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (niigolenCoolRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + niigolenCoolRarity + '.png');
  niigolenCool.appendChild(tableSpanCoolNiigoLenRarity);
}

tableSpanCoolNiigoLen.textContent = niigolenCoolVal + "%";
niigolenCool.appendChild(tableSpanCoolNiigoLen);

var rarityImg = cE('img');
tableSpanCuteNiigoLenRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (niigolenCuteRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + niigolenCuteRarity + '.png');
  niigolenCute.appendChild(tableSpanCuteNiigoLenRarity);
}

tableSpanCuteNiigoLen.textContent = niigolenCuteVal + "%";
niigolenCute.appendChild(tableSpanCuteNiigoLen);

var rarityImg = cE('img');
tableSpanHappyNiigoLenRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (niigolenHappyRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + niigolenHappyRarity + '.png');
  niigolenHappy.appendChild(tableSpanHappyNiigoLenRarity);
}

tableSpanHappyNiigoLen.textContent = niigolenHappyVal + "%";
niigolenHappy.appendChild(tableSpanHappyNiigoLen);

var rarityImg = cE('img');
tableSpanMystNiigoLenRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (niigolenMystRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + niigolenMystRarity + '.png');
  niigolenMyst.appendChild(tableSpanMystNiigoLenRarity);
}

tableSpanMystNiigoLen.textContent = niigolenMystVal + "%";
niigolenMyst.appendChild(tableSpanMystNiigoLen);

var rarityImg = cE('img');
tableSpanPureNiigoLenRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (niigolenPureRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + niigolenPureRarity + '.png');
  niigolenPure.appendChild(tableSpanPureNiigoLenRarity);
}

  tableSpanPureNiigoLen.textContent = niigolenPureVal + "%";
niigolenPure.appendChild(tableSpanPureNiigoLen);

niigolenCards.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "23" || card.dataset.support !== "school_refusal") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

niigolenCool.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "23" || card.dataset.support !== "school_refusal" || card.dataset.attr !== "cool") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

niigolenCute.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "23" || card.dataset.support !== "school_refusal" || card.dataset.attr !== "cute") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

niigolenHappy.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "23" || card.dataset.support !== "school_refusal" || card.dataset.attr !== "happy") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

niigolenMyst.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "23" || card.dataset.support !== "school_refusal" || card.dataset.attr !== "mysterious") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

niigolenPure.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "23" || card.dataset.support !== "school_refusal" || card.dataset.attr !== "pure") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

// NiigoLuka
const tableSpanCoolNiigoLuka = cE("span");
tableSpanCoolNiigoLuka.className = "score-span";
const tableSpanCoolNiigoLukaRarity = cE("span");
tableSpanCoolNiigoLukaRarity.className = "score-rarity-span";
const tableSpanCuteNiigoLuka = cE("span");
tableSpanCuteNiigoLuka.className = "score-span";
const tableSpanCuteNiigoLukaRarity = cE("span");
tableSpanCoolNiigoLukaRarity.className = "score-rarity-span";
const tableSpanHappyNiigoLuka = cE("span");
tableSpanHappyNiigoLuka.className = "score-span";
const tableSpanHappyNiigoLukaRarity = cE("span");
tableSpanCoolNiigoLukaRarity.className = "score-rarity-span";
const tableSpanMystNiigoLuka = cE("span");
tableSpanMystNiigoLuka.className = "score-span";
const tableSpanMystNiigoLukaRarity = cE("span");
tableSpanCoolNiigoLukaRarity.className = "score-rarity-span";
const tableSpanPureNiigoLuka = cE("span");
tableSpanPureNiigoLuka.className = "score-span";
const tableSpanPureNiigoLukaRarity = cE("span");
tableSpanCoolNiigoLukaRarity.className = "score-rarity-span";

var niigolukaTemp = [];
var niigolukaCards = gID("niigo-luka");
var niigolukaCool = gID("cool-niigo-luka");
var niigolukaCoolVal = 0;
var niigolukaCoolRarity = "";
var niigolukaCute = gID("cute-niigo-luka");
var niigolukaCuteVal = 0;
var niigolukaCuteRarity = "";
var niigolukaHappy = gID("happy-niigo-luka");
var niigolukaHappyVal = 0;
var niigolukaHappyRarity = "";
var niigolukaMyst = gID("mysterious-niigo-luka");
var niigolukaMystVal = 0;
var niigolukaMystRarity = "";
var niigolukaPure = gID("pure-niigo-luka");
var niigolukaPureVal = 0;
var niigolukaPureRarity = "";

for (var i = 0; i < niigoluka.length; i++) {
  if (cardsMatch.includes(niigoluka[i][0][0][0])) {
    niigolukaTemp.push(niigoluka[i]);
  }
}

niigolukaTemp.sort((a, b) => a[0][1] - b[0][1]);

for (var i = 0; i < niigolukaTemp.length; i++) {
  var attr = niigolukaTemp[i][0][0][3];
  var niigolukaVal = niigolukaTemp[i][0][1];
  var rarity = niigolukaTemp[i][0][0][2];

  if (attr === "cool" && niigolukaVal > niigolukaCoolVal) {
    niigolukaCoolVal = niigolukaVal;
    niigolukaCoolRarity = rarity;
    //console.log(niigolukaCoolRarity);
  } else if (attr === "cute" && niigolukaVal > niigolukaCuteVal) {
    niigolukaCuteVal = niigolukaVal;
    niigolukaCuteRarity = rarity;
  } else if (attr === "happy" && niigolukaVal > niigolukaHappyVal) {
    niigolukaHappyVal = niigolukaVal;
    niigolukaHappyRarity = rarity;
  } else if (attr === "mysterious" && niigolukaVal > niigolukaMystVal) {
    niigolukaMystVal = niigolukaVal;
    niigolukaMystRarity = rarity;
  } else if (attr === "pure" && niigolukaVal > niigolukaPureVal) {
    niigolukaPureVal = niigolukaVal;
    niigolukaPureRarity = rarity;
  }
}

removeAllChildNodes(niigolukaCool);
removeAllChildNodes(niigolukaCute);
removeAllChildNodes(niigolukaHappy);
removeAllChildNodes(niigolukaMyst);
removeAllChildNodes(niigolukaPure);

var rarityImg = cE('img');
tableSpanCoolNiigoLukaRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (niigolukaCoolRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + niigolukaCoolRarity + '.png');
  niigolukaCool.appendChild(tableSpanCoolNiigoLukaRarity);
}

tableSpanCoolNiigoLuka.textContent = niigolukaCoolVal + "%";
niigolukaCool.appendChild(tableSpanCoolNiigoLuka);

var rarityImg = cE('img');
tableSpanCuteNiigoLukaRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (niigolukaCuteRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + niigolukaCuteRarity + '.png');
  niigolukaCute.appendChild(tableSpanCuteNiigoLukaRarity);
}

tableSpanCuteNiigoLuka.textContent = niigolukaCuteVal + "%";
niigolukaCute.appendChild(tableSpanCuteNiigoLuka);

var rarityImg = cE('img');
tableSpanHappyNiigoLukaRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (niigolukaHappyRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + niigolukaHappyRarity + '.png');
  niigolukaHappy.appendChild(tableSpanHappyNiigoLukaRarity);
}

tableSpanHappyNiigoLuka.textContent = niigolukaHappyVal + "%";
niigolukaHappy.appendChild(tableSpanHappyNiigoLuka);

var rarityImg = cE('img');
tableSpanMystNiigoLukaRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (niigolukaMystRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + niigolukaMystRarity + '.png');
  niigolukaMyst.appendChild(tableSpanMystNiigoLukaRarity);
}

tableSpanMystNiigoLuka.textContent = niigolukaMystVal + "%";
niigolukaMyst.appendChild(tableSpanMystNiigoLuka);

var rarityImg = cE('img');
tableSpanPureNiigoLukaRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (niigolukaPureRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + niigolukaPureRarity + '.png');
  niigolukaPure.appendChild(tableSpanPureNiigoLukaRarity);
}

  tableSpanPureNiigoLuka.textContent = niigolukaPureVal + "%";
niigolukaPure.appendChild(tableSpanPureNiigoLuka);

niigolukaCards.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "24" || card.dataset.support !== "school_refusal") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

niigolukaCool.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "24" || card.dataset.support !== "school_refusal" || card.dataset.attr !== "cool") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

niigolukaCute.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "24" || card.dataset.support !== "school_refusal" || card.dataset.attr !== "cute") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

niigolukaHappy.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "24" || card.dataset.support !== "school_refusal" || card.dataset.attr !== "happy") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

niigolukaMyst.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "24" || card.dataset.support !== "school_refusal" || card.dataset.attr !== "mysterious") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

niigolukaPure.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "24" || card.dataset.support !== "school_refusal" || card.dataset.attr !== "pure") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

// NiigoMeiko
const tableSpanCoolNiigoMeiko = cE("span");
tableSpanCoolNiigoMeiko.className = "score-span";
const tableSpanCoolNiigoMeikoRarity = cE("span");
tableSpanCoolNiigoMeikoRarity.className = "score-rarity-span";
const tableSpanCuteNiigoMeiko = cE("span");
tableSpanCuteNiigoMeiko.className = "score-span";
const tableSpanCuteNiigoMeikoRarity = cE("span");
tableSpanCoolNiigoMeikoRarity.className = "score-rarity-span";
const tableSpanHappyNiigoMeiko = cE("span");
tableSpanHappyNiigoMeiko.className = "score-span";
const tableSpanHappyNiigoMeikoRarity = cE("span");
tableSpanCoolNiigoMeikoRarity.className = "score-rarity-span";
const tableSpanMystNiigoMeiko = cE("span");
tableSpanMystNiigoMeiko.className = "score-span";
const tableSpanMystNiigoMeikoRarity = cE("span");
tableSpanCoolNiigoMeikoRarity.className = "score-rarity-span";
const tableSpanPureNiigoMeiko = cE("span");
tableSpanPureNiigoMeiko.className = "score-span";
const tableSpanPureNiigoMeikoRarity = cE("span");
tableSpanCoolNiigoMeikoRarity.className = "score-rarity-span";

var niigomeikoTemp = [];
var niigomeikoCards = gID("niigo-meiko");
var niigomeikoCool = gID("cool-niigo-meiko");
var niigomeikoCoolVal = 0;
var niigomeikoCoolRarity = "";
var niigomeikoCute = gID("cute-niigo-meiko");
var niigomeikoCuteVal = 0;
var niigomeikoCuteRarity = "";
var niigomeikoHappy = gID("happy-niigo-meiko");
var niigomeikoHappyVal = 0;
var niigomeikoHappyRarity = "";
var niigomeikoMyst = gID("mysterious-niigo-meiko");
var niigomeikoMystVal = 0;
var niigomeikoMystRarity = "";
var niigomeikoPure = gID("pure-niigo-meiko");
var niigomeikoPureVal = 0;
var niigomeikoPureRarity = "";

for (var i = 0; i < niigomeiko.length; i++) {
  if (cardsMatch.includes(niigomeiko[i][0][0][0])) {
    niigomeikoTemp.push(niigomeiko[i]);
  }
}

niigomeikoTemp.sort((a, b) => a[0][1] - b[0][1]);

for (var i = 0; i < niigomeikoTemp.length; i++) {
  var attr = niigomeikoTemp[i][0][0][3];
  var niigomeikoVal = niigomeikoTemp[i][0][1];
  var rarity = niigomeikoTemp[i][0][0][2];

  if (attr === "cool" && niigomeikoVal > niigomeikoCoolVal) {
    niigomeikoCoolVal = niigomeikoVal;
    niigomeikoCoolRarity = rarity;
    //console.log(niigomeikoCoolRarity);
  } else if (attr === "cute" && niigomeikoVal > niigomeikoCuteVal) {
    niigomeikoCuteVal = niigomeikoVal;
    niigomeikoCuteRarity = rarity;
  } else if (attr === "happy" && niigomeikoVal > niigomeikoHappyVal) {
    niigomeikoHappyVal = niigomeikoVal;
    niigomeikoHappyRarity = rarity;
  } else if (attr === "mysterious" && niigomeikoVal > niigomeikoMystVal) {
    niigomeikoMystVal = niigomeikoVal;
    niigomeikoMystRarity = rarity;
  } else if (attr === "pure" && niigomeikoVal > niigomeikoPureVal) {
    niigomeikoPureVal = niigomeikoVal;
    niigomeikoPureRarity = rarity;
  }
}

removeAllChildNodes(niigomeikoCool);
removeAllChildNodes(niigomeikoCute);
removeAllChildNodes(niigomeikoHappy);
removeAllChildNodes(niigomeikoMyst);
removeAllChildNodes(niigomeikoPure);

var rarityImg = cE('img');
tableSpanCoolNiigoMeikoRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (niigomeikoCoolRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + niigomeikoCoolRarity + '.png');
  niigomeikoCool.appendChild(tableSpanCoolNiigoMeikoRarity);
}

tableSpanCoolNiigoMeiko.textContent = niigomeikoCoolVal + "%";
niigomeikoCool.appendChild(tableSpanCoolNiigoMeiko);

var rarityImg = cE('img');
tableSpanCuteNiigoMeikoRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (niigomeikoCuteRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + niigomeikoCuteRarity + '.png');
  niigomeikoCute.appendChild(tableSpanCuteNiigoMeikoRarity);
}

tableSpanCuteNiigoMeiko.textContent = niigomeikoCuteVal + "%";
niigomeikoCute.appendChild(tableSpanCuteNiigoMeiko);

var rarityImg = cE('img');
tableSpanHappyNiigoMeikoRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (niigomeikoHappyRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + niigomeikoHappyRarity + '.png');
  niigomeikoHappy.appendChild(tableSpanHappyNiigoMeikoRarity);
}

tableSpanHappyNiigoMeiko.textContent = niigomeikoHappyVal + "%";
niigomeikoHappy.appendChild(tableSpanHappyNiigoMeiko);

var rarityImg = cE('img');
tableSpanMystNiigoMeikoRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (niigomeikoMystRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + niigomeikoMystRarity + '.png');
  niigomeikoMyst.appendChild(tableSpanMystNiigoMeikoRarity);
}

tableSpanMystNiigoMeiko.textContent = niigomeikoMystVal + "%";
niigomeikoMyst.appendChild(tableSpanMystNiigoMeiko);

var rarityImg = cE('img');
tableSpanPureNiigoMeikoRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (niigomeikoPureRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + niigomeikoPureRarity + '.png');
  niigomeikoPure.appendChild(tableSpanPureNiigoMeikoRarity);
}

  tableSpanPureNiigoMeiko.textContent = niigomeikoPureVal + "%";
niigomeikoPure.appendChild(tableSpanPureNiigoMeiko);

niigomeikoCards.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "25" || card.dataset.support !== "school_refusal") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

niigomeikoCool.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "25" || card.dataset.support !== "school_refusal" || card.dataset.attr !== "cool") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

niigomeikoCute.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "25" || card.dataset.support !== "school_refusal" || card.dataset.attr !== "cute") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

niigomeikoHappy.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "25" || card.dataset.support !== "school_refusal" || card.dataset.attr !== "happy") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

niigomeikoMyst.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "25" || card.dataset.support !== "school_refusal" || card.dataset.attr !== "mysterious") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

niigomeikoPure.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "25" || card.dataset.support !== "school_refusal" || card.dataset.attr !== "pure") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

// NiigoKaito
const tableSpanCoolNiigoKaito = cE("span");
tableSpanCoolNiigoKaito.className = "score-span";
const tableSpanCoolNiigoKaitoRarity = cE("span");
tableSpanCoolNiigoKaitoRarity.className = "score-rarity-span";
const tableSpanCuteNiigoKaito = cE("span");
tableSpanCuteNiigoKaito.className = "score-span";
const tableSpanCuteNiigoKaitoRarity = cE("span");
tableSpanCoolNiigoKaitoRarity.className = "score-rarity-span";
const tableSpanHappyNiigoKaito = cE("span");
tableSpanHappyNiigoKaito.className = "score-span";
const tableSpanHappyNiigoKaitoRarity = cE("span");
tableSpanCoolNiigoKaitoRarity.className = "score-rarity-span";
const tableSpanMystNiigoKaito = cE("span");
tableSpanMystNiigoKaito.className = "score-span";
const tableSpanMystNiigoKaitoRarity = cE("span");
tableSpanCoolNiigoKaitoRarity.className = "score-rarity-span";
const tableSpanPureNiigoKaito = cE("span");
tableSpanPureNiigoKaito.className = "score-span";
const tableSpanPureNiigoKaitoRarity = cE("span");
tableSpanCoolNiigoKaitoRarity.className = "score-rarity-span";

var niigokaitoTemp = [];
var niigokaitoCards = gID("niigo-kaito");
var niigokaitoCool = gID("cool-niigo-kaito");
var niigokaitoCoolVal = 0;
var niigokaitoCoolRarity = "";
var niigokaitoCute = gID("cute-niigo-kaito");
var niigokaitoCuteVal = 0;
var niigokaitoCuteRarity = "";
var niigokaitoHappy = gID("happy-niigo-kaito");
var niigokaitoHappyVal = 0;
var niigokaitoHappyRarity = "";
var niigokaitoMyst = gID("mysterious-niigo-kaito");
var niigokaitoMystVal = 0;
var niigokaitoMystRarity = "";
var niigokaitoPure = gID("pure-niigo-kaito");
var niigokaitoPureVal = 0;
var niigokaitoPureRarity = "";

for (var i = 0; i < niigokaito.length; i++) {
  if (cardsMatch.includes(niigokaito[i][0][0][0])) {
    niigokaitoTemp.push(niigokaito[i]);
  }
}

niigokaitoTemp.sort((a, b) => a[0][1] - b[0][1]);

for (var i = 0; i < niigokaitoTemp.length; i++) {
  var attr = niigokaitoTemp[i][0][0][3];
  var niigokaitoVal = niigokaitoTemp[i][0][1];
  var rarity = niigokaitoTemp[i][0][0][2];

  if (attr === "cool" && niigokaitoVal > niigokaitoCoolVal) {
    niigokaitoCoolVal = niigokaitoVal;
    niigokaitoCoolRarity = rarity;
    //console.log(niigokaitoCoolRarity);
  } else if (attr === "cute" && niigokaitoVal > niigokaitoCuteVal) {
    niigokaitoCuteVal = niigokaitoVal;
    niigokaitoCuteRarity = rarity;
  } else if (attr === "happy" && niigokaitoVal > niigokaitoHappyVal) {
    niigokaitoHappyVal = niigokaitoVal;
    niigokaitoHappyRarity = rarity;
  } else if (attr === "mysterious" && niigokaitoVal > niigokaitoMystVal) {
    niigokaitoMystVal = niigokaitoVal;
    niigokaitoMystRarity = rarity;
  } else if (attr === "pure" && niigokaitoVal > niigokaitoPureVal) {
    niigokaitoPureVal = niigokaitoVal;
    niigokaitoPureRarity = rarity;
  }
}

removeAllChildNodes(niigokaitoCool);
removeAllChildNodes(niigokaitoCute);
removeAllChildNodes(niigokaitoHappy);
removeAllChildNodes(niigokaitoMyst);
removeAllChildNodes(niigokaitoPure);

var rarityImg = cE('img');
tableSpanCoolNiigoKaitoRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (niigokaitoCoolRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + niigokaitoCoolRarity + '.png');
  niigokaitoCool.appendChild(tableSpanCoolNiigoKaitoRarity);
}

tableSpanCoolNiigoKaito.textContent = niigokaitoCoolVal + "%";
niigokaitoCool.appendChild(tableSpanCoolNiigoKaito);

var rarityImg = cE('img');
tableSpanCuteNiigoKaitoRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (niigokaitoCuteRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + niigokaitoCuteRarity + '.png');
  niigokaitoCute.appendChild(tableSpanCuteNiigoKaitoRarity);
}

tableSpanCuteNiigoKaito.textContent = niigokaitoCuteVal + "%";
niigokaitoCute.appendChild(tableSpanCuteNiigoKaito);

var rarityImg = cE('img');
tableSpanHappyNiigoKaitoRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (niigokaitoHappyRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + niigokaitoHappyRarity + '.png');
  niigokaitoHappy.appendChild(tableSpanHappyNiigoKaitoRarity);
}

tableSpanHappyNiigoKaito.textContent = niigokaitoHappyVal + "%";
niigokaitoHappy.appendChild(tableSpanHappyNiigoKaito);

var rarityImg = cE('img');
tableSpanMystNiigoKaitoRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (niigokaitoMystRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + niigokaitoMystRarity + '.png');
  niigokaitoMyst.appendChild(tableSpanMystNiigoKaitoRarity);
}

tableSpanMystNiigoKaito.textContent = niigokaitoMystVal + "%";
niigokaitoMyst.appendChild(tableSpanMystNiigoKaito);

var rarityImg = cE('img');
tableSpanPureNiigoKaitoRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (niigokaitoPureRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + niigokaitoPureRarity + '.png');
  niigokaitoPure.appendChild(tableSpanPureNiigoKaitoRarity);
}

  tableSpanPureNiigoKaito.textContent = niigokaitoPureVal + "%";
niigokaitoPure.appendChild(tableSpanPureNiigoKaito);

niigokaitoCards.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "26" || card.dataset.support !== "school_refusal") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

niigokaitoCool.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "26" || card.dataset.support !== "school_refusal" || card.dataset.attr !== "cool") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

niigokaitoCute.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "26" || card.dataset.support !== "school_refusal" || card.dataset.attr !== "cute") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

niigokaitoHappy.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "26" || card.dataset.support !== "school_refusal" || card.dataset.attr !== "happy") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

niigokaitoMyst.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "26" || card.dataset.support !== "school_refusal" || card.dataset.attr !== "mysterious") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

niigokaitoPure.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "26" || card.dataset.support !== "school_refusal" || card.dataset.attr !== "pure") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

// all  vs cards
    var vsCards = gID("vs");

    vsCards.addEventListener('click', function(event) {
      var cardIcons = document.getElementsByClassName("card-prsk");

      for (const card of cardIcons) {
        var classes = card.classList;

        if (classes.contains("active-card")) {
          if (card.dataset.char !== "21" && card.dataset.char !== "22" && card.dataset.char !== "23" && card.dataset.char !== "24" && card.dataset.char !== "25" && card.dataset.char !== "26" || card.dataset.support !== "none") {
            card.style.display = 'none';
          }
          classes.toggle("active-card");
        } else {
          card.style.display = "inline-block";
          classes.toggle("active-card");
        }
      }
    });

    // cool  vs cards
    var coolVsCards = gID("vs-cool");

    coolVsCards.addEventListener('click', function(event) {
      var cardIcons = document.getElementsByClassName("card-prsk");

      for (const card of cardIcons) {
        var classes = card.classList;

        if (classes.contains("active-card")) {
          if (card.dataset.char !== "21" && card.dataset.char !== "22" && card.dataset.char !== "23" && card.dataset.char !== "24" && card.dataset.char !== "25" && card.dataset.char !== "26" || card.dataset.support !== "none" || card.dataset.attr !== "cool") {
            card.style.display = 'none';
          }
          classes.toggle("active-card");
        } else {
          card.style.display = "inline-block";
          classes.toggle("active-card");
        }
      }
    });

    // cute  vs cards
    var cuteVsCards = gID("vs-cute");

    cuteVsCards.addEventListener('click', function(event) {
      var cardIcons = document.getElementsByClassName("card-prsk");

      for (const card of cardIcons) {
        var classes = card.classList;

        if (classes.contains("active-card")) {
          if (card.dataset.char !== "21" && card.dataset.char !== "22" && card.dataset.char !== "23" && card.dataset.char !== "24" && card.dataset.char !== "25" && card.dataset.char !== "26" || card.dataset.support !== "none" || card.dataset.attr !== "cute") {
            card.style.display = 'none';
          }
          classes.toggle("active-card");
        } else {
          card.style.display = "inline-block";
          classes.toggle("active-card");
        }
      }
    });

    // happy  vs cards
    var happyVsCards = gID("vs-happy");

    happyVsCards.addEventListener('click', function(event) {
      var cardIcons = document.getElementsByClassName("card-prsk");

      for (const card of cardIcons) {
        var classes = card.classList;

        if (classes.contains("active-card")) {
          if (card.dataset.char !== "21" && card.dataset.char !== "22" && card.dataset.char !== "23" && card.dataset.char !== "24" && card.dataset.char !== "25" && card.dataset.char !== "26" || card.dataset.attr !== "happy" || card.dataset.support !== "none") {
            card.style.display = 'none';

          }
          classes.toggle("active-card");
        } else {
          card.style.display = "inline-block";
          classes.toggle("active-card");
        }
      }
    });

    // mysterious  vs cards
    var mystVsCards = gID("vs-mysterious");

    mystVsCards.addEventListener('click', function(event) {
      var cardIcons = document.getElementsByClassName("card-prsk");

      for (const card of cardIcons) {
        var classes = card.classList;

        if (classes.contains("active-card")) {
          if (card.dataset.char !== "21" && card.dataset.char !== "22" && card.dataset.char !== "23" && card.dataset.char !== "24" && card.dataset.char !== "25" && card.dataset.char !== "26" || card.dataset.attr !== "mysterious" || card.dataset.support !== "none") {
            card.style.display = 'none';
          }
          classes.toggle("active-card");
        } else {
          card.style.display = "inline-block";
          classes.toggle("active-card");
        }
      }
    });

    // pure  vs cards
    var pureVsCards = gID("vs-pure");

    pureVsCards.addEventListener('click', function(event) {
      var cardIcons = document.getElementsByClassName("card-prsk");

      for (const card of cardIcons) {
        var classes = card.classList;

        if (classes.contains("active-card")) {
          if (card.dataset.char !== "21" && card.dataset.char !== "22" && card.dataset.char !== "23" && card.dataset.char !== "24" && card.dataset.char !== "25" && card.dataset.char !== "26" || card.dataset.attr !== "pure" || card.dataset.support !== "none") {
            card.style.display = 'none';
          }
          classes.toggle("active-card");
        } else {
          card.style.display = "inline-block";
          classes.toggle("active-card");
        }
      }
    });

    // Miku
const tableSpanCoolMiku = cE("span");
tableSpanCoolMiku.className = "score-span";
const tableSpanCoolMikuRarity = cE("span");
tableSpanCoolMikuRarity.className = "score-rarity-span";
const tableSpanCuteMiku = cE("span");
tableSpanCuteMiku.className = "score-span";
const tableSpanCuteMikuRarity = cE("span");
tableSpanCoolMikuRarity.className = "score-rarity-span";
const tableSpanHappyMiku = cE("span");
tableSpanHappyMiku.className = "score-span";
const tableSpanHappyMikuRarity = cE("span");
tableSpanCoolMikuRarity.className = "score-rarity-span";
const tableSpanMystMiku = cE("span");
tableSpanMystMiku.className = "score-span";
const tableSpanMystMikuRarity = cE("span");
tableSpanCoolMikuRarity.className = "score-rarity-span";
const tableSpanPureMiku = cE("span");
tableSpanPureMiku.className = "score-span";
const tableSpanPureMikuRarity = cE("span");
tableSpanCoolMikuRarity.className = "score-rarity-span";

var mikuTemp = [];
var mikuCards = gID("miku");
var mikuCool = gID("cool-miku");
var mikuCoolVal = 0;
var mikuCoolRarity = "";
var mikuCute = gID("cute-miku");
var mikuCuteVal = 0;
var mikuCuteRarity = "";
var mikuHappy = gID("happy-miku");
var mikuHappyVal = 0;
var mikuHappyRarity = "";
var mikuMyst = gID("mysterious-miku");
var mikuMystVal = 0;
var mikuMystRarity = "";
var mikuPure = gID("pure-miku");
var mikuPureVal = 0;
var mikuPureRarity = "";

for (var i = 0; i < miku.length; i++) {
  if (cardsMatch.includes(miku[i][0][0][0])) {
    mikuTemp.push(miku[i]);
  }
}

mikuTemp.sort((a, b) => a[0][1] - b[0][1]);

for (var i = 0; i < mikuTemp.length; i++) {
  var attr = mikuTemp[i][0][0][3];
  var mikuVal = mikuTemp[i][0][1];
  var rarity = mikuTemp[i][0][0][2];

  if (attr === "cool" && mikuVal > mikuCoolVal) {
    mikuCoolVal = mikuVal;
    mikuCoolRarity = rarity;
    //console.log(mikuCoolRarity);
  } else if (attr === "cute" && mikuVal > mikuCuteVal) {
    mikuCuteVal = mikuVal;
    mikuCuteRarity = rarity;
  } else if (attr === "happy" && mikuVal > mikuHappyVal) {
    mikuHappyVal = mikuVal;
    mikuHappyRarity = rarity;
  } else if (attr === "mysterious" && mikuVal > mikuMystVal) {
    mikuMystVal = mikuVal;
    mikuMystRarity = rarity;
  } else if (attr === "pure" && mikuVal > mikuPureVal) {
    mikuPureVal = mikuVal;
    mikuPureRarity = rarity;
  }
}

removeAllChildNodes(mikuCool);
removeAllChildNodes(mikuCute);
removeAllChildNodes(mikuHappy);
removeAllChildNodes(mikuMyst);
removeAllChildNodes(mikuPure);

var rarityImg = cE('img');
tableSpanCoolMikuRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (mikuCoolRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + mikuCoolRarity + '.png');
  mikuCool.appendChild(tableSpanCoolMikuRarity);
}

tableSpanCoolMiku.textContent = mikuCoolVal + "%";
mikuCool.appendChild(tableSpanCoolMiku);

var rarityImg = cE('img');
tableSpanCuteMikuRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (mikuCuteRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + mikuCuteRarity + '.png');
  mikuCute.appendChild(tableSpanCuteMikuRarity);
}

tableSpanCuteMiku.textContent = mikuCuteVal + "%";
mikuCute.appendChild(tableSpanCuteMiku);

var rarityImg = cE('img');
tableSpanHappyMikuRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (mikuHappyRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + mikuHappyRarity + '.png');
  mikuHappy.appendChild(tableSpanHappyMikuRarity);
}

tableSpanHappyMiku.textContent = mikuHappyVal + "%";
mikuHappy.appendChild(tableSpanHappyMiku);

var rarityImg = cE('img');
tableSpanMystMikuRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (mikuMystRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + mikuMystRarity + '.png');
  mikuMyst.appendChild(tableSpanMystMikuRarity);
}

tableSpanMystMiku.textContent = mikuMystVal + "%";
mikuMyst.appendChild(tableSpanMystMiku);

var rarityImg = cE('img');
tableSpanPureMikuRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (mikuPureRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + mikuPureRarity + '.png');
  mikuPure.appendChild(tableSpanPureMikuRarity);
}

  tableSpanPureMiku.textContent = mikuPureVal + "%";
mikuPure.appendChild(tableSpanPureMiku);

mikuCards.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "21" || card.dataset.support !== "none") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

mikuCool.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "21" || card.dataset.support !== "none" || card.dataset.attr !== "cool") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

mikuCute.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "21" || card.dataset.support !== "none" || card.dataset.attr !== "cute") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

mikuHappy.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "21" || card.dataset.support !== "none" || card.dataset.attr !== "happy") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

mikuMyst.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "21" || card.dataset.support !== "none" || card.dataset.attr !== "mysterious") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

mikuPure.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "21" || card.dataset.support !== "none" || card.dataset.attr !== "pure") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

// Rin
const tableSpanCoolRin = cE("span");
tableSpanCoolRin.className = "score-span";
const tableSpanCoolRinRarity = cE("span");
tableSpanCoolRinRarity.className = "score-rarity-span";
const tableSpanCuteRin = cE("span");
tableSpanCuteRin.className = "score-span";
const tableSpanCuteRinRarity = cE("span");
tableSpanCoolRinRarity.className = "score-rarity-span";
const tableSpanHappyRin = cE("span");
tableSpanHappyRin.className = "score-span";
const tableSpanHappyRinRarity = cE("span");
tableSpanCoolRinRarity.className = "score-rarity-span";
const tableSpanMystRin = cE("span");
tableSpanMystRin.className = "score-span";
const tableSpanMystRinRarity = cE("span");
tableSpanCoolRinRarity.className = "score-rarity-span";
const tableSpanPureRin = cE("span");
tableSpanPureRin.className = "score-span";
const tableSpanPureRinRarity = cE("span");
tableSpanCoolRinRarity.className = "score-rarity-span";

var rinTemp = [];
var rinCards = gID("rin");
var rinCool = gID("cool-rin");
var rinCoolVal = 0;
var rinCoolRarity = "";
var rinCute = gID("cute-rin");
var rinCuteVal = 0;
var rinCuteRarity = "";
var rinHappy = gID("happy-rin");
var rinHappyVal = 0;
var rinHappyRarity = "";
var rinMyst = gID("mysterious-rin");
var rinMystVal = 0;
var rinMystRarity = "";
var rinPure = gID("pure-rin");
var rinPureVal = 0;
var rinPureRarity = "";

for (var i = 0; i < rin.length; i++) {
  if (cardsMatch.includes(rin[i][0][0][0])) {
    rinTemp.push(rin[i]);
  }
}

rinTemp.sort((a, b) => a[0][1] - b[0][1]);

for (var i = 0; i < rinTemp.length; i++) {
  var attr = rinTemp[i][0][0][3];
  var rinVal = rinTemp[i][0][1];
  var rarity = rinTemp[i][0][0][2];

  if (attr === "cool" && rinVal > rinCoolVal) {
    rinCoolVal = rinVal;
    rinCoolRarity = rarity;
    //console.log(rinCoolRarity);
  } else if (attr === "cute" && rinVal > rinCuteVal) {
    rinCuteVal = rinVal;
    rinCuteRarity = rarity;
  } else if (attr === "happy" && rinVal > rinHappyVal) {
    rinHappyVal = rinVal;
    rinHappyRarity = rarity;
  } else if (attr === "mysterious" && rinVal > rinMystVal) {
    rinMystVal = rinVal;
    rinMystRarity = rarity;
  } else if (attr === "pure" && rinVal > rinPureVal) {
    rinPureVal = rinVal;
    rinPureRarity = rarity;
  }
}

removeAllChildNodes(rinCool);
removeAllChildNodes(rinCute);
removeAllChildNodes(rinHappy);
removeAllChildNodes(rinMyst);
removeAllChildNodes(rinPure);

var rarityImg = cE('img');
tableSpanCoolRinRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (rinCoolRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + rinCoolRarity + '.png');
  rinCool.appendChild(tableSpanCoolRinRarity);
}

tableSpanCoolRin.textContent = rinCoolVal + "%";
rinCool.appendChild(tableSpanCoolRin);

var rarityImg = cE('img');
tableSpanCuteRinRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (rinCuteRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + rinCuteRarity + '.png');
  rinCute.appendChild(tableSpanCuteRinRarity);
}

tableSpanCuteRin.textContent = rinCuteVal + "%";
rinCute.appendChild(tableSpanCuteRin);

var rarityImg = cE('img');
tableSpanHappyRinRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (rinHappyRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + rinHappyRarity + '.png');
  rinHappy.appendChild(tableSpanHappyRinRarity);
}

tableSpanHappyRin.textContent = rinHappyVal + "%";
rinHappy.appendChild(tableSpanHappyRin);

var rarityImg = cE('img');
tableSpanMystRinRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (rinMystRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + rinMystRarity + '.png');
  rinMyst.appendChild(tableSpanMystRinRarity);
}

tableSpanMystRin.textContent = rinMystVal + "%";
rinMyst.appendChild(tableSpanMystRin);

var rarityImg = cE('img');
tableSpanPureRinRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (rinPureRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + rinPureRarity + '.png');
  rinPure.appendChild(tableSpanPureRinRarity);
}

  tableSpanPureRin.textContent = rinPureVal + "%";
rinPure.appendChild(tableSpanPureRin);

rinCards.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "22" || card.dataset.support !== "none") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

rinCool.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "22" || card.dataset.support !== "none" || card.dataset.attr !== "cool") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

rinCute.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "22" || card.dataset.support !== "none" || card.dataset.attr !== "cute") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

rinHappy.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "22" || card.dataset.support !== "none" || card.dataset.attr !== "happy") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

rinMyst.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "22" || card.dataset.support !== "none" || card.dataset.attr !== "mysterious") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

rinPure.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "22" || card.dataset.support !== "none" || card.dataset.attr !== "pure") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

// Len
const tableSpanCoolLen = cE("span");
tableSpanCoolLen.className = "score-span";
const tableSpanCoolLenRarity = cE("span");
tableSpanCoolLenRarity.className = "score-rarity-span";
const tableSpanCuteLen = cE("span");
tableSpanCuteLen.className = "score-span";
const tableSpanCuteLenRarity = cE("span");
tableSpanCoolLenRarity.className = "score-rarity-span";
const tableSpanHappyLen = cE("span");
tableSpanHappyLen.className = "score-span";
const tableSpanHappyLenRarity = cE("span");
tableSpanCoolLenRarity.className = "score-rarity-span";
const tableSpanMystLen = cE("span");
tableSpanMystLen.className = "score-span";
const tableSpanMystLenRarity = cE("span");
tableSpanCoolLenRarity.className = "score-rarity-span";
const tableSpanPureLen = cE("span");
tableSpanPureLen.className = "score-span";
const tableSpanPureLenRarity = cE("span");
tableSpanCoolLenRarity.className = "score-rarity-span";

var lenTemp = [];
var lenCards = gID("len");
var lenCool = gID("cool-len");
var lenCoolVal = 0;
var lenCoolRarity = "";
var lenCute = gID("cute-len");
var lenCuteVal = 0;
var lenCuteRarity = "";
var lenHappy = gID("happy-len");
var lenHappyVal = 0;
var lenHappyRarity = "";
var lenMyst = gID("mysterious-len");
var lenMystVal = 0;
var lenMystRarity = "";
var lenPure = gID("pure-len");
var lenPureVal = 0;
var lenPureRarity = "";

for (var i = 0; i < len.length; i++) {
  if (cardsMatch.includes(len[i][0][0][0])) {
    lenTemp.push(len[i]);
  }
}

lenTemp.sort((a, b) => a[0][1] - b[0][1]);

for (var i = 0; i < lenTemp.length; i++) {
  var attr = lenTemp[i][0][0][3];
  var lenVal = lenTemp[i][0][1];
  var rarity = lenTemp[i][0][0][2];

  if (attr === "cool" && lenVal > lenCoolVal) {
    lenCoolVal = lenVal;
    lenCoolRarity = rarity;
    //console.log(lenCoolRarity);
  } else if (attr === "cute" && lenVal > lenCuteVal) {
    lenCuteVal = lenVal;
    lenCuteRarity = rarity;
  } else if (attr === "happy" && lenVal > lenHappyVal) {
    lenHappyVal = lenVal;
    lenHappyRarity = rarity;
  } else if (attr === "mysterious" && lenVal > lenMystVal) {
    lenMystVal = lenVal;
    lenMystRarity = rarity;
  } else if (attr === "pure" && lenVal > lenPureVal) {
    lenPureVal = lenVal;
    lenPureRarity = rarity;
  }
}

removeAllChildNodes(lenCool);
removeAllChildNodes(lenCute);
removeAllChildNodes(lenHappy);
removeAllChildNodes(lenMyst);
removeAllChildNodes(lenPure);

var rarityImg = cE('img');
tableSpanCoolLenRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (lenCoolRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + lenCoolRarity + '.png');
  lenCool.appendChild(tableSpanCoolLenRarity);
}

tableSpanCoolLen.textContent = lenCoolVal + "%";
lenCool.appendChild(tableSpanCoolLen);

var rarityImg = cE('img');
tableSpanCuteLenRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (lenCuteRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + lenCuteRarity + '.png');
  lenCute.appendChild(tableSpanCuteLenRarity);
}

tableSpanCuteLen.textContent = lenCuteVal + "%";
lenCute.appendChild(tableSpanCuteLen);

var rarityImg = cE('img');
tableSpanHappyLenRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (lenHappyRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + lenHappyRarity + '.png');
  lenHappy.appendChild(tableSpanHappyLenRarity);
}

tableSpanHappyLen.textContent = lenHappyVal + "%";
lenHappy.appendChild(tableSpanHappyLen);

var rarityImg = cE('img');
tableSpanMystLenRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (lenMystRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + lenMystRarity + '.png');
  lenMyst.appendChild(tableSpanMystLenRarity);
}

tableSpanMystLen.textContent = lenMystVal + "%";
lenMyst.appendChild(tableSpanMystLen);

var rarityImg = cE('img');
tableSpanPureLenRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (lenPureRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + lenPureRarity + '.png');
  lenPure.appendChild(tableSpanPureLenRarity);
}

  tableSpanPureLen.textContent = lenPureVal + "%";
lenPure.appendChild(tableSpanPureLen);

lenCards.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "23" || card.dataset.support !== "none") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

lenCool.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "23" || card.dataset.support !== "none" || card.dataset.attr !== "cool") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

lenCute.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "23" || card.dataset.support !== "none" || card.dataset.attr !== "cute") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

lenHappy.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "23" || card.dataset.support !== "none" || card.dataset.attr !== "happy") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

lenMyst.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "23" || card.dataset.support !== "none" || card.dataset.attr !== "mysterious") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

lenPure.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "23" || card.dataset.support !== "none" || card.dataset.attr !== "pure") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

// Luka
const tableSpanCoolLuka = cE("span");
tableSpanCoolLuka.className = "score-span";
const tableSpanCoolLukaRarity = cE("span");
tableSpanCoolLukaRarity.className = "score-rarity-span";
const tableSpanCuteLuka = cE("span");
tableSpanCuteLuka.className = "score-span";
const tableSpanCuteLukaRarity = cE("span");
tableSpanCoolLukaRarity.className = "score-rarity-span";
const tableSpanHappyLuka = cE("span");
tableSpanHappyLuka.className = "score-span";
const tableSpanHappyLukaRarity = cE("span");
tableSpanCoolLukaRarity.className = "score-rarity-span";
const tableSpanMystLuka = cE("span");
tableSpanMystLuka.className = "score-span";
const tableSpanMystLukaRarity = cE("span");
tableSpanCoolLukaRarity.className = "score-rarity-span";
const tableSpanPureLuka = cE("span");
tableSpanPureLuka.className = "score-span";
const tableSpanPureLukaRarity = cE("span");
tableSpanCoolLukaRarity.className = "score-rarity-span";

var lukaTemp = [];
var lukaCards = gID("luka");
var lukaCool = gID("cool-luka");
var lukaCoolVal = 0;
var lukaCoolRarity = "";
var lukaCute = gID("cute-luka");
var lukaCuteVal = 0;
var lukaCuteRarity = "";
var lukaHappy = gID("happy-luka");
var lukaHappyVal = 0;
var lukaHappyRarity = "";
var lukaMyst = gID("mysterious-luka");
var lukaMystVal = 0;
var lukaMystRarity = "";
var lukaPure = gID("pure-luka");
var lukaPureVal = 0;
var lukaPureRarity = "";

for (var i = 0; i < luka.length; i++) {
  if (cardsMatch.includes(luka[i][0][0][0])) {
    lukaTemp.push(luka[i]);
  }
}

lukaTemp.sort((a, b) => a[0][1] - b[0][1]);

for (var i = 0; i < lukaTemp.length; i++) {
  var attr = lukaTemp[i][0][0][3];
  var lukaVal = lukaTemp[i][0][1];
  var rarity = lukaTemp[i][0][0][2];

  if (attr === "cool" && lukaVal > lukaCoolVal) {
    lukaCoolVal = lukaVal;
    lukaCoolRarity = rarity;
    //console.log(lukaCoolRarity);
  } else if (attr === "cute" && lukaVal > lukaCuteVal) {
    lukaCuteVal = lukaVal;
    lukaCuteRarity = rarity;
  } else if (attr === "happy" && lukaVal > lukaHappyVal) {
    lukaHappyVal = lukaVal;
    lukaHappyRarity = rarity;
  } else if (attr === "mysterious" && lukaVal > lukaMystVal) {
    lukaMystVal = lukaVal;
    lukaMystRarity = rarity;
  } else if (attr === "pure" && lukaVal > lukaPureVal) {
    lukaPureVal = lukaVal;
    lukaPureRarity = rarity;
  }
}

removeAllChildNodes(lukaCool);
removeAllChildNodes(lukaCute);
removeAllChildNodes(lukaHappy);
removeAllChildNodes(lukaMyst);
removeAllChildNodes(lukaPure);

var rarityImg = cE('img');
tableSpanCoolLukaRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (lukaCoolRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + lukaCoolRarity + '.png');
  lukaCool.appendChild(tableSpanCoolLukaRarity);
}

tableSpanCoolLuka.textContent = lukaCoolVal + "%";
lukaCool.appendChild(tableSpanCoolLuka);

var rarityImg = cE('img');
tableSpanCuteLukaRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (lukaCuteRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + lukaCuteRarity + '.png');
  lukaCute.appendChild(tableSpanCuteLukaRarity);
}

tableSpanCuteLuka.textContent = lukaCuteVal + "%";
lukaCute.appendChild(tableSpanCuteLuka);

var rarityImg = cE('img');
tableSpanHappyLukaRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (lukaHappyRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + lukaHappyRarity + '.png');
  lukaHappy.appendChild(tableSpanHappyLukaRarity);
}

tableSpanHappyLuka.textContent = lukaHappyVal + "%";
lukaHappy.appendChild(tableSpanHappyLuka);

var rarityImg = cE('img');
tableSpanMystLukaRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (lukaMystRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + lukaMystRarity + '.png');
  lukaMyst.appendChild(tableSpanMystLukaRarity);
}

tableSpanMystLuka.textContent = lukaMystVal + "%";
lukaMyst.appendChild(tableSpanMystLuka);

var rarityImg = cE('img');
tableSpanPureLukaRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (lukaPureRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + lukaPureRarity + '.png');
  lukaPure.appendChild(tableSpanPureLukaRarity);
}

  tableSpanPureLuka.textContent = lukaPureVal + "%";
lukaPure.appendChild(tableSpanPureLuka);

lukaCards.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "24" || card.dataset.support !== "none") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

lukaCool.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "24" || card.dataset.support !== "none" || card.dataset.attr !== "cool") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

lukaCute.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "24" || card.dataset.support !== "none" || card.dataset.attr !== "cute") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

lukaHappy.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "24" || card.dataset.support !== "none" || card.dataset.attr !== "happy") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

lukaMyst.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "24" || card.dataset.support !== "none" || card.dataset.attr !== "mysterious") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

lukaPure.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "24" || card.dataset.support !== "none" || card.dataset.attr !== "pure") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

// Meiko
const tableSpanCoolMeiko = cE("span");
tableSpanCoolMeiko.className = "score-span";
const tableSpanCoolMeikoRarity = cE("span");
tableSpanCoolMeikoRarity.className = "score-rarity-span";
const tableSpanCuteMeiko = cE("span");
tableSpanCuteMeiko.className = "score-span";
const tableSpanCuteMeikoRarity = cE("span");
tableSpanCoolMeikoRarity.className = "score-rarity-span";
const tableSpanHappyMeiko = cE("span");
tableSpanHappyMeiko.className = "score-span";
const tableSpanHappyMeikoRarity = cE("span");
tableSpanCoolMeikoRarity.className = "score-rarity-span";
const tableSpanMystMeiko = cE("span");
tableSpanMystMeiko.className = "score-span";
const tableSpanMystMeikoRarity = cE("span");
tableSpanCoolMeikoRarity.className = "score-rarity-span";
const tableSpanPureMeiko = cE("span");
tableSpanPureMeiko.className = "score-span";
const tableSpanPureMeikoRarity = cE("span");
tableSpanCoolMeikoRarity.className = "score-rarity-span";

var meikoTemp = [];
var meikoCards = gID("meiko");
var meikoCool = gID("cool-meiko");
var meikoCoolVal = 0;
var meikoCoolRarity = "";
var meikoCute = gID("cute-meiko");
var meikoCuteVal = 0;
var meikoCuteRarity = "";
var meikoHappy = gID("happy-meiko");
var meikoHappyVal = 0;
var meikoHappyRarity = "";
var meikoMyst = gID("mysterious-meiko");
var meikoMystVal = 0;
var meikoMystRarity = "";
var meikoPure = gID("pure-meiko");
var meikoPureVal = 0;
var meikoPureRarity = "";

for (var i = 0; i < meiko.length; i++) {
  if (cardsMatch.includes(meiko[i][0][0][0])) {
    meikoTemp.push(meiko[i]);
  }
}

meikoTemp.sort((a, b) => a[0][1] - b[0][1]);

for (var i = 0; i < meikoTemp.length; i++) {
  var attr = meikoTemp[i][0][0][3];
  var meikoVal = meikoTemp[i][0][1];
  var rarity = meikoTemp[i][0][0][2];

  if (attr === "cool" && meikoVal > meikoCoolVal) {
    meikoCoolVal = meikoVal;
    meikoCoolRarity = rarity;
    //console.log(meikoCoolRarity);
  } else if (attr === "cute" && meikoVal > meikoCuteVal) {
    meikoCuteVal = meikoVal;
    meikoCuteRarity = rarity;
  } else if (attr === "happy" && meikoVal > meikoHappyVal) {
    meikoHappyVal = meikoVal;
    meikoHappyRarity = rarity;
  } else if (attr === "mysterious" && meikoVal > meikoMystVal) {
    meikoMystVal = meikoVal;
    meikoMystRarity = rarity;
  } else if (attr === "pure" && meikoVal > meikoPureVal) {
    meikoPureVal = meikoVal;
    meikoPureRarity = rarity;
  }
}

removeAllChildNodes(meikoCool);
removeAllChildNodes(meikoCute);
removeAllChildNodes(meikoHappy);
removeAllChildNodes(meikoMyst);
removeAllChildNodes(meikoPure);

var rarityImg = cE('img');
tableSpanCoolMeikoRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (meikoCoolRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + meikoCoolRarity + '.png');
  meikoCool.appendChild(tableSpanCoolMeikoRarity);
}

tableSpanCoolMeiko.textContent = meikoCoolVal + "%";
meikoCool.appendChild(tableSpanCoolMeiko);

var rarityImg = cE('img');
tableSpanCuteMeikoRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (meikoCuteRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + meikoCuteRarity + '.png');
  meikoCute.appendChild(tableSpanCuteMeikoRarity);
}

tableSpanCuteMeiko.textContent = meikoCuteVal + "%";
meikoCute.appendChild(tableSpanCuteMeiko);

var rarityImg = cE('img');
tableSpanHappyMeikoRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (meikoHappyRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + meikoHappyRarity + '.png');
  meikoHappy.appendChild(tableSpanHappyMeikoRarity);
}

tableSpanHappyMeiko.textContent = meikoHappyVal + "%";
meikoHappy.appendChild(tableSpanHappyMeiko);

var rarityImg = cE('img');
tableSpanMystMeikoRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (meikoMystRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + meikoMystRarity + '.png');
  meikoMyst.appendChild(tableSpanMystMeikoRarity);
}

tableSpanMystMeiko.textContent = meikoMystVal + "%";
meikoMyst.appendChild(tableSpanMystMeiko);

var rarityImg = cE('img');
tableSpanPureMeikoRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (meikoPureRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + meikoPureRarity + '.png');
  meikoPure.appendChild(tableSpanPureMeikoRarity);
}

  tableSpanPureMeiko.textContent = meikoPureVal + "%";
meikoPure.appendChild(tableSpanPureMeiko);

meikoCards.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "25" || card.dataset.support !== "none") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

meikoCool.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "25" || card.dataset.support !== "none" || card.dataset.attr !== "cool") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

meikoCute.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "25" || card.dataset.support !== "none" || card.dataset.attr !== "cute") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

meikoHappy.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "25" || card.dataset.support !== "none" || card.dataset.attr !== "happy") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

meikoMyst.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "25" || card.dataset.support !== "none" || card.dataset.attr !== "mysterious") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

meikoPure.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "25" || card.dataset.support !== "none" || card.dataset.attr !== "pure") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

// Kaito
const tableSpanCoolKaito = cE("span");
tableSpanCoolKaito.className = "score-span";
const tableSpanCoolKaitoRarity = cE("span");
tableSpanCoolKaitoRarity.className = "score-rarity-span";
const tableSpanCuteKaito = cE("span");
tableSpanCuteKaito.className = "score-span";
const tableSpanCuteKaitoRarity = cE("span");
tableSpanCoolKaitoRarity.className = "score-rarity-span";
const tableSpanHappyKaito = cE("span");
tableSpanHappyKaito.className = "score-span";
const tableSpanHappyKaitoRarity = cE("span");
tableSpanCoolKaitoRarity.className = "score-rarity-span";
const tableSpanMystKaito = cE("span");
tableSpanMystKaito.className = "score-span";
const tableSpanMystKaitoRarity = cE("span");
tableSpanCoolKaitoRarity.className = "score-rarity-span";
const tableSpanPureKaito = cE("span");
tableSpanPureKaito.className = "score-span";
const tableSpanPureKaitoRarity = cE("span");
tableSpanCoolKaitoRarity.className = "score-rarity-span";

var kaitoTemp = [];
var kaitoCards = gID("kaito");
var kaitoCool = gID("cool-kaito");
var kaitoCoolVal = 0;
var kaitoCoolRarity = "";
var kaitoCute = gID("cute-kaito");
var kaitoCuteVal = 0;
var kaitoCuteRarity = "";
var kaitoHappy = gID("happy-kaito");
var kaitoHappyVal = 0;
var kaitoHappyRarity = "";
var kaitoMyst = gID("mysterious-kaito");
var kaitoMystVal = 0;
var kaitoMystRarity = "";
var kaitoPure = gID("pure-kaito");
var kaitoPureVal = 0;
var kaitoPureRarity = "";

for (var i = 0; i < kaito.length; i++) {
  if (cardsMatch.includes(kaito[i][0][0][0])) {
    kaitoTemp.push(kaito[i]);
  }
}

kaitoTemp.sort((a, b) => a[0][1] - b[0][1]);

for (var i = 0; i < kaitoTemp.length; i++) {
  var attr = kaitoTemp[i][0][0][3];
  var kaitoVal = kaitoTemp[i][0][1];
  var rarity = kaitoTemp[i][0][0][2];

  if (attr === "cool" && kaitoVal > kaitoCoolVal) {
    kaitoCoolVal = kaitoVal;
    kaitoCoolRarity = rarity;
    //console.log(kaitoCoolRarity);
  } else if (attr === "cute" && kaitoVal > kaitoCuteVal) {
    kaitoCuteVal = kaitoVal;
    kaitoCuteRarity = rarity;
  } else if (attr === "happy" && kaitoVal > kaitoHappyVal) {
    kaitoHappyVal = kaitoVal;
    kaitoHappyRarity = rarity;
  } else if (attr === "mysterious" && kaitoVal > kaitoMystVal) {
    kaitoMystVal = kaitoVal;
    kaitoMystRarity = rarity;
  } else if (attr === "pure" && kaitoVal > kaitoPureVal) {
    kaitoPureVal = kaitoVal;
    kaitoPureRarity = rarity;
  }
}

removeAllChildNodes(kaitoCool);
removeAllChildNodes(kaitoCute);
removeAllChildNodes(kaitoHappy);
removeAllChildNodes(kaitoMyst);
removeAllChildNodes(kaitoPure);

var rarityImg = cE('img');
tableSpanCoolKaitoRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (kaitoCoolRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + kaitoCoolRarity + '.png');
  kaitoCool.appendChild(tableSpanCoolKaitoRarity);
}

tableSpanCoolKaito.textContent = kaitoCoolVal + "%";
kaitoCool.appendChild(tableSpanCoolKaito);

var rarityImg = cE('img');
tableSpanCuteKaitoRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (kaitoCuteRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + kaitoCuteRarity + '.png');
  kaitoCute.appendChild(tableSpanCuteKaitoRarity);
}

tableSpanCuteKaito.textContent = kaitoCuteVal + "%";
kaitoCute.appendChild(tableSpanCuteKaito);

var rarityImg = cE('img');
tableSpanHappyKaitoRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (kaitoHappyRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + kaitoHappyRarity + '.png');
  kaitoHappy.appendChild(tableSpanHappyKaitoRarity);
}

tableSpanHappyKaito.textContent = kaitoHappyVal + "%";
kaitoHappy.appendChild(tableSpanHappyKaito);

var rarityImg = cE('img');
tableSpanMystKaitoRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (kaitoMystRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + kaitoMystRarity + '.png');
  kaitoMyst.appendChild(tableSpanMystKaitoRarity);
}

tableSpanMystKaito.textContent = kaitoMystVal + "%";
kaitoMyst.appendChild(tableSpanMystKaito);

var rarityImg = cE('img');
tableSpanPureKaitoRarity.appendChild(rarityImg);
rarityImg.className = 'rarity-img';
if (kaitoPureRarity) {
  rarityImg.setAttribute('src', '../i/icon/' + kaitoPureRarity + '.png');
  kaitoPure.appendChild(tableSpanPureKaitoRarity);
}

  tableSpanPureKaito.textContent = kaitoPureVal + "%";
kaitoPure.appendChild(tableSpanPureKaito);

kaitoCards.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "26" || card.dataset.support !== "none") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

kaitoCool.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "26" || card.dataset.support !== "none" || card.dataset.attr !== "cool") {
        card.style.display = 'none';
      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

kaitoCute.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "26" || card.dataset.support !== "none" || card.dataset.attr !== "cute") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

kaitoHappy.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "26" || card.dataset.support !== "none" || card.dataset.attr !== "happy") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

kaitoMyst.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "26" || card.dataset.support !== "none" || card.dataset.attr !== "mysterious") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});

kaitoPure.addEventListener('click', function(event) {
  var cardIcons = document.getElementsByClassName("card-prsk");

  for (const card of cardIcons) {
    var classes = card.classList;

    if (classes.contains("active-card")) {
      if (card.dataset.char !== "26" || card.dataset.support !== "none" || card.dataset.attr !== "pure") {
        card.style.display = 'none';

      }
      classes.toggle("active-card");
    } else {
      card.style.display = "inline-block";
      classes.toggle("active-card");
    }
  }
});
}

async function cardData() {
  var characters = await getAllChars();
  var cards = await getAllENCards();

  let charsID = Object.keys(characters);
  ////console.log(charsID);
  let cardsENArr = Object.keys(cards);

  var cardsID = [];
  for (var i = 0; i < cardsENArr.length; i++) {
    cardsID.push(cards[i].id);
  }

  for (var i = 0; i < cardsID.length; i++) {
    var cardID = parseInt(cardsID[i]);
    var characterID = cards[i].characterId;
    var character = characters[characterID];
    var cardRarity = cards[i].cardRarityType;
    var cardAttribute = cards[i].attr;
    var cardSkillID = cards[i].skillId;
    var cardSupportUnit = cards[i].supportUnit;

    var card = [];

    //if (cardsMatch.includes(cardID)) {
    //card.push(cardID, characterID, cardRarity, cardAttribute);
    //cardsArr.push(card);
    //}

    card.push(cardID, characterID, cardRarity, cardAttribute, cardSkillID, cardSupportUnit);
    cardsArr.push(card);
  }
  ////console.log(cardsArr);
  return cardsArr;
}

async function skillsData() {
  var skills = await getAllSkills();
  ////console.log(skills);

  let skillsIDArr = Object.keys(skills);

  var skillsID = [];
  for (var i = 0; i < skillsIDArr.length; i++) {
    skillsID.push(skills[i].id);
  }

  ////console.log(skills[0].skillEffects[0].skillEffectType);
  ////console.log(skills[0].skillEffects[0].skillEffectDetails[0].activateEffectValue);
  return skills;
}

async function scoreUpSkillsData() {
  var skills = await skillsData();

  for (var i = 0; i < skills.length; i++) {
    var skillID = skills[i].id;

    var skillEffects = skills[i].skillEffects;
    //var effectValues = [];

    for (var j = 0; j < skillEffects.length; j++) {
      var scoreUpSkill = [];
      var effectValue = skillEffects[j].skillEffectDetails[0].activateEffectValue;
      ////console.log(skillEffects[j].skillEffectType);
      if (skillEffects[j].skillEffectType.includes("score_up") && skillEffects[j].skillEffectType != "score_up_condition_life" && skillEffects[j].skillEffectType != "score_up_keep") {
        scoreUpSkill.push(skillID, effectValue);
        ////console.log(scoreUpSkill);
        scoreUpSkills.push(scoreUpSkill);
      } else if (skillEffects[j].skillEffectType === "score_up_condition_life" && skillEffects[j].activateLife === 1000) {
        scoreUpSkill.push(skillID, effectValue);
        ////console.log(scoreUpSkill);
        scoreUpSkills.push(scoreUpSkill);
      } else if (skillEffects[j].skillEffectType === "score_up_keep" && skillEffects[j].activateNotesJudgmentType === "perfect") {
        scoreUpSkill.push(skillID, effectValue);
        ////console.log(scoreUpSkill);
        scoreUpSkills.push(scoreUpSkill);
      }
    }
  }
  ////console.log(scoreUpSkills);
  return scoreUpSkills;
}

async function skillsMatch() {
  var scoreUp = await scoreUpSkillsData();
  var cards = cardsArr;
  ////console.log(cards);

  for (var i = 0; i < cards.length; i++) {
    ////console.log(cards[i][4]);
    var scoreUpCard = [];
    for (var j = 0; j < scoreUp.length; j++) {
      ////console.log(scoreUp[j]);
      if (cards[i][4] === scoreUp[j][0]) {
        scoreUpCard.push(cards[i], scoreUp[j][1]);
        scoreUpCards.push(scoreUpCard);
      }
    }
  }
  ////console.log(scoreUpCards);
  return scoreUpCards;
}

async function characterMatch() {
  var cards = cardsArr;
  var scoreUp = scoreUpCards;

  for (var i = 0; i < cards.length; i++) {
    var cardsTemp = [];
    var cardID = cards[i][0];
    var characterID = cards[i][1];
    var supportUnit = cards[i][5];

    // leoni
    // ichika
    if (characterID === 1) {
      for (var j = 0; j < scoreUp.length; j++) {
        var scoreUpCardTemp = scoreUp[j][0][0];

        if (scoreUpCardTemp === cardID) {
          cardsTemp.push(scoreUp[j]);
          ichika.push(cardsTemp);
        }
      }
    }

    // saki
    if (characterID === 2) {
      for (var j = 0; j < scoreUp.length; j++) {
        var scoreUpCardTemp = scoreUp[j][0][0];

        if (scoreUpCardTemp === cardID) {
          cardsTemp.push(scoreUp[j]);
          saki.push(cardsTemp);
        }
      }
    }

    // honami
    if (characterID === 3) {
      for (var j = 0; j < scoreUp.length; j++) {
        var scoreUpCardTemp = scoreUp[j][0][0];

        if (scoreUpCardTemp === cardID) {
          cardsTemp.push(scoreUp[j]);
          honami.push(cardsTemp);
        }
      }
    }

    // shiho
    if (characterID === 4) {
      for (var j = 0; j < scoreUp.length; j++) {
        var scoreUpCardTemp = scoreUp[j][0][0];

        if (scoreUpCardTemp === cardID) {
          cardsTemp.push(scoreUp[j]);
          shiho.push(cardsTemp);
        }
      }
    }

    // leoni miku
    if (characterID === 21 && supportUnit === "light_sound") {
      for (var j = 0; j < scoreUp.length; j++) {
        var scoreUpCardTemp = scoreUp[j][0][0];

        if (scoreUpCardTemp === cardID) {
          cardsTemp.push(scoreUp[j]);
          lnmiku.push(cardsTemp);
        }
      }
    }

    // leoni rin
    if (characterID === 22 && supportUnit === "light_sound") {
      for (var j = 0; j < scoreUp.length; j++) {
        var scoreUpCardTemp = scoreUp[j][0][0];

        if (scoreUpCardTemp === cardID) {
          cardsTemp.push(scoreUp[j]);
          lnrin.push(cardsTemp);
        }
      }
    }

    // leoni len
    if (characterID === 23 && supportUnit === "light_sound") {
      for (var j = 0; j < scoreUp.length; j++) {
        var scoreUpCardTemp = scoreUp[j][0][0];

        if (scoreUpCardTemp === cardID) {
          cardsTemp.push(scoreUp[j]);
          lnlen.push(cardsTemp);
        }
      }
    }

    // leoni luka
    if (characterID === 24 && supportUnit === "light_sound") {
      for (var j = 0; j < scoreUp.length; j++) {
        var scoreUpCardTemp = scoreUp[j][0][0];

        if (scoreUpCardTemp === cardID) {
          cardsTemp.push(scoreUp[j]);
          lnluka.push(cardsTemp);
        }
      }
    }

    // leoni meiko
    if (characterID === 25 && supportUnit === "light_sound") {
      for (var j = 0; j < scoreUp.length; j++) {
        var scoreUpCardTemp = scoreUp[j][0][0];

        if (scoreUpCardTemp === cardID) {
          cardsTemp.push(scoreUp[j]);
          lnmeiko.push(cardsTemp);
        }
      }
    }

    // leoni kaito
    if (characterID === 26 && supportUnit === "light_sound") {
      for (var j = 0; j < scoreUp.length; j++) {
        var scoreUpCardTemp = scoreUp[j][0][0];

        if (scoreUpCardTemp === cardID) {
          cardsTemp.push(scoreUp[j]);
          lnkaito.push(cardsTemp);
        }
      }
    }

    // mmj
    // minori
    if (characterID === 5) {
      for (var j = 0; j < scoreUp.length; j++) {
        var scoreUpCardTemp = scoreUp[j][0][0];

        if (scoreUpCardTemp === cardID) {
          cardsTemp.push(scoreUp[j]);
          minori.push(cardsTemp);
        }
      }
    }

    // haruka
    if (characterID === 6) {
      for (var j = 0; j < scoreUp.length; j++) {
        var scoreUpCardTemp = scoreUp[j][0][0];

        if (scoreUpCardTemp === cardID) {
          cardsTemp.push(scoreUp[j]);
          haruka.push(cardsTemp);
        }
      }
    }

    // airi
    if (characterID === 7) {
      for (var j = 0; j < scoreUp.length; j++) {
        var scoreUpCardTemp = scoreUp[j][0][0];

        if (scoreUpCardTemp === cardID) {
          cardsTemp.push(scoreUp[j]);
          airi.push(cardsTemp);
        }
      }
    }

    // shizuku
    if (characterID === 8) {
      for (var j = 0; j < scoreUp.length; j++) {
        var scoreUpCardTemp = scoreUp[j][0][0];

        if (scoreUpCardTemp === cardID) {
          cardsTemp.push(scoreUp[j]);
          shizuku.push(cardsTemp);
        }
      }
    }

    // mmj miku
    if (characterID === 21 && supportUnit === "idol") {
      for (var j = 0; j < scoreUp.length; j++) {
        var scoreUpCardTemp = scoreUp[j][0][0];

        if (scoreUpCardTemp === cardID) {
          cardsTemp.push(scoreUp[j]);
          mmjmiku.push(cardsTemp);
        }
      }
    }

    // mmj rin
    if (characterID === 22 && supportUnit === "idol") {
      for (var j = 0; j < scoreUp.length; j++) {
        var scoreUpCardTemp = scoreUp[j][0][0];

        if (scoreUpCardTemp === cardID) {
          cardsTemp.push(scoreUp[j]);
          mmjrin.push(cardsTemp);
        }
      }
    }

    // mmj len
    if (characterID === 23 && supportUnit === "idol") {
      for (var j = 0; j < scoreUp.length; j++) {
        var scoreUpCardTemp = scoreUp[j][0][0];

        if (scoreUpCardTemp === cardID) {
          cardsTemp.push(scoreUp[j]);
          mmjlen.push(cardsTemp);
        }
      }
    }

    // mmj luka
    if (characterID === 24 && supportUnit === "idol") {
      for (var j = 0; j < scoreUp.length; j++) {
        var scoreUpCardTemp = scoreUp[j][0][0];

        if (scoreUpCardTemp === cardID) {
          cardsTemp.push(scoreUp[j]);
          mmjluka.push(cardsTemp);
        }
      }
    }

    // mmj meiko
    if (characterID === 25 && supportUnit === "idol") {
      for (var j = 0; j < scoreUp.length; j++) {
        var scoreUpCardTemp = scoreUp[j][0][0];

        if (scoreUpCardTemp === cardID) {
          cardsTemp.push(scoreUp[j]);
          mmjmeiko.push(cardsTemp);
        }
      }
    }

    // mmj kaito
    if (characterID === 26 && supportUnit === "idol") {
      for (var j = 0; j < scoreUp.length; j++) {
        var scoreUpCardTemp = scoreUp[j][0][0];

        if (scoreUpCardTemp === cardID) {
          cardsTemp.push(scoreUp[j]);
          mmjkaito.push(cardsTemp);
        }
      }
    }

    // vbs
    // kohane
    if (characterID === 9) {
      for (var j = 0; j < scoreUp.length; j++) {
        var scoreUpCardTemp = scoreUp[j][0][0];

        if (scoreUpCardTemp === cardID) {
          cardsTemp.push(scoreUp[j]);
          kohane.push(cardsTemp);
        }
      }
    }

    // an
    if (characterID === 10) {
      for (var j = 0; j < scoreUp.length; j++) {
        var scoreUpCardTemp = scoreUp[j][0][0];

        if (scoreUpCardTemp === cardID) {
          cardsTemp.push(scoreUp[j]);
          an.push(cardsTemp);
        }
      }
    }

    // akito
    if (characterID === 11) {
      for (var j = 0; j < scoreUp.length; j++) {
        var scoreUpCardTemp = scoreUp[j][0][0];

        if (scoreUpCardTemp === cardID) {
          cardsTemp.push(scoreUp[j]);
          akito.push(cardsTemp);
        }
      }
    }

    // toya
    if (characterID === 12) {
      for (var j = 0; j < scoreUp.length; j++) {
        var scoreUpCardTemp = scoreUp[j][0][0];

        if (scoreUpCardTemp === cardID) {
          cardsTemp.push(scoreUp[j]);
          toya.push(cardsTemp);
        }
      }
    }

    // vbs miku
    if (characterID === 21 && supportUnit === "street") {
      for (var j = 0; j < scoreUp.length; j++) {
        var scoreUpCardTemp = scoreUp[j][0][0];

        if (scoreUpCardTemp === cardID) {
          cardsTemp.push(scoreUp[j]);
          vbsmiku.push(cardsTemp);
        }
      }
    }

    // vbs rin
    if (characterID === 22 && supportUnit === "street") {
      for (var j = 0; j < scoreUp.length; j++) {
        var scoreUpCardTemp = scoreUp[j][0][0];

        if (scoreUpCardTemp === cardID) {
          cardsTemp.push(scoreUp[j]);
          vbsrin.push(cardsTemp);
        }
      }
    }

    // vbs len
    if (characterID === 23 && supportUnit === "street") {
      for (var j = 0; j < scoreUp.length; j++) {
        var scoreUpCardTemp = scoreUp[j][0][0];

        if (scoreUpCardTemp === cardID) {
          cardsTemp.push(scoreUp[j]);
          vbslen.push(cardsTemp);
        }
      }
    }

    // vbs luka
    if (characterID === 24 && supportUnit === "street") {
      for (var j = 0; j < scoreUp.length; j++) {
        var scoreUpCardTemp = scoreUp[j][0][0];

        if (scoreUpCardTemp === cardID) {
          cardsTemp.push(scoreUp[j]);
          vbsluka.push(cardsTemp);
        }
      }
    }

    // vbs meiko
    if (characterID === 25 && supportUnit === "street") {
      for (var j = 0; j < scoreUp.length; j++) {
        var scoreUpCardTemp = scoreUp[j][0][0];

        if (scoreUpCardTemp === cardID) {
          cardsTemp.push(scoreUp[j]);
          vbsmeiko.push(cardsTemp);
        }
      }
    }

    // vbs kaito
    if (characterID === 26 && supportUnit === "street") {
      for (var j = 0; j < scoreUp.length; j++) {
        var scoreUpCardTemp = scoreUp[j][0][0];

        if (scoreUpCardTemp === cardID) {
          cardsTemp.push(scoreUp[j]);
          vbskaito.push(cardsTemp);
        }
      }
    }

    // wxs
    // tsukasa
    if (characterID === 13) {
      for (var j = 0; j < scoreUp.length; j++) {
        var scoreUpCardTemp = scoreUp[j][0][0];

        if (scoreUpCardTemp === cardID) {
          cardsTemp.push(scoreUp[j]);
          tsukasa.push(cardsTemp);
        }
      }
    }

    // emu
    if (characterID === 14) {
      for (var j = 0; j < scoreUp.length; j++) {
        var scoreUpCardTemp = scoreUp[j][0][0];

        if (scoreUpCardTemp === cardID) {
          cardsTemp.push(scoreUp[j]);
          emu.push(cardsTemp);
        }
      }
    }

    // nene
    if (characterID === 15) {
      for (var j = 0; j < scoreUp.length; j++) {
        var scoreUpCardTemp = scoreUp[j][0][0];

        if (scoreUpCardTemp === cardID) {
          cardsTemp.push(scoreUp[j]);
          nene.push(cardsTemp);
        }
      }
    }

    // rui
    if (characterID === 16) {
      for (var j = 0; j < scoreUp.length; j++) {
        var scoreUpCardTemp = scoreUp[j][0][0];

        if (scoreUpCardTemp === cardID) {
          cardsTemp.push(scoreUp[j]);
          rui.push(cardsTemp);
        }
      }
    }

    // wxs miku
    if (characterID === 21 && supportUnit === "theme_park") {
      for (var j = 0; j < scoreUp.length; j++) {
        var scoreUpCardTemp = scoreUp[j][0][0];

        if (scoreUpCardTemp === cardID) {
          cardsTemp.push(scoreUp[j]);
          wxsmiku.push(cardsTemp);
        }
      }
    }

    // wxs rin
    if (characterID === 22 && supportUnit === "theme_park") {
      for (var j = 0; j < scoreUp.length; j++) {
        var scoreUpCardTemp = scoreUp[j][0][0];

        if (scoreUpCardTemp === cardID) {
          cardsTemp.push(scoreUp[j]);
          wxsrin.push(cardsTemp);
        }
      }
    }

    // wxs len
    if (characterID === 23 && supportUnit === "theme_park") {
      for (var j = 0; j < scoreUp.length; j++) {
        var scoreUpCardTemp = scoreUp[j][0][0];

        if (scoreUpCardTemp === cardID) {
          cardsTemp.push(scoreUp[j]);
          wxslen.push(cardsTemp);
        }
      }
    }

    // wxs luka
    if (characterID === 24 && supportUnit === "theme_park") {
      for (var j = 0; j < scoreUp.length; j++) {
        var scoreUpCardTemp = scoreUp[j][0][0];

        if (scoreUpCardTemp === cardID) {
          cardsTemp.push(scoreUp[j]);
          wxsluka.push(cardsTemp);
        }
      }
    }

    // wxs meiko
    if (characterID === 25 && supportUnit === "theme_park") {
      for (var j = 0; j < scoreUp.length; j++) {
        var scoreUpCardTemp = scoreUp[j][0][0];

        if (scoreUpCardTemp === cardID) {
          cardsTemp.push(scoreUp[j]);
          wxsmeiko.push(cardsTemp);
        }
      }
    }

    // wxs kaito
    if (characterID === 26 && supportUnit === "theme_park") {
      for (var j = 0; j < scoreUp.length; j++) {
        var scoreUpCardTemp = scoreUp[j][0][0];

        if (scoreUpCardTemp === cardID) {
          cardsTemp.push(scoreUp[j]);
          wxskaito.push(cardsTemp);
        }
      }
    }

    // niigo
    // kanade
    if (characterID === 17) {
      for (var j = 0; j < scoreUp.length; j++) {
        var scoreUpCardTemp = scoreUp[j][0][0];

        if (scoreUpCardTemp === cardID) {
          cardsTemp.push(scoreUp[j]);
          kanade.push(cardsTemp);
        }
      }
    }

    // mafuyu
    if (characterID === 18) {
      for (var j = 0; j < scoreUp.length; j++) {
        var scoreUpCardTemp = scoreUp[j][0][0];

        if (scoreUpCardTemp === cardID) {
          cardsTemp.push(scoreUp[j]);
          mafuyu.push(cardsTemp);
        }
      }
    }

    // ena
    if (characterID === 19) {
      for (var j = 0; j < scoreUp.length; j++) {
        var scoreUpCardTemp = scoreUp[j][0][0];

        if (scoreUpCardTemp === cardID) {
          cardsTemp.push(scoreUp[j]);
          ena.push(cardsTemp);
        }
      }
    }

    // mizuki
    if (characterID === 20) {
      for (var j = 0; j < scoreUp.length; j++) {
        var scoreUpCardTemp = scoreUp[j][0][0];

        if (scoreUpCardTemp === cardID) {
          cardsTemp.push(scoreUp[j]);
          mizuki.push(cardsTemp);
        }
      }
    }

    // niigo miku
    if (characterID === 21 && supportUnit === "school_refusal") {
      for (var j = 0; j < scoreUp.length; j++) {
        var scoreUpCardTemp = scoreUp[j][0][0];

        if (scoreUpCardTemp === cardID) {
          cardsTemp.push(scoreUp[j]);
          niigomiku.push(cardsTemp);
        }
      }
    }

    // niigo rin
    if (characterID === 22 && supportUnit === "school_refusal") {
      for (var j = 0; j < scoreUp.length; j++) {
        var scoreUpCardTemp = scoreUp[j][0][0];

        if (scoreUpCardTemp === cardID) {
          cardsTemp.push(scoreUp[j]);
          niigorin.push(cardsTemp);
        }
      }
    }

    // niigo len
    if (characterID === 23 && supportUnit === "school_refusal") {
      for (var j = 0; j < scoreUp.length; j++) {
        var scoreUpCardTemp = scoreUp[j][0][0];

        if (scoreUpCardTemp === cardID) {
          cardsTemp.push(scoreUp[j]);
          niigolen.push(cardsTemp);
        }
      }
    }

    // niigo luka
    if (characterID === 24 && supportUnit === "school_refusal") {
      for (var j = 0; j < scoreUp.length; j++) {
        var scoreUpCardTemp = scoreUp[j][0][0];

        if (scoreUpCardTemp === cardID) {
          cardsTemp.push(scoreUp[j]);
          niigoluka.push(cardsTemp);
        }
      }
    }

    // niigo meiko
    if (characterID === 25 && supportUnit === "school_refusal") {
      for (var j = 0; j < scoreUp.length; j++) {
        var scoreUpCardTemp = scoreUp[j][0][0];

        if (scoreUpCardTemp === cardID) {
          cardsTemp.push(scoreUp[j]);
          niigomeiko.push(cardsTemp);
        }
      }
    }

    // niigo kaito
    if (characterID === 26 && supportUnit === "school_refusal") {
      for (var j = 0; j < scoreUp.length; j++) {
        var scoreUpCardTemp = scoreUp[j][0][0];

        if (scoreUpCardTemp === cardID) {
          cardsTemp.push(scoreUp[j]);
          niigokaito.push(cardsTemp);
        }
      }
    }

    // miku
    if (characterID === 21 && supportUnit === "none") {
      for (var j = 0; j < scoreUp.length; j++) {
        var scoreUpCardTemp = scoreUp[j][0][0];

        if (scoreUpCardTemp === cardID) {
          cardsTemp.push(scoreUp[j]);
          miku.push(cardsTemp);
        }
      }
    }

    // rin
    if (characterID === 22 && supportUnit === "none") {
      for (var j = 0; j < scoreUp.length; j++) {
        var scoreUpCardTemp = scoreUp[j][0][0];

        if (scoreUpCardTemp === cardID) {
          cardsTemp.push(scoreUp[j]);
          rin.push(cardsTemp);
        }
      }
    }

    // len
    if (characterID === 23 && supportUnit === "none") {
      for (var j = 0; j < scoreUp.length; j++) {
        var scoreUpCardTemp = scoreUp[j][0][0];

        if (scoreUpCardTemp === cardID) {
          cardsTemp.push(scoreUp[j]);
          len.push(cardsTemp);
        }
      }
    }

    // luka
    if (characterID === 24 && supportUnit === "none") {
      for (var j = 0; j < scoreUp.length; j++) {
        var scoreUpCardTemp = scoreUp[j][0][0];

        if (scoreUpCardTemp === cardID) {
          cardsTemp.push(scoreUp[j]);
          luka.push(cardsTemp);
        }
      }
    }

    // meiko
    if (characterID === 25 && supportUnit === "none") {
      for (var j = 0; j < scoreUp.length; j++) {
        var scoreUpCardTemp = scoreUp[j][0][0];

        if (scoreUpCardTemp === cardID) {
          cardsTemp.push(scoreUp[j]);
          meiko.push(cardsTemp);
        }
      }
    }

    // kaito
    if (characterID === 26 && supportUnit === "none") {
      for (var j = 0; j < scoreUp.length; j++) {
        var scoreUpCardTemp = scoreUp[j][0][0];

        if (scoreUpCardTemp === cardID) {
          cardsTemp.push(scoreUp[j]);
          kaito.push(cardsTemp);
        }
      }
    }
  }
  //console.log(niigomiku);
}
