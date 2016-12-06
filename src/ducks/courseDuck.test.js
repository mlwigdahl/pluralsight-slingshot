import reducer, * as courseDuck from './courseDuck';
import * as ajaxDuck from './ajaxDuck';

import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai, { expect } from 'chai';

// reducer tests

describe('Course Reducer', () => {
    it('should add a course when passed CREATE_COURSE_SUCCESS', () => {
        const initialState = [
            {title: 'A'},
            {title: 'B'}
        ];

        const newCourse = {title: 'C'};

        const action = courseDuck.createCourseSuccess(newCourse);

        const newState = reducer(initialState, action);

        expect(newState.length).to.equal(3);
        expect(newState[0].title).to.equal('A');
        expect(newState[1].title).to.equal('B');
        expect(newState[2].title).to.equal('C');
    });

   it('should update a course when passed UPDATE_COURSE_SUCCESS', () => {
        const initialState = [
            {id: 'a', title: 'A'},
            {id: 'b', title: 'B'},
            {id: 'c', title: 'C'}
        ];

        const course = {id: 'b', title: 'New Title'};
        const action = courseDuck.updateCourseSuccess(course);

        const newState = reducer(initialState, action);
        const updatedCourse = newState.find(crs => crs.id == course.id);
        const untouchedCourse = newState.find(crs => crs.id == 'a');

        expect(newState.length).to.equal(3);
        expect(updatedCourse.title).to.equal('New Title');
        expect(untouchedCourse.title).to.equal('A');
    });    

    it('should delete a course when passed DELETE_COURSE_SUCCESS', () => {
        const initialState = [
            {id: 'a', title: 'A'},
            {id: 'b', title: 'B'},
            {id: 'c', title: 'C'}
        ];

        const course = {id: 'a', title: 'A'};
        const action = courseDuck.deleteCourseSuccess(course);

        const newState = reducer(initialState, action);
        const undefinedIfNotDeleted = newState.find(crs => crs.id == course.id);

        expect(newState.length).to.equal(2);
        expect(undefinedIfNotDeleted).to.equal(undefined);
    });
});

// action tests

chai.use(sinonChai);

describe('Course Actions', () => {
    describe('createCourseSuccess', () => {
        it('should create a CREATE_COURSE_SUCCESS action', () => {
            //arrange
            const course = {id: 'clean-code', title: 'Clean Code'};
            const expectedAction = {
                type: courseDuck.CREATE_COURSE_SUCCESS,
                course: course
            };

            const action = courseDuck.createCourseSuccess(course);

            expect(action).to.deep.equal(expectedAction);
        });
    });

    describe('deleteCourseSuccess', () => {
        it('should create DELETE_COURSE_SUCCESS action', () => {
            //arrange
            const course = {id: 'clean-code', title: 'Clean Code'};
            const expectedAction = {
                type: courseDuck.DELETE_COURSE_SUCCESS,
                course: course
            };

            const action = courseDuck.deleteCourseSuccess(course);

            expect(action).to.deep.equal(expectedAction);
        });
    });
});

describe('Async Actions', () => {
    it('should create BEGIN_AJAX_CALL and LOAD_COURSES_SUCCESS when loading courses', (done) => {
        // Here's an example call to nock.
        // nock('http://example.com/')
        //   .get('/courses')
        //   .reply(200, {body: {course [{id: 1, firstName: 'Cory', lastName: 'House'}] }});

        const dispatch = sinon.spy();

        const expectedActions = [
            {type: ajaxDuck.BEGIN_AJAX_CALL},
            {
                type: courseDuck.LOAD_COURSES_SUCCESS, 
                body: {
                    courses: [
                        {
                            id: "react-flux-building-applications",
                            title: "Building Applications in React and Flux",
                            watchHref: "http://www.pluralsight.com/courses/react-flux-building-applications",
                            authorId: "cory-house",
                            length: "5:08",
                            category: "JavaScript"
                        },
                        {
                            id: "clean-code",
                            title: "Clean Code: Writing Code for Humans",
                            watchHref: "http://www.pluralsight.com/courses/writing-clean-code-humans",
                            authorId: "cory-house",
                            length: "3:10",
                            category: "Software Practices"
                        },
                        {
                            id: "architecture",
                            title: "Architecting Applications for the Real World",
                            watchHref: "http://www.pluralsight.com/courses/architecting-applications-dotnet",
                            authorId: "cory-house",
                            length: "2:52",
                            category: "Software Architecture"
                        },
                        {
                            id: "career-reboot-for-developer-mind",
                            title: "Becoming an Outlier: Reprogramming the Developer Mind",
                            watchHref: "http://www.pluralsight.com/courses/career-reboot-for-developer-mind",
                            authorId: "cory-house",
                            length: "2:30",
                            category: "Career"
                        },
                        {
                            id: "web-components-shadow-dom",
                            title: "Web Component Fundamentals",
                            watchHref: "http://www.pluralsight.com/courses/web-components-shadow-dom",
                            authorId: "cory-house",
                            length: "5:10",
                            category: "HTML5"
                        }
                    ]
                }
            }
        ];

        expect(typeof (courseDuck.loadCourses())).to.equal('function');

        (courseDuck.loadCourses())(dispatch).then(() => {
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

/// need test for COURSE_CHANGED