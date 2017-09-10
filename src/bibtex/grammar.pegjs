{
    function simpleLatexConversions(text) {
        return [
            [/---/g, '\u2014'],
            [/--/g, '\u2013'],
            [/~/g, '\u00A0'],
            [/</g, '\u00A1'],
            [/>/g, '\u00BF'],
        ].reduce((output, replacer) => {
            output = output.replace(replacer[0], replacer[1]);
            return output;
        }, text);
    }

    function normalizeWhitespace(textArr) {
        return textArr.reduce((prev, curr) => {
            if (/\s/.test(curr)) {
                if (/\s/.test(prev[prev.length - 1])) {
                    return prev;
                } else {
                    return prev + ' ';
                }
            }
            return prev + curr;
        }, '');
    }
}

File
    = __ r:Node+ __ {
        return {
            kind: 'File',
            loc: location(),
            children: r,
        };
    }

Junk
    = [^@] [^\n\r]* [\n\r]*

Node
    = Junk* n:(PreambleExpression / StringExpression / Entry) { return n; }

//-----------------  Top-level Nodes

Entry
    = '@' type:$[A-Za-z]+ '{' id:EntryId props:Property+ '}' _v? __ {
        return {
            kind: 'Entry',
            id: id,
            type: type.toLowerCase(),
            loc: location(),
            properties: props,
        }
    }
    / '@' type:$[A-Za-z]+ '(' id:EntryId props:Property+ ')' _v __ {
        return {
            kind: 'Entry',
            id: id,
            type: type.toLowerCase(),
            loc: location(),
            properties: props,
        }
    }

PreambleExpression
    = '@preamble'i __h '{' __ v:(QuotedValue / BracesValue)+ __ '}' _v __ {
        return {
            kind: 'PreambleExpression',
            loc: location(),
            value: v.reduce((a, b) => a.concat(b), []),
        }
    }
    / '@preamble'i __h '(' __ v:(QuotedValue / BracesValue)+ __ ')' _v __ {
        return {
            kind: 'PreambleExpression',
            loc: location(),
            value: v.reduce((a, b) => a.concat(b), []),
        }
    }

StringExpression
    = '@string'i __h '{' __h k:$([A-Za-z-_][A-Za-z0-9-_]*) PropertySeparator v:(QuotedValue / BracesValue)+ __ '}' _v __ {
        return {
            kind: 'StringExpression',
            loc: location(),
            key: k,
            value: v.reduce((a, b) => a.concat(b), []),
        };
    }
    / '@string'i __h '(' __h k:$([A-Za-z-_][A-Za-z0-9-_]*) PropertySeparator v:(QuotedValue / BracesValue)+ __ ')' _v __ {
        return {
            kind: 'StringExpression',
            loc: location(),
            key: k,
            value: v.reduce((a, b) => a.concat(b), []),
        };
    }

// CommentExpression

//------------------ Entry Child Nodes

EntryId
    = __h id:$[a-zA-Z0-9-:_]+ ',' __h EOL { return id; }

Property
    = k:PropertyKey PropertySeparator v:PropertyValue PropertyTerminator {
        return {
            kind: 'Property',
            loc: location(),
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
    = v:[^{}"\\]+ {
        return {
            kind: 'Text',
            loc: location(),
            value: simpleLatexConversions(normalizeWhitespace(v)),
        };
    }

Number
    = v:$[0-9]+ {
        return {
            kind: 'Number',
            loc: location(),
            value: parseInt(v, 10),
        };
    }

String
    = v:$([a-zA-Z-_][a-zA-Z0-9-_]+) {
        return {
            kind: 'String',
            loc: location(),
            value: v,
        };
    }

NestedLiteral
    = '{' v:(Text / Command / NestedLiteral)* '}' {
        return {
            kind: 'NestedLiteral',
            loc: location(),
            value: v,
        };
    }


//---------------- Comments

LineComment
    = '%' __h v:$[^\r\n]+ EOL+ {
        return {
            kind: 'LineComment',
            loc: location(),
            value: v,
        };
    }


//---------------------- LaTeX Commands

Command
    = DicraticalCommand
    / RegularCommand
    / SymbolCommand

DicraticalCommand
    = '\\' mark:SimpleDicratical char:[a-zA-Z0-9] {
        return {
            kind: 'DicraticalCommand',
            loc: location(),
            mark: mark,
            character: char,
        };
    }
    / '\\' mark:ExtendedDicratical '{' char:[a-zA-Z0-9] '}' {
        return {
            kind: 'DicraticalCommand',
            loc: location(),
            mark: mark,
            character: char,
        }
    }


SymbolCommand
    = '\\' v:$[^A-Za-z0-9\t\r\n] {
        return {
            kind: 'SymbolCommand',
            loc: location(),
            value: v,
        };
    }

RegularCommand
    = '\\' v:$[A-Za-z]+ args:Argument* {
        return {
            kind: 'RegularCommand',
            loc: location(),
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
            loc: location(),
            value: v,
        }
    }

RequiredArgument
    = '{' __h v:(Command / Text)* __h '}' {
        return {
            kind: 'RequiredArgument',
            loc: location(),
            value: v,
        }
    }

//-------------- Helpers

SimpleDicratical
    = ['`=~^.]

ExtendedDicratical
    = ['`"c=buv~^.drHk]

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



