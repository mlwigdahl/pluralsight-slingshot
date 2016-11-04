import authorReducer from './authorReducer';
import {expect} from 'chai';
import * as actions from '../actions/authorActions';

describe('Author Reducer', () => {
    it('should add an author when passed CREATE_AUTHOR_SUCCESS', () => {
        const initialState = [
            {firstName: 'A', lastName: 'Z'},
            {firstName: 'B', lastName: 'Y'}
        ];

        const newAction = {firstName: 'C', lastName: 'X'};

        const action = actions.createAuthorSuccess(newAction);

        const newState = authorReducer(initialState, action);

        expect(newState.length).to.equal(3);
        expect(newState[0].firstName).to.equal('A');
        expect(newState[1].firstName).to.equal('B');
        expect(newState[2].firstName).to.equal('C');
    });

   it('should update an author when passed UPDATE_AUTHOR_SUCCESS', () => {
        const initialState = [
            {id: 'a-z', firstName: 'A', lastName: 'Z'},
            {id: 'b-y', firstName: 'B', lastName: 'Y'},
            {id: 'c-x', firstName: 'C', lastName: 'X'}
        ];

        const author = {id: 'b-y', firstName: 'D', lastName: 'Y'};
        const action = actions.updateAuthorSuccess(author);

        const newState = authorReducer(initialState, action);
        const updatedAuthor = newState.find(auth => auth.id == author.id);
        const untouchedAuthor = newState.find(auth => auth.id == 'a-z');

        expect(newState.length).to.equal(3);
        expect(updatedAuthor.firstName).to.equal('D');
        expect(untouchedAuthor.firstName).to.equal('A');
    });    

    it('should delete an author when passed DELETE_AUTHOR_SUCCESS', () => {
        const initialState = [
            {id: 'a-z', firstName: 'A', lastName: 'Z'},
            {id: 'b-y', firstName: 'B', lastName: 'Y'},
            {id: 'c-x', firstName: 'C', lastName: 'X'}
        ];

        const author = {id: 'b-y', firstName: 'B', lastName: 'Y'};
        const action = actions.deleteAuthorSuccess(author);

        const newState = authorReducer(initialState, action);
        const undefinedIfNotDeleted = newState.find(auth => auth.id == author.id);

        expect(newState.length).to.equal(2);
        expect(undefinedIfNotDeleted).to.equal(undefined);
    });
});