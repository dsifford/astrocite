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
                [basename(name, '.bib')]: fs.readFileSync(
                    `${__dirname}/cases/${name}`,
                    {
                        encoding: 'utf-8',
                    },
                ),
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
    it('should parse names in various formats', () => {
        expect(parse(cases.names)).toMatchSnapshot();
    });
    it('should parse minified files', () => {
        expect(parse(cases.minified)).toMatchSnapshot();
    });
    it('should parse files with zero entries', () => {
        expect(parse(cases.no_entries)).toMatchSnapshot();
    });
    it('should parse empty files', () => {
        expect(parse(cases.empty)).toMatchSnapshot();
    });
    it('should parse entries without IDs', () => {
        expect(parse(cases.no_id)).toMatchSnapshot();
    });
    it('should parse files with CRLF line endings', () => {
        expect(parse(cases.crlf)).toMatchSnapshot();
    });
    it('should parse jabref files', () => {
        expect(parse(cases.jabref)).toMatchSnapshot();
    });
    it('should parse files with verbatim tildes, comments, odd characters in keys, super/subscript, no-dot i/j, and math-mode switches', () => {
        expect(
            parse(
                cases.tilde_comments_underscores_diacritics_sup_sub_nodoti_math_verbatim,
            ),
        ).toMatchSnapshot();
    });
});
