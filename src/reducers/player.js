const playerInitialState = {};

export const player = (state= playerInitialState, action) => {
    switch (action.type) {
        case 'ADD_PLAYER':
            if(!action.userName)
                throw new Error(playerErrors.userNameIsMandatory);
            if(state[action.userName])
                throw new Error(playerErrors.userNameDuplicate(action.userName));
            
            const player = { // TODO: Create ES6 Class or TypeScript type
                name: action.userName,
                cardsIds: []
            };
            return Object.assign({}, state, { [player.name]:player });
        case 'DEAL_ONE_CARD':
        console.log('here');
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

export const playerErrors= {
    userNameIsMandatory : 'You need to specify a name to add a player',
    userNameDuplicate: userName => `A user named ${userName} is already playing`
}

export default player;