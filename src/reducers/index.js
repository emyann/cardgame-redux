import { combineReducers } from "redux";
import uuid from 'uuid';

const deckInitialState = {
    remainingCards: [
        {
          id: "1.SPADE",
          value: "1",
          suit: "SPADE"
        },
        {
          id: "7.HEART",
          value: "7",
          suit: "HEART"
        },
        {
          id: "6.DIAMOND",
          value: "6",
          suit: "DIAMOND"
        },
        {
          id: "K.CLUB",
          value: "K",
          suit: "DIAMOND"
        }
      ],
      leftCards: []
};

const playerInitialState = {};

export const deck = (state = deckInitialState, action) => { 
    switch (action.type) {
        case 'DECK_SHUFFLE':
            return Object.assign({}, state,  { remainingCards: shuffle(state.remainingCards) });
        default:
          return state
    }
}

export const player = (state= playerInitialState, action) => {
    switch (action.type) {
        case 'ADD_PLAYER':
            const player = {
                id: uuid(),
                name: action.name
            }
            return Object.assign({}, state, { [player.id]:player });
        case 'DEAL_ONE_CARD':
            if(!action.userId || !state.player[action.userId]){
                return state;
            }else{
                let partialState = {
                    remainingCards: [],
                    leftCards: []
                };
                let card = state.remainingCards.first();
                card.handler= action.userId;
                partialState.leftCards.push(card);
                partialState.remainingCards = state.remainingCards.slice(1);
                return Object.assign({}, state, partialState);
            }
        default:
          return state
    }
}

export const dealOneCard = (cards, player) => {
    let card = cards.filter(c => c.handler).first(); // get the first non handled card
    if(!card){
        throw new Exception('Could not get more card');
    }else{

    }
};

// Fisher–Yates Shuffle
export const shuffle = (cards)=>{
    let deck = cards.splice(0);
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

export const rootReducer = combineReducers({
    deck,
    player
});

export default deck;