interface LocationInfo {
    offset: number;
    line: number;
    column: number;
}

interface Location {
    start: LocationInfo;
    end: LocationInfo;
}

interface TextValue {
    kind: 'Text';
    loc: Location;
    value: string;
}

interface StringValue {
    kind: 'String';
    loc: Location;
    value: string;
}

interface NumberValue {
    kind: 'Number';
    loc: Location;
    value: number;
}

interface RequiredArgument {
    kind: 'RequiredArgument';
    loc: Location;
    value: Array<Command | TextValue>;
}

interface OptionalArgument {
    kind: 'OptionalArgument';
    loc: Location;
    value: string;
}

type Argument = RequiredArgument | OptionalArgument;

interface RegularCommand {
    kind: 'RegularCommand';
    loc: Location;
    value: string;
    arguments: Argument[];
}

interface SymbolCommand {
    kind: 'SymbolCommand';
    loc: Location;
    value: string;
}

interface DicraticalCommand {
    kind: 'DicraticalCommand';
    loc: Location;
    mark: string;
    character: string;
}

interface NestedLiteral {
    kind: 'NestedLiteral';
    loc: Location;
    value: ValueType[];
}

interface Property {
    kind: 'Property';
    loc: Location;
    key: string;
    value: ValueType[];
}

export interface Entry {
    kind: 'Entry';
    id: string;
    type: string;
    loc: Location;
    properties: Property[];
}

interface PreambleExpression {
    kind: 'PreambleExpression';
    loc: Location;
    value: ValueType[];
}

interface StringExpression {
    kind: 'StringExpression';
    loc: Location;
    key: string;
    value: ValueType[];
}

type Command = RegularCommand | SymbolCommand | DicraticalCommand;

export type ValueType = TextValue | StringValue | NestedLiteral | NumberValue | Command;

type Children = Entry | PreambleExpression | StringExpression;

export interface AST {
    kind: 'File';
    loc: Location;
    children: Children[];
}
