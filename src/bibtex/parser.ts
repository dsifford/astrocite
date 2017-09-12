import { parseNameParticles } from '../utils/';
import { DICRATICS, FIELD_MAP, KNOWN_COMMANDS, KNOWN_MACROS, TYPE_MAP } from './constants';
import * as parser from './grammar';
import { AST, ValueType } from './types.d';

interface DatePart {
    kind?: string;
    value: string | number;
}

type PartialDate0 = () => PartialDate1;
type PartialDate1 = (first?: DatePart) => PartialDate2;
type PartialDate2 = (second?: DatePart) => Partial<CSL.Data> | undefined;
type CurriedDate = PartialDate1 | PartialDate2 | (Partial<CSL.Data> | undefined);

const curriedDate: PartialDate0 = () => (first = { value: '' }) => (second = { value: '' }) => {
    if (!first.kind) return;
    return first.kind === 'year'
        ? { issued: { 'date-parts': [[first.value, second.value, '']] } }
        : { issued: { 'date-parts': [[second.value, first.value, '']] } };
};

const parseNames = (input: string): CSL.Person[] => {
    const FIRST_VON_LAST = /([A-Z][a-zA-Z-]+ )?([a-z][a-zA-Z-]+ .+? [a-z][a-zA-Z-]+ )?([A-Z].+)/;
    const VON_LAST_FIRST = /(.+ [a-z][a-zA-Z-]+ )?(.+), (.+)/;
    const VON_LAST_JR_FIRST = /(.+ [a-z][a-zA-Z-]+ )?(.+), (.+), (.+)/;
    const rawNames = input.split(/ and (?:others)?/g).filter(Boolean);
    let names: CSL.Person[] = [];

    for (const name of rawNames) {
        let first = '';
        let von = '';
        let last = '';
        let jr = '';
        let match: RegExpMatchArray | null;
        switch (name.split(',').length) {
            case 1:
                match = name.match(FIRST_VON_LAST);
                if (!match) break;
                [, first, von, last] = match;
                break;
            case 2:
                match = name.match(VON_LAST_FIRST);
                if (!match) break;
                [, von, last, first] = match;
                break;
            case 3:
                match = name.match(VON_LAST_JR_FIRST);
                if (!match) break;
                [, von, last, jr, first] = match;
                break;
            default:
                throw new Error(`Invalid name format found: ${name}`);
        }
        names = [
            ...names,
            {
                ...last ? { family: last.trim() } : {},
                ...first ? { given: first.trim() } : {},
                ...jr ? { suffix: jr.trim() } : {},
                ...von ? parseNameParticles(von.trim()) : {},
            },
        ];
    }
    return names;
};

const parseValue = (value: ValueType | ValueType[], macros: Map<string, string>): string => {
    let output = '';
    const input: ValueType[] = Array.isArray(value) ? value : [value];
    for (const v of input) {
        switch (v.kind) {
            case 'Text':
            case 'Number':
                output += v.value;
                break;
            case 'String':
                output += macros.get(v.value) || '';
                break;
            case 'NestedLiteral':
                output += parseValue(v.value, macros);
                break;
            case 'RegularCommand':
            case 'SymbolCommand':
                output += `${KNOWN_COMMANDS.get(v.value) || ''}`;
                break;
            case 'DicraticalCommand':
                output += `${v.character}${DICRATICS.get(v.mark)}`;
                break;
        }
    }
    return output;
};

export default function parseCSL(source: string): CSL.Data[] {
    const STRINGS_MAP: Map<string, string> = new Map(KNOWN_MACROS);
    const ast: AST = parser.parse(source);
    let csl: CSL.Data[] = [];

    for (const node of ast.children) {
        switch (node.kind) {
            case 'StringExpression':
                STRINGS_MAP.set(node.key, parseValue(node.value, STRINGS_MAP));
                break;
            case 'Entry':
                // TODO: Extract into own function
                let entry: CSL.Data = {
                    id: node.id,
                    type: TYPE_MAP.get(node.type) || 'article',
                };
                let date: CurriedDate = curriedDate();
                for (const property of node.properties) {
                    switch (property.key) {
                        case 'year':
                        case 'month':
                            date = date({
                                kind: property.key,
                                value: parseValue(property.value, STRINGS_MAP),
                            });
                            break;
                        case 'author':
                        case 'editor':
                            entry = {
                                ...entry,
                                [property.key]: parseNames(parseValue(property.value, STRINGS_MAP)),
                            };
                            break;
                        default:
                            const field = FIELD_MAP.get(property.key);
                            if (field) {
                                entry = {
                                    ...entry,
                                    [field]: parseValue(property.value, STRINGS_MAP),
                                };
                            }
                    }
                }
                while (typeof date === 'function') {
                    date = date();
                }
                csl = [...csl, { ...entry, ...date ? date : {} }];
                break;
            default:
                continue;
        }
    }

    return csl;
}
