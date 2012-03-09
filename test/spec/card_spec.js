describe("Pow Guy Card", function(){

  it("should know if it is an ace", function(){
    var card = new Card({rank:"A",suit:"S"});
    expect(card.isRank("A")).toBeTruthy();
    expect(card.isAce()).toBeTruthy();
  });

  it("should know that a joker is an ace", function(){
    var card = new Card();
    expect(card.isAce()).toBeTruthy();
    expect(card.joker).toBeTruthy();
  });

  it("should know if it is not an ace", function(){
    var card = new Card({rank:"K",suit:"S"});
    expect(card.isRank("A")).toBeFalsy();
    expect(card.isAce()).toBeFalsy();
  });

  it("should now how to sort cards" ,function(){
    var expectedRanks = ["2","5","9","K"],
        sortedCards = Card.buildCards([["2","S"],["K","H"],["5","C"],["9","C"]]).sort(Card.sort),
        sortedRanks = $(sortedCards).map(function(){
          return this.rank;
        }).get();

        expect(sortedRanks.length).toBe(expectedRanks.length);
        for(var i = expectedRanks.length; i--;){
          expect(sortedRanks[i]).toBe(expectedRanks[i]);
        }
  });
});
