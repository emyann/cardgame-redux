const playerInitialState = {};

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

export default player;