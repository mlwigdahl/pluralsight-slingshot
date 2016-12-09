import {expect} from 'chai';
import {createStore} from 'redux';
import root from '../ducks';
import initialState from '../ducks/initialState';
import * as course from '../ducks/courseDuck';
import * as author from '../ducks/authorDuck';

describe('Store', function() {
    it('Should handle creating courses', function() {
        const store = createStore(root.reducer, initialState);
        
        const courseData = {
            title: "Clean Code"
        };

        const action = course.creators.createCourseSuccess(courseData);
        store.dispatch(action);

        const actual = store.getState().courses[0];
        const expected = {
            title: "Clean Code"
        };

        expect(actual).to.deep.equal(expected);
    });

    it ('Should handle creating authors', function() {
        const store = createStore(root.reducer, initialState);

        const authorData = {
            id: 'matt-wigdahl',
            firstName: 'Matt',
            lastName: 'Wigdahl'
        };

        const action = author.creators.createAuthorSuccess(authorData);
        store.dispatch(action);

        const actual = store.getState().authors[0];
        const expected = {
            id: 'matt-wigdahl',
            firstName: 'Matt',
            lastName: 'Wigdahl'
        };

        expect(actual).to.deep.equal(expected);
    });
});