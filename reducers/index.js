import deepFreeze from 'deep-freeze';
const initialState = {
    songs: []
};

export function songRepository (state = initialState, action) {
    deepFreeze(state);

    if (action.type === "SET_SONGS") {
        return Object.assign({}, state, {
            songs: action.data.songs
        });
    }

    return state;
}
