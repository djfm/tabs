export const setSongs = data => ({
    type: "SET_SONGS",
    data
});

export const transpose = ({semitones}) => ({
    type: "TRANSPOSE_SONG",
    semitones
});
