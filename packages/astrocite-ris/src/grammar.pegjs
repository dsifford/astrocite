
File
    = __ r:Entry+ __ {
        return {
            kind: 'File',
            loc: location(),
            children: r,
        };
    }

Entry
    = type:START fields:Property+ END {
        return {
            kind: 'Entry',
            loc: location(),
            type: type,
            properties: fields,
        };
    }

Property
    = k:PropertyKey PropertySeparator v:PropertyValue EOL {
        return {
            type: 'Property',
            loc: location(),
            key: k,
            value: v,
        };
    }

PropertyKey
    = ! 'ER' k:$[A-Z0-9]+ { return k; }

PropertyValue
    = line:$[^\r\n]* { return line; }

PropertySeparator
    = _h '-' _h

// --- Helpers

START
    = 'TY' PropertySeparator v:PropertyValue __ { return v; }

END
    = 'ER' _h '-' __

EOL
    = '\n'
    / '\r\n'

_h "Mandatory Horizontal Whitespace"
    = [ \t]+

__h "Optional Horizontal Whitespace"
    = [ \t]*

_v "Mandatory Vertical Whitespace"
    = [\r\n]+

__v "Optional Vertical Whitespace"
    = [\r\n]*

_ "Mandatory Whitespace"
    = [ \t\n\r]+

__ "Optional Whitespace"
    = [ \t\n\r]*
