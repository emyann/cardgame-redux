import deepFreeze from "deep-freeze";
import { Deck } from "./../models/deck";
import { shuffle, dealOneCard } from "../actions";
import { deck } from "./deck";


describe('Cardgame - Redux', () => {
    describe('Reducers', () => {
        describe('Deck', () => {
            it('should shuffle the deck when DECK_SHUFFLE is triggered', () => {
                const stateBefore = {
                    remainingCards : Deck.createDeck()
                };
                const action = shuffle();
                const stateAfter = {
                  'user-name-id': {
                    name: 'user-name-id',
                    cardsIds: []
                  }
                };
            
                deepFreeze(stateBefore);
                deepFreeze(action);
            
                expect(deck(stateBefore, action)).not.toEqual(deck(stateBefore, action));
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
                    deck:{
                        remainingCards:[
                              {
                                id: "7.HEART",
                                value: "7",
                                suit: "HEART"
                              }
                        ],
                        leftCards:[{
                            id: "1.SPADE",
                            value: "1",
                            suit: "SPADE",
                            handler: 'user-name-id'
                          }]
                    }
                };
                let getState = () => store;
                let dispatch = jasmine.createSpy('dispatch');
                dealOneCard(userName)(dispatch, getState);
                expect(dispatch).toHaveBeenCalledWith({ type: 'DEAL_ONE_CARD', userName, cardId: card.id});    
                expect(deck(store.deck, { type: 'DEAL_ONE_CARD', userName, cardId: card.id}) ).toEqual(stateAfter.deck);   
            
            });

            it('should not handle DEAL_ONE_CARD action when there are no more cards remaining', () => {
                const stateBefore = {
                    deck:{
                        remainingCards:[],
                        leftCards:[{
                            id: "1.SPADE",
                            value: "1",
                            suit: "SPADE",
                            handler: 'user-name-id'
                          }]
                    },
                    player:{
                        'user-name-id': {
                            name: 'user-name-id',
                            cardsIds: []
                        }
                    }
                };
                let userName = 'user-name-id';
                let card = stateBefore.deck.remainingCards[0];
                expect(typeof dealOneCard(userName)).toEqual('function');
                const stateAfter = {
                    deck:{
                        remainingCards:[],
                        leftCards:[{
                            id: "1.SPADE",
                            value: "1",
                            suit: "SPADE",
                            handler: 'user-name-id'
                          }]
                    }
                };
                let getState = () => stateBefore;
                let dispatch = jasmine.createSpy('dispatch');
                dealOneCard(userName)(dispatch, getState);
                expect(dispatch).not.toHaveBeenCalled();    
                expect(deck(stateBefore.deck, { type: 'DEAL_ONE_CARD', userName, cardId: null}) ).toEqual(stateBefore.deck);   
            
            });
        });

    });
});