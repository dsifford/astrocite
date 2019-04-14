import { parseName } from 'astrocite-core';
import { Data } from 'csl-json';

import { FIELD_MAP } from './constants';
import { Item, Response, VolumeInfo } from './schema';

const FIELD_TRANSFORMS = new Map<
    keyof VolumeInfo,
    (data: VolumeInfo) => Partial<Data>
>([
    [
        'authors',
        ({ authors }) => {
            return {
                author: authors.map(parseName),
            };
        },
    ],
    [
        'publishedDate',
        ({ publishedDate }) => {
            const [year, month, day] = publishedDate.split('-');
            if (!year) {
                return {};
            }
            return {
                issued: {
                    'date-parts': [
                        <[string, string?, string?]>(
                            [year, month, day].filter(Boolean)
                        ),
                    ],
                },
            };
        },
    ],
    [
        'industryIdentifiers',
        ({ industryIdentifiers }) => {
            const ident =
                industryIdentifiers.find(i => i.type === 'ISBN_13') ||
                industryIdentifiers.find(i => i.type === 'ISBN_10');
            if (ident) {
                return { ISBN: ident.identifier };
            }
            return {};
        },
    ],
]);

const keys = Object.keys as <T>(o: T) => Array<Extract<keyof T, string>>;

function parseItem({ id, volumeInfo }: Item, isChapter = false): Data {
    return keys(volumeInfo).reduce<Data>(
        (obj, key) => {
            if (!volumeInfo[key]) {
                return obj;
            }
            const transform = FIELD_TRANSFORMS.get(key);
            if (transform) {
                return { ...obj, ...transform(volumeInfo) };
            }
            const cslKey = FIELD_MAP.get(key);
            if (cslKey) {
                if (isChapter && cslKey === 'title') {
                    return {
                        ...obj,
                        'container-title': <string>volumeInfo[key],
                    };
                }
                return { ...obj, [cslKey]: volumeInfo[key] };
            }
            return obj;
        },
        {
            id,
            type: isChapter ? 'chapter' : 'book',
        },
    );
}

export function toCSL({ items = [] }: Response, isChapter = false): Data[] {
    return items.map(item => parseItem(item, isChapter));
}
