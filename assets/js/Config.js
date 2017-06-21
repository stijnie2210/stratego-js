const DESTROYEDSTATES = {
    true: 'was',
    false: 'was not'
}

const PIECES = {
    F: 'Flag',
    B: 'Bomb',
    S: 'Spy',
    1: 'Marshal',
    2: 'General',
    3: 'Colonel',
    4: 'Major',
    5: 'Lieutenant',
    6: 'Captain',
    7: 'Sergeant',
    8: 'Miner',
    9: 'Explorer',
}

const TYPES = {
    O: 'blue.png',
    F: 'red_F.png',
    B: 'red_B.png',
    S: 'red_S.png',
    ' ': 'image_grass.png',
    1: 'red_1.png',
    2: 'red_2.png',
    3: 'red_3.png',
    4: 'red_4.png',
    5: 'red_5.png',
    6: 'red_6.png',
    7: 'red_7.png',
    8: 'red_8.png',
    9: 'red_9.png',
}

const STATES = {
    waiting_for_pieces: 0,
    waiting_for_an_opponent: 1,
    waiting_for_opponent_pieces: 2,
    my_turn: 3,
    opponent_turn: 4,
    game_over: 5,

    states: {
        0: 'Set up your board',
        1: 'Waiting for an opponent',
        2: 'Waiting for opponent to set up board',
        3: 'My turn',
        4: 'Opponents turn',
        5: 'Game Over'
    }
}