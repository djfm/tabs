import chai from 'chai';
chai.should();

import {transposeString, extractNotes} from '../lib/solfege';

/* global describe, it */

describe("transposeString", function () {
    const testCases = [
        ["C" , 1, "C#"],
        ["C" , 2, "D"],
        ["B" , 1, "C"],
        ["C#", 1, "D"]
    ];

    testCases.forEach(([base, semitones, expected]) => {
        it(`should add ${semitones} to ${base}, yielding ${expected}`, function () {
            transposeString(base, semitones).should.equal(expected);
        });
    });
});

describe("extractNotes", function () {
    const testCases = [
        ["C", ["C"]],
        ["C#", ["C#"]],
        ["C#D", ["C#", "D"]]
    ];

    testCases.forEach(([input, expected]) => {
        it(`should extract individual notes from ${input}`, function () {
            extractNotes(input).should.deep.equal(expected);
        });
    });
});
