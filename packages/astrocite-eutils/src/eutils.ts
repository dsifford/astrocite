import { parseDate } from 'astrocite-core';
import { Data } from 'csl-json';

import { FIELD_MAP } from './constants';
import { EUtilsError } from './error';
import { Entry, EntryOk, isError, Response } from './schema';

const FIELD_TRANSFORMS = new Map<
    keyof EntryOk,
    (entry: EntryOk) => Partial<Data>
>([
    [
        'articleids',
        ({ articleids, uid }) => {
            return {
                URL: articleids.some(({ value }) => value === uid)
                    ? `https://www.ncbi.nlm.nih.gov/pubmed/${uid}`
                    : `https://www.ncbi.nlm.nih.gov/pmc/articles/PMC${uid}`,
            };
        },
    ],
    [
        'authors',
        ({ authors }) => {
            return {
                author: authors
                    .map(({ name }) => {
                        const [family, given] = name.split(' ');
                        return {
                            family: family || '',
                            ...(given ? { given } : {}),
                        };
                    })
                    .filter(({ family }) => family !== ''),
            };
        },
    ],
    [
        'lang',
        ({ lang }) => {
            return {
                language: lang[0],
            };
        },
    ],
    [
        'sortdate',
        ({ sortdate }) => {
            return {
                issued: parseDate(sortdate),
            };
        },
    ],
    [
        'sortpubdate',
        ({ sortpubdate }) => {
            return {
                issued: parseDate(sortpubdate),
            };
        },
    ],
    [
        'source',
        ({ source }) => {
            return {
                journalAbbreviation: source,
                'container-title-short': source,
            };
        },
    ],
    [
        'uid',
        ({ articleids, uid }) => {
            const { idtype = '', value = uid } =
                articleids.find(i => i.value.endsWith(uid)) || {};
            switch (idtype) {
                case 'pubmed':
                case 'pmid':
                case '':
                    return { PMID: value };
                case 'pmc':
                case 'pmcid':
                    return { PMCID: value };
                default:
                    return {};
            }
        },
    ],
]);

const keys = Object.keys as <T>(o: T) => Array<Extract<keyof T, string>>;

function parseEntry(entry: Entry): Data | EUtilsError {
    if (isError(entry)) {
        return new EUtilsError(entry.error, entry.uid);
    }
    return keys(entry).reduce<Data>(
        (obj, key) => {
            if (!entry[key]) {
                return obj;
            }
            const transform = FIELD_TRANSFORMS.get(key);
            if (transform) {
                return { ...obj, ...transform(entry) };
            }
            const cslKey = FIELD_MAP.get(key);
            if (cslKey) {
                return { ...obj, [cslKey]: entry[key] };
            }
            return obj;
        },
        {
            id: entry.uid,
            type: 'article-journal',
        },
    );
}

export function toCSL({ error, result }: Response): Array<Data | EUtilsError> {
    return [
        ...(error ? [new EUtilsError(error, true)] : []),
        ...result.uids.map(id => parseEntry(result[id])),
    ];
}
