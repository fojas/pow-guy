describe("Pow Guy Hand", function(){
  describe("Identifying hands", function(){
    it("should know if it has 5 aces", function(){
      var hand = new Hand(
        Card.buildCards([["A","S"],["A","C"],["A","H"],["A","D"],[null,null]])
      );
      var fiveAces = hand.isFiveAces();
      expect(fiveAces.length).toBe(5);
      for(var i = fiveAces.length;(i--) -1 ;){
        expect(fiveAces[i].rank).toBe("A");
      }
      expect(fiveAces[0].joker).toBeTruthy();
    });

    it("should know if it does not have 5 aces", function(){
      var hand = new Hand(
        Card.buildCards([["A","S"],["K","C"],["A","H"],["A","D"],[null,null]])
      );

      expect(hand.isFiveAces().length).toBe(0);
    });

    it("should know if it has four of a kind",function(){
      var hand = new Hand(
        Card.buildCards([["K","S"],["K","C"],["K","H"],["K","D"],[null,null]])
      );

      var fourOfAKind = hand.isFourOfAKind();
      expect(fourOfAKind.length).toBe(4);
      for(var i = fourOfAKind.length; i--;){
        expect(fourOfAKind[i].rank).toBe("K");
      }
    });

    it("should know if it doesnt has four of a kind",function(){
      var hand = new Hand(
        Card.buildCards([["4","S"],["K","C"],["K","H"],["K","D"],[null,null]])
      );

      expect(hand.isFourOfAKind().length).toBe(0);
    });

    it("should know if it has four of a kind with three aces and a joker",function(){
      var hand = new Hand(
        Card.buildCards([["A","S"],["A","C"],["A","H"],["K","D"],[null,null]])
      );

      var fourOfAKind = hand.isFourOfAKind();
      expect(fourOfAKind.length).toBe(4);
      for(var i = fourOfAKind.length-1;i--;){
        expect(fourOfAKind[i].rank).toBe("A");
      }
      expect(fourOfAKind[fourOfAKind.length-1].joker).toBeTruthy();
    });

    it("should know if it has three of a kind",function(){
      var hand = new Hand(
        Card.buildCards([["4","S"],["K","C"],["K","H"],["K","D"],[null,null]])
      );
      var threeOfAKind = hand.isThreeOfAKind();
      expect(threeOfAKind.length).toBe(3);
      for(var i = threeOfAKind.length; i--;){
        expect(threeOfAKind[i].rank).toBe("K");
      }
    });

    it("should know if it doesnt has three of a kind",function(){
      var hand = new Hand(
        Card.buildCards([["4","S"],["4","C"],["K","H"],["K","D"],[null,null]])
      );

      expect(hand.isThreeOfAKind().length).toBe(0);
    });

    it("should know if it has three of a kind with two aces and a joker",function(){
      var hand = new Hand(
        Card.buildCards([["4","S"],["A","C"],["A","H"],["K","D"],[null,null]])
      );

      var threeOfAKind = hand.isThreeOfAKind();
      expect(threeOfAKind.length).toBe(3);
      for(var i = threeOfAKind.length -1; i--;){
        expect(threeOfAKind[i].rank).toBe("A");
      }
      expect(threeOfAKind[threeOfAKind.length-1].joker).toBeTruthy();
    });

    it("should know if it has a pair",function(){
      var hand = new Hand(
        Card.buildCards([["4","S"],["5","C"],["K","H"],["K","D"],[null,null]])
      );
      var pair = hand.isPair();
      expect(pair.length).toBe(2);
      for(var i = pair.length; i--;){
        expect(pair[i].rank).toBe("K");
      }
    });

    it("should know if it doesnt has a pair",function(){
      var hand = new Hand(
        Card.buildCards([["4","S"],["5","C"],["6","H"],["K","D"],[null,null]])
      );

      expect(hand.isPair().length).toBe(0);
    });

    it("should know if it has a pair with an ace and a joker",function(){
      var hand = new Hand(
        Card.buildCards([["4","S"],["5","C"],["A","H"],["K","D"],[null,null]])
      );

      var pair = hand.isPair();
      expect(pair.length).toBe(2);
      expect(pair[0].rank).toBe("A");
      expect(pair[1].joker).toBeTruthy();
    });

    it("should know if it has two pairs", function(){
      var hand = new Hand(
        Card.buildCards([["4","S"],["4","C"],["3","H"],["K","D"],["3","D"]])
      );
      var twoPairs = hand.isTwoPairs();
      expect(twoPairs.length).toBe(4);
      expect(twoPairs[0].rank).toBe("3");
      expect(twoPairs[2].rank).toBe("4");
    });

    it("should know if it doesnt has two pairs",function(){
      var hand = new Hand(
        Card.buildCards([["5","S"],["5","C"],["6","H"],["K","D"],[null,null]])
      );

      expect(hand.isTwoPairs().length).toBe(0);
    });

    it("should know if it has two pairs with an ace and a joker", function(){
      var hand = new Hand(
        Card.buildCards([["4","S"],["4","C"],["A","H"],["K","D"],[null,null]])
      );
      var twoPairs = hand.isTwoPairs();
      expect(twoPairs.length).toBe(4);
      expect(twoPairs[0].rank).toBe("4");
      expect(twoPairs[2].rank).toBe("A");
    });

    it("should know if it has three pairs", function(){
      var hand = new Hand(
        Card.buildCards([["A","S"],["9","S"],["K","C"],["9","H"],["K","D"],["A","D"]])
      );
      
    });

    it("should know if it has two three of a kinds",function(){
      var hand = new Hand(
        Card.buildCards([["A","S"],["K","S"],["K","C"],["A","H"],["K","D"],["A","D"]])
      );

      var twoTrips = hand.isTwoThreeOfAKinds();
      expect(twoTrips.length).toBe(6);
      expect(_.pluck(twoTrips,'rank').join(",")).toBe("K,K,K,A,A,A");
    });

    it("should know if it doesnt have two three of a kinds",function(){
      var hand = new Hand(
        Card.buildCards([["A","S"],["9","S"],["K","C"],["A","H"],["K","D"],["A","D"]])
      );
      expect(hand.isTwoThreeOfAKinds().length).toBe(0);
    });

    it("should know if it has a full house", function(){
      var hand = new Hand(
        Card.buildCards([["4","S"],["4","C"],["A","H"],["A","D"],[null,null]])
      );

      var fullHouse = hand.isFullHouse();
      expect(fullHouse.length).toBe(5);
      expect(_.pluck(fullHouse,'rank').join(",")).toBe("4,4,A,A,")

    });

    it("should know if it doesnt has a full house", function(){
      var hand = new Hand(
        Card.buildCards([["4","S"],["4","C"],["A","H"],["K","D"],[null,null]])
      );
      var fullHouse = hand.isFullHouse();
      expect(fullHouse.length).toBe(0);
    });

    it("should know if it has a straight flush", function(){
      var hand = new Hand(
        Card.buildCards([["10","D"],["9","D"],["Q","D"],["K","D"],["J","D"],["A","S"],["8","S"]])
      );
      var straightFlush = hand.isStraightFlush();
      expect(straightFlush.length).toBe(5);
    });

    it("should know if it has a straight flush with a joker", function(){
      var hand = new Hand(
        Card.buildCards([["10","D"],["9","D"],["Q","D"],["K","D"],[null,null],["A","S"],["8","S"]])
      );
      var straightFlush = hand.isStraightFlush();
      expect(straightFlush.length).toBe(5);
    });

    it("should not confuse a flush and straight with a straight flush", function(){
      var hand = new Hand(
        Card.buildCards([["10","D"],["7","D"],["Q","D"],["K","D"],["J","H"],["A","S"],["8","D"]])
      );
      var flush = hand.isFlush(), straight = hand.isFiveCardStraight(), straightFlush = hand.isStraightFlush();
      expect(flush.length).toBe(5);
      expect(straight.length).toBe(5);
      expect(straightFlush.length).toBe(0);
    });

    it("should know it doesnt have a straight flush", function(){
      var hand = new Hand(
        Card.buildCards([["10","D"],["9","D"],["4","D"],["K","D"],[null,null],["A","S"],["8","S"]])
      );
      expect(hand.isStraightFlush().length).toBe(0);
    });

    it("should know if it has a flush", function(){
      var hand = new Hand(
        Card.buildCards([["10","D"],["9","D"],["Q","D"],["K","D"],["J","H"],["A","S"],["8","D"]])
      );
      var flush = hand.isFlush();
      expect(flush.length).toBe(5);
    });

    it("should know if it doesnt has a flush", function(){
      var hand = new Hand(
        Card.buildCards([["10","S"],["9","D"],["Q","D"],["K","D"],["J","H"],["A","S"],["8","D"]])
      );
      var flush = hand.isFlush();
      expect(flush.length).toBe(0);
    });

    it("should know if it has a flush with a joker", function(){
      var hand = new Hand(
        Card.buildCards([["10","D"],["9","D"],[null,null],["K","D"],["J","H"],["A","S"],["8","D"]])
      );
      var flush = hand.isFlush();
      expect(flush.length).toBe(5);
    });

    it("should know if it has a royal flush", function(){
      var hand = new Hand(
        Card.buildCards([["10","D"],["9","H"],["Q","D"],["K","D"],["J","D"],["A","D"],["8","H"]])
      );
      var flush = hand.isRoyalFlush();
      expect(flush.length).toBe(5);
    });

    it("should know if it has a royal flush with a joker", function(){
      var hand = new Hand(
        Card.buildCards([["10","D"],["9","H"],[null,null],["K","D"],["J","D"],["A","D"],["8","H"]])
      );
      var flush = hand.isRoyalFlush();
      expect(flush.length).toBe(5);
    });

    it("should know if it doesnt has a royal flush", function(){
      var hand = new Hand(
        Card.buildCards([["10","D"],["9","H"],["Q","S"],["K","D"],["J","D"],["A","D"],["8","H"]])
      );
      var flush = hand.isRoyalFlush();
      expect(flush.length).toBe(0);
    });

    it("should know if it has a seven card straight", function(){
      var hand = new Hand(
        Card.buildCards([["10","S"],["9","C"],["Q","H"],["K","D"],["J","H"],["A","S"],["8","C"]])
      );

      var sevenCardStraight = hand.isSevenCardStraight();
      expect(sevenCardStraight.length).toBe(7);
    });

    it("should know if it has a seven card straight with a joker", function(){
      var hand = new Hand(
        Card.buildCards([["10","S"],["9","C"],["Q","H"],["K","D"],[null,null],["A","S"],["8","C"]])
      );

      var sevenCardStraight = hand.isSevenCardStraight();
      expect(sevenCardStraight.length).toBe(7);
    });

    it("should know if it has a seven card straight with a joker at the end", function(){
      var hand = new Hand(
        Card.buildCards([["10","S"],["9","C"],["5","H"],["6","D"],[null,null],["7","S"],["8","C"]])
      );

      var sevenCardStraight = hand.isSevenCardStraight();
      expect(sevenCardStraight.length).toBe(7);
    });

    it("should know if it has a five card straight", function(){
      var hand = new Hand(
        Card.buildCards([["10","S"],["9","C"],["A","S"],["K","D"],["6","S"],["7","S"],["8","C"]])
      );

      var fiveCardStraight = hand.isFiveCardStraight();
      expect(fiveCardStraight.length).toBe(5);

    });

    it("should know if it has a five card straight with a joker", function(){
      var hand = new Hand(
        Card.buildCards([["10","S"],["9","C"],["A","S"],["K","D"],["6","S"],[null,null],["8","C"]])
      );

      var fiveCardStraight = hand.isFiveCardStraight();
      expect(fiveCardStraight.length).toBe(5);

    });
  });
  it("should get the other cards that dont make a hand", function(){
    var hand = new Hand(
      Card.buildCards([["10","S"],["9","C"],["A","S"],["K","D"],["6","S"],[null,null],["8","C"]])
    );

    var fiveCardStraight = hand.isFiveCardStraight();
    var remaining = hand.getRemaining(fiveCardStraight);
    expect(remaining.cards.length).toBe(2);
    expect(_.pluck(remaining.cards,'rank').join(",")).toBe("K,A");

    var pair = hand.isPair();
    remaining = hand.getRemaining(pair);
    expect(remaining.cards.length).toBe(5);
    expect(_.pluck(remaining.cards,'rank').join(",")).toBe("6,8,9,10,K");
  });

  describe("House way", function(){
    describe("Five Aces", function(){
      it("should split five aces", function(){
        var hand = new Hand(
          Card.buildCards([["A","S"],["A","C"],["A","H"],["A","D"],[null,null],["Q","H"],["K","D"]])
        );
        expect(_.pluck(hand.highHand(),'rank').join(",")).toBe("A,A,A,Q,K")
        expect(_.pluck(hand.lowHand(),'rank').join(",")).toBe(",A")
      });

      it("should know not to split five aces if it also has a pair of kings", function(){
        var hand = new Hand(
          Card.buildCards([["A","S"],["A","C"],["A","H"],["A","D"],[null,null],["K","H"],["K","D"]])
        );
        expect(_.pluck(hand.highHand(),'rank').join(",")).toBe(",A,A,A,A")
        expect(_.pluck(hand.lowHand(),'rank').join(",")).toBe("K,K")
      });
    });

    describe("Four of a kind", function(){
      it("should know not to split a low four of a kind", function(){
        var hand = new Hand(
          Card.buildCards([["9","S"],["9","C"],["9","H"],["9","D"],["4","H"],["Q","H"],["K","D"]])
        );
        
        expect(_.pluck(hand.highHand(),'rank').join(",")).toBe("9,9,9,9,4")
        expect(_.pluck(hand.lowHand(),'rank').join(",")).toBe("Q,K")
      });

      it("should know not to a high split four of a kind if ace can be played in low hand", function(){
        var hand = new Hand(
          Card.buildCards([["J","S"],["J","C"],["J","H"],["J","D"],["A","H"],["Q","H"],["K","D"]])
        );
        
        expect(_.pluck(hand.highHand(),'rank').join(",")).toBe("J,J,J,J,Q")
        expect(_.pluck(hand.lowHand(),'rank').join(",")).toBe("K,A")
      });

      it("should know not to split four of a kind if pair can be played in low hand", function(){
        var hand = new Hand(
          Card.buildCards([["9","S"],["9","C"],["9","H"],["9","D"],["4","H"],["4","C"],["K","D"]])
        );

        expect(_.pluck(hand.highHand(),'rank').join(",")).toBe("9,9,9,9,K")
        expect(_.pluck(hand.lowHand(),'rank').join(",")).toBe("4,4")
      });

      it("should know not to split 4 aces if a pair of kings can be played in low hand", function(){
        var hand = new Hand(
          Card.buildCards([["A","S"],["A","C"],["A","H"],["A","D"],["K","H"],["4","C"],["K","D"]])
        );

        expect(_.pluck(hand.highHand(),'rank').join(",")).toBe("A,A,A,A,4")
        expect(_.pluck(hand.lowHand(),'rank').join(",")).toBe("K,K")
      });

      it("should split a high four of a kind", function(){
        var hand = new Hand(
          Card.buildCards([["J","S"],["J","C"],["J","H"],["J","D"],["4","H"],["Q","H"],["K","D"]])
        );
        
        expect(_.pluck(hand.highHand(),'rank').join(",")).toBe("J,J,4,Q,K")
        expect(_.pluck(hand.lowHand(),'rank').join(",")).toBe("J,J")
      });

      it("should split four aces", function(){
        var hand = new Hand(
          Card.buildCards([["A","S"],["A","C"],["A","H"],["A","D"],["4","H"],["4","C"],["K","D"]])
        );
        
        expect(_.pluck(hand.highHand(),'rank').join(",")).toBe("A,A,4,4,K")
        expect(_.pluck(hand.lowHand(),'rank').join(",")).toBe("A,A")

      });
    });

    describe("Full House", function(){
      it("should split a full house", function(){
        var hand = new Hand(
          Card.buildCards([["4","S"],["4","C"],["3","H"],["3","D"],["4","H"],["7","C"],["K","D"]])
        );
        
        expect(_.pluck(hand.highHand(),'rank').join(",")).toBe("4,4,4,7,K")
        expect(_.pluck(hand.lowHand(),'rank').join(",")).toBe("3,3")

      });

      it("should not split a full house if AK can be played in low hand", function(){
        var hand = new Hand(
          Card.buildCards([["4","S"],["4","C"],["2","H"],["2","D"],["4","H"],["A","S"],["K","D"]])
        );
        
        expect(_.pluck(hand.highHand(),'rank').join(",")).toBe("2,2,4,4,4")
        expect(_.pluck(hand.lowHand(),'rank').join(",")).toBe("K,A")

      });

      it("should not split a full house if AK using joker can be played in low hand", function(){
        var hand = new Hand(
          Card.buildCards([["4","S"],["4","C"],["2","H"],["2","D"],["4","H"],[null,null],["K","D"]])
        );
        
        expect(_.pluck(hand.highHand(),'rank').join(",")).toBe("2,2,4,4,4")
        expect(_.pluck(hand.lowHand(),'rank').join(",")).toBe("K,")

      });

      it("should put the highest pair in the low hand with 2 pairs and 3 of a kind", function(){
        var hand = new Hand(
          Card.buildCards([["4","S"],["2","C"],["2","H"],["2","D"],["4","H"],["9","S"],["9","D"]])
        );
       
        expect(_.pluck(hand.highHand(),'rank').join(",")).toBe("2,2,2,4,4")
        expect(_.pluck(hand.lowHand(),'rank').join(",")).toBe("9,9")
         
      });
    });

    describe("Straight Flush", function(){

    });

    describe("Straight and Flush", function(){
      it("should play the flush in the back if it can make a higher low hand", function(){
        var hand = new Hand(
          Card.buildCards([["K","C"],["10","D"],["7","D"],["2","D"],["J","D"],["9","S"],["8","D"]])
        );
        expect(_.pluck(hand.highHand(),'rank').join(",")).toBe("2,7,8,10,J")
        expect(_.pluck(hand.lowHand(),'rank').join(",")).toBe("9,K")
      })

      it("should play the straight in the back if it can make a higher low hand", function(){
        var hand = new Hand(
          Card.buildCards([["K","D"],["10","C"],["7","D"],["2","D"],["J","D"],["9","S"],["8","D"]])
        );
        expect(_.pluck(hand.highHand(),'rank').join(",")).toBe("7,8,9,10,J")
        expect(_.pluck(hand.lowHand(),'rank').join(",")).toBe("2,K")
      })
    });

    describe("Flush", function(){
      it("should preserve the flush", function(){
        var hand = new Hand(
          Card.buildCards([["K","D"],["K","C"],["7","D"],["2","D"],["4","D"],["9","S"],["8","D"]])
        );
        expect(_.pluck(hand.highHand(),'rank').join(",")).toBe("2,4,7,8,K")
        expect(_.reject(hand.highHand(),function(c){return c.suit == "D";}).length).toBe(0)
        expect(_.pluck(hand.lowHand(),'rank').join(",")).toBe("9,K")
      });

      it("should play the lower flush in the back", function(){
        var hand = new Hand(
          Card.buildCards([["K","D"],["A","D"],["7","D"],["2","D"],["4","D"],["9","S"],["8","D"]])
        );
        expect(_.pluck(hand.highHand(),'rank').join(",")).toBe("2,4,7,8,K")
        expect(_.reject(hand.highHand(),function(c){return c.suit == "D";}).length).toBe(0)
        expect(_.pluck(hand.lowHand(),'rank').join(",")).toBe("9,A")
      });

      it("should put a pair in front if it can still keep a flush in the back", function(){
        var hand = new Hand(
          Card.buildCards([["K","D"],["A","D"],["7","D"],["2","D"],["K","S"],["4","D"],["8","D"]])
        );
        expect(_.pluck(hand.highHand(),'rank').join(",")).toBe("2,4,7,8,A")
        expect(_.reject(hand.highHand(),function(c){return c.suit == "D";}).length).toBe(0)
        expect(_.pluck(hand.lowHand(),'rank').join(",")).toBe("K,K")
      });
    });

    describe("Straight", function(){
      it("should preserve the straight", function(){
        var hand = new Hand(
          Card.buildCards([["K","D"],["2","D"],["Q","D"],["J","D"],["10","S"],["9","S"],["9","H"]])
        );
        expect(_.pluck(hand.highHand(),'rank').join(",")).toBe("9,10,J,Q,K")
        expect(_.pluck(hand.lowHand(),'rank').join(",")).toBe("2,9")
      });

      it("should play the lower straight in the back", function(){
        var hand = new Hand(
          Card.buildCards([["K","D"],["A","D"],["Q","D"],["J","D"],["10","S"],["9","S"],["7","H"]])
        );
        expect(_.pluck(hand.highHand(),'rank').join(",")).toBe("9,10,J,Q,K")
        expect(_.pluck(hand.lowHand(),'rank').join(",")).toBe("7,A")
      });

      it("should put a pair in front if it can still keep a straight in the back", function(){
        var hand = new Hand(
          Card.buildCards([["K","D"],["A","D"],["Q","D"],["J","D"],["10","S"],["9","S"],["9","H"]])
        );
        expect(_.pluck(hand.highHand(),'rank').join(",")).toBe("10,J,Q,K,A")
        expect(_.pluck(hand.lowHand(),'rank').join(",")).toBe("9,9")
      });

    });

    describe("Two Three of a Kinds", function(){
      it("should play the highest pair in the low hand", function(){
        var hand = new Hand(
          Card.buildCards([["4","S"],["2","C"],["2","H"],["2","D"],["4","H"],["4","S"],["9","D"]])
        );
        expect(_.pluck(hand.highHand(),'rank').join(",")).toBe("2,2,2,4,9")
        expect(_.pluck(hand.lowHand(),'rank').join(",")).toBe("4,4")
        
      });
    });

    describe("Three of a kind", function(){
      it("should split 3 aces",function(){
        var hand = new Hand(
          Card.buildCards([["A","S"],["2","C"],["A","H"],["A","D"],["4","H"],["5","S"],["K","D"]])
        );
        expect(_.pluck(hand.highHand(),'rank').join(",")).toBe("A,A,2,4,5")
        expect(_.pluck(hand.lowHand(),'rank').join(",")).toBe("K,A")
      });

      it("should not split three of a kind", function(){
        var hand = new Hand(
          Card.buildCards([["K","S"],["K","C"],["Q","H"],["A","S"],["4","H"],["5","S"],["K","D"]])
        );
        expect(_.pluck(hand.highHand(),'rank').join(",")).toBe("K,K,K,4,5")
        expect(_.pluck(hand.lowHand(),'rank').join(",")).toBe("Q,A")
      });
    });

    describe("Three Pairs", function(){
      it("should put the highest pair in the low hand", function(){
        var hand = new Hand(
          Card.buildCards([["K","S"],["Q","C"],["Q","H"],["A","S"],["5","H"],["5","S"],["K","D"]])
        );
        expect(_.pluck(hand.highHand(),'rank').join(",")).toBe("Q,Q,5,5,A")
        expect(_.pluck(hand.lowHand(),'rank').join(",")).toBe("K,K")
      });
    });

    describe("Two Pairs", function(){
      it("should split if any pair is aces", function(){
        var hand = new Hand(
          Card.buildCards([["A","S"],["8","C"],["Q","H"],["A","S"],["5","H"],["5","S"],["K","D"]])
        );
        expect(_.pluck(hand.highHand(),'rank').join(",")).toBe("A,A,8,Q,K")
        expect(_.pluck(hand.lowHand(),'rank').join(",")).toBe("5,5")
      });

      it("should split two high pairs", function(){
        var hand = new Hand(
          Card.buildCards([["J","S"],["J","C"],["Q","H"],["A","S"],["K","H"],["5","S"],["K","D"]])
        );
        expect(_.pluck(hand.highHand(),'rank').join(",")).toBe("K,K,5,Q,A")
        expect(_.pluck(hand.lowHand(),'rank').join(",")).toBe("J,J")
      });

      it("should split a mid and high pair", function(){
        var hand = new Hand(
          Card.buildCards([["7","S"],["7","C"],["Q","H"],["A","S"],["K","H"],["5","S"],["K","D"]])
        );
        expect(_.pluck(hand.highHand(),'rank').join(",")).toBe("K,K,5,Q,A")
        expect(_.pluck(hand.lowHand(),'rank').join(",")).toBe("7,7")
      });

      it("should split two mid pairs",function(){
        var hand = new Hand(
          Card.buildCards([["7","S"],["7","C"],["Q","H"],["K","D"],["8","H"],["5","S"],["8","D"]])
        );
        expect(_.pluck(hand.highHand(),'rank').join(",")).toBe("8,8,5,Q,K")
        expect(_.pluck(hand.lowHand(),'rank').join(",")).toBe("7,7")
      });

      it("should split a low and high pair", function(){
        var hand = new Hand(
          Card.buildCards([["6","S"],["6","C"],["Q","H"],["K","D"],["K","H"],["5","S"],["8","D"]])
        );
        expect(_.pluck(hand.highHand(),'rank').join(",")).toBe("K,K,5,8,Q")
        expect(_.pluck(hand.lowHand(),'rank').join(",")).toBe("6,6")
      });

      it("should keep two mid pairs together if ace can be played in low hand", function(){
        var hand = new Hand(
          Card.buildCards([["7","S"],["7","C"],["A","S"],["10","D"],["K","H"],["10","S"],["8","D"]])
        );
        expect(_.pluck(hand.highHand(),'rank').join(",")).toBe("7,7,10,10,8")
        expect(_.pluck(hand.lowHand(),'rank').join(",")).toBe("K,A")
      });

      it("should keep a low and high pair together if ace can be played in low hand", function(){
        var hand = new Hand(
          Card.buildCards([["6","S"],["6","C"],["A","S"],["J","D"],["K","H"],["J","S"],["8","D"]])
        );
        expect(_.pluck(hand.highHand(),'rank').join(",")).toBe("6,6,J,J,8")
        expect(_.pluck(hand.lowHand(),'rank').join(",")).toBe("K,A")
      });

      it("should split two low pairs",function(){
        var hand = new Hand(
          Card.buildCards([["6","S"],["6","C"],["Q","H"],["3","D"],["3","H"],["5","S"],["8","D"]])
        );
        expect(_.pluck(hand.highHand(),'rank').join(",")).toBe("6,6,5,8,Q")
        expect(_.pluck(hand.lowHand(),'rank').join(",")).toBe("3,3")
      });

      it("should split a low and mid pair", function(){
        var hand = new Hand(
          Card.buildCards([["6","S"],["6","C"],["Q","H"],["7","D"],["7","H"],["5","S"],["8","D"]])
        );
        expect(_.pluck(hand.highHand(),'rank').join(",")).toBe("7,7,5,8,Q")
        expect(_.pluck(hand.lowHand(),'rank').join(",")).toBe("6,6")
      });

      it("should keep two low  pairs together if king  can be played in low hand", function(){
        var hand = new Hand(
          Card.buildCards([["6","S"],["6","C"],["Q","H"],["5","D"],["K","H"],["5","S"],["8","D"]])
        );
        expect(_.pluck(hand.highHand(),'rank').join(",")).toBe("5,5,6,6,8")
        expect(_.pluck(hand.lowHand(),'rank').join(",")).toBe("Q,K")
      });

      it("should keep a low and mid pair together if king can be played in low hand", function(){
        var hand = new Hand(
          Card.buildCards([["6","S"],["6","C"],["Q","H"],["K","D"],["8","H"],["5","S"],["8","D"]])
        );
        expect(_.pluck(hand.highHand(),'rank').join(",")).toBe("6,6,8,8,5")
        expect(_.pluck(hand.lowHand(),'rank').join(",")).toBe("Q,K")
      });
    });

    describe("Pair", function(){
      it("should put the two highest cards in the low hand", function(){
        var hand = new Hand(
          Card.buildCards([["6","S"],["6","C"],["Q","H"],["K","D"],["2","H"],["5","S"],["8","D"]])
        );
        expect(_.pluck(hand.highHand(),'rank').join(",")).toBe("6,6,2,5,8")
        expect(_.pluck(hand.lowHand(),'rank').join(",")).toBe("Q,K")
      });
    });

    describe("Pai Gow", function(){
      it("should put the second and third highest cards in the low hand", function(){
        var hand = new Hand(
          Card.buildCards([["A","S"],["6","C"],["Q","H"],["K","D"],["2","H"],["5","S"],["8","D"]])
        );
        expect(_.pluck(hand.highHand(),'rank').join(",")).toBe("2,5,6,8,A")
        expect(_.pluck(hand.lowHand(),'rank').join(",")).toBe("Q,K")
      });
    });
  });

  describe("Sorting hands", function(){
      var handRanks = [
        ["Five Aces",new Hand(Card.buildCards([["A","H"],["A","D"],["A","C"],["A","S"],[null,null]]))],
        ["Royal Flush",new Hand(Card.buildCards([["10","D"],["K","D"],["Q","D"],["J","D"],[null,null]]))],
        ["Straight Flush",new Hand(Card.buildCards([["10","D"],["K","D"],["Q","D"],["J","D"],["9","D"]]))],
        ["Hi 4 of a Kind",new Hand(Card.buildCards([["K","C"],["K","D"],["K","S"],["K","H"],["9","D"]]))],
        ["Lo 4 of a Kind",new Hand(Card.buildCards([["9","C"],["K","D"],["9","S"],["9","H"],["9","D"]]))],
        ["Hi Full House",new Hand(Card.buildCards([["K","C"],["K","D"],["K","S"],["9","H"],["9","D"]]))],
        ["Lo Full House",new Hand(Card.buildCards([["K","C"],["K","D"],["9","S"],["9","H"],["9","D"]]))],
        ["Hi Flush",new Hand(Card.buildCards([[null,null],["K","D"],["Q","D"],["J","D"],["2","D"]]))],
        ["Lo Flush",new Hand(Card.buildCards([["10","D"],["K","D"],["Q","D"],["J","D"],["2","D"]]))],
        ["Hi Straight",new Hand(Card.buildCards([["10","D"],["K","D"],["Q","D"],["J","H"],["9","C"]]))],
        ["Lo Straight",new Hand(Card.buildCards([["10","D"],["8","D"],["Q","D"],["J","H"],["9","C"]]))],
        ["Hi 3 of a Kind",new Hand(Card.buildCards([["9","C"],["K","D"],["4","S"],["9","H"],["9","D"]]))],
        ["Lo 3 of a Kind",new Hand(Card.buildCards([["9","C"],["K","D"],["3","S"],["9","H"],["9","D"]]))],
        ["Hi 2 Pairs",new Hand(Card.buildCards([["K","C"],["K","D"],["4","S"],["9","H"],["9","D"]]))],
        ["Lo 2 Pairs",new Hand(Card.buildCards([["K","C"],["K","D"],["3","S"],["9","H"],["9","D"]]))],
        ["Hi Pair",new Hand(Card.buildCards([["7","C"],["K","D"],["4","S"],["9","H"],["9","D"]]))],
        ["Lo Pair",new Hand(Card.buildCards([["6","C"],["K","D"],["4","S"],["9","H"],["9","D"]]))], 
        ["Hi Pai Gow",new Hand(Card.buildCards([["7","C"],["K","D"],["4","S"],["J","H"],["9","D"]]))],
        ["Low Pai Gow",new Hand(Card.buildCards([["2","C"],["K","D"],["4","S"],["J","H"],["9","D"]]))]
      ];

      for(var i = handRanks.length;i--;){
        for(var j = i;j--;){
          var context = {i:i,j:j};
          it("should know that a "+ handRanks[j][0] + ' beats a '+handRanks[i][0], $.proxy(function(){
            expect(Hand.sort(handRanks[this.j][1],handRanks[this.i][1])).toBe(1);
          },context));
        }
      }
      for(var i = handRanks.length;i--;){
          it("should know that a "+ handRanks[i][0] + ' pushes a '+handRanks[i][0], $.proxy(function(){
            expect(Hand.sort(handRanks[this.i][1],handRanks[this.i][1])).toBe(0);
          },context));

      }
  });
});
