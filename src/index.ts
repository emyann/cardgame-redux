import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
import { addPlayer, shuffle, dealOneCard } from "./actions";
import * as _ from 'lodash';

const middleware = [thunk];
const store = createStore(rootReducer, applyMiddleware(...middleware));
store.subscribe(() => {
    console.log('debug:: state', JSON.stringify(store.getState(), null, 4));
});
store.dispatch(addPlayer('yrnd1'));
store.dispatch(addPlayer('player2'));

store.dispatch(shuffle());
store.dispatch(dealOneCard('yrnd1'));
store.dispatch(dealOneCard('player2'));

store.dispatch(shuffle());
store.dispatch(dealOneCard('yrnd1'));
store.dispatch(dealOneCard('player2'));

store.dispatch(shuffle());
store.dispatch(dealOneCard('yrnd1'));
store.dispatch(dealOneCard('player2'));


store.dispatch(dealOneCard('yrnd1'));
store.dispatch(dealOneCard('yrnd1'));
store.dispatch(dealOneCard('yrnd1'));
