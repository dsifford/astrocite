import { readFileSync } from 'fs';
import { resolve } from 'path';
import * as parser from './grammar';

interface Property {
    type: 'Property';
    key: string;
    value: string;
}

interface Reference {
    type: 'Reference';
    kind: string;
    properties: Property[];
}

export interface AST {
    type: 'File';
    references: Reference[];
}

const file = readFileSync(resolve(__dirname, '../tester.ris'), 'utf-8');

// tslint:disable no-console
console.log(JSON.stringify(parser.parse(file), null, 4));
