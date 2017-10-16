export const addPlayer = name => ({ type: 'ADD_PLAYER', name });
export const shuffle = () => ({ type: 'DECK_SHUFFLE' });
export const dealOneCard = ({ id: userId }) => ({ type: 'DEAL_ONE_CARD', userId });
