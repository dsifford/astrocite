File
    = __ r:Reference+ __ {
        return {
            type: 'File',
            references: r,
        };
    }

Reference
    = kind:START fields:Property+ END {
        return {
            type: 'Reference',
            kind: kind,
            properties: fields,
        };
    }

Property
    = k:PropertyKey SEP v:PropertyValue EOL {
        return {
            type: 'Property',
            key: k,
            value: v,
        };
    }

PropertyKey
    = ! 'ER' k:[A-Z0-9]+ { return k.join(''); }

PropertyValue
    = line:[^\r\n]* { return line.join(''); }

// --- Meta Sequences

START
	= 'TY' SEP v:PropertyValue __ { return v; }

END
    = 'ER' _ '-' __

EOL
    = [\r\n]?

SEP "Field Separator"
    = _ '-' _

_ "Mandatory Whitespace"
    = [ \t\r\n]+

__ "Optional Whitespace"
    = [ \t\r\n]*