import chai from 'chai';
chai.should();

import {extractSections, parseSong} from '../lib/tabParser';

/* global describe, it */
describe("The tab parser", function () {
    it("should extract sections from a tab", function () {
        extractSections(`
            Title: Hello World
            some content
            Author: Somebody
            Intro:
            This is

            the intro
            :stuffz
            Chorus:
            [A] la la la la la

        `).should.deep.equal([
            {type: "definition", name: "Title", title: "Hello World", body: "some content"},
            {type: "definition", name: "Author", title: "Somebody", body: ""},
            {type: "definition", name: "Intro", title: "", body: "This is\n\nthe intro"},
            {type: "reference", name: "stuffz", title: "", body: ""},
            {type: "definition", name: "Chorus", title: "", body: "[A] la la la la la"},
        ]);
    });

    it("should produce song objects with meta information", function () {
        parseSong(`
            Title: Hello World
            Author: Bob Bobby
        `).should.include({
            Title: "Hello World",
            Author: "Bob Bobby"
        });
    });
});
