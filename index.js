// target elements with the "draggable" class
interact('.draggable')
  .draggable({
    // enable inertial throwing
    // inertia: true,
    // keep the element within the area of it's parent
    // restrict: {
    //   restriction: "parent",
    //   endOnly: true,
    //   elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    // },
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

function dragMoveListener (event) {
  var target = event.target,
      // keep the dragged position in the data-x/data-y attributes
      x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
      y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  // translate the element
  target.style.webkitTransform =
  target.style.transform =
    'translate(' + x + 'px, ' + y + 'px)';

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
  for (var i = 2; i < cards.length+1; i++) {
    max = newOrder.length;
    index = Math.floor(Math.random() * Math.floor(max));
    newOrder.splice(index,0,i);
  }

  for (var i = 0; i < cards.length; i++) {
    cards[i].style["z-index"] = newOrder[i];
  }
}

function initDeck() {
  var suits = ["cups","wands","swords","pentacles"];
  var suitCards = ["1","2","3","4","5","6","7","8","9","10","Page","Knight","Queen","King"];
  var counter = 1;

  var cardMat = document.getElementById("card-mat");
  console.log(cardMat);
  for (var i = 0; i < suits.length; i++) {
    for (var j = 0; j < suitCards.length; j++) {
      var p = document.createTextNode(suitCards[j]+" of "+suits[i]);
      var cardElem = document.createElement('div');
      cardElem.className = "draggable card suit-"+suits[i];
      cardElem.id = suits[i]+"-"+suitCards[j];
      cardElem.append(p);
      cardMat.append(cardElem);
      counter++;
    }
  }

}

function lineup(suit) {
  var suitCards = ["1","2","3","4","5","6","7","8","9","10","Page","Knight","Queen","King"];
  var cards = document.getElementsByClassName("suit-"+suit);
  var posx = 85;
  var posy = 0;

  for (var i = 0; i < suitCards.length; i++) {
    cards[i].style.transform = "translate("+posx+"px,"+posy+"px)";
    cards[i].dataset.x = posx+"px";
    cards[i].dataset.y = posy+"px";
    posx += 85;
  }
}