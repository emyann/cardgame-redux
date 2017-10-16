import { combineReducers } from "redux";
import * as _ from 'lodash';

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
        case 'DEAL_ONE_CARD':
            const { cardId, userName } = action;
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

export const player = (state= playerInitialState, action) => {
    switch (action.type) {
        case 'ADD_PLAYER':
            if(!action.userName)
                throw new Error('You need to specify a name to add a player');
            if(state[action.userName])
                throw new Error(`A user named ${action.userName} is already playing`);
            
            const player = { // TODO: Create ES6 Class or TypeScript type
                name: action.userName,
                cardsIds: []
            };
            return Object.assign({}, state, { [player.name]:player });
        case 'DEAL_ONE_CARD':
            if(!action.userName || !state[action.userName] || !action.cardId){
                return state;
            }else{
                const { cardId, userName } = action;                
                const user = state[userName];
                const userCardsIds = user.cardsIds.slice(0);
                userCardsIds.push(cardId);
                return Object.assign({}, state, { [userName]: { cardsIds : userCardsIds } });
            }
        default:
          return state
    }
}





export const rootReducer = combineReducers({
    deck,
    player
});

export default deck;