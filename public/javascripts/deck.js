!function($,window,undefined){
  window.Deck = Backbone.Model.extend({
    initialize : function(){
      this.cards = this.initializeDeck();
    },
    initializeDeck : function(){
      this.deckTop = 0;
      var cards = [];
      for(var i = Card.suits.length; i--;){
        for( var j = Card.ranks.length; j--;){
          cards.push(new Card({rank:Card.ranks[j],suit:Card.suits[i]}));
        }
      }
      return cards;
    },
    dealCards : function(){
      return new Hand(this.cards.slice(this.deckTop ,(this.deckTop += 7)));
    },
    toJSON : function(){
      return ["[",_.map(this.cards, function(x){ return x.toJSON() }).join(","), "]"].join("");
    },
    shuffleDeck : function(){
      this.deckTop = 0;
      this.cards = _.shuffle(this.cards);
      return this;
    }
  });

}(jQuery,this);
