import { toCSL } from '../eutils';
const pubmedjson = require('./fixtures/pubmed.json');
const pubmedJsonEdges = require('./fixtures/pubmed-edge-cases.json');
const pmcjson = require('./fixtures/pmc.json');

describe('Pubmed JSON', () => {
    it('should parse eutils pubmed json correctly', () => {
        expect(toCSL(pubmedjson)).toMatchSnapshot();
    });
    it('should parse eutils pubmed json edge cases correctly', () => {
        expect(toCSL(pubmedJsonEdges)).toMatchSnapshot();
    });
    it('should parse eutils pmc json correctly', () => {
        expect(toCSL(pmcjson)).toMatchSnapshot();
    });
});
