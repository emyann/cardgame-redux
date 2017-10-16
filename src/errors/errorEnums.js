export const playerErrors= {
    userNameIsMandatory : 'You need to specify a name to add a player',
    userNameDuplicate: userName => `A user named ${userName} is already playing`
};

export const cardError= {
    cardIllegalArgumentException : 'You need to specify a suit and face value to create a card'
};