import { combineReducers } from "redux";
import { deck } from './deck';
import { player } from './player';

export const rootReducer = combineReducers({
    deck,
    player
});
