export interface Response {
    kind: string;
    totalItems: number;
    items: Item[];
}

export interface Item {
    kind: string;
    id: string;
    etag: string;
    selfLink: string;
    volumeInfo: VolumeInfo;
}

export interface VolumeInfo {
    title: string;
    authors: string[];
    publisher: string;
    /**
     * "2016-07-31"
     */
    publishedDate: string;
    description: string;
    industryIdentifiers: Array<{
        /** ISBN_13, ISBN_10 */
        type: string;
        identifier: string;
    }>;
    pageCount: number;
    language: string;
}
