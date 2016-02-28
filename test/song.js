import chai from 'chai';
chai.should();

import {parseSong} from '../lib/tabParser';
import {transposeSong} from '../lib/song';

/* global describe, it */
describe("The song library", function () {
    it("should return undefined when transposing an undefined song", function () {
        chai.expect(transposeSong(undefined)).to.be.undefined;
    });

    it("should transpose a song", function () {
        const song = parseSong(`
            chorus:
            Save [Am] tonight
        `);

        const transposedSong = transposeSong(song, 2);

        transposedSong.sections[0].parsedBody[0].body.should.deep.equal([
            {marker: '', body: 'Save'},
            {marker: 'Bm', body: 'tonight'}
        ]);
    });
});
