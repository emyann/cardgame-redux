import * as _ from 'lodash';
import { Deck } from "./../models/deck";

const initialState = {
    remainingCards: Deck.createDeck(),
    leftCards: []
};

export const deck = (state = initialState, action) => { 
    switch (action.type) {
        case 'DECK_SHUFFLE':
            return Object.assign({}, state,  { remainingCards: shuffle(state.remainingCards) });
        case 'DEAL_ONE_CARD':
            const { cardId, userName } = action;
            if(!cardId || !userName){
                return state;
            }
            let card = _.find(state.remainingCards, {id: cardId});
            card.handler = userName;
            let newState = {
                remainingCards: _.without(state.remainingCards, card),
                leftCards: state.leftCards.concat(card)
            }
            return newState;
        default:
          return state
    }
}

// Fisher–Yates Shuffle
export const shuffle = (cards)=>{
    let deck = cards.slice(0);
    let currentIndex = deck.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = deck[currentIndex];
      deck[currentIndex] = deck[randomIndex];
      deck[randomIndex] = temporaryValue;
    }

    return deck;
}

export default deck;