import { parseName } from '../names';

describe('parseName()', () => {
    it('should parse names appropriately', () => {
        [
            'De la Fontaine du Bois Joli, Jean',
            'Jean de la Fontaine du Bois Joli',
            'De la Fontaine du Bois Joli, Jr., Jean',
            'Johannes Diderik van der Waals',
            'Van der Waals, Johannes Diderik',
            'Van der Waals, III, Johannes Diderik',
            'Alfred Adler',
            'Bertie B. Bull',
            'C. Z. Crop',
            'Derek D Decket',
            'Egbert von Eel',
            'Francis van der valt Frome',
            'Gregory R. van Gloom',
            'Henry F. van Henkel',
            'Jolly, III, James',
            'Pimentel, Jr. ,Joseph J.',
            'van Kluster, Jr., Kevin',
            'Charles Louis Xavier Joseph de la Valle Poussin',
            'Van de Graaff, R. J.',
            'St John-Mollusc, Oliver',
            'Roger P.G. van Gompel',
            'Mustermann, Klaus-Peter',
            'Lam, Ho-Pun',
            'John Henry Ford',
            'Someone Smith',
            'Šomeone Smith',
            'Someone Šmith',
            'American Psychological Association, Task Force on the Sexualization of Girls',
            'Sci-Art Publishers',
            'Smith, Jr., Bill, Lee',
            'U.S. Department of Health and Human Services, National Institute of Mental Health, National Heart, Lung and Blood Institute',
            'E. S. El-Mallah',
            'Zelly, Arthur',
            'Alan Author',
            'Steven Secondauthor und andere',
            'Alan Author',
            'andere',
            'Alan Miffed',
            'Deutsch, J. Anthony',
            'Deutsch, Diana P',
        ].forEach(n => {
            expect(parseName(n)).toMatchSnapshot();
        });
    });
});
