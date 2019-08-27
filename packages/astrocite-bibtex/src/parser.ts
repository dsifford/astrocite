import { parseName } from 'astrocite-core';
import { Data } from 'csl-json';
import {
    DICRATICS,
    FIELD_MAP,
    KNOWN_COMMANDS,
    KNOWN_MACROS,
    TYPE_MAP,
} from './constants';
import * as parser from './grammar';
import { AST, Entry, ValueType, RegularCommand, Argument } from './schema.d';

interface DatePart {
    kind?: string;
    value: string | number;
}

type PartialDate0 = () => PartialDate1;
type PartialDate1 = (first?: DatePart) => PartialDate2;
type PartialDate2 = (second?: DatePart) => Partial<Data> | undefined;
type CurriedDate = PartialDate1 | PartialDate2 | (Partial<Data> | undefined);

const curriedDate: PartialDate0 = () => (first = { value: '' }) => (
    second = { value: '' },
) => {
    if (!first.kind) return;
    return first.kind === 'year'
        ? { issued: { 'date-parts': [[first.value, second.value, '']] } }
        : { issued: { 'date-parts': [[second.value, first.value, '']] } };
};

function parseArgument(arg: Argument, macros: Map<string, string>): string {
    switch (arg.kind) {
        case 'OptionalArgument':
            return arg.value;
        case 'RequiredArgument':
            return parseValue(arg.value, macros);
            break;
        default:
            return '';
    }
}

function parseRegularCommand(
    cmd: RegularCommand,
    macros: Map<string, string>,
): string {
    switch (cmd.value) {
        case 'url':
            return cmd.arguments
                .map(arg => parseArgument(arg, macros))
                .join('');
        default:
            return KNOWN_COMMANDS.get(cmd.value) || '';
    }
}

const parseValue = (
    value: ValueType | ValueType[],
    macros: Map<string, string>,
): string => {
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
                output += parseRegularCommand(v, macros);
                break;
            case 'SymbolCommand':
                output += `${KNOWN_COMMANDS.get(v.value) || ''}`;
                break;
            case 'DicraticalCommand':
                output += `${v.character}${DICRATICS.get(v.mark)}`;
                break;
            case 'SuperscriptCommand':
            case 'SubscriptCommand':
                output += v.value;
                break;
        }
    }
    return output;
};

const parseEntry = (node: Entry, macros: Map<string, string>): Data => {
    let entry: Data = {
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
                    value: parseValue(property.value, macros),
                });
                break;
            case 'author':
            case 'editor':
                entry = {
                    ...entry,
                    [property.key]: parseValue(property.value, macros)
                        .split(/ and (?:others)?/g)
                        .filter(Boolean)
                        .map(parseName),
                };
                break;
            default:
                const field = FIELD_MAP.get(property.key);
                if (field) {
                    entry = {
                        ...entry,
                        [field]: parseValue(property.value, macros),
                    };
                }
        }
    }
    while (typeof date === 'function') {
        date = date();
    }
    return {
        ...entry,
        ...(date ? date : {}),
    };
};

export default function parseCSL(source: string): Data[] {
    const STRINGS_MAP: Map<string, string> = new Map(KNOWN_MACROS);
    const { children } = <AST>parser.parse(source);
    let csl: Data[] = [];

    for (const node of children) {
        switch (node.kind) {
            case 'StringExpression':
                STRINGS_MAP.set(node.key, parseValue(node.value, STRINGS_MAP));
                break;
            case 'Entry':
                csl = [...csl, parseEntry(node, STRINGS_MAP)];
                break;
            default:
                continue;
        }
    }
    return csl;
}
