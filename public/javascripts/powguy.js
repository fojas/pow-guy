!function($,window,undefined){
  window.PowGuy = function(){
    var deck = new Deck;
    var dealCards = function(){
      deck.shuffle();
      for(var i = 7;i--;){
        console.log(deck.dealHand());
      }
    };
  }();
}(jQuery,this);
