import { Person } from 'csl-json';

// prettier-ignore
const NON_DROPPING_PARTICLES: ReadonlySet<string> = new Set([
    "'s", "'s-", "'t", 'a', "aan 't", 'aan de', 'aan den', 'aan der', 'aan het', 'aan t', 'aan',
    'am de', 'am', 'auf ter', 'ben', "bij 't", 'bij de', 'bij den', 'bij het', 'bij t', 'bij',
    'bin', 'boven d', "boven d'", 'd', 'dal', "dal'", "dall'", 'dalla', 'de die le', 'de die',
    'de l', "de l'", 'de la', 'de las', 'de le', 'de van der', 'deca', 'dela', 'die le', 'do',
    'don', 'het', 'i', 'il', 'im', "in 't", 'in de', 'in den', 'in het', 'in t', 'in', 'l', "l'",
    'la', 'las', 'le', 'los', 'lou', 'of', "onder 't", 'onder de', 'onder den', 'onder het',
    'onder t', 'onder', "op 't", 'op den', 'op der', 'op gen', 'op het', 'op t', 'op ten', 'op',
    "over 't", 'over de', 'over den', 'over het', 'over t', 'over', 's', "s'", 't', 'te', 'ten',
    'ter', 'tho', 'thoe', 'thor', 'to', 'toe', 'tot', "uijt 't", 'uijt de', 'uijt den', 'uijt te de',
    'uijt ten', 'uijt', "uit 't", 'uit de', 'uit den', 'uit het', 'uit t', 'uit te de', 'uit ten',
    'uit', 'unter', 'v', 'v.', 'v.d.', "van 't", 'van de l', "van de l'", 'van de', 'van de',
    'van den', 'van der', 'van gen', 'van het', 'van la', 'van t', 'van ter', 'van van de', 'vander',
    'vd', 'ver', "von 't", 'von t', "voor 't", 'voor de', 'voor den', "voor in 't", 'voor in t', 'voor',
]);

export function parseNameParticles(input: string): Partial<Person> {
    return NON_DROPPING_PARTICLES.has(input.toLowerCase())
        ? { 'non-dropping-particle': input }
        : { 'dropping-particle': input };
}

export default function(name: string): Person {
    const FIRST_VON_LAST = /([A-Z][a-zA-Z-]+ )?([a-z][a-zA-Z-]+ .+? [a-z][a-zA-Z-]+ )?([A-Z].+)/;
    const VON_LAST_FIRST = /(.+ [a-z][a-zA-Z-]+ )?(.+), (.+)/;
    const VON_LAST_JR_FIRST = /(.+ [a-z][a-zA-Z-]+ )?(.+), (.+), (.+)/;

    let first = '';
    let von = '';
    let last = '';
    let suffix = '';
    let literal = '';
    let match: RegExpMatchArray | null;

    switch (name.split(',').length) {
        case 1:
            match = name.match(FIRST_VON_LAST);
            if (!match) break;
            [, first, von, last] = match;
            break;
        case 2:
            match = name.match(VON_LAST_FIRST);
            if (!match) break;
            [, von, last, first] = match;
            break;
        case 3:
            match = name.match(VON_LAST_JR_FIRST);
            if (!match) break;
            [, von, last, suffix, first] = match;
            break;
        default:
            literal = name;
    }
    if (literal) {
        return {
            literal,
        };
    }
    return {
        family: last.trim(),
        ...(first ? { given: first.trim() } : {}),
        ...(suffix ? { suffix: suffix.trim() } : {}),
        ...(von ? parseNameParticles(von.trim()) : {}),
    };
}
