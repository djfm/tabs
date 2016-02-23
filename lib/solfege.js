const scale = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B"
];

const transposeChar = (char, semitones) => {
    const len = scale.length;
    for (let level = 0; level < len; ++level) {
        if (char === scale[level]) {
            return scale[(level + semitones) % len];
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
        if (/[A-G]/.exec(char)) {
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
