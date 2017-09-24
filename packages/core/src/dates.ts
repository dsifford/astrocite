const YEAR_MONTH_DAY_SEASON: RegExp = /^\s*([1-2][0-9]{3})(?:\/([0-1][0-9]))?(?:\/([0-3][0-9]))?(?:\/(spring|summer|fall|winter))?.*$/i;
const seasons = new Map<string, string>([
    ['spring', '1'],
    ['summer', '2'],
    ['fall', '3'],
    ['winter', '4'],
]);

export default function(input: string | number): CSL.DateType {
    input = typeof input === 'number' ? input.toString() : input;
    const matches = input.match(YEAR_MONTH_DAY_SEASON);
    if (!matches) {
        throw new Error('Date string could not be parsed');
    }
    const [, year, month, day, season] = matches;
    return {
        'date-parts': [<any>[year, ...(month ? [month] : []), ...(day ? [day] : [])]],
        ...season ? { season: seasons.get(season.toLowerCase()) } : {},
    };
}
