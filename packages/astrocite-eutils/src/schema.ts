export interface EntryError {
    uid: string;
    error: string;
}

export interface EntryOk {
    uid: string;
    /**
     * Format: "<YYYY> <Mmm>? <DD>?"
     * Examples: `2004`, `2014 Jun`, `2000 Nov 12`
     */
    pubdate: string;
    /**
     * Format: "<YYYY> <Mmm>? <DD>?"
     * Examples: `2004`, `2014 Jun`, `2000 Nov 12`
     */
    epubdate: string;
    /** container-title-short */
    source: string;
    authors: Array<{
        name: string;
        authtype: string;
        clusterid: string;
    }>;
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
    articleids: Array<{
        idtype:
            | 'doi'
            | 'eid'
            | 'pii'
            | 'pmc'
            | 'pmcid'
            | 'pmid'
            | 'pubmed'
            | 'rid';
        idtypeen: number;
        value: string;
    }>;
    history: Array<{
        pubstatus: string;
        /**
         * Format: "YYYY/MM/DD HH:MM"
         * Example: `2014/07/01 00:00`
         */
        date: string;
    }>;
    references: Array<{
        refsource: string;
        reftype: string;
        pmid: number;
        note: string;
    }>;
    pmcrefcount: string;
    /** Journal name in sentence case */
    fulljournalname: string;
    elocationid: string;
    doctype: string; // FIXME: what are available?
    booktitle: string;
    medium: string;
    edition: string;
    publisherlocation: string;
    publishername: string;
    /**
     * Format: "YYYY/MM/DD HH:MM"
     * Example: `2014/07/01 00:00`
     */
    srcdate: string;
    reportnumber: string;
    availablefromurl: string;
    locationlabel: string;
    /**
     * Format: "YYYY/MM/DD HH:MM"
     * Example: `2014/07/01 00:00`
     */
    docdate: string;
    bookname: string;
    chapter: string;
    /**
     * Format: "YYYY/MM/DD HH:MM"
     * Example: `2014/07/01 00:00`
     */
    sortdate: string; // Used with PMC json
    /**
     * Format: "YYYY/MM/DD HH:MM"
     * Example: `2014/07/01 00:00`
     */
    sortpubdate: string;
    sortfirstauthor: string;
    vernaculartitle: string;
}

export interface Response {
    header: {
        type: string;
        version: string;
    };
    result: {
        uids: string[];
    } & {
        [pmid: string]: Entry;
    };
    error?: string;
}

export type Entry = EntryOk | EntryError;

export function isError(entry: Entry): entry is EntryError {
    return 'error' in entry;
}
