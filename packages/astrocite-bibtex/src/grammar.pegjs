{
    const verbatim = {
        active: 0,
        property: null,
        closer: null,
        
        verbatimProperties: options.verbatimProperties ? options.verbatimProperties.map(prop => prop.toLowerCase()) : [
            'url',
            'doi',
            'file',
            'eprint',
            'verba',
            'verbb',
            'verbc',
        ],
        verbatimCommands: options.verbatimCommands ? options.verbatimCommands.map(cmd => cmd.toLowerCase()) : [
            'url',
        ],

        verbatimProperty: function(prop) {
            return this.verbatimProperties.includes(prop.toLowerCase())
        },
        enterProperty: function(closer) {
            if (!this.property || !this.verbatimProperty(this.property)) return true;
            this.property = null;
            this.active = 1;
            this.closer = closer;
            return true;
        },
        leaveProperty: function() {
            this.active = 0;
            this.closer = ''
            this.property = ''
            return true;
        },

        verbatimCommand: function(cmd) {
            return this.verbatimCommands.includes(cmd.toLowerCase())
        },
        enterCommand: function(cmd) {
            if (this.verbatimCommand(cmd)) this.active++;
            return true;
        },
        leaveCommand: function(cmd) {
            if (this.verbatimCommand(cmd)) this.active--;
            if (this.active < 0) this.active = 0;
            return true;
        },
    }

    function simpleLatexConversions(text) {
        if (verbatim.active) {
            return text

        } else {
          return text
              .replace(/---/g, '\u2014')
              .replace(/--/g, '\u2013')
              .replace(/</g, '\u00A1')
              .replace(/>/g, '\u00BF')
              .replace(/~/g, '\u00A0')
        }
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
    = __ r:Node* __ {
        return {
            kind: 'File',
            loc: location(),
            children: r,
        };
    }

Comment
    = '@comment'i __h v:BracedComment {
        return {
            kind: 'BracedComment',
            loc: location(),
            value: v.slice(1, -1),
        };
    }
    / '@comment'i __h v:[^\n\r]* [\n\r]* {
        return {
            kind: 'LineComment',
            loc: location(),
            value: simpleLatexConversions(normalizeWhitespace(v)),
        };
      }
    / v:([^@] [^\n\r]*) [\n\r]* {
        return {
            kind: 'NonEntryText',
            loc: location(),
            value: simpleLatexConversions(normalizeWhitespace(v)),
        };
      }

Node
    = n:(Comment / PreambleExpression / StringExpression / Entry) { return n; }

BracedComment
    = '{' comment:( [^{}] / BracedComment )* '}' { return '{' + comment.join('') + '}' }

//-----------------  Top-level Nodes

Entry
    = '@' type:$[A-Za-z]+ __ [({] __ id:EntryId? __ props:Property* __ [})] __ {
        return {
            kind: 'Entry',
            id: id || '',
            type: type.toLowerCase(),
            loc: location(),
            properties: props,
        }
    }

PreambleExpression
    = '@preamble'i __ [({] __ v:RegularValue* __ [})] __ {
        return {
            kind: 'PreambleExpression',
            loc: location(),
            value: v.reduce((a, b) => a.concat(b), []),
        }
    }

StringExpression
    = '@string'i __ [({] __ k:VariableName PropertySeparator v:RegularValue+ __ [})] __ {
        return {
            kind: 'StringExpression',
            loc: location(),
            key: k,
            value: v.reduce((a, b) => a.concat(b), []),
        };
    }

//------------------ Entry Child Nodes

EntryId
    = __ id:$[^ \t\r\n,]* __ ',' { return id; }

Property
    = k:PropertyKey PropertySeparator &{ verbatim.property = k; return true } v:PropertyValue &{ return verbatim.leaveProperty() } PropertyTerminator {
        return {
            kind: 'Property',
            loc: location(),
            key: k.toLowerCase(),
            value: v,
        }
    }

PropertyKey
    = __ k:$[_:a-zA-Z0-9-]+ { return k; }

//----------------------- Value Descriptors

PropertyValue
    = Number
    / v:(RegularValue / StringValue)* {
        return v.reduce((a, b) => a.concat(b), []);
    }

RegularValue
    = '"' &{ return verbatim.enterProperty('"') } v:(NestedLiteral / VerbatimText / Command / TextNoQuotes)* '"' Concat? { return v; }
    / '{' &{ return verbatim.enterProperty('{}') }v:(NestedLiteral / VerbatimText / Command / Text)* '}' Concat? { return v; }

StringValue
    = v:String Concat? { return v; }

//---------------------- Value Kinds

VerbatimText
    = &{ return verbatim.active && verbatim.closer === '"' } v:[^"]+ {
        return {
            kind: 'Text',
            loc: location(),
            value: simpleLatexConversions(normalizeWhitespace(v)),
        };
    }
    / &{ return verbatim.active && verbatim.closer === '{}' } v:[^{}]+ {
        return {
            kind: 'Text',
            loc: location(),
            value: simpleLatexConversions(normalizeWhitespace(v)),
        };
    }

Text
    = v:[^\^_${}\\]+ {
        return {
            kind: 'Text',
            loc: location(),
            value: simpleLatexConversions(normalizeWhitespace(v)),
        };
    }

TextNoQuotes
    = v:[^\^_${}"\\]+ {
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
    = v:VariableName {
        return {
            kind: 'String',
            loc: location(),
            value: v,
        };
    }

NestedLiteral
    = '{\\' mark:ExtendedDicratical ' ' char:([a-zA-Z0-9] / '\\' [ij]) '}' {
        return {
            kind: 'DicraticalCommand',
            loc: location(),
            mark: mark,
            dotless: !!char[1],
            character: char[1] || char[0],
        }
    }
    / '{' v:(VerbatimText / Text / Command / NestedLiteral )* '}' {
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
    = ScriptCommand
    / DicraticalCommand
    / RegularCommand
    / SymbolCommand
    / MathMode

ScriptCommand
    = mode:[_\^] &'{' v:RegularValue {
        return {
            kind: (mode === '_' ? 'Sub' : 'Super') + 'scriptCommand',
            loc: location(),
            value: v
        };
    }
    / mode:[_\^] &'\\' v:Command {
        return {
            kind: (mode === '_' ? 'Sub' : 'Super') + 'scriptCommand',
            loc: location(),
            value: v
        };
    }
    / mode:[_\^] v:. {
        return {
            kind: (mode === '_' ? 'Sub' : 'Super') + 'scriptCommand',
            loc: location(),
            value: v
        };
    }

DicraticalCommand
    = '\\' mark:SimpleDicratical char:([a-zA-Z0-9] / '\\' [ij]) {
        return {
            kind: 'DicraticalCommand',
            loc: location(),
            mark: mark,
            dotless: !!char[1],
            character: char[1] || char[0],
        };
    }
    / '\\' mark:ExtendedDicratical '{' char:([a-zA-Z0-9] / '\\' [ij]) '}' {
        return {
            kind: 'DicraticalCommand',
            loc: location(),
            mark: mark,
            dotless: !!char[1],
            character: char[1] || char[0],
        }
    }
    / '\\' mark:ExtendedDicratical ' ' char:([a-zA-Z0-9] / '\\' [ij]) {
        return {
            kind: 'DicraticalCommand',
            loc: location(),
            mark: mark,
            dotless: !!char[1],
            character: char[1] || char[0],
        }
    }

MathMode
    = '$' {
        return {
            kind: 'MathMode',
            loc: location(),
            value: '$',
        };
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
    = '\\' v:$[A-Za-z]+ &{ return verbatim.enterCommand(v) } args:Argument* &{ return verbatim.leaveCommand(v) } {
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

VariableName
    = $([a-zA-Z-_][a-zA-Z0-9-&_:]*)

SimpleDicratical
    = ['`"=~\^.]

ExtendedDicratical
    = ['`"=~\^.cbuvdrHk]

PropertySeparator
    = __ '=' __

PropertyTerminator
    = __ ','? __h (LineComment / EOL)*

Concat
    = __ '#' __

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
