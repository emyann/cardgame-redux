import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers';
import { addPlayer, shuffle, dealOneCard } from "./actions";
import * as _ from 'lodash';

const store = createStore(rootReducer);
store.subscribe(() => {
    console.log('debug:: state', JSON.stringify(store.getState(), null, 4));
});
store.dispatch(addPlayer('yrnd1'));
store.dispatch(addPlayer('player2'));
store.dispatch(shuffle());
// store.dispatch(shuffle());
// store.dispatch(dealOneCard({ id: '1'}));
// store.dispatch(shuffle());
// store.dispatch(shuffle());
// store.dispatch(dealOneCard({ id: '1'}));
