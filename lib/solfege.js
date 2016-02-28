const scale = [
    ["C"],
    ["C#", "Db"],
    ["D"],
    ["D#", "Eb"],
    ["E", "Fb"],
    ["F"],
    ["F#", "Gb"],
    ["G"],
    ["G#", "Ab"],
    ["A"],
    ["A#", "Bb"],
    ["B"]
];

const transposeChar = (char, semitones) => {
    const len = scale.length;
    for (let level = 0; level < len; ++level) {
        if (scale[level].indexOf(char) !== -1) {
            return scale[(len + level + semitones) % len][0];
        }
    }
    return char;
};

export const extractNotes = str => {
    const notes = [];
    let currentString = '';

    const takeCurrentString = () => {
        if ('' !== currentString) {
            notes.push(currentString);
            currentString = '';
        }
    };

    for (const char of str) {
        if (/[^#b]/.exec(char)) {
            takeCurrentString();
        }

        currentString += char;
    }

    takeCurrentString();

    return notes;
};

export const transposeString = (str, semitones) =>
    extractNotes(str).map(
        note => transposeChar(note, semitones)
    ).join("")
;
