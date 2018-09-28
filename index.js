// target elements with the "draggable" class
interact('.draggable')
  .draggable({
    // enable inertial throwing
    // inertia: true,
    // keep the element within the area of it's parent
    restrict: {
      restriction: "parent",
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
    // enable autoScroll
    // autoScroll: true,

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    onend: function (event) {
      // var textEl = event.target.querySelector('p');

      // textEl && (textEl.textContent =
      //   'moved a distance of '
      //   + (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
      //                Math.pow(event.pageY - event.y0, 2) | 0))
      //       .toFixed(2) + 'px');
    }
  });

var highestZIndex = 75;

function dragMoveListener (event) {
  var target = event.target,
      // keep the dragged position in the data-x/data-y attributes
      x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
      y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  // translate the element
  target.style.webkitTransform =
  target.style.transform =
    'translate(' + x + 'px, ' + y + 'px)';

  if (target.classList.contains('reversed')) {
    target.style.transform += "rotate(180deg)"
  }

  // update the posiion attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}

// ============ NOT DRAGGING CODE =============

initDeck();

function collect() {
  deckPosX = "0px";
  deckPosY = "0px";

  console.log("Hello");
  var cards = document.getElementsByClassName('draggable');
  for (var i = 0; i < cards.length; i++) {
    cards[i].style.transform = "translate("+deckPosX+","+deckPosY+")";
    cards[i].dataset.x = deckPosX;
    cards[i].dataset.y = deckPosY;
  }
}

function shuffle() {
  var cards = document.getElementsByClassName('draggable');
  var newOrder = [1];
  var max = 0;
  var index = 0;
  var tmp = 0;
  for (var i = 0; i < cards.length; i++) {
    max = newOrder.length;
    index = Math.floor(Math.random() * Math.floor(max));
    tmp = Math.random();
    if (tmp > 0.5 && cards[i] != undefined) {
      cards[i].classList.add("reversed");
    } else {
      cards[i].classList.remove("reversed");
    }
    newOrder.splice(index,0,i);
  }

  for (var i = 0; i < cards.length; i++) {
    cards[i].style["z-index"] = newOrder[i];
  }
  highestZIndex = 75;
  redrawCards();
}

function initDeck() {
  var suits = ["cups","wands","swords","pentacles"];
  var suitCards = ["1","2","3","4","5","6","7","8","9","10","Page","Knight","Queen","King"];
  var majorArcana = ["The Fool", "The Magician", "The High Priestess","The Empress","The Emperor","The Hierophant","The Lovers","The Chariot","Strength","The Hermit","Wheel of Fortune","Justice","The Hanged Man","Death","Temperance","The Devil","The Tower","The Star","The Moon","The Sun","Judgement","The World"];

  var cardMat = document.getElementById("card-mat");
  console.log(cardMat);

  // The Minor Arcana
  for (var i = 0; i < suits.length; i++) {
    for (var j = 0; j < suitCards.length; j++) {
      var text = document.createTextNode(suitCards[j]+" of "+suits[i]);
      var p = document.createElement('p');
      p.append(text);
      var cardElem = document.createElement('div');
      var cardBackElem = document.createElement('div');
      var cardFaceElem = document.createElement('div');
      cardBackElem.className = "card-back";
      cardElem.className = "draggable card deck-default suit-"+suits[i];
      cardFaceElem.id = suits[i]+"-"+suitCards[j];
      cardFaceElem.className = "card-front";

      cardElem.append(cardBackElem);
      cardFaceElem.append(p);
      cardElem.append(cardFaceElem);

      cardMat.append(cardElem);
    }
  }

  // The Major Arcana
  for (let k = 0; k < majorArcana.length; k++) {
    var text = document.createTextNode(majorArcana[k]);
    var p = document.createElement('p');
    p.append(text);
    var cardElem = document.createElement('div');
    var cardBackElem = document.createElement('div');
    var cardFaceElem = document.createElement('div');
    cardBackElem.className = "card-back";
    cardElem.className = "draggable card deck-default suit-major-arcana";
    var cardId = majorArcana[k].replace(' ','-').toLowerCase();
    cardFaceElem.id = cardId;
    cardFaceElem.className = "card-front";

    cardElem.append(cardBackElem);
    cardFaceElem.append(p);
    cardElem.append(cardFaceElem);

    cardMat.append(cardElem);
  }
  shuffle();

}

function lineup(suit) {
  var suitCards = ["1","2","3","4","5","6","7","8","9","10","Page","Knight","Queen","King"];
  if (suit == "major") {
    suit = "major-arcana";
  }
  var cards = document.getElementsByClassName("suit-"+suit);
  var posx = 85;
  var posy = 0;
  var incrXBy = 85;
  var incrYBy = 140;
  var rowWidth = 400;

  for (var i = 0; i < cards.length; i++) {
    cards[i].style.transform = "translate("+posx+"px,"+posy+"px)";
    if (cards[i].classList.contains('reversed')) {
      cards[i].style.transform += "rotate(180deg)"
    }
    cards[i].dataset.x = posx+"px";
    cards[i].dataset.y = posy+"px";
    posx += incrXBy;
    if (posx+incrXBy+15 > rowWidth) {
      posx = incrXBy;
      posy += incrYBy;
    }
    cards[i].style["z-index"] = highestZIndex; // Top level always
    highestZIndex++;
  }
}

function cardBacks(mode) {
  console.log("== cardBacks");
  var modeClass = {
    "show": "shown",
    "hide": "flipped",
    "peek": "peek"
  }
  console.log(mode+": "+modeClass[mode]);
  var cards = document.getElementsByClassName('card');

  for (var i = 0; i < cards.length; i++) {
    for (var key in modeClass) {
      cards[i].classList.remove(modeClass[key]);
    }
    cards[i].classList.add(modeClass[mode]);
  }
}

function redrawCards() {
  var cards = document.getElementsByClassName("card");
  for (var i = 0; i < cards.length; i++) {
    var posx = cards[i].getAttribute('data-x');
    var posy = cards[i].getAttribute('data-y');
    cards[i].style.transform = "translate("+posx+"px,"+posy+"px)";
    if (cards[i].classList.contains('reversed')) {
      cards[i].style.transform += "rotate(180deg)"
    }
    cards[i].dataset.x = posx+"px";
    cards[i].dataset.y = posy+"px";
  }
}