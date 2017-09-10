// tslint:disable no-console
import * as fs from 'fs';
import { basename } from 'path';
import parse from '../parser';

interface TestCases {
    [filename: string]: string;
}

describe('BibTeX Parser', () => {
    let cases: TestCases = {};
    beforeAll(() => {
        const casenames = fs.readdirSync(`${__dirname}/cases`);
        for (const name of casenames) {
            cases = {
                ...cases,
                [basename(name, '.bib')]: fs.readFileSync(`${__dirname}/cases/${name}`, {
                    encoding: 'utf-8',
                }),
            };
        }
    });
    it('should parse a simple .bib file', () => {
        expect(parse(cases.simple)).toMatchSnapshot();
    });
    it('should parse a file without leading or trailing whitespace', () => {
        expect(parse(cases.no_leading_trailing_whitespace)).toMatchSnapshot();
    });
    it('should parse a valid date regardless of the order of date parts or what is available', () => {
        expect(parse(cases.dates)).toMatchSnapshot();
    });
    it('should parse and skip over preamble statements correctly in varying formats', () => {
        expect(parse(cases.preamble)).toMatchSnapshot();
    });
    it('should parse user-defined strings', () => {
        expect(parse(cases.strings)).toMatchSnapshot();
    });
    it('should default to "article" for unknown types', () => {
        expect(parse(cases.unknown_types)).toMatchSnapshot();
    });
    it('should parse known commands and skip unknown commands', () => {
        expect(parse(cases.commands)).toMatchSnapshot();
    });
    it('should parse dicratical commands', () => {
        expect(parse(cases.dicraticals)).toMatchSnapshot();
    });
});
