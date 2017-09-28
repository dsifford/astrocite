import { CSL, parseDate } from 'astrocite-core';
import { FIELD_MAP } from './constants';
import { Eutils } from './schema';

type CSLTransform = (entry: Eutils.EntryOk) => Partial<CSL.Data>;

const transformUID: CSLTransform = entry => {
    const database = entry.articleids.find(i => i.value.endsWith(entry.uid));
    if (!database) {
        return { PMID: entry.uid };
    }
    return ['pubmed', 'pmid'].indexOf(database.idtype) !== -1
        ? { PMID: entry.uid }
        : { PMCID: database.value };
};

const transformAuthors: CSLTransform = entry => {
    const author = entry.authors.map(a => {
        const [family, given] = a.name.split(' ');
        return {
            ...family ? { family } : {},
            ...given ? { given } : {},
        };
    });
    return { author };
};

const FIELD_TRANSFORMS = new Map<keyof Eutils.EntryOk, CSLTransform>([
    ['authors', transformAuthors],
    ['uid', transformUID],
    ['lang', entry => ({ language: entry.lang[0] })],
    ['sortdate', entry => ({ issued: parseDate(entry.sortdate) })],
    ['sortpubdate', entry => ({ issued: parseDate(entry.sortpubdate) })],
    [
        'source',
        entry => ({ journalAbbreviation: entry.source, 'container-title-short': entry.source }),
    ],
]);

const parseEntry = (entry: Eutils.Entry): CSL.Data | Error => {
    if (entry.__astrocite_kind === 'error') {
        return new Error(entry.error);
    }
    return Object.keys(entry).reduce(
        (obj, key: keyof Eutils.EntryOk) => {
            if (!entry[key]) return obj;
            const transform = FIELD_TRANSFORMS.get(key);
            const cslKey = FIELD_MAP.get(key);
            if (transform) {
                return { ...obj, ...transform(entry) };
            }
            if (cslKey) {
                return { ...obj, [cslKey]: entry[key] };
            }
            return obj;
        },
        <CSL.Data>{ type: 'article-journal' },
    );
};

export function toCSL(input: Eutils.Response): Array<CSL.Data | Error> {
    const entries = input.result.uids.map(id => ({
        ...input.result[id],
        __astrocite_kind: input.result[id].error ? 'error' : 'entry',
    }));
    return [...(input.error ? [new Error(input.error)] : []), ...entries.map(parseEntry)];
}
