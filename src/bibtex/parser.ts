import { DICRATICS, FIELD_MAP, KNOWN_COMMANDS, KNOWN_MACROS, TYPE_MAP } from './constants';
import * as parser from './grammar';
import { AST, ValueType } from './types.d';

interface DatePart {
    kind?: string;
    value: string | number;
}

type PartialDate0 = () => PartialDate1;
type PartialDate1 = (first?: DatePart) => PartialDate2;
type PartialDate2 = (second?: DatePart) => CSL.DateType;
type CurriedDate = PartialDate0 | PartialDate1 | PartialDate2 | CSL.DateType;

const curriedDate: PartialDate0 = () => (first = { value: '' }) => (second = { value: '' }) => {
    if (!first.kind && !second.kind) {
        return {
            'date-parts': [['', '', '']],
        };
    }
    if (first.kind) {
        return first.kind === 'year'
            ? {
                  'date-parts': [[first.value, second.value, '']],
              }
            : {
                  'date-parts': [[second.value, first.value, '']],
              };
    }
    return second.kind === 'year'
        ? {
              'date-parts': [[second.value, first.value, '']],
          }
        : {
              'date-parts': [[first.value, second.value, '']],
          };
};

// Disabling below because switch statements will generally increase "complexity", but that's by
// design. The function really isn't that complex.
// tslint:disable cyclomatic-complexity
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
                output += `${v.character}${DICRATICS.get(v.mark) || ''}`;
                break;
            default:
                continue;
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
                let entry: CSL.Data = {
                    id: node.id,
                    type: TYPE_MAP.get(node.type) || 'article',
                };
                let date: CurriedDate = curriedDate();
                for (const property of node.properties) {
                    if (property.key === 'year' || property.key === 'month') {
                        date = date({
                            kind: property.key,
                            value: parseValue(property.value, STRINGS_MAP),
                        });
                        continue;
                    }
                    const field = FIELD_MAP.get(property.key);
                    if (field) {
                        entry = {
                            ...entry,
                            [field]: parseValue(property.value, STRINGS_MAP),
                        };
                    }
                }
                while (typeof date === 'function') {
                    date = date();
                }
                csl = [...csl, { ...entry, issued: date }];
                break;
            default:
                continue;
        }
    }

    return csl;
}
