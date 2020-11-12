import { Data, ItemType } from 'csl-json';

/**
 * Maps LaTeX dicratical commands to unicode dicraticals
 */
export const DICRATICS: ReadonlyMap<string, string> = new Map([
    ['`', '\u0300'],
    [`'`, '\u0301'],
    ['^', '\u0302'],
    ['~', '\u0303'],
    ['=', '\u0304'],
    ['"', '\u0308'],
    ['c', '\u0327'],
    ['b', '\u0331'],
    ['u', '\u0306'],
    ['v', '\u030C'],
    ['.', '\u0307'],
    ['d', '\u0323'],
    ['r', '\u030A'],
    ['H', '\u030B'],
    ['k', '\u0328'],
]);

/**
 * Maps BibTeX fields to CSL JSON fields
 */
export const FIELD_MAP: ReadonlyMap<string, keyof Data> = new Map([
    ['address', 'publisher-place'],
    ['annote', 'annote'],
    ['author', 'author'],
    ['booktitle', 'container-title'],
    ['chapter', 'chapter-number'],
    ['doi', 'DOI'],
    ['edition', 'edition'],
    ['editor', 'editor'],
    ['howpublished', 'medium'],
    ['institution', 'publisher'],
    ['isbn', 'ISBN'],
    ['issn', 'ISSN'],
    ['journal', 'container-title'],
    ['note', 'note'],
    ['issue', 'issue'],
    ['organization', 'publisher'],
    ['pages', 'page'],
    ['pmcid', 'PMCID'],
    ['pmid', 'PMID'],
    ['publisher', 'publisher'],
    ['school', 'publisher'],
    ['series', 'collection-number'],
    ['title', 'title'],
    ['url', 'URL'],
    ['volume', 'volume'],
]);

/**
 * Map of some of the most commonly used symbol-generating commands in latex to its unicode
 * counterpart
 */
export const KNOWN_COMMANDS: ReadonlyMap<string, string> = new Map([
    [',', ' '],
    ['$', '$'],
    ['%', '%'],
    ['#', '#'],
    ['&', '&'],
    ['_', '_'],
    ['{', '{'],
    ['}', '}'],
    [' ', '\u00A0'],
    ['P', '\u00B6'],
    ['S', '\u00A7'],
    ['ae', '\u00E6'],
    ['copyright', '\u00A9'],
    ['dag', '\u2020'],
    ['ddag', '\u2021'],
    ['dots', '\u2026'],
    ['ldots', '\u2026'],
    ['oe', '\u0153'],
    ['pounds', '\u00A3'],
    ['alpha', '\u0251'],
    ['beta', '\u03B2'],
    ['gamma', '\u03B3'],
    ['delta', '\u03B4'],
    ['epsilon', '\u03B5'],
    ['zeta', '\u03B6'],
    ['eta', '\u03B7'],
    ['theta', '\u03B8'],
    ['iota', '\u03B9'],
    ['kappa', '\u03BA'],
    ['lambda', '\u03BB'],
    ['mu', '\u03BC'],
    ['nu', '\u03BD'],
    ['xi', '\u03BE'],
    ['pi', '\u03C0'],
    ['rho', '\u03C1'],
    ['varsigma', '\u03C2'],
    ['sigma', '\u03C3'],
    ['tau', '\u03C4'],
    ['upsilon', '\u03C5'],
    ['varphi', '\u03C6'],
    ['phi', '\u03D5'],
    ['chi', '\u03C7'],
    ['psi', '\u03C8'],
    ['omega', '\u03C9'],
    ['Gamma', '\u0393'],
    ['Delta', '\u0394'],
    ['Theta', '\u0398'],
    ['Lambda', '\u039B'],
    ['Xi', '\u039E'],
    ['Pi', '\u03A0'],
    ['Sigma', '\u03A3'],
    ['Upsilon', '\u03A5'],
    ['Phi', '\u03A6'],
    ['Psi', '\u03A8'],
    ['Omega', '\u03A9'],

    // other non-accented characters often found in author names and titles
    // see http://www.bibtex.org/SpecialSymbols/
    ['OE', '\u0152'],
    ['AE', '\u00C6'],
    ['aa', '\u00E5'],
    ['o', '\u00F8'],
    ['O', '\u00D8'],
    ['l', '\u0142'],
    ['L', '\u0141'],
    ['ss', '\u00DF'],
]);

// prettier-ignore
export const KNOWN_MACROS: ReadonlyArray<[string, string]> = [
    // Not technically accurate since BibTeX actually parses into the english month name by default,
    // but this way is easier to work with.
    ['jan', '01'],
    ['feb', '02'],
    ['mar', '03'],
    ['apr', '04'],
    ['may', '05'],
    ['jun', '06'],
    ['jul', '07'],
    ['aug', '08'],
    ['sep', '09'],
    ['oct', '10'],
    ['nov', '11'],
    ['dec', '12'],
    // below are defined in 'plain.bst' default bibtex file
    ['acmcs', 'ACM Computing Surveys'],
    ['acta', 'Acta Informatica'],
    ['cacm', 'Communications of the ACM'],
    ['ibmjrd', 'IBM Journal of Research and Development'],
    ['ibmsj', 'IBM Systems Journal'],
    ['ieeese', 'IEEE Transactions on Software Engineering'],
    ['ieeetc', 'IEEE Transactions on Computers'],
    ['ieeetcad', 'IEEE Transactions on Computer-Aided Design of Integrated Circuits'],
    ['ipl', 'Information Processing Letters'],
    ['jacm', 'Journal of the ACM'],
    ['jcss', 'Journal of Computer and System Sciences'],
    ['scp', 'Science of Computer Programming'],
    ['sicomp', 'SIAM Journal on Computing'],
    ['tocs', 'ACM Transactions on Computer Systems'],
    ['tods', 'ACM Transactions on Database Systems'],
    ['tog', 'ACM Transactions on Graphics'],
    ['toms', 'ACM Transactions on Mathematical Software'],
    ['toois', 'ACM Transactions on Office Information Systems'],
    ['toplas', 'ACM Transactions on Programming Languages and Systems'],
    ['tcs', 'Theoretical Computer Science'],
];

/**
 * Maps BibTeX types to CSL JSON types
 */
export const TYPE_MAP: ReadonlyMap<string, ItemType> = new Map([
    ['article', 'article'],
    ['book', 'book'],
    ['booklet', 'pamphlet'],
    ['conference', 'paper-conference'],
    ['electronic', 'webpage'],
    ['inbook', 'chapter'],
    ['incollection', 'chapter'],
    ['inproceedings', 'paper-conference'],
    ['manual', 'report'],
    ['mastersthesis', 'thesis'],
    ['misc', 'article'],
    ['patent', 'patent'],
    ['periodical', 'article-magazine'],
    ['phdthesis', 'thesis'],
    ['proceedings', 'paper-conference'],
    ['standard', 'legislation'],
    ['techreport', 'report'],
    ['unpublished', 'manuscript'],
]);
