import deepFreeze from "deep-freeze";
import { playerErrors } from "./../errors";
import { player } from "./player";
import { addPlayer, dealOneCard } from "../actions";

describe('Cardgame - Redux', () => {
    describe('Reducers', () => {
        describe('Player', () => {
            it('should provide the initial state', () => {
                expect(player(undefined, {})).toEqual({});
            });

            it('should handle ADD_Player action', () => {
                const stateBefore = {};
                const action = addPlayer('user-name-id');
                const stateAfter = {
                  'user-name-id': {
                    name: 'user-name-id',
                    cardsIds: []
                  }
                };
            
                deepFreeze(stateBefore);
                deepFreeze(action);
            
                expect(player(stateBefore, action)).toEqual(stateAfter);
            });

            it('should handle DEAL_ONE_CARD action', () => {            
                const store = {
                    deck:{
                        remainingCards:[
                            {
                                id: "1.SPADE",
                                value: "1",
                                suit: "SPADE"
                              },
                              {
                                id: "7.HEART",
                                value: "7",
                                suit: "HEART"
                              }
                        ],
                        leftCards:[]
                    },
                    player:{
                        'user-name-id': {
                            name: 'user-name-id',
                            cardsIds: []
                        }
                    }
                };
                let userName = 'user-name-id';
                let card = store.deck.remainingCards[0];
                expect(typeof dealOneCard(userName)).toEqual('function');
                const stateAfter = {
                    player:{
                        'user-name-id': {
                            name: 'user-name-id',
                            cardsIds: [card.id]
                        }
                    }
                };
                let getState = () => store;
                let dispatch = jasmine.createSpy('dispatch');
                dealOneCard(userName)(dispatch, getState);
                expect(dispatch).toHaveBeenCalledWith({ type: 'DEAL_ONE_CARD', userName, cardId: card.id});    
                expect(player(store.player, { type: 'DEAL_ONE_CARD', userName, cardId: card.id}) ).toEqual(stateAfter.player);   
            });


            it('should throw if player is added without a name', () => {
                const stateBefore = {};
                const action = addPlayer();
                let fn = () => player(stateBefore, action)
                expect(fn).toThrowError(playerErrors.userNameIsMandatory);
            });
        
            it('should throw if a player with an existing name is added', () => {
                const state = {
                    'duplicate': {
                        name: 'duplicate',
                        cardsIds: []
                    }
                };
                const action = addPlayer('duplicate');
                let fn = () => player(state, action);
                expect(fn).toThrowError(playerErrors.userNameDuplicate('duplicate'));
            });
        
        })
    })

})