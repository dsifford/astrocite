import { CSL } from 'astrocite-core';
import { Eutils } from './schema';

export const FIELD_MAP = new Map<keyof Eutils.EntryOk, keyof CSL.Data>([
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
