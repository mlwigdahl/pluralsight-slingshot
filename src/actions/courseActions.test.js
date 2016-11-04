import * as courseActions from './courseActions';
import * as types from './actionTypes';

import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai, { expect } from 'chai';

chai.use(sinonChai);

describe('Course Actions', () => {
    describe('createCourseSuccess', () => {
        it('should create a CREATE_COURSE_SUCCESS action', () => {
            //arrange
            const course = {id: 'clean-code', title: 'Clean Code'};
            const expectedAction = {
                type: types.CREATE_COURSE_SUCCESS,
                course: course
            };

            const action = courseActions.createCourseSuccess(course);

            expect(action).to.deep.equal(expectedAction);
        });
    });

    describe('deleteCourseSuccess', () => {
        it('should create DELETE_COURSE_SUCCESS action', () => {
            //arrange
            const course = {id: 'clean-code', title: 'Clean Code'};
            const expectedAction = {
                type: types.DELETE_COURSE_SUCCESS,
                course: course
            };

            const action = courseActions.deleteCourseSuccess(course);

            expect(action).to.deep.equal(expectedAction);
        });
    });
});

describe('Async Actions', () => {
    it('should create BEGIN_AJAX_CALL and LOAD_COURSES_SUCCESS when loading courses', () => {
        // Here's an example call to nock.
        // nock('http://example.com/')
        //   .get('/courses')
        //   .reply(200, {body: {course [{id: 1, firstName: 'Cory', lastName: 'House'}] }});

        const dispatch = sinon.spy();

        const expectedActions = [
            {type: types.BEGIN_AJAX_CALL},
            {type: types.LOAD_COURSES_SUCCESS, body: {courses: [{id: 'clean-code', title: 'Clean Code'}]}}
        ];

        expect(typeof (courseActions.loadCourses())).to.equal('function');

        (courseActions.loadCourses())(dispatch);

        expect(dispatch.callCount).to.equal(2);
        expect(dispatch.firstCall).to.have.been.calledWith(expectedActions[0]);
        expect(dispatch.secondCall).to.have.been.calledWith(expectedActions[1]);
    });
});

/// need test for COURSE_CHANGED