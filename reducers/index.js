import deepFreeze from 'deep-freeze';
import _ from 'underscore';

const initialState = {
    songs: [],
    songsById: {},
    transposeBy: 0
};

export function songRepository (state = initialState, action) {
    deepFreeze(state);

    if (action.type === "SET_SONGS") {
        return Object.assign({}, state, {
            songs: action.data.songs,
            songsById: _.indexBy(action.data.songs, 'id')
        });
    }

    if (action.type === "TRANSPOSE_SONG") {
        return Object.assign({}, state, {
            transposeBy: action.semitones
        });
    }

    return state;
}
