import { CSL, parseName } from 'astrocite-core';
import { FIELD_MAP, TYPE_MAP } from './constants';
import * as parser from './grammar';
import { AST, Entry } from './types.d';

interface PagePart {
    key?: 'SP' | 'EP';
    value: string;
}
type PartialPage0 = () => PartialPage1;
type PartialPage1 = (first?: PagePart) => PartialPage2;
type PartialPage2 = (second?: PagePart) => Partial<CSL.Data> | undefined;
type CurriedPage = PartialPage0 | PartialPage1 | PartialPage2 | (Partial<CSL.Data> | undefined);

type DynamicFieldHandler = (
    input: { key: string; value: string; type: CSL.ItemType },
) => Partial<CSL.Data>;

interface MultiField {
    author: Set<CSL.Person>;
    editor: Set<CSL.Person>;
    translator: Set<CSL.Person>;
    keyword: Set<string>;
    [k: string]: Set<any>;
}

function generateID(): string {
    return (
        String.fromCharCode(97 + Math.floor(Math.random() * 26)) +
        Math.round(Math.random() * Date.now()).toString(30)
    );
}

const curriedPage: PartialPage0 = () => (first = { value: '' }) => (second = { value: '' }) => {
    if (!first.key) return;
    return first.key === 'SP'
        ? { page: `${first.value}${second.value === '' ? '' : '-' + second.value}` }
        : { page: `${second.value ? second.value + '-' : ''}${first.value}` };
};

const parseDateField: DynamicFieldHandler = ({ key, value }) => {
    const date = { 'date-parts': [value.split('/').slice(0, 3)] };
    return key === 'Y2'
        ? <Partial<CSL.Data>>{ accessed: date }
        : <Partial<CSL.Data>>{ issued: date };
};

const parsePubmedIdentifier: DynamicFieldHandler = ({ value }) => {
    return /PMC/i.test(value) ? { PMCID: value } : { PMID: value };
};

const parseIssueNumber: DynamicFieldHandler = ({ value, type }) => {
    return ['book', 'chapter', 'entry-dictionary', 'entry-encyclopedia'].indexOf(type) === -1
        ? { ISSN: value }
        : { ISBN: value };
};

const DYNAMIC_FIELDS: ReadonlyMap<string, DynamicFieldHandler> = new Map([
    ['C2', parsePubmedIdentifier],
    ['SN', parseIssueNumber],
    ['DA', parseDateField],
    ['PY', parseDateField],
    ['Y1', parseDateField],
    ['Y2', parseDateField],
]);

// tslint:disable cyclomatic-complexity
const parseEntry = (entry: Entry): CSL.Data => {
    const entryType = TYPE_MAP.get(entry.type) || 'article';
    let csl: CSL.Data = {
        id: generateID(),
        type: entryType,
    };
    const multiFields: MultiField = {
        author: new Set(),
        editor: new Set(),
        translator: new Set(),
        keyword: new Set(),
    };
    let page: CurriedPage = curriedPage();
    for (const prop of entry.properties) {
        const handler = DYNAMIC_FIELDS.get(prop.key);
        const key = FIELD_MAP.get(prop.key);
        if (handler) {
            csl = { ...csl, ...handler({ key: prop.key, value: prop.value, type: entryType }) };
        }
        if (key) {
            csl = { ...csl, [key]: prop.value };
        }
        switch (prop.key) {
            case 'AU':
            case 'A1':
            case 'A2':
            case 'A3':
            case 'A4':
                multiFields.author.add(parseName(prop.value));
                break;
            case 'ED':
                multiFields.editor.add(parseName(prop.value));
                break;
            case 'TA':
                multiFields.translator.add(parseName(prop.value));
                break;
            case 'KW':
                multiFields.keyword.add(prop.value);
                break;
            case 'SP':
            case 'EP':
                page = page({ key: prop.key, value: prop.value });
        }
    }
    for (const key of Object.keys(multiFields)) {
        const value = multiFields[key];
        if (multiFields[key].size > 0) {
            csl = { ...csl, [key]: [...value] };
        }
    }
    while (typeof page === 'function') {
        page = page();
    }
    return {
        ...csl,
        ...page ? page : {},
    };
};

export default function parseCSL(source: string): CSL.Data[] {
    const ast: AST = <AST>parser.parse(source);
    let csl: CSL.Data[] = [];

    for (const entry of ast.children) {
        csl = [...csl, parseEntry(entry)];
    }

    return csl;
}
