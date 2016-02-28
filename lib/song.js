import {transposeString} from '../lib/solfege';

const transposeSongPhrase = (phrase, semitones) => Object.assign({}, phrase, {
    marker: transposeString(phrase.marker, semitones)
});

const transposeSongSegment = (segment, semitones) =>
    segment.type === "text" ? segment : Object.assign({}, segment, {body:
        segment.body.map(phrase => transposeSongPhrase(phrase, semitones))
    })
;

const transposeSongSection = (section, semitones) =>
    Object.assign({}, section, {parsedBody: section.parsedBody.map(
        segment => transposeSongSegment(segment, semitones)
    )})
;

export const transposeSong = (song, semitones) => !song ? undefined :
    Object.assign({}, song, {sections: song.sections.map(
        section => transposeSongSection(section, semitones)
    )})
;
