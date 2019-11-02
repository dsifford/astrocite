import { Data } from 'csl-json';
import { EntryOk } from './schema';

export const FIELD_MAP = new Map<keyof EntryOk, keyof Data>([
    ['availablefromurl', 'URL'],
    ['chapter', 'chapter-number'],
    ['edition', 'edition'],
    ['issn', 'ISSN'],
    ['issue', 'issue'],
    ['medium', 'medium'],
    ['nlmuniqueid', 'id'],
    ['pages', 'page'],
    ['publisherlocation', 'publisher-place'],
    ['publishername', 'publisher'],
    ['reportnumber', 'number'],
    ['volume', 'volume'],
]);

export const HTML_FIELD_MAP = new Map<keyof EntryOk, keyof Data>([
    ['bookname', 'title'],
    ['booktitle', 'title'],
    ['fulljournalname', 'container-title'],
    ['title', 'title'],
]);
