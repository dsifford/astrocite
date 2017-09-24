import parseDate from '../dates';

describe('dates', () => {
    const cases = [
        {
            input: '2017',
            expected: {
                'date-parts': [['2017']],
            },
        },
        {
            input: '2017/02',
            expected: {
                'date-parts': [['2017', '02']],
            },
        },
        {
            input: '1998/10/04',
            expected: {
                'date-parts': [['1998', '10', '04']],
            },
        },
        {
            input: '                   1998/10/04                      ',
            expected: {
                'date-parts': [['1998', '10', '04']],
            },
        },
        {
            input: '1958/08/21/summer',
            expected: {
                'date-parts': [['1958', '08', '21']],
                season: '2',
            },
        },
        {
            input: '   1958/08/21/sPrinG    ',
            expected: {
                'date-parts': [['1958', '08', '21']],
                season: '1',
            },
        },
        {
            input: '   1958/05/31  01:48',
            expected: {
                'date-parts': [['1958', '05', '31']],
            },
        },
        {
            input: 2015,
            expected: {
                'date-parts': [['2015']],
            },
        },
    ];
    it('should parse dates in a variety of formats', () => {
        for (const c of cases) {
            expect(parseDate(c.input)).toEqual(c.expected);
        }
    });
    it('should throw an error when encountering something that cant be parsed', () => {
        expect(() => {
            parseDate('ib54huiib2364');
        }).toThrow();
    });
});
