
File
    = __ r:Node+ __ {
        return {
            kind: 'File',
            // location: location(),
            children: r,
        };
    }

Junk
    = [^@] [^\n\r]* [\n\r]*

Node
    = Junk* n:(PreambleExpression / StringExpression / Entry) { return n; }

//-----------------  Top-level Nodes

Entry
    = '@' type:$[A-Za-z]+ '{' id:EntryId props:Property+ '}' _v __ {
        return {
            kind: 'Entry',
            type: type.toLowerCase(),
            id: id,
            properties: props,
        }
    }
    / '@' type:$[A-Za-z]+ '(' id:EntryId props:Property+ ')' _v __ {
        return {
            kind: 'Entry',
            type: type.toLowerCase(),
            id: id,
            properties: props,
        }
    }

PreambleExpression
    = '@preamble'i __h '{' __ v:(QuotedValue / BracesValue)+ __ '}' _v __ {
        return {
            kind: 'PreambleExpression',
            value: v.reduce((a, b) => a.concat(b), []),
        }
    }
    / '@preamble'i __h '(' __ v:(QuotedValue / BracesValue)+ __ ')' _v __ {
        return {
            kind: 'PreambleExpression',
            value: v.reduce((a, b) => a.concat(b), []),
        }
    }

StringExpression
    = '@string'i __h '{' __h k:$([A-Za-z-_][A-Za-z0-9-_]*) PropertySeparator v:(QuotedValue / BracesValue) __ '}' _v __ {
        return {
            kind: 'StringExpression',
            key: k,
            value: v,
        };
    }
    / '@string'i __h '(' __h k:$([A-Za-z-_][A-Za-z0-9-_]*) PropertySeparator v:(QuotedValue / BracesValue) __ ')' _v __ {
        return {
            kind: 'StringExpression',
            key: k,
            value: v,
        };
    }

// CommentExpression

//------------------ Entry Child Nodes

EntryId
    = __h id:$[a-zA-Z0-9-:]+ ',' __h EOL { return id; }

Property
    = k:PropertyKey PropertySeparator v:PropertyValue PropertyTerminator {
        return {
            kind: 'Property',
            key: k.toLowerCase(),
            value: v,
        }
    }

PropertyKey
    = __ k:$[a-zA-Z]+ { return k; }

//----------------------- Value Descriptors

PropertyValue
    = Number
    / v:(QuotedValue / BracesValue / StringValue)* {
        return v.reduce((a, b) => a.concat(b), []);
    }

QuotedValue
    = '"' v:(NestedLiteral / Command / Text)* '"' Concat? { return v; }

BracesValue
    = '{' v:(NestedLiteral / Command / Text)* '}' Concat? { return v; }

StringValue
    = v:String Concat? { return v; }

//---------------------- Value Kinds

Text
    = r:[^{}"\\]+ {
        return {
            kind: 'Text',
            value: r.reduce((prev, curr) => {
                if (/\s/.test(curr)) {
                    if (/\s/.test(prev[prev.length - 1])) {
                        return prev;
                    } else {
                        return prev + ' ';
                    }
                }
                return prev + curr;
            }, ''),
        };
    }

Number
    = v:$[0-9]+ {
        return {
            kind: 'Number',
            value: parseInt(v, 10),
        };
    }

String
    = v:$([a-zA-Z-_][a-zA-Z0-9-_]+) {
        return {
            kind: 'String',
            value: v,
        };
    }

NestedLiteral
    = '{' v:(Text / Command / NestedLiteral)* '}' {
        return {
            kind: 'NestedLiteral',
            value: v,
        };
    }


//---------------- Comments

LineComment
    = '%' __h v:$[^\r\n]+ EOL+ {
        return {
            kind: 'LineComment',
            value: v,
        };
    }


//---------------------- LaTeX Commands

Command
    = StringCommand
    / SymbolCommand

SymbolCommand
    = '\\' v:$[^A-Za-z0-9\t\r\n ] {
        return {
            kind: 'SymbolCommand',
            value: v,
        };
    }

StringCommand
    = '\\' v:$[A-Za-z]+ args:Argument* {
        return {
            kind: 'StringCommand',
            value: v,
            arguments: args,
        };
    }

Argument
    = RequiredArgument
    / OptionalArgument

OptionalArgument
    = '[' __h v:$[^\]]+ __h ']' {
        return {
            kind: 'OptionalArgument',
            value: v,
        }
    }

RequiredArgument
    = '{' __h v:(Command / Text)* __h '}' {
        return {
            kind: 'RequiredArgument',
            value: v,
        }
    }

//-------------- Helpers

PropertySeparator
    = __h '=' __h

PropertyTerminator
    = __h ','? __h (LineComment / EOL)

Concat
    = _ '#' _

EOL
    = [\r\n]

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

