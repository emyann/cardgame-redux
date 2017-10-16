import {cardError} from  '../errors';
export class Card {
    constructor(value, suit){
        if(!value || !suit)
            throw new Error(cardError.cardIllegalArgumentException);
        this.value = value; // number [0,13]
        this.suit = suit; // string 'diamonds' | 'hearts' | 'clubs' | 'spades'
    }

    get id(){
        return `${this.value}.${this.suit}`;
    }

    get display(){
        return `${mapDisplayValues[this.value]}`;
    }
}

export const mapDisplayValues = {
    1: 'A',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6',
    7: '7',
    8: '8',
    9: '9',
    10: '10',
    11: 'J',
    12: 'Q',
    13: 'K'
}

export const suits= ['diamonds', 'hearts', 'clubs', 'spades'];

export default Card
