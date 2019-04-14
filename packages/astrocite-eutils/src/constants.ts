import { Data } from 'csl-json';
import { EntryOk } from './schema';

export const FIELD_MAP = new Map<keyof EntryOk, keyof Data>([
    ['availablefromurl', 'URL'],
    ['bookname', 'title'],
    ['booktitle', 'title'],
    ['chapter', 'chapter-number'],
    ['edition', 'edition'],
    ['fulljournalname', 'container-title'],
    ['issn', 'ISSN'],
    ['issue', 'issue'],
    ['medium', 'medium'],
    ['nlmuniqueid', 'id'],
    ['pages', 'page'],
    ['publisherlocation', 'publisher-place'],
    ['publishername', 'publisher'],
    ['reportnumber', 'number'],
    ['title', 'title'],
    ['volume', 'volume'],
]);
