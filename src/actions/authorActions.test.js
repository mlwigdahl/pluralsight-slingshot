import * as authorActions from './authorActions';
import * as types from './actionTypes';

import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai, { expect } from 'chai';

chai.use(sinonChai);

describe('Author Actions', () => {
    describe('createAuthorSuccess', () => {
        it('should create a CREATE_AUTHOR_SUCCESS action', () => {
            //arrange
            const author = {id: 'matt-wigdahl', firstName: 'Matt', lastName: 'Wigdahl'};
            const expectedAction = {
                type: types.CREATE_AUTHOR_SUCCESS,
                author: author
            };

            const action = authorActions.createAuthorSuccess(author);

            expect(action).to.deep.equal(expectedAction);
        });
    });

    describe('deleteAuthorSuccess', () => {
        it('should create DELETE_AUTHOR_SUCCESS action', () => {
            //arrange
            const author = {id: 'cory-house', firstName: 'Cory', lastName: 'House'};
            const expectedAction = {
                type: types.DELETE_AUTHOR_SUCCESS,
                author: author
            };

            const action = authorActions.deleteAuthorSuccess(author);

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
            {type: types.BEGIN_AJAX_CALL},
            {type: types.LOAD_AUTHORS_SUCCESS, body: {authors: [{id: 'matt-wigdahl', firstName: 'Matt', lastName: 'Wigdahl'}]}}
        ];

        expect(typeof (authorActions.loadAuthors())).to.equal('function');

        (authorActions.loadAuthors())(dispatch).then(() => {
            expect(dispatch.callCount).to.equal(2);
            expect(dispatch.firstCall).to.have.been.calledWith(expectedActions[0]);
            expect(dispatch.secondCall).to.have.been.calledWith(expectedActions[1]);
            done();
        });
    });
});

/// need test for AUTHOR_CHANGED 