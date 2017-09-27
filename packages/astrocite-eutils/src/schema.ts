// tslint:disable no-namespace

/**
 * Format: "<YYYY> <Mmm>? <DD>?"
 * Examples: `2004`, `2014 Jun`, `2000 Nov 12`
 */
export type ShortDate = string;

/**
 * Format: "YYYY/MM/DD HH:MM"
 * Example: `2014/07/01 00:00`
 */
export type LongDate = string;

export interface Reference {
    refsource: string;
    reftype: string;
    pmid: number;
    note: string;
}

export interface HistoryEntry {
    pubstatus: string;
    date: LongDate;
}

export interface ArticleID {
    idtype: 'doi' | 'eid' | 'pii' | 'pmc' | 'pubmed' | 'rid';
    idtypeen: number;
    value: string;
}

export interface Author {
    name: string;
    authtype: string;
    clusterid: string;
}

export interface ResultUIDs {
    uids: string[];
}

export interface ResultItems {
    [pmid: string]: Eutils.Entry;
}

export type Result = ResultUIDs & ResultItems;

export namespace Eutils {
    export interface Response {
        header: {
            type: string;
            version: string;
        };
        result: Result;
        error?: string;
    }
    export type Entry = EntryOk | EntryError;
    export interface EntryOk {
        __astrocite_kind: 'entry';
        uid: string;
        /** Example: "1975 May" */
        pubdate: ShortDate;
        epubdate: ShortDate;
        /** container-title-short */
        source: string;
        authors: Author[];
        lastauthor: string;
        title: string;
        sorttitle: string;
        volume: string;
        issue: string;
        /** Range (e.g. "525-30") */
        pages: string;
        lang: string[];
        nlmuniqueid: string;
        issn: string;
        essn: string;
        pubtype: string[];
        recordstatus: string;
        /**
         * (1) received      -- date manuscript received for review
         * (2) accepted      -- accepted for publication
         * (3) epublish      -- published electronically by publisher
         * (4) ppublish      -- published in print by publisher
         * (5) revised       -- article revised by publisher/author
         * (6) pmc           -- article first appeared in PubMed Central
         * (7) pmcr          -- article revision in PubMed Central
         * (8) pubmed        -- article citation first appeared in PubMed
         * (9) pubmedr       -- article citation revision in PubMed
         * (10) aheadofprint -- epublish, but will be followed by print
         * (11) premedline   -- date into PreMedline status
         * (12) medline      -- date made a MEDLINE record
         * (255) other
         */
        pubstatus?:
            | '1'
            | '2'
            | '3'
            | '4'
            | '5'
            | '6'
            | '7'
            | '8'
            | '9'
            | '10'
            | '11'
            | '12'
            | '255';
        articleids: ArticleID[];
        history: HistoryEntry[];
        references: Reference[];
        attributes: never[]; // FIXME: not sure what this is
        pmcrefcount: string;
        /** Journal name in sentence case */
        fulljournalname: string;
        elocationid: string;
        doctype: string; // FIXME: what are available?
        srccontriblist: never[]; // FIXME: not sure what this is
        booktitle: string;
        medium: string;
        edition: string;
        publisherlocation: string;
        publishername: string;
        srcdate: LongDate;
        reportnumber: string;
        availablefromurl: string;
        locationlabel: string;
        doccontriblist: never[]; // FIXME: not sure what this is
        docdate: LongDate;
        bookname: string;
        chapter: string;
        sortdate: LongDate; // Used with PMC json
        sortpubdate: LongDate;
        sortfirstauthor: string;
        vernaculartitle: string;
        error: ''; // Does not actually exist here. Needed for discriminated union
    }

    export interface EntryError {
        __astrocite_kind: 'error';
        uid: string;
        error: string;
    }
}
