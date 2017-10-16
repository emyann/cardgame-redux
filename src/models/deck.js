import {Card, mapDisplayValues, suits} from './card';

export class Deck{
    static createDeck(){
        return suits.reduce((cards, suit) => {
            return cards.concat(Object.keys(mapDisplayValues).map(value => new Card(value, suit)));
        },[]);
    }
}

export default Deck;