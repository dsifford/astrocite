import * as fs from 'fs';
import { basename } from 'path';
import parse from '../parser';

interface TestCases {
    [filename: string]: string;
}

function extractIds(data) {
    return data.map(d => {
        delete d.id;
        return d;
    });
}

describe('RIS Parser', () => {
    let cases: TestCases = {};
    beforeAll(() => {
        const casenames = fs.readdirSync(`${__dirname}/cases`);
        for (const name of casenames) {
            cases = {
                ...cases,
                [basename(name, '.ris')]: fs.readFileSync(`${__dirname}/cases/${name}`, {
                    encoding: 'utf-8',
                }),
            };
        }
    });
    it('should parse a long RIS file correctly', () => {
        const parsed = parse(cases.long);
        expect(extractIds(parsed)).toMatchSnapshot();
    });
    it('should parse pages under varied circumstances', () => {
        const parsed = parse(cases.varied_page_numbers);
        expect(extractIds(parsed)).toMatchSnapshot();
    });
    it('should parse various "people" types and keywords', () => {
        const parsed = parse(cases.people_keywords);
        expect(extractIds(parsed)).toMatchSnapshot();
    });
    it('should parse various edge cases', () => {
        const parsed = parse(cases.misc_cases);
        expect(extractIds(parsed)).toMatchSnapshot();
    });
});