import { promises } from 'fs';
import { join } from 'path';

import { toCSL } from '../googlebooks';

const FIXTURES_DIR = join(__dirname, './fixtures');

describe('Google Books JSON', () => {
    let fixtures: string[] = [];

    beforeAll(async () => {
        fixtures = await promises.readdir(FIXTURES_DIR);
    });

    it('should parse all fixtures to CSL JSON correctly', () => {
        for (const file of fixtures) {
            const json = require(join(FIXTURES_DIR, file));
            expect(toCSL(json)).toMatchSnapshot();
        }
    });

    it('should parse all fixtures to CSL JSON correctly, with chapter flag set', () => {
        for (const file of fixtures) {
            const json = require(join(FIXTURES_DIR, file));
            expect(toCSL(json, true)).toMatchSnapshot();
        }
    });
});
