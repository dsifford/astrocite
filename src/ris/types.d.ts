interface LocationInfo {
    offset: number;
    line: number;
    column: number;
}

interface Location {
    start: LocationInfo;
    end: LocationInfo;
}

interface Property {
    kind: 'Property';
    loc: Location;
    key: string;
    value: string;
}

interface Entry {
    kind: 'Entry';
    loc: Location;
    type: string;
    properties: Property[];
}

export interface AST {
    kind: 'File';
    loc: Location;
    children: Entry[];
}
