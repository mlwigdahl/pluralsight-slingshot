import {expect} from 'chai';
import {createStore} from 'redux';
import rootReducer from '../ducks';
import initialState from '../ducks/initialState';
import * as courseActions from '../ducks/courseDuck';
import * as authorActions from '../ducks/authorDuck';

describe('Store', function() {
    it('Should handle creating courses', function() {
        const store = createStore(rootReducer, initialState);
        
        const course = {
            title: "Clean Code"
        };

        const action = courseActions.createCourseSuccess(course);
        store.dispatch(action);

        const actual = store.getState().courses[0];
        const expected = {
            title: "Clean Code"
        };

        expect(actual).to.deep.equal(expected);
    });

    it ('Should handle creating authors', function() {
        const store = createStore(rootReducer, initialState);

        const author = {
            id: 'matt-wigdahl',
            firstName: 'Matt',
            lastName: 'Wigdahl'
        };

        const action = authorActions.createAuthorSuccess(author);
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