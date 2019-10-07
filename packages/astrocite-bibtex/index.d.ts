interface LocationInfo {
    offset: number;
    line: number;
    column: number;
}

interface Location {
    start: LocationInfo;
    end: LocationInfo;
}

export interface TextValue {
    kind: 'Text';
    loc: Location;
    value: string;
}

export interface StringValue {
    kind: 'String';
    loc: Location;
    value: string;
}

export interface NumberValue {
    kind: 'Number';
    loc: Location;
    value: number;
}

export interface RequiredArgument {
    kind: 'RequiredArgument';
    loc: Location;
    value: Array<Command | TextValue>;
}

export interface OptionalArgument {
    kind: 'OptionalArgument';
    loc: Location;
    value: string;
}

export type Argument = RequiredArgument | OptionalArgument;

export interface RegularCommand {
    kind: 'RegularCommand';
    loc: Location;
    value: string;
    arguments: Argument[];
}

export interface SubscriptCommand {
    kind: 'SubscriptCommand';
    loc: Location;
    value: string;
    arguments: ValueType;
}

export interface SuperscriptCommand {
    kind: 'SuperscriptCommand';
    loc: Location;
    value: string;
    arguments: ValueType;
}

export interface SymbolCommand {
    kind: 'SymbolCommand';
    loc: Location;
    value: string;
}

export interface MathMode {
    kind: 'MathMode';
    loc: Location;
}

export interface DicraticalCommand {
    kind: 'DicraticalCommand';
    loc: Location;
    mark: string;
    character: string;
    dotless: boolean;
}

export interface NestedLiteral {
    kind: 'NestedLiteral';
    loc: Location;
    value: ValueType[];
}

export interface Property {
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

export interface PreambleExpression {
    kind: 'PreambleExpression';
    loc: Location;
    value: ValueType[];
}

export interface StringExpression {
    kind: 'StringExpression';
    loc: Location;
    key: string;
    value: ValueType[];
}

export interface BracedComment {
    kind: 'BracedComment';
    loc: Location;
    value: string;
}

export interface LineComment {
    kind: 'LineComment';
    loc: Location;
    value: string;
}

export interface NonEntryText {
    kind: 'NonEntryText';
    loc: Location;
    value: string;
}

export type Comment = BracedComment | LineComment | NonEntryText;

export type Command =
    | RegularCommand
    | SymbolCommand
    | DicraticalCommand
    | SubscriptCommand
    | SuperscriptCommand
    | MathMode;

export type ValueType =
    | TextValue
    | StringValue
    | NestedLiteral
    | NumberValue
    | Command;

export type Children = Entry | PreambleExpression | StringExpression | Comment;

export type Node = Comment | PreambleExpression | StringExpression | Entry;

export interface AST {
    kind: 'File';
    loc: Location;
    children: Children[];
}

export interface ParseOptions {
    verbatimProperties?: string[];
    verbatimCommands?: string[];
}

export const AST: {
    parse(input: string, options?: ParseOptions): AST;
};

export function parse(input: string): CSL.Data[];
