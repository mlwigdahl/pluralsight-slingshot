import {expect} from 'chai';
import {authorsFormattedForDropdown, authorIdFromData} from './selectors';

describe('Author Selectors', () => {
    describe('authorsFormattedForDropdown', () => {
        it('should return author data formatted for use in a dropdown', () => {
            const authors = [
                {id: 'cory-house', firstName: 'Cory', lastName: 'House'},
                {id: 'scott-allen', firstName: 'Scott', lastName: 'Allen'}
            ];

            const expected = [
                {value: 'cory-house', text: 'Cory House'},
                {value: 'scott-allen', text: 'Scott Allen'}
            ];

            expect(authorsFormattedForDropdown(authors)).to.deep.equal(expected);
        });
    });

    describe('authorIdFromData', () => {
        it('should return an ID value for the provided author object', () => {
            const author = {id: 'cory-house', firstName: 'Cory', lastName: 'House'};

            const expected = 'cory-house';

            expect(authorIdFromData(author)).to.deep.equal(expected);
        });
    });
});