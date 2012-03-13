!function($,window,undefined){

  window.Hand = Backbone.Model.extend({
    initialize : function(cards){
      this.cards = cards.sort(Card.sort);
    },
    evaluateHand : function(cards){
      this.hands = this.makeHands(cards);
      this._lowHand = this.hands[0];
      this._highHand = this.hands[1];
    },
    handScore : function(){
      if(!this._handScore){
        if(this.cards.length >= 5){
          if(this.isFiveAces().length){
            this._handScore = 11;
          } else if(this.isRoyalFlush().length) {
            this._handScore = 10;
          } else if(this.isStraightFlush().length) {
            this._handScore = 9;
          } else if(this.isFourOfAKind().length){
            this._handScore = 8;
          } else if(this.isFullHouse().length){
            this._handScore = 7;
          } else if(this.isFlush().length){
            this._handScore = 6;
          } else if(this.isFiveCardStraight().length){
            this._handScore = 5;
          } else if(this.isThreeOfAKind().length){
            this._handScore = 4;
          } else if(this.isTwoPairs().length){
            this._handScore = 3;
          }
        }
        if(!this._handScore){
          if(this.isPair().length){
            this._handScore = 2;
          } else {
            this._handScore = 1;
          }
        }
      }
      return this._handScore;
    },
    paiGowScore : function(){
      if(!this._paiGowScore){
        var z = "00"; //for 0 padding
        this._paiGowScore =  _(this.cards.slice(0).reverse()).map(function(card){ 
          var n = (card.rankIndex||13).toString();
          return [z.slice(0,z.length-n.length),n].join('');
        }).join('');
      }
      return this._paiGowScore;
    },
    makeHands : function(){
      var tempHand = this.isFiveAces();
      if(tempHand.length){
        return this.handleFiveAces(tempHand);
      }
      tempHand = this.isFourOfAKind();
      if(tempHand.length){
        return this.handleFourOfAKind(tempHand);
      }
      tempHand = this.isFullHouse();
      if(tempHand.length){
        return this.handleFullHouse(tempHand);
      }
      tempHand = this.isFlush();
      if(tempHand.length){
        return this.handleFlush(tempHand);
      }
      tempHand = this.isFiveCardStraight();
      if(tempHand.length){
        return this.handleStraight(tempHand);
      }
      tempHand = this.isTwoThreeOfAKinds();
      if(tempHand.length){
        return this.handleTwoThreeOfAKinds(tempHand);
      }
      tempHand = this.isThreeOfAKind()
      if(tempHand.length){
        return this.handleThreeOfAKind(tempHand);
      }
      tempHand = this.isThreePairs();
      if(tempHand.length){
        return this.handleThreePairs(tempHand);
      }
      tempHand = this.isTwoPairs();
      if(tempHand.length){
        return this.handleTwoPairs(tempHand);
      }
      tempHand = this.isPair();
      if(tempHand.length){
        return this.handlePair(tempHand);
      }
      return this.handlePaiGow(this.cards)
    },
    lowHand : function(){
      if(!this._lowHand){
        this.evaluateHand();
      }
      return this._lowHand;
    },
    highHand : function(){
      if(!this._highHand){
        this.evaluateHand();
      }
      return this._highHand;
    },

    // Scenario: Five aces
    handleFiveAces : function(aces){
      var cardDiff = this.getRemaining(aces),
        otherPair = cardDiff.isPair();
      // 
      if( otherPair.length && otherPair[0].rank == "K" ){
        // low  : King Pair
        // high : 5 Aces
        return [cardDiff.cards,aces];
      } else {
        // low  : Ace pair
        // high : 3 Aces and remaining
        return [aces.slice(0,2), aces.slice(2).concat(cardDiff.cards)];
      }
    },

    // Scenario : Four of a kind
    handleFourOfAKind : function(cards){
      var cardDiff = this.getRemaining(cards),
        otherPair = cardDiff.isPair();
      // dont split if any criteria met :
      //   - 4ofkind are ranked less than 10 (rankIndex = 9)
      //   - pair can be played in low hand and not 4 aces
      //   - rank is A and can pair kings
      //   - ace can be played in low hand
      if(cards[0].rankIndex < 9
        || (otherPair.length && cards[0].rank != "A")
        || (otherPair.length && otherPair[0].rank == "K" && cards[0].rank == "A")
        || cardDiff.hasAce()
      ){
        // low  : top 2 remaining
        // high : four of a kind and lowest remaining
        return [
          otherPair.length ? otherPair : cardDiff.cards.slice(1),
          cards.concat(otherPair.length ? cardDiff.getRemaining(otherPair).cards : cardDiff.cards.slice(0,1))
        ]
      } else 
      // split if 
      //    - ranks are 10 or higher, except if ace in low hand
      //    - 4 Aces except if with paired kings
      {
        // low  : pair from 4ofkind
        // high : pair from 4ofkind, 3 rem
        return [
          cards.slice(2),
          cards.slice(0,2).concat(cardDiff.cards)
        ]
      }
    },

    handleFullHouse : function(boat){
      // always split full house unless remaining cards are AK and house pair is 2s
      boat = new Hand(boat);
      var cardDiff = this.getRemaining(boat.cards),
        pair = boat.isPair(),
        trips = boat.isThreeOfAKind();
      if(pair[0].rank == "2" && cardDiff.hasAce() && cardDiff.hasKing()){
        // low  : AK
        // high : fullboat
        return [cardDiff.cards, boat.cards]
      } else {
        if(cardDiff.isPair().length && cardDiff.cards[0].rankIndex > pair[0].rankIndex){
          // 2 pairs and a 3 of a kind
          // low  : higher pair
          // high : fullboat with lower pair
          return [cardDiff.cards, trips.concat(pair)]
        } else {
          // low  : pair from fullboat
          // high : 3ofKind from fullboat, 2 remaining
          return [pair, trips.concat(cardDiff.cards)]
        }
      }
    },

    handleFlush : function(flush){
      var cardDiff = new Hand(this.getRemaining(flush).cards.concat(flush.slice(5))), 
        straight;

      if(flush.length == 6 && this.isPair().length){
        return [this.isPair(), this.getRemaining(this.isPair()).cards];
      }
      if((straight = this.isFiveCardStraight()).length){
        // play the straight in back if it can make a higher hand up front
        var straightDiff = new Hand(this.getRemaining(straight).cards.concat(straight.slice(5)));
        if(Hand.sort(straightDiff,cardDiff) > 0){
          return [straightDiff.cards, straight.slice(0,5)];
        }
      } 
      return [cardDiff.cards,flush.slice(0,5)];
    },

    handleStraight : function(straight){
      var cardDiff = this.getRemaining(straight);
      if(straight.length == 6 && straight[0].rank == cardDiff.cards[0].rank){
        return [this.isPair(), this.getRemaining(this.isPair()).cards];
      }
      
      return [cardDiff.cards.concat(straight.slice(5)),straight.slice(0,5)];
    },

    handleTwoThreeOfAKinds : function(cards){
      cards = new Hand(cards);
      var cardDiff = this.getRemaining(cards.cards),
        pair1 = cards.isThreeOfAKind();
        pair2 = cards.getRemaining(pair1).cards;

      if(pair1[0].rankIndex > pair2[0].rankIndex){
        var tmp = pair1;
        pair1 = pair2;
        pair2 = tmp;
      }

      // low  : highest pair
      // high : lower three of a kind, remaining cards
      return [pair2.slice(0,2), pair1.concat(pair2.slice(2),cardDiff.cards)]
    },

    handleThreeOfAKind : function(trips){
      var cardDiff = this.getRemaining(trips);
      if(trips[0].isAce()){
        // low  : Ace and highest remaining
        // high : pair of aces, 3 lowest remaining
        return [
          [cardDiff.cards[cardDiff.cards.length-1],trips[0]],
          trips.slice(-2).concat(cardDiff.cards.slice(0,-1))
        ]
      } else {
        return [
          cardDiff.cards.slice(-2),
          trips.concat(cardDiff.cards.slice(0,2))
        ]
      }
    },

    handleThreePairs : function(pairs){
      var cardDiff = this.getRemaining(pairs),
        groupedPairs = _.chain(pairs).groupBy(function(card){
          return card.joker ? Card.getRankIndex("A") : card.rankIndex
        }).toArray().value();

      // low  : highest pair
      // high : two remaining pairs and remaining card
      return [
        groupedPairs[2],
        groupedPairs[1].concat(groupedPairs[0],cardDiff.cards)
      ]
    },

    handleTwoPairs : function(pairs){
      var cardDiff = this.getRemaining(pairs),
        groupedPairs = _.chain(pairs).groupBy(function(card){
          return card.joker ? Card.getRankIndex("A") : card.rankIndex
        }).toArray().value(),
        lowPair = groupedPairs[0],
        highPair = groupedPairs[1],
        pairStrength = lowPair[0].grouping() + highPair[0].grouping();

        if(!highPair[0].isAce()){
          if(pairStrength < 4){
            if(cardDiff.hasAce() || cardDiff.hasKing()){
              return [cardDiff.cards.slice(-2), pairs.concat(cardDiff.cards.slice(0,1))];
            }
          } else if(pairStrength < 5){
            if(cardDiff.hasAce()){
              return [cardDiff.cards.slice(-2), pairs.concat(cardDiff.cards.slice(0,1))];
            }
          }
        }
        return [groupedPairs[0], groupedPairs[1].concat(cardDiff.cards)];
    },

    handlePair : function(pair){
      var cardDiff = this.getRemaining(pair);
      return [cardDiff.cards.slice(-2), pair.concat(cardDiff.cards.slice(0,-2))];
    },

    handlePaiGow: function(cards){
      cards = cards.slice(0);
      var highCard = cards.pop();
      return [cards.slice(-2), [].concat(cards.slice(0,-2),[highCard])];
    },

    /* Get the other cards in the hand that are not in the passed list */
    getRemaining : function(filterCards){
      var filtered = _.map(filterCards,function(c){
            return [c.rank,c.suit].join("");
          });
          remaining = _.filter(this.cards,function(c){
            return -1 == _.indexOf(filtered, [c.rank,c.suit].join(""));
          });

      return new Hand(remaining);
    },
    hasJoker : function(){
      if(undefined === this._hasJoker){
        this._hasJoker = null;
        for(var i = this.cards.length; i--;){
          if(this.cards[i].joker) this._hasJoker = this.cards[i];
        }
      }
      return this._hasJoker;
    },
    hasAce : function(){
      return _.any(this.cards,function(c){return c.joker || c.rank == "A"});
    },
    hasKing : function(){
      return _.any(this.cards,function(c){return c.rank == "K"});
    },
    isFiveAces : function(){
      if(!this._isFiveAces){
        var aces = [];
        for(var i = this.cards.length; i--; ){
          if(this.cards[i].isRank("A") || this.cards[i].joker){
            aces.push(this.cards[i]);
          }
        }
        this._isFiveAces = aces.length == 5 ? aces : [];
      }
      return this._isFiveAces;
    },
    isFourOfAKind : function(){
      if(!this._isFourOfAKind) this._isFourOfAKind = this.isMatchedCount(4);
      return this._isFourOfAKind;
    },
    isThreeOfAKind : function(){
      if(!this._isThreeOfAKind) this._isThreeOfAKind = this.isMatchedCount(3);
      return this._isThreeOfAKind;
    },
    isPair : function(){
      if(!this._isPair) this._isPair = this.isMatchedCount(2);
      return this._isPair;
    },
    isTwoPairs : function(){
      if(!this._isTwoPairs) this._isTwoPairs = this.isMatchedGroupedCount(2,2);
      return this._isTwoPairs;
    },
    isThreePairs : function(){
      if(!this._isThreePairs) this._isThreePairs = this.isMatchedGroupedCount(3,2);
      return this._isThreePairs;
    },
    isTwoThreeOfAKinds : function(){
      if(!this._isTwoThreeOfAKinds) this._isTwoThreeOfAKinds = this.isMatchedGroupedCount(2,3);
      return this._isTwoThreeOfAKinds;
    },
    isFullHouse : function(){
      if(!this._isFullHouse){
        var pair = this.isPair();
        if(!!pair.length){
          pair = pair.concat(this.isMatchedCount(3,[pair[0].rank]));
        }
        this._isFullHouse = pair.length >= 5 ? pair : [];
      }
      return this._isFullHouse;
    },
    isFiveCardStraight : function(){
      if(!this._isFiveCardStraight) this._isFiveCardStraight = this.isStraightCount(5);
      return this._isFiveCardStraight;
    },
    isSevenCardStraight : function(){
      if(!this._isSevenCardStraight) this._isSevenCardStraight = this.isStraightCount(7);
      return this._isSevenCardStraight;
    },
    isFlush : function(){
      if(!this._isFlush) this._isFlush = this.isFlushCount(5);
      return this._isFlush;
    },
    isStraightFlush : function(){
      if(!this._isStraightFlush) this._isStraightFlush = this.isStraightFlushCount(5);
      return this._isStraightFlush;
    },
    isSevenCardStraightFlush : function(){
      if(!this._isSevenCardStraightFlush) this._isSevenCardStraightFlush = this.isStraightFlushCount(7);
      return this._isSevenCardStraightFlush;
    },
    isRoyalFlush : function(){
      if(!this._isRoyalFlush){
        var sf = this.isStraightFlush();
        if(sf.length && sf[sf.length-1].isAce()){
          this._isRoyalFlush = sf;
        } else {
          this._isRoyalFlush = [];
        }
      }
      return this._isRoyalFlush;
    },
    isStraightFlushCount : function(targetCount){
      var f,sf;
      if((f = this.isFlushCount(targetCount)).length){
        sf = (new Hand(f)).isStraightCount(targetCount);
      }
      return (sf||[]).length ? sf : [];
    },
    isFlushCount : function(targetCount){
      var foundJoker = _([this.hasJoker()]).compact(),
        flush = _.chain(this.cards).groupBy(function(card){
            return card.suit;
          }).find(function(cards){
            return cards.length >= (targetCount - foundJoker.length);
          }).value();
      if(flush){
        return flush.concat(foundJoker);
      } else {
        return [];
      }
    },
    isStraightCount : function(targetCount){
      var cards = this.cards.slice(0), currentStraight,matchedStraight,
          foundJoker = this.hasJoker(), usedJoker = true;

      if(foundJoker){
        cards.pop();
        usedJoker = false;
      }

      if(cards[cards.length-1].rank == "A"){
        var tmpAce = cards[cards.length-1],
            newAce = new Card("A",tmpAce.suit,0);
        cards.unshift(cards[cards.length-1]);
      }

      currentStraight = matchedStraight = [cards[0]];
      for(var i = 1, iLen = cards.length;i < iLen; i++){
        if((cards[i].rankIndex - 1) == cards[i - 1].rankIndex){
          currentStraight.push(cards[i]);
          if(currentStraight.length >= matchedStraight.length){
            matchedStraight = currentStraight;
          }
        } else if(!usedJoker && ((cards[i].rankIndex - 2) == cards[i - 1].rankIndex)){
          usedJoker = true;
          currentStraight = currentStraight.concat([foundJoker,cards[i]]);
          if(currentStraight.length >= matchedStraight.length){
            matchedStraight = currentStraight;
          }
        } else {
          usedJoker = !foundJoker;
          currentStraight = [cards[i]];
        }
      }

      // we have a joker, but didn't use it yet. add it to the straight
      if(foundJoker && !(new Hand(matchedStraight)).hasJoker()){
        matchedStraight.push(foundJoker);
      }

      return matchedStraight.length >= targetCount ? matchedStraight : [];
    },
    isMatchedCount : function(targetCount,excludeRank){
      var card,matchedCards,foundJoker,
          uniqueRanks = _.uniq(_.map(this.cards,function(c){return c.rank}));

      if(excludeRank){
        uniqueRanks = _.difference(uniqueRanks, excludeRank)
      }

      for(var i = 0, uLen = uniqueRanks.length;i < uLen; i++){
        card = uniqueRanks[i];
        matchedCards = _.filter(this.cards, function(c){return c.rank == card});
        if(matchedCards.length == targetCount){
          return matchedCards;
        }
      }
      // aces and a joker
      if(foundJoker = this.hasJoker()){
        matchedCards = _.filter(this.cards, function(c){return c.rank == "A"});
        matchedCards.push(foundJoker);
        if(matchedCards.length == targetCount){
          return matchedCards;
        }
      }
      return [];
    },
    isMatchedGroupedCount : function(targetCount, targetGroupCount){
      var groups = [], group, targetCount = targetCount * targetGroupCount;
      while((groups.length < targetCount) 
            && (group = this.isMatchedCount(targetGroupCount,_.uniq(_.map(groups,function(g){return g.rank}))))
      ){
        groups = groups.concat(group);
        if(!group.length) break;
      } 
      return groups.length >= targetCount ? groups : [];
    }
    
  });

  $.extend(window.Hand, {
    sort : function(a,b){
      var tie = a.handScore() == b.handScore();
      if(tie){
        if(a.paiGowScore() == b.paiGowScore()) return 0
        return a.paiGowScore() > b.paiGowScore() ? 1 : -1;
      } else {
        return a.handScore() > b.handScore() ? 1 : -1;
      }
    }
  });
}(jQuery,this)
