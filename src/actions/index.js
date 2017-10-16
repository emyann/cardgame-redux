export const addPlayer = userName => ({ type: 'ADD_PLAYER', userName });
export const shuffle = () => ({ type: 'DECK_SHUFFLE' });
export const dealOneCard = userName => (dispatch, getState) => {
    const card = getState().deck.remainingCards[0]; // pick up the first card among the remaining one from the deck
    if(!card){
        return; 
    }
    return dispatch({ type: 'DEAL_ONE_CARD', userName , cardId: card.id}); // dispatch the choosen one to reducers
}
