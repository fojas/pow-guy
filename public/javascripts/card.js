!function($,window,undefined){
  var SUITS = ["S","C","D","H"],
      RANKS = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];

  window.Card = Backbone.Model.extend({
    initialize : function(options){
      options = options || {};
      this.rank = options.rank;
      this.rankIndex = isNaN(options.rankIndex) ? Card.getRankIndex(this.rank) : options.rankIndex;
      this.suit = options.suit;
      this.joker = (options.rank && options.suit) ? false : true;
    },
    isRank : function(rank){
      return rank === this.rank;
    },
    isAce : function(){
      return this.joker || "A" == this.rank;
    },
    grouping :function(){
      // this is to determine if a card is a weak, mid or strong pair
      // 1 = weak, 2 = mid, 3 = strong, 4 = aces
      if(!this._grouping){
        if(this.rankIndex <= 5){
          this._grouping = 1;
        } else if(this.rankIndex <= 9){
          this._grouping = 2;
        } else if(this.rankIndex <= 12){
          this._grouping = 3
        } else {
          this._grouping = 4;
        }
      }
      return this._grouping;
    },
    toJSON : function(){
      return '{"rank" : "'+this.rank+'", "suit" : "'+this.suit+'"}'
    }
  });

  $.extend(window.Card,{
    buildCards : function(cardTuples){
      var cards = []
      for(var i = cardTuples.length; i--; ){
        cards.push(new Card({rank:cardTuples[i][0], suit:cardTuples[i][1]}));
      }
      return cards;
    },
    ranks : RANKS,
    suits : SUITS,
    getRankIndex : function(rank){
      return 1 + _.indexOf(RANKS,rank);
    },
    sort : function(a,b){
      if(a.joker) return 14 - b.rankIndex;
      if(b.joker) return a.rankIndex - 14;
      return a.rankIndex - b.rankIndex;
    }
  });
}(jQuery,this);
