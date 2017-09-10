// tslint:disable no-console
import * as fs from 'fs';
import parse from '../parser';

type TestCases = Array<{
    input: string;
    output: object;
}>;

describe('BibTeX Parser', () => {
    let cases: TestCases = [];
    beforeAll(() => {
        const casenames = fs.readdirSync(`${__dirname}/cases`);
        for (const name of casenames) {
            cases = [
                ...cases,
                {
                    input: fs.readFileSync(`${__dirname}/cases/${name}/input.bib`, {
                        encoding: 'utf-8',
                    }),
                    output: JSON.parse(
                        fs.readFileSync(`${__dirname}/cases/${name}/output.json`, {
                            encoding: 'utf-8',
                        }),
                    ),
                },
            ];
        }
    });
    it('should parse all .bib case files to match their .json counterparts', () => {
        for (const c of cases) {
            expect(parse(c.input)).toEqual(c.output);
        }
    });
});
