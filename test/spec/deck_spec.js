describe("Pow Guy Deck", function(){
  it("should create a deck of cards",function(){
    expect((new Deck).cards.length).toBe(53);
  });

  it("should shuffle the cards",function(){
    var deck = new Deck,
        deckDetails = deck.toJSON(),
        shuffledDetails = deck.shuffleDeck().toJSON();
   
    expect(shuffledDetails).toEqual(deck.toJSON()); 
    expect(shuffledDetails).toNotEqual(deckDetails); 
  });
});
