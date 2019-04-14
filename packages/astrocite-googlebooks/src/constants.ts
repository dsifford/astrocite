import { Data } from 'csl-json';
import { VolumeInfo } from './schema';

export const FIELD_MAP: ReadonlyMap<keyof VolumeInfo, keyof Data> = new Map([
    ['language', 'language'],
    ['pageCount', 'number-of-pages'],
    ['publisher', 'publisher'],
    ['title', 'title'],
]);
