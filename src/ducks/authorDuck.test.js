import * as author from './authorDuck';
import * as ajax from './ajaxDuck';

import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai, { expect } from 'chai';

// reducer tests

describe('Author Reducer', () => {
    it('should add an author when passed CREATE_AUTHOR_SUCCESS', () => {
        const initialState = [
            {firstName: 'A', lastName: 'Z'},
            {firstName: 'B', lastName: 'Y'}
        ];

        const newAction = {firstName: 'C', lastName: 'X'};

        const action = author.creators.createAuthorSuccess(newAction);

        const newState = author.reducer(initialState, action);

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

        const authorData = {id: 'b-y', firstName: 'D', lastName: 'Y'};
        const action = author.creators.updateAuthorSuccess(authorData);

        const newState = author.reducer(initialState, action);
        const updatedAuthor = newState.find(auth => auth.id == authorData.id);
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

        const authorData = {id: 'b-y', firstName: 'B', lastName: 'Y'};
        const action = author.creators.deleteAuthorSuccess(authorData);

        const newState = author.reducer(initialState, action);
        const undefinedIfNotDeleted = newState.find(auth => auth.id == authorData.id);

        expect(newState.length).to.equal(2);
        expect(undefinedIfNotDeleted).to.equal(undefined);
    });
});

// action tests

chai.use(sinonChai);

describe('Author Actions', () => {
    describe('createAuthorSuccess', () => {
        it('should create a CREATE_AUTHOR_SUCCESS action', () => {
            //arrange
            const authorData = {id: 'matt-wigdahl', firstName: 'Matt', lastName: 'Wigdahl'};
            const expectedAction = {
                type: author.actions.CREATE_AUTHOR_SUCCESS,
                author: authorData
            };

            const action = author.creators.createAuthorSuccess(authorData);

            expect(action).to.deep.equal(expectedAction);
        });
    });

    describe('deleteAuthorSuccess', () => {
        it('should create DELETE_AUTHOR_SUCCESS action', () => {
            //arrange
            const authorData = {id: 'cory-house', firstName: 'Cory', lastName: 'House'};
            const expectedAction = {
                type: author.actions.DELETE_AUTHOR_SUCCESS,
                author: authorData
            };

            const action = author.creators.deleteAuthorSuccess(authorData);

            expect(action).to.deep.equal(expectedAction);
        });
    });
});

describe('Async Actions', () => {
    it('should create BEGIN_AJAX_CALL and LOAD_AUTHORS_SUCCESS when loading authors', (done) => {
        // Here's an example call to nock.
        // nock('http://example.com/')
        //   .get('/courses')
        //   .reply(200, {body: {course [{id: 1, firstName: 'Cory', lastName: 'House'}] }});

        const dispatch = sinon.spy();

        const expectedActions = [
            {type: ajax.actions.BEGIN_AJAX_CALL},
            {
                type: author.actions.LOAD_AUTHORS_SUCCESS, 
                body: {
                    authors: [
                        {
                            id: 'cory-house',
                            firstName: 'Cory',
                            lastName: 'House'
                        },
                        {
                            id: 'scott-allen',
                            firstName: 'Scott',
                            lastName: 'Allen'
                        },
                        {
                            id: 'dan-wahlin',
                            firstName: 'Dan',
                            lastName: 'Wahlin'
                        }
                    ]
                }
            }
        ];

        expect(typeof (author.creators.loadAuthors())).to.equal('function');

        (author.creators.loadAuthors())(dispatch).then(() => {
            expect(dispatch.callCount).to.equal(2);
            expect(dispatch.firstCall).to.have.been.calledWith(expectedActions[0]);
            expect(dispatch.secondCall).to.have.been.calledWith(expectedActions[1]);
            done();
        })
        .catch(() => { 
            done(); 
        });
    });
});

/// need test for AUTHOR_CHANGED 